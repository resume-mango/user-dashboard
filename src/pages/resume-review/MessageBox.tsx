import React, { Fragment, useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import RichTextEditor from '../../components/form/RichTextEditor'
import { Quill } from 'react-quill'
import EmojiPicker, {
  EmojiStyle,
  EmojiClickData,
  Emoji,
} from 'emoji-picker-react'
import styled from 'styled-components'
import detectOutsideClick from '../../hooks/detectOutsideClick'
import SmileIcon from '../../components/svgs/smile'
import AttachmentIcon from '../../components/svgs/attachment'
import UploadScreen from './UploadScreen'
import ImageIcon from '../../components/svgs/image'
import { Button } from '../../styled/button'
import { useMutation, useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useNotify } from '../../contexts/notify'
import { LoadingDots, Spinner } from '../../styled/loader'
import AttachementUpload from './AttachementUpload'
import Confirmation from '../../components/ui/confirmation'

interface IMessage {
  message: string
  attachments: Array<{
    _id: string
    name: string
    path: string
    type: string
  }>
}
interface IMessageBox {
  ticket: string
  resumeId: string
  className?: string
  acceptTC: boolean
  setAlert: (_val: boolean) => void
  style: React.CSSProperties
  isFetchingMessage: boolean
}

const Embed = Quill.import('blots/embed')

const emojiHTML = (value: string) => {
  try {
    return ReactDOMServer.renderToString(<Emoji unified={value} size={20} />)
  } catch (err) {
    return null
  }
}

class EmojiBolt extends Embed {
  static create(value: string) {
    const node = super.create()
    node.title = value
    node.classList.add('composer-emoji')
    const emoji = emojiHTML(value)
    node.innerHTML = emoji
    return node
  }
}
EmojiBolt.blotName = 'emojiEmbed'
EmojiBolt.tagName = 'span'

Quill.register(EmojiBolt)

const formats = ['bold', 'italic', 'link', 'emojiEmbed']

const MessageBox = ({
  ticket,
  resumeId,
  className,
  acceptTC,
  setAlert,
  style,
  isFetchingMessage,
}: IMessageBox) => {
  const history = useHistory()
  const { setNotify } = useNotify()
  const defaultValues = {
    message: '',
    attachments: [],
  }
  const { isOutside, ref } = detectOutsideClick()
  const quillRef = useRef<any>()
  const [show, setShow] = useState<'emoji' | 'attachment' | 'image' | null>(
    null
  )
  const [showDropzone, setShowDropzone] = useState(false)
  const [files, setFiles] = useState<Array<any>>([])
  const [filesInProgress, setFilesInProgress] = useState(0)
  const [filesToRemove, setFilesToRemove] = useState<Array<string>>([])
  const queryClient = useQueryClient()

  const methods = useForm<IMessage>({
    mode: 'onBlur',
    defaultValues,
  })

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { isSubmitting },
  } = methods

  const { append, remove } = useFieldArray({
    control,
    name: 'attachments',
  })

  const message = watch('message')
  const attachments = watch('attachments')

  const regex = /(<([^>]+)>)/gi
  const hasMessage = !!message.replace(regex, '').length

  const handleCache = (data: Record<string, any>) => {
    let chats = queryClient.getQueryData(['chats', data.ticketId]) as any
    if (!chats) {
      chats = {
        pages: [{ total: 1, limit: 15, page: 0, items: [data] }],
        pageParams: [undefined],
      }
    } else {
      chats.pages[0].items.unshift(data)
    }
    queryClient.setQueryData(['chats', data.ticketId], chats)

    if (data.ticketId && ticket === 'new') {
      const limits = queryClient.getQueryData('ticketsCreated') as any
      if (limits) {
        limits.count = limits.count + 1
        queryClient.setQueryData('ticketsCreated', limits)
      }
      history.replace({
        pathname: `/resume-review/${data.ticketId}`,
        search: `?ref=${resumeId}`,
      })
    }
    return
  }

  const sendMessage = useMutation((reqData) => axios.post('/chat', reqData), {
    onSuccess: ({ data }: any) => {
      if (!data) return
      ticket === 'new' && setAlert(true)
      handleCache(data)
      setFiles([])
      return reset()
    },
    onError: (err: any) => {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.error &&
        err.response.data.error.status === 400 &&
        err.response.data.error.message === 'Ticket has been closed!'
      ) {
        queryClient.setQueryData(['reviewTicket', ticket], (queryData: any) => {
          return { ...queryData, status: 'closed' }
        })
      }
      setNotify({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to send message',
      })
    },
    // onSettled: () => {},
  })

  const onSubmit = async (data: any) => {
    if (data.message && hasMessage) {
      const dummy = document.createElement('div')
      dummy.innerHTML = data.message
      const emojis = dummy.querySelectorAll('span.composer-emoji') as any
      if (emojis && emojis.length > 0) {
        emojis.forEach((item: HTMLElement) => {
          item.innerText = item.title
        })
      }

      const regex = new RegExp('<p><br></p>', 'g')
      data.message = dummy.innerHTML.replace(regex, '')
    } else {
      data.message = ''
    }

    if (ticket === 'new') {
      data.acceptTC = acceptTC
    }

    return sendMessage.mutate({
      ...data,
      ticketId: ticket,
      resumeId,
    })
  }
  const insertEmoji = async (emojiData: EmojiClickData, _event: MouseEvent) => {
    setShow(null)
    if (!quillRef || !emojiData || !emojiData.unified) return
    const editor = quillRef.current.editor
    if (!editor) return
    const selection = await editor.getSelection()
    if (!selection)
      return await editor.insertEmbed(0, 'emojiEmbed', emojiData.unified)
    const cursorPosition = selection.index
    await editor.insertEmbed(cursorPosition, 'emojiEmbed', emojiData.unified)
    await editor.setSelection(cursorPosition + 1)
  }

  const apiDeleteFiles = async (ids: string[]) => {
    if (ids.length === 0) return
    const options = {
      method: 'DELETE',
      url: `/chat/attachments`,
      data: { ids },
    }
    await axios.request(options as any).catch((_err) => {
      setNotify({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to delete file(s)',
      })
    })
  }

  useEffect(() => {
    if (!isOutside) return
    setShow(null)
  }, [isOutside])

  useEffect(() => {
    if (filesToRemove.length === 0) return
    const timer = setTimeout(() => {
      apiDeleteFiles(filesToRemove)
      setFilesToRemove([])
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [filesToRemove])

  const handleFileDrop = (droppedFiles: File[]) => {
    setFilesInProgress((prev) => prev + droppedFiles.length)
    setFiles((prev) => [...prev, ...droppedFiles])
  }

  const handleFileSuccess = (file: Record<string, any>, _fileIndex: number) => {
    append(file)
  }

  const handleRemoveFile = (fileIndex: number, isUploaded: boolean) => {
    const index = attachments.findIndex(
      (item) => item.name === files[fileIndex].name
    )
    if (isUploaded && index !== -1) {
      setFilesToRemove((prev) => [...prev, attachments[index]._id])
      remove(index)
    }
    const newFiles = [...files]
    newFiles.splice(fileIndex, 1)
    setFiles(newFiles)
  }

  const handleFileDone = () => {
    setFilesInProgress((prev) => {
      if (prev === 0) return 0
      return prev - 1
    })
  }
  const handleDropzone = (type: 'attachment' | 'image') => {
    setShow(type)
    setShowDropzone(true)
  }

  return (
    <Fragment>
      <FormProvider {...methods}>
        <Wrapper
          id="message-box"
          className={className}
          hasFiles={files && files.length > 0}
          style={style}
        >
          <div id="toolbar">
            <div
              className={`${show === 'emoji' ? 'preview-emoji' : ''} emoji`}
              ref={ref}
            >
              <button
                className="insertEmoji toolbar-btn"
                onClick={() => setShow(show === 'emoji' ? null : 'emoji')}
              >
                <SmileIcon size="18px" color="rgba(52, 52, 52, 0.4)" />
              </button>
              <div className="emojipicker">
                <EmojiPicker
                  onEmojiClick={insertEmoji}
                  autoFocusSearch={false}
                  lazyLoadEmojis={true}
                  previewConfig={{
                    showPreview: false,
                  }}
                  emojiStyle={EmojiStyle.GOOGLE}
                  emojiVersion="0.6"
                  skinTonesDisabled
                />
              </div>
            </div>
            <button
              className="insertImage toolbar-btn"
              onClick={() => handleDropzone('image')}
            >
              <ImageIcon size="18px" color="rgba(52, 52, 52, 0.4)" />
            </button>
            <button
              className="insertDocument toolbar-btn"
              onClick={() => handleDropzone('attachment')}
            >
              <AttachmentIcon size="18px" color="rgba(52, 52, 52, 0.4)" />
            </button>
            <button className="ql-bold toolbar-btn" />
            <button className="ql-italic toolbar-btn" />
            <div className="fetch-indicator">
              {isFetchingMessage && (
                <Fragment>
                  <Spinner size="1rem" type="primary" />
                  <LoadingDots color="rgba(240, 132, 56, 1)">
                    Checking
                  </LoadingDots>
                </Fragment>
              )}
            </div>
          </div>

          {showDropzone && (
            <DropWrapper>
              <UploadScreen
                setShow={setShowDropzone}
                setFiles={handleFileDrop}
                type={show === 'image' ? 'image' : 'attachment'}
              />
            </DropWrapper>
          )}
          <div className="message-box">
            <RichTextEditor
              ref={quillRef}
              placeholder={'Type text here...'}
              name="message"
              formats={formats}
              modules={{
                toolbar: {
                  container: '#toolbar',
                },
                clipboard: {
                  matchVisual: false,
                },
              }}
            />
            <div data-test-id="attachments">
              {files.map((file, i) => (
                <AttachementUpload
                  key={i}
                  file={file}
                  index={i}
                  onSuccess={handleFileSuccess}
                  onDone={handleFileDone}
                  handeRemoveFile={handleRemoveFile}
                />
              ))}
            </div>
            <Button
              className="send-btn"
              disabled={
                isSubmitting ||
                filesInProgress > 0 ||
                sendMessage.isLoading ||
                (!hasMessage && attachments.length === 0)
              }
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? <Spinner size="1rem" type="primary" /> : 'Send'}
            </Button>
          </div>
        </Wrapper>
      </FormProvider>
    </Fragment>
  )
}

export default MessageBox

const Wrapper = styled.div<{ hasFiles: boolean }>`
  margin: 1rem;
  border: 1px solid rgba(226, 233, 243, 1);
  border-radius: 6px;
  position: relative;

  .message-box {
    min-height: ${({ hasFiles }) => (hasFiles ? '0px' : '100px')};
    overflow-y: auto;
    max-height: 100px;
    .send-btn {
      position: absolute;
      bottom: 10px;
      right: 20px;
      width: fit-content;
      padding: 0 1.5rem;
      min-width: 75px;
    }
  }
  .fetch-indicator {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 1rem;
    p {
      margin-left: 0.7rem;
    }
  }
  .emoji {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;

    &.preview-emoji {
      .emojipicker {
        display: block;
      }
    }
    .emojipicker {
      display: none;
      position: absolute;
      bottom: 20px;
      left: -10px;
      z-index: 1000;
    }
  }
  #toolbar {
    border: none;
    border-bottom: 1px solid rgba(226, 233, 243, 1);
    .toolbar-btn {
      padding: 3px 10px;
      width: fit-content;
    }
  }

  .quill {
    background: transparent;
  }
  .ql-container {
    overflow-y: unset;
  }
  .ql-editor {
    .composer-emoji span {
      position: relative;
      top: 5px;
    }
    /* font-size: 0.8rem; */
    min-height: ${({ hasFiles }) => (hasFiles ? '0px' : '100px')};
    p,
    b,
    em,
    i {
      font-size: 0.875rem;
    }
  }
`

const DropWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #0000002e;

  display: flex;
  align-items: center;
  justify-content: center;
`

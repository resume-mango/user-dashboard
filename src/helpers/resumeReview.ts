import axios from 'axios'
import { INotify } from '../contexts/notify'

/**
 *
 * @param file Uploaded File
 * @param cancelToken Axios Canceltoken
 * @param setProgress from useState()
 * @param onDone callback after success / fail
 * @param setDone from useState()
 * @param onSuccess callback on success
 * @param setError from useState()
 * @param index position of file
 * @returns boolean
 */
export const uploadChatAttachment = async (
  file: File,
  cancelToken: any,
  setProgress: (_val: number) => void,
  onDone: () => void,
  setDone: (_val: boolean) => void,
  onSuccess: (_file: Record<string, any>, _index: number) => void,
  setError: (_val: boolean) => void,
  index: number
) => {
  if (!file) {
    setError(true)
    return false
  }

  setError(false)
  const formData = new FormData()
  formData.append('chat-attachments', file)

  return await axios
    .post('/chat/attachments', formData, {
      cancelToken: cancelToken.current.token,
      onUploadProgress: (progressEvent) => {
        /* istanbul ignore next */
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        ) as any
        /* istanbul ignore next */

        setProgress(percentage)
      },
    })
    .then((res: any) => {
      res && res.data && onSuccess(res.data, index)
    })
    .catch((err) => {
      if (axios.isCancel(err)) return
      setError(true)
    })
    .finally(() => {
      onDone()
      setDone(true)
      return true
    })
}

/**
 * Removes Chat Attachment
 * @param index postion on file
 * @param done from useState()
 * @param error from useState()
 * @param cancelToken Axios Canceltoken
 * @param handeRemoveFile removes file
 */
export const removeChatAttachment = (
  index: number,
  done: boolean,
  error: boolean,
  cancelToken: any,
  handeRemoveFile: (index: number, isUploaded: boolean) => void
) => {
  if (!done && cancelToken.current) {
    cancelToken.current.cancel('Cancelling previous requests')
  }
  handeRemoveFile(index, done && !error)
}

/**
 * handles downloaded attachment
 * @param chatId object id of chat
 * @param id object id of attachment
 * @param setProgress progress percentage from useState()
 * @param isDownloading from useState()
 * @param setIsDownloading from useState()
 * @param setNotify from useNotify()
 * @returns void
 */
export const handleDownloadAttachment = async (
  chatId: string,
  id: string,
  setProgress: (_val: number) => void,
  isDownloading: boolean,
  setIsDownloading: (_val: boolean) => void,
  setNotify: (_val: INotify) => void
) => {
  if (isDownloading) return
  setIsDownloading(true)
  await downloadAttachmentApi(chatId, id, setProgress).then((res: any) => {
    if (!res || !res.data) {
      setIsDownloading(false)
      return setNotify({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to download attachment!',
      })
    }
    const url = window.URL.createObjectURL(
      new Blob([res.data], {
        type: res.headers['content-type'],
      })
    )
    const link = document.createElement('a')
    link.href = url

    const name =
      (res.headers['content-disposition'] &&
        res.headers['content-disposition']
          .split('filename="')[1]
          .split('"')[0]) ||
      'attachment'

    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    return setIsDownloading(false)
  })
}

/**
 * Download attachment from api
 * @param chatId chat object id
 * @param id attachment object id
 * @param setProgress from useState
 * @returns void
 */
export const downloadAttachmentApi = async (
  chatId: string,
  id: string,
  setProgress: (_val: number) => void
) => {
  let res
  const options = {
    method: 'GET',
    url: `/chat/attachments`,
    params: { chatId, id },
    responseType: 'blob',
    onDownloadProgress: (progressEvent: any) => {
      /* istanbul ignore next */
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      ) as any
      /* istanbul ignore next */

      setProgress(percentage)
    },
  }
  try {
    res = await axios.request(options as any)
    return res
  } catch (err) {
    return (res = null)
  }
}

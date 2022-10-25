import axios from 'axios'
import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import FileIcon from '../../components/svgs/files'
import ImageIcon from '../../components/svgs/image'
import PlayIcon from '../../components/svgs/play'
import CircularProgress from '../../components/ui/CircularProgress'
import { useNotify } from '../../contexts/notify'

const AttachmentDownload = ({
  chat_id,
  attachment,
  senderType,
}: {
  chat_id: string
  attachment: Record<string, any>
  senderType: 'reviewer' | 'user'
}) => {
  const [progress, setProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const { setNotify } = useNotify()

  const openAttachement = async (chatId: string, id: string) => {
    if (isDownloading) return
    setIsDownloading(true)
    await downloadAttachment(chatId, id).then((res: any) => {
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
        res.headers['content-disposition']
          .split('filename="')[1]
          .split('"')[0] || 'attachment'

      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      return setIsDownloading(false)
    })
  }

  const downloadAttachment = async (chatId: string, id: string) => {
    let res
    const options = {
      method: 'GET',
      url: `/chat/attachments`,
      params: { chatId, id },
      responseType: 'blob',
      onDownloadProgress: (progressEvent: any) => {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        ) as any
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

  return (
    <Fragment>
      <StyledFile
        type={senderType}
        className={`${isDownloading ? 'downloading' : 'idle'}`}
        onClick={() => openAttachement(chat_id, attachment._id)}
      >
        <span className={`icon `}>
          {isDownloading ? (
            <CircularProgress progress={progress} />
          ) : attachment.mimeType ? (
            attachment.mimeType.split('/')[0] === 'image' ? (
              <ImageIcon color="#fff" size="1.2rem" />
            ) : attachment.mimeType.split('/')[0] === 'video' ? (
              <PlayIcon color="#fff" size="1.2rem" />
            ) : (
              <FileIcon color="#fff" size="1.2rem" />
            )
          ) : (
            <FileIcon color="#fff" size="1.2rem" />
          )}
        </span>
        <p className="truncate">{attachment.name}</p>
      </StyledFile>
    </Fragment>
  )
}

export default AttachmentDownload

const StyledFile = styled.div<{ type: 'reviewer' | 'user' }>`
  width: 300px;
  height: 40px;
  display: grid;
  grid-template-columns: 40px auto 30px;
  border: 1px solid
    ${({ type }) =>
      type === 'reviewer'
        ? 'rgba(238, 238, 238, 0.2)'
        : 'rgba(52, 52, 52, 0.2)'};
  border-radius: 6px;
  margin: 0.5rem 0;
  overflow: hidden;
  align-items: center;
  position: relative;
  cursor: pointer;
  background-color: ${({ type }) =>
    type === 'reviewer' ? 'rgba(238, 238, 238, 0.2)' : 'rgba(52, 52, 52, 0.2)'};
  &:before {
    visibility: hidden;
    position: absolute;
    width: 40px;
    height: 40px;
    content: '';
    display: block;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMi4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIyIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMzQ0IDI0MGgtNTZMMjg3LjEgMTUyYzAtMTMuMjUtMTAuNzUtMjQtMjQtMjRoLTE2QzIzNC43IDEyOCAyMjMuMSAxMzguOCAyMjMuMSAxNTJMMjI0IDI0MGgtNTZjLTkuNTMxIDAtMTguMTYgNS42NTYtMjIgMTQuMzhDMTQyLjIgMjYzLjEgMTQzLjkgMjczLjMgMTUwLjQgMjgwLjNsODguNzUgOTZDMjQzLjcgMzgxLjIgMjUwLjEgMzg0IDI1Ni44IDM4NGM3Ljc4MS0uMzEyNSAxMy4yNS0yLjg3NSAxNy43NS03Ljg0NGw4Ny4yNS05NmM2LjQwNi03LjAzMSA4LjAzMS0xNy4xOSA0LjE4OC0yNS44OFMzNTMuNSAyNDAgMzQ0IDI0MHpNMjU2IDBDMTE0LjYgMCAwIDExNC42IDAgMjU2czExNC42IDI1NiAyNTYgMjU2czI1Ni0xMTQuNiAyNTYtMjU2UzM5Ny40IDAgMjU2IDB6TTI1NiA0NjRjLTExNC43IDAtMjA4LTkzLjMxLTIwOC0yMDhTMTQxLjMgNDggMjU2IDQ4czIwOCA5My4zMSAyMDggMjA4UzM3MC43IDQ2NCAyNTYgNDY0eiIvPjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-size: 2rem;
    background-position: center;
    background-color: ${({ type }) =>
      type === 'reviewer'
        ? 'rgba(238, 238, 238, 0.2)'
        : 'rgba(52, 52, 52, 0.2)'};
    top: 0;
    left: 0;
    margin: auto;
  }
  .icon {
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: ${({ type }) =>
      type === 'reviewer'
        ? 'rgba(238, 238, 238, 0.5)'
        : 'rgba(52, 52, 52, 0.2)'};
    height: 100%;
  }
  &.idle:hover {
    &:before {
      visibility: visible;
    }
    .icon {
      opacity: 0;
    }
  }
  .remove {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  p {
    margin: 0 0.7rem !important;
    font-size: 0.8rem;
  }
`

import axios from 'axios'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import FileIcon from '../../components/svgs/files'
import CircularProgress from '../../components/ui/CircularProgress'
import PlayIcon from '../../components/svgs/play'
import RetryIcon from '../../components/svgs/retry'
import {
  removeChatAttachment,
  uploadChatAttachment,
} from '../../helpers/resumeReview'

const AttachementUpload = ({
  file,
  onSuccess,
  handeRemoveFile,
  onDone,
  index,
}: {
  file: File
  index: number
  onSuccess: (_file: Record<string, any>, index: number) => void
  onDone: () => void
  handeRemoveFile: (index: number, isUploaded: boolean) => void
}) => {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(false)

  const cancelToken = useRef<any>()

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source()
  }, [])

  useEffect(() => {
    uploadChatAttachment(
      file,
      cancelToken,
      setProgress,
      onDone,
      setDone,
      onSuccess,
      setError,
      index
    )
    return
  }, [])

  return (
    <Fragment>
      {error && <Alert>Failed to upload!</Alert>}
      <StyledFile>
        <span className="icon">
          {error ? (
            <a
              onClick={() =>
                uploadChatAttachment(
                  file,
                  cancelToken,
                  setProgress,
                  onDone,
                  setDone,
                  onSuccess,
                  setError,
                  index
                )
              }
            >
              <RetryIcon size="1.2rem" />
            </a>
          ) : progress !== 100 ? (
            <CircularProgress progress={progress} />
          ) : !done ? (
            <CircularProgress progress={30} spinnerMode={true} />
          ) : file.type &&
            ['video', 'audio'].indexOf(file.type.split('/')[0]) !== -1 ? (
            <PlayIcon size="1.2rem" />
          ) : (
            <FileIcon size="1.2rem" />
          )}
        </span>
        <p className="truncate">{file.name}</p>
        <span
          className="remove"
          onClick={() =>
            removeChatAttachment(
              index,
              done,
              error,
              cancelToken,
              handeRemoveFile
            )
          }
        >
          <CrossIcon size="0.8rem" />
        </span>
      </StyledFile>
    </Fragment>
  )
}

export default AttachementUpload

const Alert = styled.p`
  margin: 0 0.5rem;
  font-size: 0.7rem;
  color: red;
  line-height: 1;
`
const StyledFile = styled.div`
  width: 300px;
  height: 40px;
  display: grid;
  grid-template-columns: 40px auto 30px;
  border: 1px solid rgba(52, 52, 52, 0.2);
  border-radius: 6px;
  margin: 0.5rem;
  overflow: hidden;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: rgba(52, 52, 52, 0.2);
    height: 100%;
  }
  .remove {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  a {
    height: fit-content;
    line-height: 1;
  }
  p {
    margin: 0 0.7rem;
    font-size: 0.8rem;
  }
`

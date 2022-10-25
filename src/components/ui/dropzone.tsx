import React, { Fragment, useCallback } from 'react'
import Resizer from 'react-image-file-resizer'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { Button } from '../../styled/button'
import CrossIcon from '../svgs/cross'
import { useNotify } from '../../contexts/notify'

interface IProps {
  setImage: (val: any) => void
  setShow: (val: boolean) => void
}

const resizeFile = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1600,
      1200,
      'JPEG',
      80,
      0,
      (uri) => {
        resolve(uri)
      },
      'file',
      250,
      250
    )
  })

const Dropzone: React.FC<IProps> = ({ setImage, setShow }) => {
  const { setNotify } = useNotify()

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      await Promise.all(
        acceptedFiles.map((image: any) => {
          return resizeFile(image)
        })
      ).then((uploadBranchImages) => {
        if (uploadBranchImages.length > 0) {
          setImage(uploadBranchImages[0])
        }
        return
      })
    } catch (err) {
      console.log(err)
    }
  }, [])
  const onDropRejected = useCallback(async (rejectedFiles) => {
    try {
      console.log(rejectedFiles)
      if (!rejectedFiles || rejectedFiles.length === 0) return
      rejectedFiles.forEach((item: Record<string, any>) =>
        setNotify({
          type: 'warning',
          message: item.file.name,
          heading: item.errors[0].message,
        })
      )
    } catch (err) {
      console.log(err)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
    maxFiles: 1,
    onDrop,
    onDropRejected,
  })

  return (
    <Fragment>
      <Wrapper>
        <CloseBtn onClick={() => setShow(false)}>
          <CrossIcon size="1.2rem" />
        </CloseBtn>
        <DropWrapper {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Fragment>
              <p className="mb-2">
                Drag &apos;n&apos; drop here, or click to select image
              </p>
              <Button type="button" btnType="primary" size="lg">
                Choose Image
              </Button>
            </Fragment>
          )}
        </DropWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default Dropzone

const Wrapper = styled.div`
  max-height: 400px;
  max-width: 850px;
  height: 100%;
  width: 100%;
  padding: 5rem 4rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const DropWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0;
  align-items: center;
  justify-content: center;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23ACACACFF' stroke-width='2' stroke-dasharray='5%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  opacity: 0.8;
  transition: opacity 200ms;
  cursor: pointer;
  p {
    font-size: 1.25rem;
  }
  &:hover {
    opacity: 1;
  }
`
const CloseBtn = styled.span`
  display: inline-flex;
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 1rem;
  z-index: 1;
  cursor: pointer;

  &:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

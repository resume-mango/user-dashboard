import React, { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import Input from '../../../components/form/Input'
import DustBinIcon from '../../../components/svgs/dustbin'
import PenIcon from '../../../components/svgs/pen'
import PersonIcon from '../../../components/svgs/person'
import ImageUploader from '../../../components/ui/imageUploader'
import { useNotify } from '../../../contexts/notify'
import { useResume } from '../../../contexts/resume'
import {
  appendBlobToFromData,
  deleteResumeAvatar,
} from '../../../helpers/resume'
import { Button } from '../../../styled/button'
import { Spinner } from '../../../styled/loader'
import { IImgTransformStyle } from '../../../typings/imageUpload'

const Step1 = () => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data } = useResume()
  const [titleVal, setTitleVal] = useState('')
  const { setNotify } = useNotify()
  const { setValue } = useFormContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 30) {
      setTitleVal(e.target.value.substring(0, 30))
    } else {
      setTitleVal(e.target.value)
    }
  }

  useEffect(() => {
    setTitleVal(data.title)
  }, [data.title])

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue('title', titleVal, { shouldDirty: true })
    }, 300)
    return () => clearTimeout(timer)
  }, [titleVal])

  const canvasElement = async (
    orignalImage: File | string,
    processedCanvas: HTMLCanvasElement,
    style: IImgTransformStyle
  ) => {
    return appendBlobToFromData(
      orignalImage,
      processedCanvas,
      style,
      data,
      loading,
      setLoading,
      setValue,
      setNotify
    )
  }
  return (
    <Fragment>
      <TitleWrapper>
        <input
          name="title"
          placeholder="Untitled"
          value={titleVal}
          onChange={(e) => handleChange(e)}
          spellCheck={false}
          autoComplete="off"
        />
        <p id="mask">{titleVal}</p>
      </TitleWrapper>
      <h3>Primary Details</h3>
      <Grid className="mb-3">
        <div>
          <p>
            Let us know who you are, how employers can get in touch with you,
            and what your profession is.
          </p>
        </div>
        <FlexWrapper>
          <ImgWrapper onClick={() => setShow(true)}>
            {loading ? (
              <Spinner type="primary" size="1.2rem" />
            ) : data.avatar.processed ? (
              <img src={data.avatar.processed} data-test-id="avatar" />
            ) : (
              <PersonIcon size="2rem" />
            )}
          </ImgWrapper>
          {data.avatar.processed ? (
            <ToggleButtonsWrapper>
              <span onClick={() => setShow(true)} data-test-id="avatar-edit">
                <PenIcon size="1.1rem" />
              </span>
              <span
                onClick={() =>
                  deleteResumeAvatar(
                    data,
                    loading,
                    setLoading,
                    setValue,
                    setNotify
                  )
                }
                data-test-id="avatar-delete"
              >
                <DustBinIcon size="1rem" />
              </span>
            </ToggleButtonsWrapper>
          ) : (
            <Button
              btnType="ghost"
              type="button"
              disabled={loading}
              size="sm"
              onClick={() => setShow(true)}
              color="rgba(240, 132, 56, 1)"
            >
              Upload Image
            </Button>
          )}

          <ImageUploader
            show={show}
            setShow={setShow}
            canvasElement={canvasElement}
            img={data.avatar.orignal || null}
            style={data.avatar.style}
          />
        </FlexWrapper>
        <div>
          <Input name="first_name" label="First Name" />
        </div>
        <div>
          <Input name="last_name" label="Last Name" />
        </div>
        <div>
          <Input name="email_address" label="Email address" />
        </div>
        <div>
          <Input name="phone_number" label="Phone number" />
        </div>
        <div>
          <Input name="designation" label="Designation" />
        </div>
        <div>
          <Input name="address" label="Address" />
        </div>
      </Grid>
    </Fragment>
  )
}

export default Step1

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
`
const ImgWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  background-color: rgba(244, 245, 247, 1);
  border-radius: 4px;
  overflow: hidden;
  margin-right: 1rem;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  ${Button} {
    width: fit-content;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`
const ToggleButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  span {
    background-color: #eee;
    height: 30px;
    width: 30px;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.shades.primary[4]};
      color: ${({ theme }) => theme.colors.primary};

      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`
const TitleWrapper = styled.div`
  overflow: hidden;
  max-width: 100%;
  position: relative;
  top: -20px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    background-color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    padding: 0px;
    margin: 0px;
    border: none;
    font-size: 2rem;
    text-align: center;
    z-index: 1;
    color: #555;
  }
  input:focus {
    color: #343434;
  }
  input:hover ~ p:after,
  input:focus ~ p:after {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  p {
    height: 100%;
    position: relative;
    width: fit-content;
    font-size: 2rem;
    text-align: center;
    margin: 0;
    color: transparent;
    &:after {
      content: '';
      display: flex;
      height: 2px;
      z-index: 100;
      bottom: -10px;
      width: 100%;
      background-color: transparent;
    }
  }
`

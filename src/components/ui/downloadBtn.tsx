import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import { useViewport } from '../../contexts/viewPort'
import detectOutsideClick from '../../hooks/detectOutsideClick'
import DocxIcon from '../svgs/docx'
import DownloadIcon from '../svgs/download'
import PdfIcon from '../svgs/pdf'
import TxtIcon from '../svgs/txt'
interface IProps {
  id: number
  show: boolean
  setShow: (id: number | null) => void
  handlePdf: () => void
  handleTxt: () => void
  handleDocx: () => void
}
const DownloadBtn: React.FC<IProps> = ({
  id,
  show,
  setShow,
  handlePdf,
  handleTxt,
  handleDocx,
}) => {
  const { isOutside, ref } = detectOutsideClick()
  const { width } = useViewport()
  useEffect(() => {
    if (!show || !isOutside || !ref || !ref.current) return
    setShow(null)
  }, [isOutside, ref])

  const handleClick = (itemId: number) => {
    show ? setShow(null) : setShow(itemId)
  }
  return (
    <Fragment>
      <Wrapper ref={ref} data-test-id="download">
        <ToggleBtn onClick={() => handleClick(id)}>
          <DownloadIcon className="stroke" />
          <p style={{ fontSize: '.8rem' }}>Download</p>
        </ToggleBtn>
        <PopperWrapper open={show}>
          <Fragment>
            {width > 480 && <b>Download</b>}
            <FlexWrapper>
              <ToggleBtn onClick={handlePdf} data-test-id="pdf">
                <PdfIcon size="1.6rem" className="fill" />
                <p>PDF</p>
              </ToggleBtn>
              <ToggleBtn onClick={handleDocx} data-test-id="docx">
                <DocxIcon size="1.6rem" className="fill" />
                <p>Docx</p>
              </ToggleBtn>
              <ToggleBtn onClick={handleTxt} data-test-id="txt">
                <TxtIcon size="1.6rem" className="fill" />
                <p>Txt</p>
              </ToggleBtn>
            </FlexWrapper>
          </Fragment>
        </PopperWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default DownloadBtn

const Wrapper = styled.div`
  display: block;
  position: relative;
`

const ToggleBtn = styled.div`
  margin-top: 1rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  &:hover {
    .stroke {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
    .fill {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  p {
    color: #898989;
    margin: 0;
    font-size: 0.7rem;
    text-align: center;
  }
`
const PopperWrapper = styled.div<{ open: boolean }>`
  display: inline-flex;
  flex-direction: column;
  width: 230px;
  text-align: center;
  border: 1px solid #e2e9f3;
  box-shadow: 7px 5px 31px rgba(0, 31, 78, 0.15);
  background-color: #fff;
  border-radius: 4px;
  padding: 0.5rem;
  position: absolute;
  left: -10px;
  margin-top: 1rem;
  transition: transform ease-in-out 200ms, opacity 300ms, visibility 300ms;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? 'scale3d(1, 1 ,1)' : 'scale3d(0, 0 ,0)')};
  transform-origin: 10% top;
  z-index: 10;
  b {
    font-size: 0.8rem;
  }
  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-top: 1px solid #e2e9f3;
    border-left: 1px solid #e2e9f3;
    position: absolute;
    top: -6px;
    left: 10%;
    transform: rotate(45deg);
  }
  @media (max-width: 550px) {
    width: 160px;
  }
  @media (max-width: 400px) {
    width: 175px;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

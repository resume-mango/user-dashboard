import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../styled/button'
import BlocksIcon from '../../components/svgs/blocks'
import DownArrowIcon from '../../components/svgs/downArrow'
import { useFormContext } from 'react-hook-form'
import DropButton from '../../components/ui/DropButton'
import VerticalLineIcon from '../../components/svgs/verticalLine'
import { useResume } from '../../contexts/resume'
import { useHistory } from 'react-router-dom'
import templateMapper from '../../helpers/templateMapper'
import { useViewport } from '../../contexts/viewPort'
import PreviewSkeleton from '../../components/ui/previewSkeleton'
import { Spinner } from '../../styled/loader'

const Previewer = ({ isDataLoading }: { isDataLoading: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState(1)
  const [curr, setCurr] = useState(1)
  const [buffer, setBuffer] = useState(0)
  const [showDownload, setShowDownload] = useState(false)
  const [firstLoad, setFirstLoad] = useState(false)

  const { width, height } = useViewport()
  const histroy = useHistory()

  const { data, templateData, isTemplateReady, submitResume, isSaving } =
    useResume()

  const {
    formState: { isSubmitting, isValid },
  } = useFormContext()

  useEffect(() => {
    if (isSaving) setShowDownload(false)
    return
  }, [isSaving])

  const scale = width >= 1920 ? 0.6 : width / 1920

  const top = Math.floor(scale >= 0.7 ? scale * 40 : scale * -60)

  useEffect(() => {
    if (!ref || !ref.current) return
    const element = ref.current.querySelector('.page') as HTMLElement
    if (!element) return
    element.style.transform = `scale(${scale})`
    ref.current.style.width = element.getBoundingClientRect().width + 'px'
    ref.current.style.height = element.getBoundingClientRect().height + 'px'
    const calcX = (element.clientWidth * (scale - 1)) / 2
    const calcY = (element.clientHeight * (scale - 1)) / 2
    element.style.transform = `translate3d(${calcX}px, ${calcY}px, 0px) scale(${scale})`
    const dummyBufferEl = document.createElement('div')
    dummyBufferEl.style.height = '50px'
    dummyBufferEl.style.transform = `scale(${scale})`
    dummyBufferEl.style.visibility = 'hidden'
    dummyBufferEl.style.position = 'absolute'
    dummyBufferEl.style.opacity = '0'
    document.body.appendChild(dummyBufferEl)
    const bufferHeight = dummyBufferEl.getBoundingClientRect().height
    setBuffer(bufferHeight)
    document.body.removeChild(dummyBufferEl)
  }, [ref.current, width, height])

  useEffect(() => {
    if (!data || !templateData || buffer === 0) return
    const timer = setTimeout(() => {
      if (!ref || !ref.current) return
      const page = ref.current.querySelector('.page')
      if (!page) return
      const wrapper = page.children[0] as HTMLElement

      if (!wrapper) return
      const template = JSON.parse(JSON.stringify(templateData))
      wrapper.innerHTML = ''
      const pages = templateMapper(template, data, wrapper, buffer)
      if (!pages) return
      updatePages(Object.keys(pages).length)

      if (!firstLoad) setFirstLoad(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [data, ref, templateData, buffer])

  useEffect(() => {
    if (!ref || !ref.current) return
    const page = ref.current.querySelector('.page') as HTMLElement
    if (!page) return
    const wrapper = page.children[0] as HTMLElement
    if (!wrapper) return
    wrapper.style.transform = `translateY(-${page.clientHeight * (curr - 1)}px)`
    wrapper.style.height = page.clientHeight * curr + 'px'
  }, [curr, ref.current])

  const updatePages = (total: number) => {
    curr > total && setCurr(total)
    setPages(total)
  }

  const handleClick = (type: 'prev' | 'next') => {
    if (type === 'prev') curr > 1 && curr <= pages && setCurr(curr - 1)
    if (type === 'next') curr >= 1 && curr < pages && setCurr(curr + 1)
    return
  }

  return (
    <Fragment>
      <SkeletonWrapper
        data-test-id="preview-skeleton"
        style={
          isDataLoading || !data || !isTemplateReady || !firstLoad
            ? { visibility: 'visible' }
            : { visibility: 'hidden' }
        }
      >
        {width ? (
          <PreviewSkeleton
            style={{ position: 'absolute', marginTop: 0, top: `${top}px` }}
            scale={scale}
          />
        ) : null}
      </SkeletonWrapper>
      <PreviewWrapper>
        <TemplateWrapper ref={ref}>
          <div className="page">
            <div style={{ width: '100%' }} />
          </div>
        </TemplateWrapper>
        <PreviewFooter
          className={`template_footer ${
            isDataLoading || !data || !isTemplateReady || !firstLoad
              ? 'invisible'
              : ''
          }`}
        >
          <div>
            <TemplateBtn
              type="button"
              btnType="ghost"
              color="#F08438"
              size="lg"
              style={{ justifyContent: 'space-around' }}
              onClick={() => histroy.push(`/resumes/preview/${data.id}`)}
              disabled={isSubmitting}
            >
              <BlocksIcon size={width < 1300 ? '0.8rem' : '1rem'} />
              Change template
            </TemplateBtn>
          </div>

          <PageToggler>
            <button
              data-test-id="resume_pages_prev"
              type="button"
              style={{ transform: 'rotateZ(90deg)' }}
              onClick={() => handleClick('prev')}
            >
              <DownArrowIcon size="0.75rem" />
            </button>

            <p data-test-id="resume_pages">
              {curr}&nbsp;/&nbsp;{pages}
            </p>
            <button
              data-test-id="resume_pages_next"
              type="button"
              style={{ transform: 'rotateZ(270deg)' }}
              onClick={() => handleClick('next')}
            >
              <DownArrowIcon size="0.75rem" />
            </button>
          </PageToggler>

          <div>
            <DownloadBtn
              vertical="top"
              horizontal="left"
              show={showDownload}
              setShow={setShowDownload}
              disabled={isSaving || !isValid || isSubmitting}
            >
              <DropButton.Button>
                <Fragment>
                  {!isSaving ? (
                    <Fragment>
                      Download <VerticalLineIcon /> <DownArrowIcon />
                    </Fragment>
                  ) : (
                    <Fragment>
                      Downloading <Spinner size="1rem" />
                    </Fragment>
                  )}{' '}
                </Fragment>
              </DropButton.Button>
              <DropButton.Item>
                <a onClick={() => submitResume('pdf')}>Download PDF</a>
              </DropButton.Item>

              <DropButton.Item>
                <a onClick={() => submitResume('docx')}>Export to DOCX</a>
              </DropButton.Item>

              <DropButton.Item>
                <a onClick={() => submitResume('txt')}>Export to TXT</a>
              </DropButton.Item>
            </DownloadBtn>
          </div>
        </PreviewFooter>
      </PreviewWrapper>
    </Fragment>
  )
}

export default Previewer

const PreviewWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
`
const PreviewFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
`
const PageToggler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-weight: 600;
  }
  button {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    svg {
      path {
        stroke-width: 1.5;
      }
    }
  }
`
const TemplateWrapper = styled.div`
  display: block;
  position: relative;
`
const DownloadBtn = styled(DropButton)`
  button {
    background: rgba(240, 132, 56, 1);
    color: #fff;
    height: 40px;
    width: 150px;
    display: flex;
    justify-content: space-around;
    padding: 0 1rem;
    border-radius: 6px;
    @media (max-width: 1300px) {
      height: 32px;
      font-size: 0.75rem;
      width: 120px;
    }
    svg {
      path {
        stroke: #fff;
      }
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.grey};
    }
  }
`

const TemplateBtn = styled(Button)`
  @media (max-width: 1300px) {
    height: 32px;
    font-size: 0.75rem;
    width: 120px;
  }
`
const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background: #f7f9fc;
`

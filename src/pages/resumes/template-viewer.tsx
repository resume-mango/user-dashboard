import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import DownArrowIcon from '../../components/svgs/downArrow'
import DownloadIcon from '../../components/svgs/download'
import DropButton from '../../components/ui/DropButton'
import { useResume } from '../../contexts/resume'
import { Button } from '../../styled/button'
import templateMapper from '../../helpers/templateMapper'
import PreviewSkeleton from '../../components/ui/previewSkeleton'
import { getAllResumeTemplates } from '../../queries/resumeQueries'
import { useViewport } from '../../contexts/viewPort'
import { Spinner } from '../../styled/loader'

const TemplateViewer = ({ isLoading }: { isLoading: boolean }) => {
  const [showDownload, setShowDownload] = useState(false)
  const [isTemplateMapping, setIsTemplateMapping] = useState(false)
  const [pages, setPages] = useState(1)
  const [buffer, setBuffer] = useState(0)
  const [curr, setCurr] = useState(1)

  const {
    data,
    isTemplateReady,
    template,
    templateData,
    setTemplate,
    submitResume,
    isSaving,
  } = useResume()

  const { width, height } = useViewport()

  const histroy = useHistory()
  const {
    data: templates,
    isLoading: isTemplateLoading,
    isError,
  } = getAllResumeTemplates()

  const ref = useRef<HTMLDivElement>(null)

  const {
    formState: { isValid },
  } = useFormContext()

  const scale =
    width >= 1920
      ? 1.15
      : width <= 1080
      ? (width * 1.4) / 1920
      : (width * 1.15) / 1920

  useEffect(() => {
    if (!ref || !ref.current || !templateData) return
    const page = ref.current.children[0] as HTMLElement
    page.style.transform = `scale(${scale})`
    ref.current.style.width = page.getBoundingClientRect().width + 'px'
    ref.current.style.height = page.getBoundingClientRect().height + 'px'
    const calcX = (page.clientWidth * (scale - 1)) / 2
    const calcY = (page.clientHeight * (scale - 1)) / 2
    page.style.transform = `translate3d(${calcX}px, ${calcY}px, 0px) scale(${scale})`
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
  }, [data, ref, templateData, templates, width, height])

  useEffect(() => {
    if (
      !data ||
      !templates ||
      isSaving ||
      isTemplateLoading ||
      !isTemplateReady ||
      buffer === 0
    )
      return
    setIsTemplateMapping(true)
    const timer = setTimeout(() => {
      if (!ref || !ref.current) return
      const container = document.querySelector('.rhs_wrapper')
      container && container.scrollTo(0, 0)
      const page = ref.current.querySelector('.page')
      if (!page) return
      const wrapper = page.children[0] as HTMLElement

      if (!wrapper) return
      const template = JSON.parse(JSON.stringify(templateData))
      wrapper.innerHTML = ''
      const pages = templateMapper(template, data, wrapper, buffer)
      if (!pages) return
      updatePages(Object.keys(pages).length)
      setCurr(1)
      setIsTemplateMapping(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [
    data,
    ref.current,
    isTemplateLoading,
    templates,
    isSaving,
    isTemplateReady,
    buffer,
  ])

  useEffect(() => {
    if (!ref || !ref.current) return
    const page = ref.current.querySelector('.page') as HTMLElement
    if (!page) return
    const wrapper = page.children[0] as HTMLElement
    if (!wrapper) return
    wrapper.style.transform = `translateY(-${page.clientHeight * (curr - 1)}px)`
    wrapper.style.height = page.clientHeight * curr + 'px'
  }, [curr, ref.current])

  useEffect(() => {
    if (isSaving) setShowDownload(false)
    return
  }, [isSaving])

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
      <HeadWrapper>
        <Button
          btnType="ghost"
          size="lg"
          onClick={() => histroy.push(`/resumes/edit/${data.id}`)}
        >
          Back to Editor
        </Button>
        <div>
          {!isError && !isTemplateLoading && (
            <DownloadBtn
              vertical="bottom"
              horizontal="left"
              show={showDownload}
              setShow={setShowDownload}
              disabled={isSaving || !isValid}
            >
              <DropButton.Button>
                <Fragment>
                  {!isSaving ? (
                    <Fragment>
                      Download <DownloadIcon />
                    </Fragment>
                  ) : (
                    <Fragment>
                      Downloading <Spinner size="1rem" />
                    </Fragment>
                  )}
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
          )}
        </div>
      </HeadWrapper>
      {isError ? (
        <div className="align-center" style={{ height: '40vh' }}>
          <h3>Failed to load design!</h3>
        </div>
      ) : (
        <Wrapper>
          <LHS>
            <TemplateGrid>
              {templates &&
                (templates as any).map((item: any, i: string) => (
                  <Template
                    key={i}
                    active={template === item.name}
                    data-test-id={
                      template === item.name
                        ? 'active-template'
                        : 'inactive-template'
                    }
                  >
                    <div
                      onClick={() => !isSaving && setTemplate(item.name)}
                      data-test-id="resume-template"
                    >
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <p>{item.name}</p>
                  </Template>
                ))}
            </TemplateGrid>
          </LHS>
          <RHS>
            <RHSWrapper className="rhs_wrapper">
              <PageToggler>
                <button
                  type="button"
                  style={{ transform: 'rotateZ(90deg)' }}
                  onClick={() => handleClick('prev')}
                >
                  <DownArrowIcon size="0.75rem" color="#fff" />
                </button>
                <p>
                  {curr}&nbsp;/&nbsp;{pages}
                </p>
                <button
                  type="button"
                  style={{ transform: 'rotateZ(270deg)' }}
                  onClick={() => handleClick('next')}
                >
                  <DownArrowIcon size="0.75rem" color="#fff" />
                </button>
              </PageToggler>

              <PreviewWrapper>
                {(!isTemplateReady ||
                  isLoading ||
                  !data ||
                  isTemplateMapping ||
                  isTemplateLoading) && (
                  <SkeletonWrapper data-test-id="resume_skeleton">
                    <PreviewSkeleton scale={scale} />
                  </SkeletonWrapper>
                )}

                <TemplateWrapper
                  ref={ref}
                  style={
                    !isTemplateReady ||
                    isLoading ||
                    !data ||
                    isTemplateMapping ||
                    isTemplateLoading
                      ? { visibility: 'hidden' }
                      : { visibility: 'visible' }
                  }
                >
                  <div className="page">
                    <div style={{ width: '100%' }} />
                  </div>
                </TemplateWrapper>
              </PreviewWrapper>
            </RHSWrapper>
          </RHS>
        </Wrapper>
      )}
    </Fragment>
  )
}

export default TemplateViewer

const Wrapper = styled.div`
  background-color: #fff;
  display: grid;
  grid-template-columns: minmax(400px, 500px) auto;
  height: 100%;
  @media (max-width: 1080px) {
    grid-template-columns: 30% 70%;
  }
`

const SkeletonWrapper = styled.div`
  position: absolute;
  z-index: 1;
`

const LHS = styled.div`
  height: 100%;
  max-height: 100vh;
  padding: 7rem 2rem 3rem;
  overflow-y: auto;
  @media (max-width: 1080px) {
    padding: 7rem 0 3rem;
  }
`

const RHS = styled.div`
  background-color: #f7f9fc;
  user-select: none;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
`
const RHSWrapper = styled.div`
  display: flex;
  padding: 7rem 2rem 3rem;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  overflow-x: hidden;
`
const PageToggler = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 100px;
  bottom: 10%;
  z-index: 10;
  height: 35px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  p {
    font-weight: 600;
  }
  button {
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    svg {
      path {
        stroke-width: 1.5;
      }
    }
  }
`

const HeadWrapper = styled.div`
  display: flex;
  padding: 1rem 3rem;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 2px solid #eee;
  background-color: #fff;
  z-index: 100;
`
const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding: 0 2rem;
  max-width: 450px;
  margin: auto;
  @media (max-width: 1080px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const Template = styled.div<{ active: boolean }>`
  div {
    display: flex;
    width: 100%;
    min-height: 250px;
    background-color: #f7f7f7;
    outline-style: solid;
    outline-color: #eee;
    border-radius: 8px;
    cursor: pointer;
    transition: all ease-in-out 150ms;
    overflow: hidden;
    outline-width: ${({ active }) => (active ? '2px' : '1px')};
    outline-color: ${({ theme, active }) => active && theme.shades.primary[2]};
    img {
      width: 100%;
    }
  }
  p {
    font-size: 1rem;
    color: ${({ theme, active }) => active && theme.colors.primary};
    font-weight: 600;
    text-align: center;
    text-transform: capitalize;
    transition: all ease-in-out 150ms;
  }
  &:hover {
    div {
      outline-width: 5px;
      outline-color: ${({ theme }) => theme.shades.primary[2]};
    }
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
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
const PreviewWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
`

const TemplateWrapper = styled.div`
  display: block;
  position: relative;
  box-shadow: 0px 0px 15px 0px #0000000f;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
`

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import BlocksIcon from '../../components/svgs/blocks'
import DownArrowIcon from '../../components/svgs/downArrow'
import PreviewSkeleton from '../../components/ui/previewSkeleton'
import { useViewport } from '../../contexts/viewPort'
import { loadFonts } from '../../helpers/loadFonts'
import templateMapper from '../../helpers/templateMapper'
import { getResumeTemplate } from '../../queries/resumeQueries'
import { Button } from '../../styled/button'
import '../../styled/template_global.css'

const ViewResume = ({
  resumeData,
  handleShow,
}: {
  resumeData: Record<string, any>
  handleShow: (_show: boolean) => void
}) => {
  const data = resumeData.fields || null
  const [cssReady, setCssReady] = useState(false)
  const [fontsReady, setFontsReady] = useState(false)
  const [isTemplateMapping, setIsTemplateMapping] = useState(false)
  const [pages, setPages] = useState(1)
  const [buffer, setBuffer] = useState(0)
  const [curr, setCurr] = useState(1)
  const { width, height } = useViewport()
  const queryEnabled = !!resumeData.template || false
  const {
    data: templateData,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
  } = getResumeTemplate(resumeData.template, queryEnabled)

  const isTemplateReady =
    cssReady && !isTemplateLoading && templateData && fontsReady && queryEnabled

  const ref = useRef<HTMLDivElement>(null)
  const loadTemplateFonts = async () => {
    await loadFonts(templateData.fonts)
    return setFontsReady(true)
  }
  useEffect(() => {
    if (
      !queryEnabled ||
      !templateData ||
      !templateData.fonts ||
      templateData.fonts === 0
    )
      return
    setFontsReady(false)
    loadTemplateFonts()

    return () => setFontsReady(true)
  }, [templateData, queryEnabled])

  useEffect(() => {
    if (!document || !queryEnabled || cssReady) return
    const old = document.getElementById('css_style')
    if (old) {
      old.remove()
    }
    const link = document.createElement('link')
    link.id = 'css_style'
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute(
      'href',
      `${process.env.API_HOST}/css/resumes/${resumeData.template}.css`
    )
    document.head.appendChild(link)

    /* istanbul ignore next */
    link.onload = () => {
      setCssReady(true)
    }
    /* istanbul ignore next */
    link.onerror = () => {
      return console.log('stylesheet could not be loaded')
    }
  }, [cssReady, queryEnabled])

  const scale = 1
  useEffect(() => {
    if (!ref || !ref.current || !templateData) return
    const page = ref.current.children[0] as HTMLElement
    page.style.transform = `scale(${scale})`
  }, [data, ref, templateData, width, height])

  useEffect(() => {
    if (!data || !isTemplateReady) return
    setIsTemplateMapping(true)
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
      setCurr(1)
      setIsTemplateMapping(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [data, ref.current, isTemplateReady])

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
    <MainWrapper>
      <HeadWrapper>
        <Button btnType="ghost" size="lg" onClick={() => handleShow(false)}>
          Back to Chats
        </Button>
      </HeadWrapper>
      {isTemplateError ? (
        <div className="align-center" style={{ height: '90%', flex: 1 }}>
          <h3>Failed to load resume!</h3>
        </div>
      ) : (
        <Fragment>
          <Wrapper>
            {(!isTemplateReady ||
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
          </Wrapper>
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
        </Fragment>
      )}
    </MainWrapper>
  )
}

export default ViewResume

const SkeletonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 3rem 0 10rem;
`
const HeadWrapper = styled.div`
  display: flex;
  padding: 1rem 3rem;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 2px solid #eee;
  background-color: #fff;
  z-index: 100;
`
const MainWrapper = styled.div`
  display: block;
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`
const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin: auto;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  padding: 3rem 0 10rem;
  background-color: #f7f9fc;
`
const TemplateWrapper = styled.div`
  min-height: 297mm;
  width: 100%;
  display: flex;
  justify-content: center;

  .page {
    position: relative;
    box-shadow: 0px 0px 15px 0px #0000000f;
    border: 1px solid #eee;
  }
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

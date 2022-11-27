import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react'
import AvatarEditor from 'react-avatar-editor'
import styled from 'styled-components'
import Modal from './modal'
import CrossIcon from '../svgs/cross'
import Dropzone from './dropzone'
import JustCheckIcon from '../svgs/justCheckIcon'
import UploadIcon from '../svgs/upload'
import { IImgTransformStyle } from '../../typings/imageUpload'
import { Spinner } from '../../styled/loader'

interface IProps {
  show: boolean
  img: File | string | null
  style: IImgTransformStyle
  setShow: (val: boolean) => void
  canvasElement: (
    orignalImage: File | string,
    processedCanvas: HTMLCanvasElement,
    style: IImgTransformStyle
  ) => void
}

const ImageUploader: React.FC<IProps> = ({
  show,
  setShow,
  canvasElement,
  img,
  style,
}) => {
  const [scale, setScale] = useState(style.scale ? style.scale : 1)
  const [rotate, setRotate] = useState(style.rotate ? style.rotate : 0)
  const [toggle, setToggle] = useState(0)
  const [pos, setPos] = useState({
    x: style.pos.x || 0.5,
    y: style.pos.y || 0.5,
  })
  const [loading, setLoading] = useState(true)
  const [dropped, setDropped] = useState<File | string | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<AvatarEditor>(null)

  const options = {
    cols: 3,
    rows: 3,
    width: 250,
    height: 250,
    color: '#fff',
  }

  useEffect(() => {
    style.scale ? setScale(style.scale) : 1
    style.rotate ? setRotate(style.rotate) : 0
    return
  }, [style.scale, style.rotate])

  useEffect(() => {
    setLoading(true)
    if (img) {
      setDropped(img)
    } else {
      setDropped(null)
    }
  }, [img, show])

  useEffect(() => {
    if (!wrapperRef || !wrapperRef.current) return
    const canvas = wrapperRef.current.querySelector(
      '#cropper'
    ) as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    if (ctx) {
      canvas.width = options.width
      canvas.height = options.height
      ctx.translate(0.5, 0.5)
      ctx.beginPath()
      ctx.lineWidth = 0.7
      ctx.strokeStyle = options.color
      const offsetX = Math.floor(options.width / options.cols)
      const offsetY = Math.floor(options.height / options.rows)
      for (let x = offsetX; x < options.width - offsetX; x += offsetX) {
        ctx.setLineDash([10, 7])
        ctx.moveTo(x, 0)
        ctx.lineTo(x, options.height)
      }

      for (let y = offsetY; y < options.height - offsetY; y += offsetY) {
        ctx.setLineDash([10, 7])
        ctx.moveTo(0, y)
        ctx.lineTo(options.width, y)
      }

      ctx.stroke()
    }
  }, [wrapperRef.current, dropped, show])

  useEffect(() => {
    setScale(style.scale || 1)
    setRotate(style.rotate || 0)
    setToggle(0)
    setLoading(true)
  }, [dropped])

  useEffect(() => {
    if (!wrapperRef || !wrapperRef.current) return
    let value: {
      selector: string | undefined
      targetValue: number | undefined
      max: number | undefined
    } = {
      selector: undefined,
      targetValue: undefined,
      max: undefined,
    }
    switch (toggle) {
      case 0:
        value = {
          selector: '#scaleRange',
          targetValue: scale,
          max: 3,
        }
        break
      case 1:
        value = {
          selector: '#rotateRange',
          targetValue: rotate,
          max: 360,
        }
        break
      default:
        null
        break
    }
    if (!value.selector || !value.targetValue || !value.max) return

    const element = wrapperRef.current.querySelector(
      value.selector
    ) as HTMLCanvasElement

    if (!element) return

    rangeTrack(element, value.targetValue, value.max)
  }, [wrapperRef.current, dropped, toggle, show])

  const rangeTrack = (
    element: HTMLElement,
    targetValue: number,
    max: number
  ) => {
    const parent = element
    const value = ((targetValue - 1) / (max - 1)) * 100
    parent.style.background = `linear-gradient(to right, rgba(240,132,56,1) 0%, rgba(240,132,56,1) ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  }

  const handleChange = (e: any, max: number, type: 'scale' | 'rotate') => {
    if (type === 'scale') {
      setScale(parseFloat(e.target.value))
    } else if (type === 'rotate') {
      setRotate(parseFloat(e.target.value))
    } else return false
    rangeTrack(e.target.parentElement, e.target.value, max)
  }

  const handleSave = () => {
    if (editorRef.current && dropped && !loading) {
      const processedCanvas = editorRef.current.getImageScaledToCanvas()
      const {
        state: { image },
      } = editorRef.current
      const style = {
        height: image.height,
        width: image.width,
        scale,
        rotate,
        pos: {
          x: image.x,
          y: image.y,
        },
      }
      canvasElement(dropped, processedCanvas, style)
      setShow(false)
    }
  }

  const handleNew = () => {
    setDropped(null)
  }

  return (
    <Fragment>
      <Modal show={show}>
        {dropped ? (
          <Wrapper ref={wrapperRef} data-test-id="image-edit">
            <Fragment>
              <ActionWrapper>
                <span
                  onClick={() => setShow(false)}
                  data-test-id="upload-close"
                >
                  <CrossIcon className="svg-strokes" size="1.05rem" />
                </span>
                <span onClick={handleNew} data-test-id="upload-new">
                  <UploadIcon className="svg-fills" size="1.2rem" />
                  &nbsp;Upload New
                </span>
                <span onClick={handleSave} data-test-id="upload-save">
                  <JustCheckIcon className="svg-strokes" size="1.2rem" />
                </span>
              </ActionWrapper>
              <Fragment>
                <CanvasWrapper>
                  <CanvasCorner data-test-id="image-crop">
                    <Corner top="0" left="0" />
                    <Corner top="0" right="0" />
                    <Corner bottom="0" left="0" />
                    <Corner bottom="0" right="0" />
                  </CanvasCorner>
                  {loading && (
                    <Loader>
                      <Spinner type="primary" size="2rem" />
                    </Loader>
                  )}
                  <CanvasGrid id="cropper" />
                  <AvatarEditor
                    data-test-id="image-drag"
                    ref={editorRef}
                    image={dropped}
                    width={250}
                    height={250}
                    border={[175, 70]}
                    borderRadius={0}
                    color={[255, 255, 255, 0.9]} // RGBA
                    scale={scale}
                    rotate={rotate}
                    crossOrigin="anonymous"
                    position={pos}
                    onImageReady={() => setLoading(false)}
                    onPositionChange={({ x, y }) => setPos({ x, y })}
                  />
                </CanvasWrapper>

                <ToggleWrapper>
                  <Toggle onClick={() => setToggle(0)} active={toggle === 0}>
                    <span>Zoom</span>
                  </Toggle>
                  <Toggle onClick={() => setToggle(1)} active={toggle === 1}>
                    <span>Rotate</span>
                  </Toggle>
                </ToggleWrapper>
                <Controls id="range">
                  <Range show={toggle === 0}>
                    <RangeTrack id="scaleRange">
                      <input
                        data-test-id="image-scale"
                        type="range"
                        step={0.05}
                        min={1}
                        value={scale}
                        max={3}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, 3, 'scale')
                        }
                      />
                    </RangeTrack>
                    <RangeLabels steps={5}>
                      <li className="active selected">1.0 x</li>
                      <li>1.5 x</li>
                      <li>2.0 x</li>
                      <li>2.5 x</li>
                      <li>3.0 x</li>
                    </RangeLabels>
                  </Range>
                  <Range show={toggle === 1}>
                    <RangeTrack id="rotateRange">
                      <input
                        data-test-id="image-rotate"
                        type="range"
                        step={1}
                        min={0}
                        value={rotate}
                        max={360}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e, 360, 'rotate')
                        }
                      />
                    </RangeTrack>
                    <RangeLabels steps={5}>
                      <li className="active selected">0&deg;</li>
                      <li>90&deg;</li>
                      <li>180&deg;</li>
                      <li>270&deg;</li>
                      <li>360&deg;</li>
                    </RangeLabels>
                  </Range>
                </Controls>
              </Fragment>
            </Fragment>
          </Wrapper>
        ) : (
          <Dropzone setImage={setDropped} setShow={setShow} />
        )}
      </Modal>
    </Fragment>
  )
}

export default ImageUploader

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-height: 600px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`

const ActionWrapper = styled.div`
  display: inline-flex;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    color: #898989;
    cursor: pointer;
    .svg-fills {
      margin-bottom: 0.15rem;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      .svg-strokes {
        path {
          stroke: ${({ theme }) => theme.colors.primary};
        }
      }
      .svg-fills {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`

const CanvasGrid = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  pointer-events: none;
  z-index: 1;
`
const Loader = styled.div`
  position: absolute;
  display: inline-flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  pointer-events: none;
  z-index: 1;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
`

const CanvasCorner = styled.div`
  width: 260px;
  height: 260px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  pointer-events: none;
  position: absolute;
  z-index: 0;
`
const Corner = styled.div<{
  top?: string
  left?: string
  right?: string
  bottom?: string
}>`
  height: 40px;
  width: 40px;
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  border-top: ${({ top }) => (top ? '3px' : 0)};
  border-bottom: ${({ bottom }) => (bottom ? '3px' : 0)};
  border-left: ${({ left }) => (left ? '3px' : 0)};
  border-right: ${({ right }) => (right ? '3px' : 0)};
  border-color: ${({ theme }) => theme.colors.primary};
  border-style: solid;
`
const CanvasWrapper = styled.div`
  display: inline-flex;
  position: relative;
  width: 100%;
`
const Controls = styled.div`
  width: 100%;
  padding: 0 3rem;
`
const rangeThumb = `
  width: 18px;
  height: 18px;
  margin: -8px -2px  0;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  border: 2px solid rgba(240,132,56,1);

`
const RangeTrack = styled.div`
  width: 100%;
  margin: auto;
  height: 2px;
  cursor: pointer;
  background: #c4c4c4;
`

const Range = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: relative;
  input {
    width: 100%;
    position: absolute;
    top: 2px;
    left: 0;
    height: 0;
    -webkit-appearance: none;
    padding: 0;
    border: 0;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      ${rangeThumb}
    }

    &::-moz-range-thumb {
      ${rangeThumb}
    }

    &::-ms-thumb {
      ${rangeThumb}
    }

    &:focus {
      background: none;
      outline: none;
    }

    &::-ms-track {
      width: 100%;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
  }
`

const RangeLabels = styled.ul<{ steps: number }>`
  padding: 0;
  list-style: none;
  pointer-events: none;
  width: ${({ steps }) => `calc(${(100 * steps) / (steps - 1) + '%'} - 25px)`};

  top: 20px;
  position: relative;
  li {
    float: left;
    width: ${({ steps }) => 100 / steps + '%'};
    color: #b2b2b2;
    font-size: 14px;
    align-items: center;
  }
`
const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
const Toggle = styled.div<{ active: boolean }>`
  width: 75px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border-bottom: ${({ active, theme }) =>
    active && '2px solid \u0020' + theme.colors.primary};
  span {
    transition: color 0.5s;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
    color: ${({ active, theme }) => active && theme.colors.primary};
  }
`

export const getPreviewTemplateBufferHeight = (
  ref: React.RefObject<HTMLDivElement>,
  scale: number
) => {
  if (!ref || !ref.current) return
  const page = ref.current.children[0] as HTMLElement
  page.style.transform = `scale(${scale})`
  ref.current.style.width = page.getBoundingClientRect().width + 'px'
  ref.current.style.height = page.getBoundingClientRect().height + 'px'
  const calcX = (page.clientWidth * (scale - 1)) / 2
  const calcY = (page.clientHeight * (scale - 1)) / 2
  page.style.transform = `translate3d(${calcX}px, ${calcY}px, 0px) scale(${scale})`
  const dummyBufferEl = document.createElement('div')
  dummyBufferEl.className = 'dummybuff'
  dummyBufferEl.style.height = '50px'
  dummyBufferEl.style.transform = `scale(${scale})`
  dummyBufferEl.style.visibility = 'hidden'
  dummyBufferEl.style.position = 'absolute'
  dummyBufferEl.style.opacity = '0'
  document.body.appendChild(dummyBufferEl)

  const bufferHeight = dummyBufferEl.getBoundingClientRect().height
  return { dummyBufferEl, bufferHeight }
}

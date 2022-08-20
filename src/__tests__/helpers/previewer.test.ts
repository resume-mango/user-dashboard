import { getPreviewTemplateBufferHeight } from '../../helpers/previewer'

describe('get preview template buffer height', () => {
  test('No ref object', () => {
    const ref = {
      current: null,
    }

    const scale = 0.7

    const result = getPreviewTemplateBufferHeight(ref, scale)

    expect(result).toBeUndefined()
  })

  test('with ref object as html element', () => {
    document.body = document.createElement('body')
    const wrapper = document.createElement('div')
    const page = document.createElement('div')
    page.style.height = '1000px'
    page.style.width = '1000px'
    page.style.position = 'absolute'
    page.style.transform = 'scale(0.6)'
    wrapper.appendChild(page)
    document.body.appendChild(wrapper)
    const ref = {
      current: wrapper,
    } as any
    document.body.style.height = '1080px'
    document.body.style.width = '1920px'

    document.body.innerHTML =
      "<div><div style='height:1000px; widht:1000px; transform:scale(0.6);'>Hi</div></div>"

    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        line-height: 1.5;
        -webkit-letter-spacing: 0.035em;
        -moz-letter-spacing: 0.035em;
        -ms-letter-spacing: 0.035em;
        letter-spacing: 0.035em;
        font-family: 'Product Sans',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto, Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
        background: rgba(255,255,255,1);
        color: rgba(52,52,52,1);
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-scroll-behavior: auto !important;
        -moz-scroll-behavior: auto !important;
        -ms-scroll-behavior: auto !important;
        scroll-behavior: auto !important;
      }</style>`
    )

    const scale = 0.7
    const result = getPreviewTemplateBufferHeight(ref, scale)

    expect(result?.bufferHeight).toEqual(0)
    expect(result?.dummyBufferEl).toBeTruthy()
  })
})

import { loadFonts } from '../../helpers/loadFonts'

describe('Load Fonts', () => {
  const fonts = [
    {
      name: 'Owswald',
      url: 'https://resume-mango.s3.us-east-2.amazonaws.com/public/fonts/oswald/Oswald-SemiBold.ttf',
      format: 'truetype',
      style: 'normal',
      weight: 700,
      _id: '6228aa20cfe4dad975568d59',
    },
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should fail tp load fonts', async () => {
    const result = await loadFonts(fonts)
    expect(result).toBe(false)
  })
  test('Should Successfully load fonts', async () => {
    const mockedFace = jest.fn()
    const loadFace = jest.fn()
    global.FontFace = mockedFace
    mockedFace.mockReturnValue({
      load: loadFace,
    })

    Object.defineProperty(document, 'fonts', {
      value: { ready: Promise.resolve({}), add: jest.fn() },
    })
    const result = await loadFonts(fonts)
    expect(result).toBe(true)
  })
})

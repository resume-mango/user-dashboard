import {
  convertDatetoISO,
  convertISOToUnixDate,
  convertUnixToISODate,
} from '../../helpers/date'

describe('Calendar helper', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('Converts date to ISO string', () => {
    const result = convertDatetoISO(new Date())
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)
  })

  test('Converts Unix Date to ISO string', () => {
    const result = convertUnixToISODate(
      Math.floor(new Date(Date.now()).getTime() / 1000)
    )
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/)
  })

  test('Converts ISO Date to UNIX date', () => {
    const result = convertISOToUnixDate(new Date(Date.now())).toString()
    expect(result).toMatch(/^\d{10}$/)
  })
})

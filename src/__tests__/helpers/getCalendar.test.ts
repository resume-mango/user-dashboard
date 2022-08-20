import axios from 'axios'
import { fetchCalendarEvents } from '../../helpers/getCalendar'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
describe('Fetchs Calendar events', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('Successfully Fetch calendar events', async () => {
    mockedAxios.get.mockResolvedValue({ data: 'success' })
    const result = await fetchCalendarEvents(2022)
    expect(result).toBe('success')
  })

  test('Successfully fetch calendar events but nothing found', async () => {
    mockedAxios.get.mockRejectedValue('Err')
    const result = await fetchCalendarEvents(2022)
    expect(result).toBeNull()
  })

  test('Failed to fetch calendar events', async () => {
    mockedAxios.get.mockRejectedValue('Err')
    const result = await fetchCalendarEvents(2022)
    expect(result).toBeNull()
  })
})

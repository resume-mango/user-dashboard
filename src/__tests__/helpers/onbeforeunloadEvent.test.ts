import { onbeforeunloadEvent } from '../../helpers/onbeforeunloadEvent'

describe('onbeforeunload Event', () => {
  test('With event', () => {
    const event = {
      name: 'dummy',
      preventDefault: jest.fn(),
    }
    const result = onbeforeunloadEvent(event, true)
    expect(result).toBe('')
  })
  test('Without event', () => {
    Object.defineProperty(window, 'event', {
      value: { preventDefault: jest.fn() },
    })

    const result = onbeforeunloadEvent(undefined, true)
    expect(result).toBe('')
  })
})

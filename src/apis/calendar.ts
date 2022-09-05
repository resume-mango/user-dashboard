import axiosRequest from '../helpers/axiosRequest'

interface calendarCreateEvent {
  summary: string
  description: string
  location: string
  start: {
    dateTime?: string | undefined
    date?: string | undefined
  }
  end: {
    dateTime?: string | undefined
    date?: string | undefined
  }
  colorId: string
}

export const apiCreateEvent = async (reqData: calendarCreateEvent) => {
  let data
  let error: string

  const { summary, description, location, start, end, colorId } = reqData

  try {
    const options = {
      method: 'POST',
      url: '/calendar',
      data: {
        summary,
        description,
        location,
        start,
        end,
        colorId,
      },
    }
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}

export const apiUpdateEvent = async (
  reqData: { id: string } & calendarCreateEvent
) => {
  let data
  let error: string

  const { id, summary, description, location, start, end, colorId } = reqData

  try {
    const options = {
      method: 'PATCH',
      url: '/calendar',
      data: {
        id,
        summary,
        description,
        location,
        start,
        end,
        colorId,
      },
    }
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}

export const apiDeleteEvent = async (id: string) => {
  let data
  let error: string
  try {
    const options = {
      method: 'DELETE',
      url: '/calendar',
      data: {
        id,
      },
    }
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}

import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export interface GetReviewParams {
  title?: string
  page: number
  limit: number
}

export interface GetChatsPatams {
  ticketId: string
  page: number
  limit: number
}

export const chatFetcher = async (params: GetChatsPatams) => {
  const { ticketId, ...rest } = params

  const { data } = await axios.get(`/ticket/${ticketId}`, {
    params: rest,
  })
  return data
}

export const getReviewTicketById = ({ ticket }: { ticket: string }) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/resume-review/${ticket}`)
    return data
  }
  return getQueryAdvance(
    ['reviewTicket', ticket],
    () => fetcher(),
    ticket !== 'new'
  )
}

export const getReviewTickets = (params: GetReviewParams) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/resume-review`, { params })
    return data
  }
  return getQueryAdvance(['resumeReview', params], () => fetcher())
}

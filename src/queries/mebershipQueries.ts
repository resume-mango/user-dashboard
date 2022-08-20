import axios from 'axios'
import { QueryClient, useMutation } from 'react-query'
import getQueryAdvance from '../hooks/getQueryAdvance'

type AllSubsParams = {
  page: number
  limit: number
  exclude_id?: string
}

/**
 * Gets user subscription
 * @param enabled boolean
 * @returns UseQueryResult
 */
export const getSubscription = (enabled?: boolean) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/subscription`)
    return data
  }

  return getQueryAdvance('activeSubscription', () => fetcher(), enabled)
}

/**
 * Api request to get all subscriptions
 * @param params from interface AllSubsParams
 * @returns all subscription list
 */
export const AllSubsfetcher = async (params: AllSubsParams) => {
  const { data } = await axios.get(`/subscriptions`, {
    params,
  })
  return data
}

/**
 * Get all subscription query
 * @param params from interface AllSubsParams
 * @param enabled boolean
 * @returns UseQueryResult
 */
export const getAllSubscriptions = (
  params: AllSubsParams,
  enabled?: boolean
) => {
  return getQueryAdvance(
    ['subscription', params.page],
    () => AllSubsfetcher(params),
    enabled
  )
}

/**
 * Gets all subscription payments
 * @param page number
 * @param enabled boolean
 * @returns UseQueryResult
 */
export const getSubscriptionPayments = (page: number, enabled?: boolean) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/payments`, {
      params: { page },
    })
    return data
  }

  return getQueryAdvance(['payments', page], () => fetcher(), enabled)
}

/**
 * Cancels user subscription
 * @param setToken from useAuth()
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient()
 * @returns UseMutationResult
 */
export const cancelSubscription = (
  setToken: (_val: string) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  return useMutation(() => axios.delete('/subscription'), {
    onSuccess: async (res) => {
      setToken('')
      queryClient.setQueryData('activeSubscription', res.data)
      queryClient.invalidateQueries('subscription')
    },
    onError: ({ _response }) => {
      setNotify({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to cancel subscription',
      })
    },
  })
}

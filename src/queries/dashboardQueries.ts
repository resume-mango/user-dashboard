import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export const dashCountsKey = 'dashboardCounts'
/**
 * Gets Counts for dashboard
 * @returns Counts Data
 */
export const dashCountsFetcher = async () => {
  const { data } = await axios.get(`/dashboard/counts`)
  return data
}
/**
 * Gets Counts for dash Query
 * @param enabled
 * @returns UseQueryResult
 */
export const getCounts = (enabled?: boolean) => {
  return getQueryAdvance(
    'dashboardCounts',
    () => dashCountsFetcher(),
    enabled,
    {
      cacheTime: 0,
      staleTime: 0,
    }
  )
}

import { useQuery, UseQueryOptions } from 'react-query'
import { useAuth } from '../contexts/authProvider'

/**
 * Advance hook for useQuery()
 * @param identifier queryKey  identifier
 * @param fetcher queryFn()
 * @param enabled should query be enabled?
 * @param params useQuery() options
 * @returns useQuery()
 */
const getQueryAdvance = (
  identifier: any,
  fetcher: () => any,
  enabled = true,
  params?: Omit<
    UseQueryOptions<any, unknown, any, any>,
    'queryKey' | 'queryFn' | 'enabled'
  >
) => {
  const { user, token } = useAuth()
  const ref = user && user.ref

  return useQuery(identifier, fetcher, {
    enabled: !!token && !!ref && enabled,
    ...params,
  })
}

export default getQueryAdvance

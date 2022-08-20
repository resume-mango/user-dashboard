import { QueryClient } from 'react-query'

/**
 *
 * @param id object _id of the item
 * @param status current status in kanban board
 * @param data list recived form server
 * @param queryKey query Indentifier key from useQuery()
 * @param queryClient from useQueryClient()
 */
export const deleteDraggableFromCache = (
  id: string,
  status: string,
  data: any,
  queryKey: string,
  queryClient: QueryClient
) => {
  const cloned = { ...data }
  const index = cloned[status].findIndex(
    (item: Record<string, any>) => item._id === id
  )
  cloned[status].splice(index, 1)
  queryClient.setQueryData(queryKey, cloned)
}

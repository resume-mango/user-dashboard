import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'
import { QueryClient, useMutation } from 'react-query'
import { deleteDraggableFromCache } from '../helpers/draggableBoard'

/**
 * Gets all progress tracked for current user
 * @returns UseQueryResult
 */
export const getAllTrackers = () => {
  const fetcher = async () => {
    const { data } = await axios.get(`/progress-tracker`)
    return data
  }
  return getQueryAdvance('progressTracker', () => fetcher())
}

/**
 * Deletes Single Tracker
 * @param deleteItem item object that needs to be deleted or id and status of item
 * @param data list recived from server
 * @param setTracker setState fn()
 * @param setDeleteItem setState fn()
 * @param setShowModal setState fn()
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient()
 * @returns UseMutationResult
 */
export const deleteProgressTrackerQuery = (
  deleteItem: { id: string; status: string } | Record<string, never>,
  data: Record<string, any>,
  setTracker: (_val: any) => void,
  setDeleteItem: (
    _val: { id: string; status: string } | Record<string, never>
  ) => void,
  setShowModal: (_val: boolean) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  return useMutation(
    (reqData) => axios.delete('/progress-tracker', { data: reqData }),
    {
      onSuccess: (_res) => {
        deleteDraggableFromCache(
          deleteItem.id,
          deleteItem.status,
          data,
          'progressTracker',
          queryClient
        )
        setShowModal(false)
        setTracker({})
      },
      onError: ({ _response }) => {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to delete tracker',
        })
      },
      onSettled: () => {
        setDeleteItem({})
      },
    }
  )
}

import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'
import { QueryClient, useMutation } from 'react-query'
import { deleteDraggableFromCache } from '../helpers/draggableBoard'
import {
  cacheTaskBoardNewTask,
  updateTaskBoardCache,
} from '../helpers/taskBoardHelpers'
/**
 * Gets all user tasks
 * @returns UseQueryResult
 */
export const getAllTasks = () => {
  const fetcher = async () => {
    const { data } = await axios.get(`/task`)
    return data
  }
  return getQueryAdvance('task-board', () => fetcher())
}

/**
 * Creates new user task by sending api request to server
 * @param data from useTaskBoard()
 * @param setShowModal setState fn
 * @param setTracker setState fn
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient()
 * @returns
 */
export const createTaskBoardTask = (
  data: Record<string, any>,
  setShowModal: (_val: any) => void,
  setTracker: (_val: any) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  return useMutation((trackerData) => axios.post('/task', trackerData), {
    onSuccess: (res: any) => {
      if (!res.data) return
      cacheTaskBoardNewTask(res.data, data, queryClient)
      setShowModal(false)
      setTracker({})
    },
    onError: ({ _response }) => {
      setNotify({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to create task',
      })
    },
  })
}
/**
 * Updates user task by sending api request to server
 * @param data data from useTaskBoard()
 * @param tracker tracker from useTaskBoard()
 * @param setShowModal setState fn
 * @param setTracker setState fn
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient()
 * @returns MutationFunction
 */
export const updateTaskBoardTask = (
  data: Record<string, any>,
  tracker: Record<string, any>,
  setShowModal: (_val: any) => void,
  setTracker: (_val: any) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  return useMutation((trackerData) => axios.patch('/task', trackerData), {
    onSuccess: (res: any) => {
      if (!res.data) return
      updateTaskBoardCache(res.data, data, tracker, queryClient)
      setShowModal(false)
      setTracker({})
    },
    onError: ({ _response }) => {
      setNotify({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to update task',
      })
    },
  })
}

/**
 * Deletes single item from taskboard
 * @param deleteItem item object that needs to be deleted or id and status of item
 * @param data list recived from server
 * @param setShowModal setState fn
 * @param setTracker setState fn
 * @param setNotify from useNotify()
 * @param setDeleteItem setState fn
 * @param queryClient from useQueryClient()
 * @returns UseMutationResult
 */
export const deleteTaskboardItemQuery = (
  deleteItem: { id: string; status: string } | Record<string, never>,
  data: Record<string, any>,
  setShowModal: (_val: boolean) => void,
  setTracker: (_val: any) => void,
  setNotify: (_val: any) => void,
  setDeleteItem: (
    _val: { id: string; status: string } | Record<string, never>
  ) => void,
  queryClient: QueryClient
) =>
  useMutation((reqData) => axios.delete('/task', { data: reqData }), {
    onSuccess: (_res) => {
      deleteDraggableFromCache(
        deleteItem.id,
        deleteItem.status,
        data,
        'task-board',
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
  })

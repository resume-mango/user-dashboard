import axios from 'axios'
import { QueryClient } from 'react-query'
import { apiChangeTaskPos } from '../apis/task'
import { dashCountsFetcher, dashCountsKey } from '../queries/dashboardQueries'

/**
 * Caches newly created task to react query
 * @param newTracker updated task object got in response from server
 * @param data from useTaskBoard()
 * @param queryClient from useQueryClient()
 * @returns boolean
 */
export const cacheTaskBoardNewTask = (
  newTracker: Record<string, any>,
  data: Record<string, any>,
  queryClient: QueryClient
) => {
  const trackers = { ...data } as any
  const type = trackers[newTracker.status]
  if (!type) return false
  type.unshift(newTracker)
  queryClient.setQueryData('task-board', trackers)
  return true
}

/**
 * Updates user task cache from react query
 * @param newTracker updated task object got in response from server
 * @param data data from useTaskboard()
 * @param tracker tracker from useTaskboard()
 * @param queryClient react-query hook useQueryClient()
 * @returns boolean
 */
export const updateTaskBoardCache = (
  newTracker: Record<string, any>,
  data: Record<string, any>,
  tracker: Record<string, any>,
  queryClient: QueryClient
) => {
  const trackers = { ...data } as any
  const list = trackers[tracker.status]
  if (!list) return false
  const index = list.findIndex(
    (item: Record<string, any>) => item._id === tracker._id
  )
  if (index === -1) return false

  if (newTracker.status !== tracker.status) {
    if (tracker) {
      list.splice(index, 1)
      trackers[newTracker.status].unshift(newTracker)
      queryClient.setQueryData('task-board', trackers)
    }
  } else {
    list.splice(index, 1, newTracker)
    queryClient.setQueryData('task-board', trackers)
  }
  return true
}

/**
 * Updates Dashboard counts
 * @param count
 * @param setNotify form useNotify()
 * @param queryClient from useQueryClient()
 * @returns boolean
 */
export const updateTaskboardCounts = async (
  count: number,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  let dashCounts = queryClient.getQueryData('dashboardCounts') as Record<
    string,
    number
  >
  if (!dashCounts) {
    try {
      dashCounts = await queryClient.fetchQuery(
        dashCountsKey,
        dashCountsFetcher
      )
    } catch (err) {
      setNotify({
        heading: 'Err',
        type: 'danger',
        message: 'Failed to update counts',
      })
      return false
    }
  }
  if (dashCounts && dashCounts.todos === count) return false
  dashCounts.todos = count
  queryClient.setQueryData('dashboardCounts', dashCounts)
  return true
}

/**
 * Updates taskboard items positions
 * @param data list recived from server
 * @param setIsPosUpdating setState Fn
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient
 * @returns void
 */
export const handleChangeTaskboardItemPos = async (
  data: Record<string, any>,
  setIsPosUpdating: (_val: boolean) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  type ListProps = {
    [todo: string]: Array<any>
    inprogress: Array<any>
    completed: Array<any>
  }

  const list: ListProps = {
    todo: [],
    inprogress: [],
    completed: [],
  }
  if (data) {
    Object.keys(list).forEach((key) => {
      data[key].forEach((item: any) => list[key].push(item._id))
    })

    const { data: resData, error: resError } = await apiChangeTaskPos({
      ...list,
    })
    if (resError && !axios.isCancel(resError)) {
      setNotify({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to update positon',
      })
    }
    if (resData) {
      queryClient.setQueryData('task-board', data)
    }
  }
  return setIsPosUpdating(false)
}

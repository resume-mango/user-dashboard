import axios from 'axios'
import { DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd'
import { QueryClient } from 'react-query'
import { apiChangeTrackerPos } from '../apis/progress_tracker'
import { dashCountsFetcher, dashCountsKey } from '../queries/dashboardQueries'
/**
 * Removes item from list at given position
 * @param list array
 * @param index postion of item
 * @returns removed Item and list
 */
export const removeFromList = (list: any, index: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(index, 1)

  return [removed, result]
}

/**
 * Adds items to list at given position
 * @param list array
 * @param index position to add element
 * @param element item that will be added
 * @returns list as array
 */
export const addToList = (list: any, index: number, element: any) => {
  const result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

/**
 * Handles mouse event drag start on progress tracker item
 * @param event onDragStart
 * @param getDraggedDom function return current element
 * @returns clientHeight, clientWidth, clientY, draggedDOM,
 */
export const progressTrackerHandleDragStart = (
  event: DragStart,
  getDraggedDom: (draggableId: string) => Element | null
) => {
  const draggedDOM = getDraggedDom(event.draggableId)

  if (!draggedDOM || !draggedDOM.parentNode) return

  const { clientHeight, clientWidth } = draggedDOM
  const sourceIndex = event.source.index
  const clientY =
    parseFloat(
      window.getComputedStyle(draggedDOM.parentNode as any).paddingTop
    ) +
    [...draggedDOM.parentNode.children]
      .slice(0, sourceIndex)
      .reduce((total, curr: any) => {
        const style = curr.currentStyle || window.getComputedStyle(curr)
        const marginBottom = parseFloat(style.marginBottom)
        return total + curr.clientHeight + marginBottom
      }, 0)
  return {
    clientHeight,
    clientWidth,
    clientY,
    draggedDOM,
  }
}

/**
 * Handles mouse event drag update on progress tracker item
 * @param event onDragUpdate
 * @param getDraggedDom function return current element
 * @returns clientHeight, clientWidth, clientY, draggedDOM,
 */
export const progressTrackerHandleDragUpdate = (
  event: DragUpdate,
  getDraggedDom: (draggableId: string) => Element | null
) => {
  if (!event.destination) return

  const container = document.getElementById('drag-container')
  if (!container) return
  const column = container.querySelector(
    `#drag-column-${event.destination.droppableId}`
  )

  if (!column) return

  const draggedDOM = getDraggedDom(event.draggableId)

  if (!draggedDOM) return

  const { clientHeight, clientWidth } = draggedDOM
  const destinationIndex = event.destination.index
  const sourceIndex = event.source.index

  const childrenArray = [...column.children]
  const movedItem = childrenArray[sourceIndex]

  const updatedArray = [
    ...childrenArray.slice(0, destinationIndex),
    movedItem,
    ...childrenArray.slice(destinationIndex + 1),
  ]

  const clientY =
    parseFloat(
      window.getComputedStyle(draggedDOM.parentNode as any).paddingTop
    ) +
    updatedArray.slice(0, destinationIndex).reduce((total, curr: any) => {
      const style = curr.currentStyle || window.getComputedStyle(curr)
      const marginBottom = parseFloat(style.marginBottom)
      return total + curr.clientHeight + marginBottom
    }, 0)

  return {
    clientHeight,
    clientWidth,
    clientY,
    draggedDOM,
  }
}

/**
 * Handles mouse event drag end on progress tracker item
 * @param data progress tracker data
 * @param result DropResult from onDragEnd event from react-draggable
 * @returns void
 */
export const progressTrackerHandleDragEnd = (
  data: Record<string, any>,
  result: DropResult
  //   getDraggedDom: (draggableId: string) => Element | null,
  //   removeFromList: (list: any, index: number) => any,
  //   addToList: (list: any, index: number, element: any) => any
) => {
  if (
    !result.destination ||
    (result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index)
  )
    return
  const sourceList = data[result.source.droppableId]
  const [removedElement, newSourceList] = removeFromList(
    sourceList,
    result.source.index
  )
  data[result.source.droppableId] = newSourceList
  const destinationList = data[result.destination.droppableId]

  data[result.destination.droppableId] = addToList(
    destinationList,
    result.destination.index,
    removedElement
  )
  return true
}

/**
 * Updates Dashboard Counts
 * @param counts counts object recived form get request
 * @param setNotify form useNotify()
 * @param queryClient from useQueryClient()
 * @returns boolean
 */
export const updateProgressTrackerCounts = async (
  counts: Record<string, number>,
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
    }
  }
  if (!dashCounts) return false
  const resCounts: Record<string, any> = {
    callbacks: dashCounts.callbacks || 0,
    interviews: dashCounts.interviews || 0,
    jobs_applied: dashCounts.jobs_applied || 0,
  }
  const isSame = Object.keys(resCounts).every(
    (key) => resCounts[key] === counts[key]
  )
  if (isSame) return false

  queryClient.setQueryData('dashboardCounts', {
    ...counts,
    todos: dashCounts['todos'],
  })
  return true
}

/**
 * Handles postion chnage of a tracker
 * @param data list from server response
 * @param setIsPosUpdating set State fn()
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient()
 * @returns void
 */
export const handleChangeProgressTrackerPos = async (
  data: Record<string, any>,
  setIsPosUpdating: (_val: boolean) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  type ListProps = {
    [applied: string]: Array<any>
    responded: Array<any>
    interview: Array<any>
    offers: Array<any>
    rejected: Array<any>
  }

  const list: ListProps = {
    applied: [],
    responded: [],
    interview: [],
    offers: [],
    rejected: [],
  }
  if (!data) return
  Object.keys(list).forEach((key) => {
    data[key].forEach((item: any) => list[key].push(item._id))
  })

  const { data: resData, error: resError } = await apiChangeTrackerPos({
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
    queryClient.setQueryData('progressTracker', data)
  }
  return setIsPosUpdating(false)
}

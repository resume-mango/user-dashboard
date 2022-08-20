import React, { ReactNode, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import useExitPrompt from '../hooks/useExitPromt'
import { useNotify } from './notify'
import RouterPrompt from '../components/routerPrompt'
import {
  deleteTaskboardItemQuery,
  getAllTasks,
} from '../queries/taskboardQueries'
import {
  handleChangeTaskboardItemPos,
  updateTaskboardCounts,
} from '../helpers/taskBoardHelpers'

interface ContextProps {
  showModal: boolean
  tracker: Record<string, any>
  modalAction: string
  setShowModal: (_val: boolean) => void
  setTracker: (_val: any) => void
  setModalAction: (_val: 'create' | 'edit' | '') => void
  data: Record<string, any>
  isLoading: boolean
  isError: boolean
  isPosUpdating: boolean
  setReqPosChange: (_val: number) => void
  deleteItem: { id: string; status: string } | Record<string, never>
  setDeleteItem: (
    _val: { id: string; status: string } | Record<string, never>
  ) => void
  isDeleting: boolean
  handleDeleteTracker: (_val: { id: string; status: string }) => void
}
/* istanbul ignore next */
const contextValues = {
  showModal: false,
  tracker: {},
  modalAction: '',
  setShowModal: (_val: boolean) => {
    return undefined
  },
  setTracker: (_val: any) => {
    return undefined
  },
  setModalAction: (_val: 'create' | 'edit' | '') => {
    return undefined
  },
  data: {},
  isLoading: false,
  isError: false,
  isPosUpdating: false,
  setReqPosChange: (_val: number) => {
    return undefined
  },
  deleteItem: {},
  setDeleteItem: (
    _val: { id: string; status: string } | Record<string, never>
  ) => {
    return undefined
  },
  isDeleting: false,
  handleDeleteTracker: (_val: { id: string; status: string }) => {
    return undefined
  },
}

const TaskBoardContext = React.createContext<ContextProps>(contextValues)

const TaskBoardProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false)
  const [tracker, setTracker] = useState({})
  const [modalAction, setModalAction] = useState<'create' | 'edit' | ''>('')
  const [reqPosChange, setReqPosChange] = useState(0)
  const [isPosUpdating, setIsPosUpdating] = useState(false)
  const [deleteItem, setDeleteItem] = useState<
    { id: string; status: string } | Record<string, never>
  >({})

  const { setNotify } = useNotify()

  const { showExitPrompt, setShowExitPrompt } = useExitPrompt(false)

  const { data, isLoading, isError } = getAllTasks()

  const queryClient = useQueryClient()

  const todoCount = (data && data.todo.length) || 0

  useEffect(() => {
    if (!todoCount) return
    updateTaskboardCounts(todoCount, setNotify, queryClient)
    return
  }, [todoCount])

  useEffect(() => {
    return () => {
      setShowExitPrompt(false)
    }
  }, [])

  // const updateCounts = async (count: number) => {
  //   let dashCounts = queryClient.getQueryData('dashboardCounts') as Record<
  //     string,
  //     number
  //   >
  //   if (!dashCounts) {
  //     try {
  //       dashCounts = await queryClient.fetchQuery(
  //         dashCountsKey,
  //         dashCountsFetcher
  //       )
  //     } catch (err) {
  //       setNotify({
  //         heading: 'Err',
  //         type: 'danger',
  //         message: 'Failed to update counts',
  //       })
  //       console.error('Failed to updated counts')
  //     }
  //   }
  //   if (dashCounts && dashCounts.todos === count) return
  //   dashCounts.todos = count
  //   queryClient.setQueryData('dashboardCounts', dashCounts)
  // }

  // const deleteFromCache = (id: string, status: string) => {
  //   const cloned = { ...data }
  //   const index = cloned[status].findIndex(
  //     (item: Record<string, any>) => item._id === id
  //   )
  //   cloned[status].splice(index, 1)
  //   queryClient.setQueryData('task-board', cloned)
  // }

  useEffect(() => {
    if (isPosUpdating) setShowExitPrompt(true)
    else setShowExitPrompt(false)
  }, [isPosUpdating])

  // const deleteTracker = useMutation(
  //   (reqData) => axios.delete('/task', { data: reqData }),
  //   {
  //     onSuccess: (_res) => {
  //       deleteDraggableFromCache(
  //         deleteItem.id,
  //         deleteItem.status,
  //         data,
  //         'task-board',
  //         queryClient
  //       )
  //       setShowModal(false)
  //       setTracker({})
  //     },
  //     onError: ({ _response }) => {
  //       setNotify({
  //         type: 'danger',
  //         heading: 'Err!',
  //         message: 'Failed to delete tracker',
  //       })
  //     },
  //     onSettled: () => {
  //       setDeleteItem({})
  //     },
  //   }
  // )

  const deleteTracker = deleteTaskboardItemQuery(
    deleteItem,
    data,
    setShowModal,
    setTracker,
    setNotify,
    setDeleteItem,
    queryClient
  )

  useEffect(() => {
    if (reqPosChange <= 0 || !data) return
    setIsPosUpdating(true)
    const timer = setTimeout(() => {
      handleChangeTaskboardItemPos(
        data,
        setIsPosUpdating,
        setNotify,
        queryClient
      )
      setReqPosChange(0)
    }, 3000)
    return () => clearTimeout(timer)
  }, [reqPosChange])

  const handleDeleteTracker = async (req: { id: string; status: string }) => {
    deleteTracker.mutate(req as any)
  }

  // const handleChangePos = async () => {
  //   const list: ListProps = {
  //     todo: [],
  //     inprogress: [],
  //     completed: [],
  //   }
  //   if (!data) return
  //   Object.keys(list).forEach((key) => {
  //     data[key].forEach((item: any) => list[key].push(item._id))
  //   })

  //   const { data: resData, error: resError } = await apiChangeTaskPos({
  //     ...list,
  //   })
  //   if (resError && !axios.isCancel(resError)) {
  //     setNotify({
  //       type: 'danger',
  //       heading: 'Err!',
  //       message: 'Failed to update positon',
  //     })
  //   }
  //   if (resData) {
  //     queryClient.setQueryData('task-board', data)
  //   }
  //   setIsPosUpdating(false)
  // }

  return (
    <TaskBoardContext.Provider
      value={{
        showModal,
        setShowModal,
        tracker,
        setTracker,
        modalAction,
        setModalAction,
        data,
        isLoading,
        isError,
        isPosUpdating,
        setReqPosChange,
        deleteItem,
        setDeleteItem,
        isDeleting: deleteTracker.isLoading,
        handleDeleteTracker,
      }}
    >
      <RouterPrompt show={showExitPrompt} setShow={setShowExitPrompt} />

      {children}
    </TaskBoardContext.Provider>
  )
}

const useTaskboard = () => {
  const {
    showModal,
    setShowModal,
    tracker,
    setTracker,
    modalAction,
    setModalAction,
    data,
    isLoading,
    isError,
    isPosUpdating,
    setReqPosChange,
    deleteItem,
    setDeleteItem,
    isDeleting,
    handleDeleteTracker,
  } = React.useContext(TaskBoardContext)

  return {
    showModal,
    setShowModal,
    tracker,
    setTracker,
    modalAction,
    setModalAction,
    data,
    isLoading,
    isError,
    isPosUpdating,
    setReqPosChange,
    deleteItem,
    setDeleteItem,
    isDeleting,
    handleDeleteTracker,
  }
}

export { TaskBoardProvider, useTaskboard }

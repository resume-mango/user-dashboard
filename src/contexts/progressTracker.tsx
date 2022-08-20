import React, { ReactNode, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import {
  deleteProgressTrackerQuery,
  getAllTrackers,
} from '../queries/progressTrackerQueries'
import useExitPrompt from '../hooks/useExitPromt'
import { useNotify } from './notify'
import RouterPrompt from '../components/routerPrompt'
import {
  handleChangeProgressTrackerPos,
  updateProgressTrackerCounts,
} from '../helpers/progressTrackerHelpers'

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

const ProgressTrackerContext = React.createContext<ContextProps>(contextValues)

const ProgressTrackerProvider = ({ children }: { children: ReactNode }) => {
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

  const { data, isLoading, isError } = getAllTrackers()

  const queryClient = useQueryClient()

  const counts = {
    callbacks: 0,
    interviews: 0,
    jobs_applied: 0,
  }

  counts.callbacks = (data && data.responded.length) || 0
  counts.interviews = (data && data.interview.length) || 0
  counts.jobs_applied = (data && data.applied.length) || 0

  useEffect(() => {
    if (!counts) return
    updateProgressTrackerCounts(counts, setNotify, queryClient)
  }, [counts.callbacks, counts.interviews, counts.jobs_applied])

  useEffect(() => {
    return () => {
      setShowExitPrompt(false)
    }
  }, [])

  // const updateCounts = async (counts: Record<string, number>) => {
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
  //   if (!dashCounts) return
  //   const resCounts: Record<string, any> = {
  //     callbacks: dashCounts.callbacks || 0,
  //     interviews: dashCounts.interviews || 0,
  //     jobs_applied: dashCounts.jobs_applied || 0,
  //   }
  //   const isSame = Object.keys(resCounts).every(
  //     (key) => resCounts[key] === counts[key]
  //   )
  //   if (isSame) return

  //   queryClient.setQueryData('dashboardCounts', {
  //     ...counts,
  //     todos: dashCounts['todos'],
  //   })
  // }

  useEffect(() => {
    if (isPosUpdating) setShowExitPrompt(true)
    else setShowExitPrompt(false)
  }, [isPosUpdating])

  // const deleteTracker = useMutation(
  //   (reqData) => axios.delete('/progress-tracker', { data: reqData }),
  //   {
  //     onSuccess: (_res) => {
  //       deleteDraggableFromCache(
  //         deleteItem.id,
  //         deleteItem.status,
  //         data,
  //         'progressTracker',
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

  const deleteTracker = deleteProgressTrackerQuery(
    deleteItem,
    data,
    setTracker,
    setDeleteItem,
    setShowModal,
    setNotify,
    queryClient
  )

  useEffect(() => {
    if (reqPosChange <= 0 || !data) return
    setIsPosUpdating(true)
    const timer = setTimeout(() => {
      handleChangeProgressTrackerPos(
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
  //     applied: [],
  //     responded: [],
  //     interview: [],
  //     offers: [],
  //     rejected: [],
  //   }
  //   if (!data) return
  //   Object.keys(list).forEach((key) => {
  //     data[key].forEach((item: any) => list[key].push(item._id))
  //   })

  //   const { data: resData, error: resError } = await apiChangeTrackerPos({
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
  //     queryClient.setQueryData('progressTracker', data)
  //   }
  //   setIsPosUpdating(false)
  // }

  return (
    <ProgressTrackerContext.Provider
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
    </ProgressTrackerContext.Provider>
  )
}

const useProgressTracker = () => {
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
  } = React.useContext(ProgressTrackerContext)

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

export { ProgressTrackerProvider, useProgressTracker }

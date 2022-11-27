import React, { Fragment, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '../../../components/form/Input'
import TextArea from '../../../components/form/textarea'
import CrossIcon from '../../../components/svgs/cross'
import { useQueryClient } from 'react-query'
import DropButton from '../../../components/ui/DropButton'
import DownArrowIcon from '../../../components/svgs/downArrow'
import { useNotify } from '../../../contexts/notify'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateTaskSchema } from '../../../validations/task'
import { useTaskboard } from '../../../contexts/taskBorard'
import { Spinner } from '../../../styled/loader'
import { Button } from '../../../styled/button'
import { useViewport } from '../../../contexts/viewPort'
import { ITask } from '../../../apis/task'
import { convertDateToInput } from '../../../helpers/date'
import {
  createTaskBoardTask,
  updateTaskBoardTask,
} from '../../../queries/taskboardQueries'

type Select = 'todo' | 'inprogress' | 'completed' | undefined

const TaskBoardModal: React.FC = () => {
  const queryClient = useQueryClient()

  const {
    data,
    tracker,
    modalAction,
    setShowModal,
    setTracker,
    setModalAction,
    setDeleteItem,
  } = useTaskboard()

  const [select, setSelect] = useState<Select>(
    tracker ? tracker.status : 'todo'
  )

  const [showDrop, setShowDrop] = useState(false)
  const { width } = useViewport()
  const { setNotify } = useNotify()

  const handleDrop = (name: Select) => {
    setSelect(name)
    setShowDrop(false)
  }

  const defaultValues = {
    title: '',
    description: '',
    status: 'todo' as any,
    startsAt: undefined,
    endsAt: undefined,
  }

  const methods = useForm<ITask>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validateTaskSchema),
  })

  const {
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = methods

  const currTitle = watch('title')

  useEffect(() => {
    if (!tracker) return
    const formData: Record<string, any> = tracker
    formData.endsAt =
      tracker && tracker.endsAt ? convertDateToInput(tracker.endsAt) : ''
    formData.startsAt =
      tracker && tracker.startsAt ? convertDateToInput(tracker.startsAt) : ''
    if (!formData.status) formData.status = 'todo'
    reset(formData, {
      keepErrors: false,
      keepDirty: false,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    })
  }, [modalAction, tracker])

  useEffect(() => {
    setValue('status', select, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }, [select])

  const handleClose = () => {
    setShowModal(false)
    setTracker({})
    setModalAction('')
  }
  // const cacheNewTasks = (tracker: Record<string, any>) => {
  //   const trackers = { ...data } as any
  //   trackers[tracker.status].unshift(tracker)
  //   queryClient.setQueryData('task-board', trackers)
  // }

  // const createTask = useMutation(
  //   (trackerData) => axios.post('/task', trackerData),
  //   {
  //     onSuccess: (res: any) => {
  //       if (!res.data) return
  //       cacheNewTasks(res.data)
  //       setShowModal(false)
  //       setTracker({})
  //     },
  //     onError: ({ _response }) => {
  //       setNotify({
  //         type: 'danger',
  //         heading: 'Err!',
  //         message: 'Failed to create task',
  //       })
  //     },
  //   }
  // )

  // const updateTaskCache = (newTracker: Record<string, any>) => {
  //   const trackers = { ...data } as any
  //   const list = trackers[tracker.status]
  //   if (!list) return
  //   const index = list.findIndex(
  //     (item: Record<string, any>) => item._id === tracker._id
  //   )
  //   if (index === -1) return

  //   if (newTracker.status !== tracker.status) {
  //     if (tracker) {
  //       list.splice(index, 1)
  //       trackers[newTracker.status].unshift(newTracker)
  //       queryClient.setQueryData('task-board', trackers)
  //     }
  //   } else {
  //     list.splice(index, 1, newTracker)
  //     queryClient.setQueryData('task-board', trackers)
  //   }
  // }

  // const updateTask = useMutation(
  //   (trackerData) => axios.patch('/task', trackerData),
  //   {
  //     onSuccess: (res) => {
  //       updateTaskCache(res.data as Record<string, any>)
  //       setShowModal(false)
  //       setTracker({})
  //     },
  //     onError: ({ _response }) => {
  //       setNotify({
  //         type: 'danger',
  //         heading: 'Err!',
  //         message: 'Failed to update task',
  //       })
  //     },
  //   }
  // )

  const updateTask = updateTaskBoardTask(
    data,
    tracker,
    setShowModal,
    setTracker,
    setNotify,
    queryClient
  )

  const createTask = createTaskBoardTask(
    data,
    setShowModal,
    setTracker,
    setNotify,
    queryClient
  )

  const submitForm = async (data: any) => {
    if (modalAction === 'create') {
      return createTask
        .mutateAsync(data)
        .then((_val) => true)
        .catch((_err) => false)
    } else if (modalAction === 'edit') {
      data.id = tracker._id
      data.oldStatus = tracker.status
      return updateTask
        .mutateAsync(data)
        .then((_val) => true)
        .catch((_err) => false)
    }
  }

  const handleSave = () => {
    handleSubmit(submitForm)()
  }

  const handleDelete = () => {
    if (Object.keys(tracker).length > 0 && tracker._id && tracker.status) {
      setShowModal(false)
      setTracker({})
      setDeleteItem({
        id: tracker._id as string,
        status: tracker.status as string,
      })
    }
  }

  return (
    <Fragment>
      <Modal data-test-id="task-popup">
        <Wrapper>
          <FormProvider {...methods}>
            <h2
              className={`space-around truncate`}
              style={width <= 480 ? { marginBottom: '1rem' } : {}}
            >
              {currTitle ? currTitle : 'Untitled'}
            </h2>
            <CloseBtn onClick={() => handleClose()}>
              <CrossIcon size="1rem" />
            </CloseBtn>
            <Grid columns={'2fr 1fr'} className="mb-1">
              <div>
                <Input name="title" label="Title" />
              </div>
              <div>
                <label>Status</label>

                <TaskStatusDropDown
                  show={showDrop}
                  setShow={setShowDrop}
                  vertical="bottom"
                  horizontal="left"
                  btnStyle={{ padding: '0.1rem' }}
                >
                  <DropButton.Button>
                    {select === 'todo'
                      ? 'To-do'
                      : select === 'inprogress'
                      ? 'In-progress'
                      : 'Completed'}
                    <DownArrowIcon />
                  </DropButton.Button>
                  <DropButton.Item>
                    <a onClick={() => handleDrop('todo')}>To-do</a>
                  </DropButton.Item>
                  <DropButton.Item>
                    <a onClick={() => handleDrop('inprogress')}>In-progress</a>
                  </DropButton.Item>
                  <DropButton.Item>
                    <a onClick={() => handleDrop('completed')}>Completed</a>
                  </DropButton.Item>
                </TaskStatusDropDown>
              </div>
            </Grid>
            <div className="mb-1">
              <TextArea name="description" label="Description" rows={8} />
            </div>
            <Grid columns={'repeat(2, 1fr)'} className="mb-2">
              <div>
                <Input
                  name="startsAt"
                  label="Starts At"
                  type="datetime-local"
                />
              </div>
              <div>
                <Input name="endsAt" label="Ends At" type="datetime-local" />
              </div>
            </Grid>
            <Grid columns="45% 25% 25%">
              <div></div>
              <Fragment>
                {modalAction === 'edit' ? (
                  <Button
                    btnType="ghost"
                    size="lg"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </Button>
                ) : (
                  <div />
                )}
              </Fragment>

              <Button
                btnType="primary"
                size="lg"
                disabled={isSubmitting || !isDirty || !isValid}
                onClick={handleSave}
              >
                {isSubmitting ? (
                  <Spinner size={'1.4rem'} type="white" />
                ) : (
                  'Save'
                )}
              </Button>
            </Grid>
          </FormProvider>
        </Wrapper>
      </Modal>
    </Fragment>
  )
}

export default TaskBoardModal

const Wrapper = styled.div`
  max-width: 700px;
  width: 100%;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  position: relative;
`
const Grid = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  grid-gap: 1rem;
  align-items: top;
`

const CloseBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

const TaskStatusDropDown = styled(DropButton)`
  width: 100%;
  button {
    height: 44px;
    background-color: rgba(244, 245, 247, 1);
    padding: 0 0.8rem !important;
    border-radius: 6px;
    font-size: 1rem;
    color: rgba(52, 52, 52, 1);
    justify-content: space-between;
  }
`

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.shades.dark[3]};
`

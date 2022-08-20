import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import { Fragment } from 'react'

import * as dashQueries from '../../queries/dashboardQueries'
import TestingWrapper from '../../__mocks__/TestingWrapper'
import { countsData } from '../../__mocks__/counts'
import { TaskBoardProvider, useTaskboard } from '../../contexts/taskBorard'
import * as taskboardQueries from '../../queries/taskboardQueries'
import { taskBoardData } from '../../__mocks__/taskboard'

describe('Taskboard Context', () => {
  const TestWrapper = () => {
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
    } = useTaskboard()

    return (
      <Fragment>
        <p>Show Modal: {showModal ? 'true' : 'false'}</p>
        <button onClick={() => setShowModal(true)}>Set Show Modal</button>

        <p>Tracker: {JSON.stringify(tracker)}</p>
        <button onClick={() => setTracker('dummy')}>Set Tracker</button>

        <p>Modal Action: {modalAction}</p>
        <button onClick={() => setModalAction('create')}>
          Set modal to create
        </button>
        <button onClick={() => setModalAction('edit')}>
          Set modal to edit
        </button>

        <p>Delete Item: {JSON.stringify(deleteItem)}</p>
        <button
          onClick={() => setDeleteItem({ id: 'abc', status: 'fakeStatus' })}
        >
          Set delete item
        </button>
        <p>Is PosUpdating: {isPosUpdating ? 'true' : 'false'}</p>
        <button onClick={() => setReqPosChange(1)}>
          Set Request Pos Change
        </button>
        <button
          onClick={() =>
            handleDeleteTracker({ id: 'efg', status: 'fakeStatus' })
          }
        >
          Handle Delete Tracker
        </button>

        <p>Data: {JSON.stringify(data)}</p>
        <p>Is Loading: {isLoading ? 'true' : 'false'}</p>
        <p>Is Error: {isError ? 'true' : 'false'}</p>
        <p>Is Deleting: {isDeleting ? 'true' : 'false'}</p>
      </Fragment>
    )
  }

  const Wrapper = (
    <TestingWrapper>
      <TaskBoardProvider>
        <TestWrapper />
      </TaskBoardProvider>
    </TestingWrapper>
  )

  const getAllTasksSpy = jest.spyOn(taskboardQueries, 'getAllTasks')
  const dashCountsFetcherSpy = jest.spyOn(dashQueries, 'dashCountsFetcher')
  const deleteTaskboardItemQuerySpy = jest.spyOn(
    taskboardQueries,
    'deleteTaskboardItemQuery'
  )

  jest.setTimeout(30000)

  beforeEach(() => {
    getAllTasksSpy.mockReturnValue({
      data: taskBoardData,
      isError: false,
      isLoading: false,
    } as any)

    dashCountsFetcherSpy.mockResolvedValue(countsData)
  })

  test('should render successfully', async () => {
    const mutate = jest.fn()
    deleteTaskboardItemQuerySpy.mockReturnValue({
      mutate,
    } as any)

    let screen: any
    await act(async () => {
      screen = render(Wrapper) as RenderResult
    })

    if (!screen) throw new Error('Failed to render screen')
    const data = screen.getByText(/Data:/i) as HTMLElement
    expect(data.textContent).toEqual(`Data: ${JSON.stringify(taskBoardData)}`)

    const tracker = screen.getByText(/Tracker:/i) as HTMLElement
    const setTracker = screen.getByText('Set Tracker')

    const showModal = screen.getByText(/Show Modal:/i) as HTMLElement
    const setModal = screen.getByText('Set Show Modal')

    const modalAction = screen.getByText(/Modal Action:/i) as HTMLElement
    const setModalCreate = screen.getByText('Set modal to create')
    const setModalEdit = screen.getByText('Set modal to edit')

    const deleteItem = screen.getByText(/Delete Item:/i) as HTMLElement
    const setDeleteItem = screen.getByText('Set delete item')

    const isPosUpdating = screen.getByText(/Is PosUpdating:/i)
    const updatePos = screen.getByText('Set Request Pos Change')

    const deleteTracker = screen.getByText('Handle Delete Tracker')

    expect(showModal.textContent).toBe(`Show Modal: false`)

    fireEvent.click(setTracker)

    expect(tracker.textContent).toEqual(`Tracker: ${JSON.stringify('dummy')}`)

    fireEvent.click(setModal)

    expect(showModal.textContent).toBe(`Show Modal: true`)

    fireEvent.click(setModalCreate)
    expect(modalAction.textContent).toBe(`Modal Action: create`)
    fireEvent.click(setModalEdit)
    expect(modalAction.textContent).toBe(`Modal Action: edit`)

    fireEvent.click(setDeleteItem)
    expect(deleteItem.textContent).toBe(
      `Delete Item: ${JSON.stringify({ id: 'abc', status: 'fakeStatus' })}`
    )

    fireEvent.click(updatePos)
    expect(isPosUpdating.textContent).toBe(`Is PosUpdating: true`)

    await new Promise((r) => setTimeout(r, 3000))
    await waitFor(() => {
      expect(isPosUpdating.textContent).toBe(`Is PosUpdating: false`)
    })

    fireEvent.click(deleteTracker)
    expect(mutate).toBeCalledTimes(1)

    expect(1).toBe(1)
  })
})

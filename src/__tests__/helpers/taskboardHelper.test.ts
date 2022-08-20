import * as taskApis from '../../apis/task'
import {
  cacheTaskBoardNewTask,
  handleChangeTaskboardItemPos,
  updateTaskBoardCache,
  updateTaskboardCounts,
} from '../../helpers/taskBoardHelpers'

describe('Task Board Helper', () => {
  describe('Cache new taskboard item', () => {
    const queryClient = {
      setQueryData: jest.fn(),
    } as any
    const data = {
      efg: [
        {
          name: 'dummy2',
        },
      ],
    }
    const newTracker = { name: 'dummy', status: 'abc' }
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('Should Fail', () => {
      const result = cacheTaskBoardNewTask(newTracker, data, queryClient)
      expect(queryClient.setQueryData).not.toBeCalled()
      expect(result).toBe(false)
    })
    test('Should succeed', () => {
      const data = {
        abc: [
          {
            name: 'dummy2',
          },
        ],
      }
      const result = cacheTaskBoardNewTask(newTracker, data, queryClient)
      expect(queryClient.setQueryData).toBeCalled()
      expect(result).toBe(true)
    })
  })

  describe('Cache updated taskboard item', () => {
    const queryClient = {
      setQueryData: jest.fn(),
    } as any
    const data = {
      efg: [
        {
          _id: 'dummy2',
        },
      ],
    }
    const newTracker = { _id: 'dummy', status: 'efg' }
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('Should Fail', () => {
      const tracker = { _id: 'dummy', status: 'abc' }

      const result = updateTaskBoardCache(
        newTracker,
        data,
        tracker,
        queryClient
      )
      expect(queryClient.setQueryData).not.toBeCalled()
      expect(result).toBe(false)
    })
    test('Should succeed with diffrent status', () => {
      const tracker = { _id: 'dummy', status: 'abc' }

      const data = {
        efg: [],
        abc: [
          {
            _id: 'dummy',
          },
        ],
      }
      const result = updateTaskBoardCache(
        newTracker,
        data,
        tracker,
        queryClient
      )
      expect(queryClient.setQueryData).toBeCalled()
      expect(result).toBe(true)
    })
    test('Should succeed with same status', () => {
      const tracker = { _id: 'dummy', status: 'abc' }
      const newTracker = { _id: 'dummy', status: 'abc' }

      const data = {
        efg: [],
        abc: [
          {
            _id: 'dummy',
          },
        ],
      }
      const result = updateTaskBoardCache(
        newTracker,
        data,
        tracker,
        queryClient
      )
      expect(queryClient.setQueryData).toBeCalled()
      expect(result).toBe(true)
    })
  })

  describe('Update taskboard counts to dashboard', () => {
    const fetchQuery = jest.fn()
    const queryClient = {
      getQueryData: jest.fn(),
      fetchQuery,
      setQueryData: jest.fn(),
    } as any

    const count = 12
    const setNotify = jest.fn()

    afterEach(() => {
      jest.resetAllMocks()
      jest.clearAllMocks()
    })

    test('Already cached dashcounts but same todo counts', async () => {
      queryClient.getQueryData.mockReturnValue({ todos: 12 })

      const result = await updateTaskboardCounts(count, setNotify, queryClient)
      expect(result).toBe(false)
    })
    test('Already cached dashcounts but diffrent todo counts', async () => {
      queryClient.getQueryData.mockReturnValue({ todos: 1 })

      const result = await updateTaskboardCounts(count, setNotify, queryClient)
      expect(queryClient.setQueryData).toBeCalledTimes(1)
      expect(result).toBe(true)
    })

    test('No cached dashcounts and fails', async () => {
      queryClient.getQueryData.mockReturnValue(undefined)
      fetchQuery.mockImplementation(() => {
        throw new Error('err')
      })
      const result = await updateTaskboardCounts(count, setNotify, queryClient)
      expect(setNotify).toBeCalledWith({
        heading: 'Err',
        type: 'danger',
        message: 'Failed to update counts',
      })
      expect(result).toBe(false)
    })
    test('No cached dashcounts and succeeds', async () => {
      queryClient.getQueryData.mockReturnValue(undefined)
      fetchQuery.mockResolvedValue({ todo: 1 })
      const result = await updateTaskboardCounts(count, setNotify, queryClient)

      expect(result).toBe(true)
    })
  })

  describe('Handles taskboard item position change', () => {
    const data = { todo: [], inprogress: [], completed: [] }
    const setIsPosUpdating = jest.fn()
    const setNotify = jest.fn()
    const queryClient = {
      setQueryData: jest.fn(),
    } as any

    const apiChangeTaskPosSpy = jest.spyOn(taskApis, 'apiChangeTaskPos')

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('No data should fail', async () => {
      await handleChangeTaskboardItemPos(
        undefined as any,
        setIsPosUpdating,
        setNotify,
        queryClient
      )

      expect(apiChangeTaskPosSpy).not.toBeCalled()
      expect(setIsPosUpdating).toBeCalledTimes(1)
    })
    test('should fail to update position', async () => {
      apiChangeTaskPosSpy.mockResolvedValue({ data: undefined, error: 'Err' })

      await handleChangeTaskboardItemPos(
        data,
        setIsPosUpdating,
        setNotify,
        queryClient
      )

      expect(setNotify).toBeCalledWith({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to update positon',
      })
      expect(setIsPosUpdating).toBeCalledTimes(1)
    })
    test('should successfully update position', async () => {
      apiChangeTaskPosSpy.mockResolvedValue({ data: 'dummy', error: undefined })
      await handleChangeTaskboardItemPos(
        data,
        setIsPosUpdating,
        setNotify,
        queryClient
      )

      expect(setNotify).not.toBeCalled()
      expect(queryClient.setQueryData).toBeCalledTimes(1)
      expect(setIsPosUpdating).toBeCalledTimes(1)
    })
  })
})

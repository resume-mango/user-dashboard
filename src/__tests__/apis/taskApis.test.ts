import axios from 'axios'
import { apiChangeTaskPos } from '../../apis/task'

describe('Change taskbaord item position', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const requestSpy = jest.spyOn(mockedAxios, 'request')

  const reqData = 'data'

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('Fails to change item position', async () => {
    requestSpy.mockRejectedValue(new Error('Failed to change position'))
    const result = await apiChangeTaskPos(reqData)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe('Failed to change position')
  })

  test('Successfully changes ite  position', async () => {
    requestSpy.mockResolvedValue({ data: 'success', error: undefined })
    const result = await apiChangeTaskPos(reqData)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result.data).toBe('success')
    expect(result.error).toBeUndefined()
  })
})

// // import {
// //   apiDeleteTask,
// //   apiNewTask,
// //   apiUpdateList,
// //   apiUpdateTask,
// // } from '../../apis/task'
// import * as axiosRequest from '../../helpers/axiosRequest'
// import { convertDatetoISO } from '../../helpers/date'

// describe('Create new task', () => {
//   const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

//   afterEach(() => {
//     jest.resetAllMocks()
//     jest.clearAllMocks()
//     jest.resetModules()
//   })

//   const reqData: any = {
//     id: 'abc',
//     _id: 'efg',
//     title: 'highk',
//     description: 'lmnop',
//     status: 'todo',
//     startsAt: new Date(Date.now()),
//     endsAt: new Date(Date.now()),
//   }

//   const options = {
//     method: 'POST',
//     url: '/task',
//     data: {
//       title: reqData.title,
//       description: reqData.description,
//       status: reqData.status,
//       startsAt: reqData.startsAt ? convertDatetoISO(reqData.startsAt) : '',
//       endsAt: reqData.endsAt ? convertDatetoISO(reqData.endsAt) : '',
//     },
//   }

//   test('Fails to create task', async () => {
//     axiosRequestSpy.mockRejectedValue(new Error('Failed to create task'))

//     const result = await apiNewTask(reqData)
//     expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
//     expect(axiosRequestSpy).toHaveBeenCalledWith(options)
//     expect(result.data).toBeUndefined()
//     expect(result.error.message).toBe('Failed to create task')
//   })

//   test('Successfully creates task', async () => {
//     axiosRequestSpy.mockResolvedValueOnce({
//       data: 'task obj',
//       error: undefined,
//     })

//     const result = await apiNewTask(reqData)
//     expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
//     expect(axiosRequestSpy).toHaveBeenCalledWith(options)
//     expect(result.data).toBe('task obj')
//     expect(result.error).toBeUndefined()
//   })
// })

// describe('Update task', () => {
//   const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

//   afterEach(() => {
//     jest.resetAllMocks()
//     jest.clearAllMocks()
//     jest.resetModules()
//   })

//   const reqData: any = {
//     id: 'abc',
//     title: 'highk',
//     description: 'lmnop',
//     status: 'todo',
//     startsAt: new Date(Date.now()),
//     endsAt: new Date(Date.now()),
//   }

//   const options = {
//     method: 'PATCH',
//     url: '/task',
//     data: {
//       title: reqData.title,
//       id: reqData.id,
//       description: reqData.description,
//       status: reqData.status,
//       startsAt: reqData.startsAt ? convertDatetoISO(reqData.startsAt) : '',
//       endsAt: reqData.endsAt ? convertDatetoISO(reqData.endsAt) : '',
//     },
//   }

//   test('Fails to update task', async () => {
//     axiosRequestSpy.mockRejectedValue(new Error('Failed to update task'))

//     const result = await apiUpdateTask(reqData)
//     expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
//     expect(axiosRequestSpy).toHaveBeenCalledWith(options)
//     expect(result.data).toBeUndefined()
//     expect(result.error.message).toBe('Failed to update task')
//   })

//   test('Successfully updates task', async () => {
//     axiosRequestSpy.mockResolvedValueOnce({
//       data: 'task obj',
//       error: undefined,
//     })

//     const result = await apiUpdateTask(reqData)
//     expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
//     expect(axiosRequestSpy).toHaveBeenCalledWith(options)
//     expect(result.data).toBe('task obj')
//     expect(result.error).toBeUndefined()
//   })
// })

// describe('Delete task', () => {
//   const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

//   afterEach(() => {
//     jest.resetAllMocks()
//     jest.clearAllMocks()
//     jest.resetModules()
//   })

//   const ids = ['abc', 'efg']

//   const options = {
//     method: 'DELETE',
//     url: '/task',
//     data: {
//       ids,
//     },
//   }

//   test('Fails to delete task', async () => {
//     axiosRequestSpy.mockRejectedValue(new Error('Failed to delete task'))

//     const result = await apiDeleteTask(ids)
//     expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
//     expect(axiosRequestSpy).toHaveBeenCalledWith(options)
//     expect(result.data).toBeUndefined()
//     expect(result.error.message).toBe('Failed to delete task')
//   })

//   test('Successfully deletes task', async () => {
//     axiosRequestSpy.mockResolvedValueOnce({
//       data: 'task obj',
//       error: undefined,
//     })

//     const result = await apiDeleteTask(ids)
//     expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
//     expect(axiosRequestSpy).toHaveBeenCalledWith(options)
//     expect(result.data).toBe('task obj')
//     expect(result.error).toBeUndefined()
//   })
// })

// describe('Updates task list', () => {
//   const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

//   const list = 'data'

//   afterEach(() => {
//     jest.resetAllMocks()
//     jest.clearAllMocks()
//     jest.resetModules()
//   })

//   test('Fails to change tracker position', async () => {
//     axiosRequestSpy.mockRejectedValue(new Error('Failed to change position'))
//     const result = await apiUpdateList(list)
//     expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
//     expect(result.data).toBeUndefined()
//     expect(result.error.message).toBe('Failed to change position')
//   })

//   test('Successfully changes tracker position', async () => {
//     axiosRequestSpy.mockResolvedValue({ data: 'success', error: undefined })
//     const result = await apiUpdateList(list)
//     expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
//     expect(result.data).toBe('success')
//     expect(result.error).toBeUndefined()
//   })
// })

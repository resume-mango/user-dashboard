// import axios from 'axios'
// import axiosRequest from '../helpers/axiosRequest'
// import { convertDatetoISO } from '../helpers/date'

import axios from 'axios'

export interface ITask {
  id?: string
  _id?: string
  title: string
  description: string
  status?: 'todo' | 'inprogress' | 'completed'
  startsAt: Date
  endsAt: Date
}

// export const apiNewTask = async (reqData: ITask) => {
//   let data: ITask
//   let error: string
//   try {
//     const { title, description, status, startsAt, endsAt } = reqData

//     const options = {
//       method: 'POST',
//       url: '/task',
//       data: {
//         title,
//         description,
//         status,
//         startsAt: startsAt ? convertDatetoISO(startsAt) : '',
//         endsAt: endsAt ? convertDatetoISO(endsAt) : '',
//       },
//     }
//     const res = await axiosRequest(options)
//     data = res.data as any
//     error = res.error
//     return { data, error }
//   } catch (err: any) {
//     return { data: undefined, error: err }
//   }
// }

// export const apiUpdateTask = async (reqData: ITask) => {
//   let data: ITask
//   let error: string
//   try {
//     const { id, title, description, status, startsAt, endsAt } = reqData
//     const options = {
//       method: 'PATCH',
//       url: '/task',
//       data: {
//         id,
//         title,
//         description,
//         status,
//         startsAt: startsAt ? convertDatetoISO(startsAt) : '',
//         endsAt: endsAt ? convertDatetoISO(endsAt) : '',
//       },
//     }
//     const res = await axiosRequest(options)
//     data = res.data as any
//     error = res.error
//     return { data, error }
//   } catch (err: any) {
//     return { data: undefined, error: err }
//   }
// }

// export const apiDeleteTask = async (ids: Array<string>) => {
//   let data: ITask
//   let error: string
//   try {
//     const options = {
//       method: 'DELETE',
//       url: '/task',
//       data: {
//         ids,
//       },
//     }
//     const res = await axiosRequest(options)
//     data = res.data as any
//     error = res.error
//     return { data, error }
//   } catch (err: any) {
//     return { data: undefined, error: err }
//   }
// }

// let cancelToken: any

// export const apiUpdateList = async (list: any) => {
//   let data: ITask
//   let error: string

//   if (typeof cancelToken !== typeof undefined) {
//     cancelToken.cancel('Cancelling previous requests')
//   }

//   cancelToken = axios.CancelToken.source()

//   try {
//     const options = {
//       method: 'PATCH',
//       url: '/task/position',
//       cancelToken: cancelToken.token,
//       data: {
//         todo: list.todo,
//         inprogress: list.inprogress,
//         completed: list.completed,
//       },
//     }
//     const res = await axiosRequest(options)
//     data = res.data as any
//     error = res.error
//     return { data, error }
//   } catch (err: any) {
//     return { data: undefined, error: err }
//   }
// }

let cancelToken: any
export const apiChangeTaskPos = async (reqData: any) => {
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel('Cancelling previous requests')
  }

  cancelToken = axios.CancelToken.source()

  const options = {
    method: 'PATCH',
    url: '/task/position',
    data: reqData,
    cancelToken: cancelToken.token,
  }
  const res: { data: any; error: any } = await axios
    .request(options as any)
    .then((res) => {
      return { data: res.data, error: undefined }
    })
    .catch((error) => {
      {
        return { data: undefined, error: error }
      }
    })
  return res
}

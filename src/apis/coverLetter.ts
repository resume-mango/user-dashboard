import axios from 'axios'
import axiosRequest from '../helpers/axiosRequest'

export const downloadCoverLetter = async (id: string, type: string) => {
  let res
  const options = {
    method: 'GET',
    url: `/coverletter/download/${id}/${type}`,
    responseType: 'blob',
  }
  try {
    res = await axios.request(options as any)
    return res
  } catch (err: any) {
    if (err.response && err.response.data) {
      const data = await new Response(err.response.data).text()
      const message = JSON.parse(data).error.message || null
      console.log(message)
      if (message && message === 'download limits reached!') {
        return (res = 'limit reached')
      }
    }
    return (res = null)
  }
}

export const newCoverLetter = async (templateName?: string) => {
  let data
  let error: string

  const options = {
    method: 'POST',
    url: '/coverletter',
    data: {
      template: templateName,
    },
  }

  try {
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}

let cancelToken: any

export const updateCoverLetter = async (reqData: any) => {
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel('Cancelling previous requests')
  }

  cancelToken = axios.CancelToken.source()

  const options = {
    method: 'PATCH',
    url: '/coverletter',
    cancelToken: cancelToken.token,
    data: reqData,
  }

  const res: { data: any; error: any } = await axios
    .request(options as any)
    .then((res) => {
      return { data: res.data, error: undefined }
    })
    .catch((error: any) => {
      {
        return { data: undefined, error: error }
      }
    })
  return res
}

export const deleteCoverLetter = async (id: string) => {
  let data
  let error: string

  const options = {
    method: 'DELETE',
    url: `/coverletter/${id}`,
  }

  try {
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}

import axios from "axios"
import axiosRequest from "../helpers/axiosRequest"
import { trackCreation } from "../helpers/tracking/events"

export const downloadResume = async (id: string, type: string) => {
  let res
  const options = {
    method: "GET",
    url: `/resume/download/${id}/${type}`,
    responseType: "blob",
  }
  try {
    res = await axios.request(options as any)

    return res
  } catch (err: any) {
    if (err.response && err.response.data) {
      const data = await new Response(err.response.data).text()
      const message = JSON.parse(data).error?.message || null
      if (message && message === "download limits reached!") {
        return (res = "limit reached")
      }
    }
    return (res = null)
  }
}

export const newResume = async (templateName?: string) => {
  let data
  let error: string

  const options = {
    method: "POST",
    url: "/resume",
    data: {
      template: templateName,
    },
  }

  try {
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    if (res.data) {
      trackCreation("resume")
    }
    return { data, error }
  } catch (err: any) {
    return { data: undefined, error: err }
  }
}

let cancelToken: any

export const updateResume = async (reqData: any) => {
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Cancelling previous requests")
  }

  cancelToken = axios.CancelToken.source()

  const options = {
    method: "PATCH",
    url: "/resume",
    cancelToken: cancelToken.token,
    data: reqData,
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

export const uploadPicture = async (id: string, reqData: any) => {
  let data
  let error: string

  const options = {
    method: "PATCH",
    url: `/resume/${id}/avatar`,
    headers: { "Content-Type": "multipart/form-data" },
    data: reqData,
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

export const deletePicture = async (id: string) => {
  let data
  let error: string

  const options = {
    method: "DELETE",
    url: `/resume/${id}/avatar`,
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

export const deleteResume = async (id: string) => {
  let data
  let error: string

  const options = {
    method: "DELETE",
    url: `/resume/${id}`,
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

import axios from 'axios'

let cancelToken: any

export const apiChangeTrackerPos = async (reqData: any) => {
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel('Cancelling previous requests')
  }

  cancelToken = axios.CancelToken.source()

  const options = {
    method: 'PATCH',
    url: '/progress-tracker/position',
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

import axios, { AxiosResponse } from 'axios'
/**
 * Axios api request helper
 * @param options axios request options
 * @returns data | error
 */
const axiosRequest = async (
  options: any
): Promise<{ data: any; error: any }> => {
  let data: any = ''
  let error: any = ''
  try {
    const { data: res }: AxiosResponse<any> = await axios.request(options)
    data = res || ''
  } catch (err: any) {
    error =
      (err.response && err.response.data && err.response.data.error.message) ||
      'Something went wrong!'
  }

  return { data, error }
}

export default axiosRequest

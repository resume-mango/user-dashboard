import { QueryClient } from 'react-query'
import { deleteCoverLetter, downloadCoverLetter } from '../apis/coverLetter'
import { deleteResume, downloadResume } from '../apis/resume'
import { INotify } from '../contexts/notify'

/**
 * Resume / Coverletter download handler
 * @param id resume / coverletter _id
 * @param type 'pdf' | 'docx' | 'txt' type of document
 * @param loading state as string or null
 * @param setLoading setState fn
 * @param show state as 'resume' | 'coverletter'
 * @param setShowDownload setState fn
 * @returns void
 */
export const handleResumeCoverLetterDownload = async (
  id: string,
  type: 'pdf' | 'docx' | 'txt',
  loading: string | null,
  setLoading: (_val: any) => void,
  show: 'resume' | 'coverletter',
  setShowDownload: (_val: any) => void
) => {
  try {
    if (loading) return false
    setLoading(id)
    setShowDownload(null)
    let res: any

    if (show === 'resume') res = await downloadResume(id, type)
    else res = await downloadCoverLetter(id, type)

    if (res && res.data) {
      const filename = 'abc.' + type

      const url = window.URL.createObjectURL(new Blob([res.data]))

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename) //or any other extension
      document.body.appendChild(link)
      link.click()
    }
    setLoading(null)
    return true
  } catch (error) {
    setLoading(null)
    return false
  }
}

/**
 * Resume / Coverletter delete handler
 * @param id resume / coverletter _id
 * @param data resume / coverletter api response data
 * @param queryClient react-query 'useQueryClient' hook
 * @param loading state as string | null
 * @param setLoading setState  fn
 * @param show state as 'resume or coverletter'
 * @param setDeleteItemId setState fn
 * @param setNotify setNotify fn from 'useNotify' Context
 * @returns void
 */
export const handleResumeCoverLetterDelete = async (
  id: string,
  data: Array<Record<string, any>>,
  queryClient: QueryClient,
  loading: string | null,
  setLoading: (_val: any) => void,
  show: 'resume' | 'coverletter',
  setDeleteItemId: (_val: any) => void,
  setNotify: (_notify: INotify | null) => void
) => {
  setDeleteItemId(null)
  if (loading) return
  setLoading(id)
  try {
    if (show === 'resume') {
      const { data: resData, error } = await deleteResume(id)
      if (resData && !error) {
        const newData = data.filter((item: any) => item._id !== id)

        queryClient.setQueryData('resumes', newData)
      } else throw new Error('Failed')
    } else {
      const { data: resData, error } = await deleteCoverLetter(id)
      if (resData && !error) {
        const newData = data.filter((item: any) => item._id !== id)
        queryClient.setQueryData('coverletters', newData)
      } else throw new Error('Failed')
    }
    setLoading(null)

    return true
  } catch (err) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete design',
    })
    setLoading(null)

    return false
  }
}

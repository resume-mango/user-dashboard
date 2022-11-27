import axios from 'axios'
import { UseFormReset, UseFormWatch } from 'react-hook-form/dist/types/form'
import { QueryClient } from 'react-query'
import {
  deleteCoverLetter,
  downloadCoverLetter,
  newCoverLetter,
  updateCoverLetter,
} from '../apis/coverLetter'
/**
 * Creates new Coverletter
 * @param templateName name of the coverletter template
 * @param history from UseHistory() hook
 * @param queryClient from QueryClient hook
 */
export const createNewCoverletter = async (
  templateName: string,
  history: any,
  queryClient: QueryClient
): Promise<boolean> => {
  const { data, error } = await newCoverLetter(templateName)
  if (data && !error) {
    queryClient.setQueryData(['coverletter', data._id], data)
    history.replace(`/coverletters/edit/${data._id}`)
    return true
  } else {
    return false
  }
}

/**
 * Deletes single user coverletter
 * @param id coverletter object _id
 * @param data all coverletters list from getAllCoverLetters()
 * @param loading coverletter id in loading state or null
 * @param setLoading setState fn
 * @param setDeleteItemId setState fn
 * @param setNotify from useNotify()
 * @param queryClient from useQureyClient
 * @returns void
 */
export const deleteSingleCoverletter = async (
  id: string,
  data: Record<string, any>,
  loading: string | null,
  setLoading: (_val: any) => void,
  setDeleteItemId: (_val: any) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  setDeleteItemId(null)
  if (loading) return
  setLoading(id)
  try {
    const { data: resData, error } = await deleteCoverLetter(id)

    if (resData && !error) {
      if (!data || !data.items) return
      const newData = data.items.filter((item: any) => item._id !== id)
      data.items = newData
      queryClient.setQueryData('coverletters', data)
    } else throw new Error('Failed to delete coverletter')
  } catch (err) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete coverletter',
    })
  }
  return setLoading(null)
}

/**
 * Download user created coverletter
 * @param name titile of the coverletter
 * @param id down object _id
 * @param type document type to download
 * @param setNotify from useNotify()
 * @param setLimitsReached setState fn
 * @returns void
 */
export const handleCoverletterDownload = async (
  name: string,
  id: string,
  type: 'pdf' | 'docx' | 'txt',
  setNotify: (_val: any) => void,
  setLimitsReached: (_val: boolean) => void
) => {
  const res: any = await downloadCoverLetter(id, type)

  if (res) {
    if (res === 'limit reached') {
      return setLimitsReached(true)
    }
    if (res.data) {
      const docName = name
        ? name.replaceAll(/\s/g, '-')
        : 'untitled-coverletter'

      const filename = docName + '.' + type

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return window.URL.revokeObjectURL(url)
    }
  }
  return setNotify({
    type: 'danger',
    heading: 'Err!',
    message: 'Failed to donwload design',
  })
}

/**
 * Handlers resume form submit
 * @param template Name of the template
 * @param type type of template user want to download
 * @param initialData initaal resume data
 * @param data user filled form data from handleSubmit()
 * @param watch form useFrom() | useFormContext()
 * @param reset form useFrom() | useFormContext()
 * @param setSubmitSuccess setState fn
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient
 * @param setLimitsReached setState fn
 * @returns boolean
 */
export const submitCoveletterForm = async (
  template: string,
  type: 'txt' | 'pdf' | 'docx' | null | undefined,
  initialData: any,
  data: any,
  watch: UseFormWatch<any>,
  reset: UseFormReset<any>,
  setSubmitSuccess: (_val: any) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient,
  setLimitsReached: (_val: boolean) => void
) => {
  let result = false

  try {
    setSubmitSuccess(false)
    if (!data) return
    const { data: resData, error } = await updateCoverLetter({
      title: data.title,
      template,
      id: initialData._id,
      ...data,
    })

    if (resData && !error) {
      if (type) {
        const name = resData.title ? resData.title : ''
        await handleCoverletterDownload(
          name,
          initialData._id,
          type as any,
          setNotify,
          setLimitsReached
        )
      }

      const coverletters: Array<any> | undefined =
        queryClient.getQueryData('coverletters')
      if (coverletters) {
        const find = coverletters.findIndex((item) => item._id === resData._id)
        if (find >= 0) {
          coverletters.splice(find, 1, resData)
        } else {
          coverletters.unshift(resData)
        }
        queryClient.setQueryData('coverletters', coverletters)
      }
      resData.fields = watch()

      queryClient.setQueryData(['coverletter', resData._id], resData)
      setSubmitSuccess(true)
      reset(
        {},
        {
          keepDirty: false,
          keepValues: true,
          keepIsValid: true,
          keepErrors: true,
        }
      )
    } else {
      if (axios.isCancel(error)) setSubmitSuccess(true)
      else {
        throw new Error('Failed to update design')
      }
    }
    result = true
  } catch (err) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to update design',
    })
  }
  return result
}

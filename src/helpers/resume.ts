import axios from 'axios'
import { UseFormReset, UseFormWatch } from 'react-hook-form/dist/types/form'
import { QueryClient } from 'react-query'
import {
  deletePicture,
  deleteResume,
  downloadResume,
  updateResume,
  uploadPicture,
} from '../apis/resume'
import { IImgTransformStyle } from '../typings/imageUpload'
import { IResumeDefault } from '../typings/resume'

/**
 * Uploads Resume Avatar
 * @param formData multipart/form-data"
 * @param data resume data object
 * @param loading state as boolean
 * @param setLoading setstate Fn
 * @param setValue from useFormContext()
 * @param setNotify from useNotify()
 * @returns void
 */
export const uploadResumeAvatar = async (
  formData: FormData,
  data: IResumeDefault & {
    id: string | null
  },
  loading: boolean,
  setLoading: (_val: boolean) => void,
  setValue: any,
  setNotify: (_val: any) => void
) => {
  if (loading || !data.id) return
  setLoading(true)
  try {
    const { data: resData, error } = await uploadPicture(data.id, formData)
    if (resData && !error) {
      setValue('avatar', resData.fields.avatar)
    } else {
      throw new Error('Failed to upload image')
    }
  } catch (err) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to upload image',
    })
  }

  return setLoading(false)
}

/**
 * Deletes uploaded resume avatar
 * @param data resume data object
 * @param loading state
 * @param setLoading setState fn
 * @param setValue from useFormContext()
 * @param setNotify from useNotify()
 * @returns boolean
 */
export const deleteResumeAvatar = async (
  data: IResumeDefault & {
    id: string | null
  },
  loading: boolean,
  setLoading: (_val: boolean) => void,
  setValue: any,
  setNotify: (_val: any) => void
) => {
  if (loading || !data.id) return
  setLoading(true)
  try {
    const { data: resData, error } = await deletePicture(data.id)
    if (resData && !error) {
      /* istanbul ignore next line */
      setValue('avatar', resData.fields.avatar)
    } else throw new Error('Failed to delete Image')
  } catch (err) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete image',
    })
  }

  return setLoading(false)
}

/**
 * Appends image blob to form data
 * @param orignalImage unproccessed image file blob / url string
 * @param processedCanvas proccessed blob from canvas
 * @param style image transform styles
 * @param data resume data object
 * @param loading state
 * @param setLoading setState fn
 * @param setValue from useFormContext()
 * @param setNotify from useNotify()
 */
export const appendBlobToFromData = async (
  orignalImage: File | string,
  processedCanvas: HTMLCanvasElement,
  style: IImgTransformStyle,
  data: IResumeDefault & {
    id: string | null
  },
  loading: boolean,
  setLoading: (_val: any) => void,
  setValue: any,
  setNotify: (_val: any) => void
) => {
  const formData = new FormData()

  return processedCanvas.toBlob(
    (blob) => {
      /* istanbul ignore next line */
      processdCanvasToBlob(
        blob,
        formData,
        orignalImage,
        style,
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
    },
    'image/jpeg',
    80
  )
}

/**
 * Appends formdata and uploads
 * @param blob Blob | null
 * @param formData from FormData()
 * @param orignalImage unproccessed image file blob / url string
 * @param style image transform styles
 * @param data resume data object
 * @param loading state
 * @param setLoading setState fn
 * @param setValue from useFormContext()
 * @param setNotify from useNotify()
 * @returns
 */
export const processdCanvasToBlob = (
  blob: Blob | null,
  formData: FormData,
  orignalImage: File | string,
  style: IImgTransformStyle,
  data: IResumeDefault & {
    id: string | null
  },
  loading: boolean,
  setLoading: (_val: any) => void,
  setValue: any,
  setNotify: (_val: any) => void
) => {
  if (!blob) return
  formData.append('processed', blob, 'processed.jpg')
  formData.append('image', orignalImage)
  formData.append('style', JSON.stringify(style))
  return uploadResumeAvatar(
    formData,
    data,
    loading,
    setLoading,
    setValue,
    setNotify
  )
}

/**
 * Deletes single user resume
 * @param id resume object _id
 * @param data resume data
 * @param loading resume id in loading state or null
 * @param setLoading setState fn
 * @param setDeleteItemId setState fn
 * @param setNotify from useNotify()
 * @param queryClient from useQureyClient
 * @returns void
 */
export const deleteSigleResume = async (
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
    const { data: resData, error } = await deleteResume(id)
    if (resData && !error) {
      if (!data || !data.items) return
      const newData = data.items.filter((item: any) => item._id !== id)
      data.items = newData
      queryClient.setQueryData('resumes', data)
    } else throw new Error('Failed to delete resume')
  } catch (err) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete resume',
    })
  }
  return setLoading(null)
}

/**
 * Download user created resume
 * @param name titile of the resume
 * @param id resume object _id
 * @param type document type to download
 * @param setNotify from useNotify()
 * @param setLimitsReached from setState fn
 * @returns void
 */
export const handleResumeDownload = async (
  name: string,
  id: string,
  type: 'pdf' | 'docx' | 'txt',
  setNotify: (_val: any) => void,
  setLimitsReached?: (_val: boolean) => void
) => {
  const res: any = await downloadResume(id, type)

  if (res) {
    if (res === 'limit reached' && setLimitsReached) {
      return setLimitsReached(true)
    }

    if (res.data) {
      const docName = name ? name.replaceAll(/\s/g, '-') : 'untitled-resume'

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
 * Toggles resume accoridan
 * @param name field of the accoridan
 * @param accordian accordian object from data
 * @param defaultValues defauly values for accordian
 * @param append from useFieldArray()
 * @param show should expand accordian
 * @param setShow setState fn
 * @param setOpen setState Fn
 */
export const resumeToggleAccordian = (
  name: string,
  accordian: any,
  defaultValues: any,
  append: any,
  show: boolean,
  setShow: (_val: any) => void,
  setOpen: (_val: any) => void
) => {
  if (!show) {
    if (!accordian || accordian.length === 0) {
      const values: any = defaultValues
      setOpen(name + '.0')
      append(values)
    }
    return setShow(name)
  } else {
    return setShow(null)
  }
}
/**
 * Removes items from accoridan
 * @param remove from useFieldArray()
 * @param index of the item
 */
export const resumeDeleteAccordianItem = (remove: any, index: number) => {
  return remove(index)
}

/**
 * Opens Accrodian Items
 * @param name accordian identifier
 * @param index position of item in accordian list
 * @param trigger from useFormContext()
 * @param open accoridain items thats expanded
 * @param setOpen setState fn
 */
export const resumeOpensAccordianItem = (
  name: string,
  index: number,
  trigger: any,
  open: string | null,
  setOpen: (_val: any) => void
) => {
  if (open === name + '.' + index) {
    trigger(name)
    setOpen(null)
  } else {
    setOpen(name + '.' + index)
  }
}

/**
 * Adds Items to Resume Accoridian
 * @param name accoridan identifier
 * @param fieldsCount total fields count
 * @param defaultValues defaltValues of accordian
 * @param append from useFielldArray()
 * @param setOpen setstate fn
 */
export const resumeAddItemToAccoridan = (
  name: string,
  fieldsCount: number,
  defaultValues: any,
  append: any,
  setOpen: (_val: any) => void
) => {
  const values = defaultValues
  setOpen(name + '.' + fieldsCount)
  append(values)
  //   clearErrors([`courses.${fields.length}.course`])
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
export const submitResumeFrom = async (
  template: string,
  type: 'txt' | 'pdf' | 'docx' | null | undefined,
  initialData: any,
  data: any,
  watch: UseFormWatch<any>,
  reset: UseFormReset<any>,
  setSubmitSuccess: (_val: any) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient,
  setLimitsReached?: (_val: boolean) => void
) => {
  let result = false

  try {
    setSubmitSuccess(false)
    if (!data) return result
    const { data: resData, error } = await updateResume({
      title: data.title,
      template,
      id: initialData._id,
      ...data,
    })
    if (resData && !error) {
      if (type) {
        const name = resData.title ? resData.title : ''
        await handleResumeDownload(
          name,
          initialData._id,
          type as any,
          setNotify,
          setLimitsReached
        )
      }

      const resumes: Array<any> | undefined =
        queryClient.getQueryData('resumes')
      if (resumes) {
        const find = resumes.findIndex((item) => item._id === resData._id)
        if (find >= 0) {
          resumes.splice(find, 1, resData)
        } else {
          resumes.unshift(resData)
        }
        queryClient.setQueryData('resumes', resumes)
      }

      resData.fields = watch()

      queryClient.setQueryData(['resume', resData._id], resData)
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

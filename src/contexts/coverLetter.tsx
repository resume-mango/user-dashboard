import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ICoverDefault } from '../typings/coverLetter'
import '../styled/template_global.css'
import { useNotify } from './notify'
import { useQueryClient } from 'react-query'
import { getCoverLetterTemplate } from '../queries/coverLetterQueries'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateCoverLetterSteps } from '../validations/coverletter'
import { loadFonts } from '../helpers/loadFonts'
import {
  handleCoverletterDownload,
  submitCoveletterForm,
} from '../helpers/coverletter'
import UpgradePlan from '../components/upcgradeModal'

interface Context {
  data: ICoverDefault & { id: string | null }
  isTemplateReady: boolean
  setTemplate: (name: string) => void
  templateData: any
  template: string | null
  step: number
  submitSuccess: boolean
  isSaving: boolean
  setStep: (val: number) => void
  submitCoverletter: (
    type?: 'txt' | 'pdf' | 'docx' | null,
    autoSave?: boolean
  ) => void
}

const defaultValues = {
  title: '',
  first_name: '',
  last_name: '',
  email_address: '',
  phone_number: '',
  designation: '',
  address: '',
  company: '',
  hiring_manager: '',
  description: '',
}

/* istanbul ignore next */
const contextValues = {
  data: { ...defaultValues, id: null },
  templateData: null,
  template: null,
  step: 1,
  submitSuccess: false,
  isSaving: false,
  setStep: () => {
    return undefined
  },
  setTemplate: () => {
    return undefined
  },
  submitCoverletter: () => {
    return undefined
  },
  isTemplateReady: false,
}

const CoverLetterContext = React.createContext<Context>(contextValues)

const CoverLetterProvider = ({ initialData, templateName, children }: any) => {
  const [cssReady, setCssReady] = useState(false)
  const [fontsReady, setFontsReady] = useState(false)
  const [template, setTemplate] = useState('template1')
  const [queryEnabled, setQueryEnabled] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [limitsReached, setLimitsReached] = useState(false)

  const { setNotify } = useNotify()
  const queryClient = useQueryClient()

  const methods = useForm<ICoverDefault>({
    mode: 'onChange',
    defaultValues,
    criteriaMode: 'all',
    resolver: yupResolver(validateCoverLetterSteps),
  })

  const {
    data: templateData,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
  } = getCoverLetterTemplate(template, queryEnabled && !!templateName)

  const {
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { isValid, isDirty },
  } = methods

  useEffect(() => {
    if (!initialData) return
    if (initialData.template) {
      setTemplate(initialData.template)
    }

    const { fields } = initialData

    if (!fields) return
    const formData = {
      title: initialData.title || 'Untitled',
      first_name: fields.first_name || '',
      last_name: fields.last_name || '',
      email_address: fields.email_address || '',
      phone_number: fields.phone_number || '',
      designation: fields.designation || '',
      address: fields.address || '',
      company: fields.company || '',
      hiring_manager: fields.hiring_manager || '',
      description: fields.description || '',
    }
    reset(formData, {
      keepDirty: true,
      keepIsValid: true,
      keepErrors: true,
    })
    setQueryEnabled(true)
  }, [initialData])

  useEffect(() => {
    setCssReady(false)
  }, [template])

  const loadTemplateFonts = async () => {
    await loadFonts(templateData.fonts)
    return setFontsReady(true)
  }

  useEffect(() => {
    if (
      !queryEnabled ||
      !templateData ||
      !templateData.fonts ||
      templateData.fonts === 0
    )
      return
    setFontsReady(false)
    loadTemplateFonts()

    // if ('fonts' in document) {
    //   Promise.all(
    //     templateData.fonts.map((font: any) => {
    //       const face = new FontFace(
    //         font.name,
    //         `url(${font.url}) format('${font.format}')`
    //       )
    //       face.style = font.style
    //       face.weight = font.weight
    //       return face.load()
    //     })
    //   ).then(function (loadedFonts) {
    //     loadedFonts &&
    //       loadedFonts.forEach(function (font) {
    //         if (font) document.fonts.add(font as FontFace)
    //         return
    //       })
    //     setFontsReady(true)
    //   })
    // }
    return () => setFontsReady(true)
  }, [templateData, queryEnabled])

  useEffect(() => {
    if (!document || !queryEnabled || cssReady) return
    const old = document.getElementById('css_style')
    if (old) {
      old.remove()
    }

    const link = document.createElement('link')
    link.id = 'css_style'
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute(
      'href',
      `${process.env.API_HOST}/css/coverletters/${template}.css`
    )
    /* istanbul ignore next */
    link.onload = () => {
      setCssReady(true)
    }
    /* istanbul ignore next */
    link.onerror = () => {
      return console.log('stylesheet could not be loaded')
    }
    document.head.appendChild(link)
    return () => {
      setCssReady(true)
    }
  }, [cssReady, queryEnabled])

  const currData = watch()

  const regex = /(<([^>]+)>)/gi
  const hasTextinDescription = !!currData.description.replace(regex, '').length

  useEffect(() => {
    if (!hasTextinDescription && isDirty) {
      setValue('description', '')
    }
  }, [currData.description])

  const submitCoverletter = async (
    type?: 'txt' | 'pdf' | 'docx' | null,
    autoSave?: boolean
  ) => {
    const submitForm = async (data: any) => {
      return await submitCoveletterForm(
        template,
        type,
        initialData,
        data,
        watch,
        reset,
        setSubmitSuccess,
        setNotify,
        queryClient,
        setLimitsReached
      )
    }
    // const donwnloadHandler = async (name: string, id: string, type: string) => {
    //   const res: any = await downloadCoverLetter(id, type)
    //   if (res) {
    //     const docName = name
    //       ? name.replaceAll(/\s/g, '-')
    //       : 'untitled-coverletter'

    //     const filename = docName + '.' + type
    //     const url = window.URL.createObjectURL(new Blob([res.data]))
    //     const link = document.createElement('a')
    //     link.href = url
    //     link.setAttribute('download', filename)
    //     document.body.appendChild(link)
    //     link.click()
    //     document.body.removeChild(link)
    //     window.URL.revokeObjectURL(url)
    //   } else {
    //     setNotify({
    //       type: 'danger',
    //       heading: 'Err!',
    //       message: 'Failed to donwload design',
    //     })
    //   }
    // }
    // const submitForm = async (data: any) => {
    //   try {
    //     setSubmitSuccess(false)
    //     if (!data) return
    //     const { data: resData, error } = await updateCoverLetter({
    //       title: data.title,
    //       template,
    //       id: initialData._id,
    //       ...data,
    //     })
    //     if (error) {
    //       !axios.isCancel(error) &&
    //         setNotify({
    //           type: 'danger',
    //           heading: 'Err!',
    //           message: 'Failed to update design',
    //         })
    //     }
    //     if (resData) {
    //       if (type) {
    //         const name = resData.fields ? resData.fields.first_name : ''
    //         await donwnloadHandler(name, resData._id, type)
    //       }

    //       const coverletters: Array<any> | undefined =
    //         queryClient.getQueryData('coverletters')
    //       if (coverletters) {
    //         const find = coverletters.findIndex(
    //           (item) => item._id === resData._id
    //         )
    //         if (find >= 0) {
    //           coverletters.splice(find, 1, resData)
    //         } else {
    //           coverletters.unshift(resData)
    //         }
    //         queryClient.setQueryData('coverletters', coverletters)
    //       }
    //       resData.fields = watch()

    //       queryClient.setQueryData(['coverletter', resData._id], resData)
    //       setSubmitSuccess(true)
    //       reset(
    //         {},
    //         {
    //           keepDirty: false,
    //           keepValues: true,
    //           keepIsValid: true,
    //           keepErrors: true,
    //         }
    //       )
    //     }
    //   } catch (err) {
    //     setNotify({
    //       type: 'danger',
    //       heading: 'Err!',
    //       message: 'Something went wrong!',
    //     })
    //   }
    // }

    if (!autoSave) {
      trigger()
      if (!isValid) {
        return setNotify({
          type: 'warning',
          heading: 'Invalid fields!',
          message: 'Valid fields are required to proceed',
        })
      }
    }

    if (isDirty || initialData.template !== template) {
      setIsSaving(true)
      await handleSubmit(submitForm)()
      setIsSaving(false)
    } else {
      setIsSaving(true)
      const name = currData.first_name
      await handleCoverletterDownload(
        name,
        initialData._id,
        type as any,
        setNotify,
        setLimitsReached
      )
      setIsSaving(false)
    }
  }

  return (
    <CoverLetterContext.Provider
      value={{
        data: { ...currData, id: initialData ? initialData._id : null },
        isTemplateReady:
          cssReady &&
          !isTemplateLoading &&
          templateData &&
          fontsReady &&
          queryEnabled,
        templateData,
        submitSuccess,
        setTemplate,
        template,
        submitCoverletter,
        step,
        setStep,
        isSaving,
      }}
    >
      {limitsReached && (
        <UpgradePlan handleClose={() => setLimitsReached(false)} />
      )}
      <FormProvider {...methods}>{children}</FormProvider>
    </CoverLetterContext.Provider>
  )
}

export default CoverLetterProvider

const useCoverLetter = () => {
  const {
    data,
    isTemplateReady,
    templateData,
    setTemplate,
    template,
    submitCoverletter,
    submitSuccess,
    step,
    setStep,
    isSaving,
  } = React.useContext(CoverLetterContext)

  return {
    data,
    isTemplateReady,
    templateData,
    setTemplate,
    template,
    submitCoverletter,
    submitSuccess,
    step,
    setStep,
    isSaving,
  }
}

export { CoverLetterProvider, useCoverLetter }

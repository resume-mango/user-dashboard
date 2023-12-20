import React, { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { IResumeDefault } from "../typings/resume"
import "../styled/template_global.css"
import { getResumeTemplate } from "../queries/resumeQueries"
import { useNotify } from "./notify"
import { useQueryClient } from "react-query"
import { yupResolver } from "@hookform/resolvers/yup"
import { validateResumeFrom } from "../validations/resume"
import { handleResumeDownload, submitResumeFrom } from "../helpers/resume"
import { loadFonts } from "../helpers/loadFonts"
import UpgradePlan from "../components/upcgradeModal"

interface Context {
  data: IResumeDefault & { id: string | null }
  isTemplateReady: boolean
  templateData: any
  template: string | null
  step: number
  submitSuccess: boolean
  isSaving: boolean
  setStep: (val: number) => void
  setTemplate: (name: string) => void
  submitResume: (
    type?: "txt" | "pdf" | "docx" | null,
    autoSave?: boolean
  ) => any
}

const defaultAvatar = {
  blank: true,
  orignal: "",
  processed: "",
  style: {
    width: 0,
    height: 0,
    rotate: 0,
    scale: 1,
    pos: {
      x: 0.5,
      y: 0.5,
    },
  },
}

const defaultValues = {
  title: "Untitled",
  first_name: "",
  last_name: "",
  email_address: "",
  phone_number: "",
  avatar: defaultAvatar,
  designation: "",
  address: "",
  about_info: "",
  experience: [],
  education: [],
  skills: [],
  courses: [],
  internships: [],
  references: [],
  languages: [],
}

/* istanbul ignore next */
const contextValues = {
  data: { ...defaultValues, id: null },
  isTemplateReady: false,
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
  submitResume: () => {
    return undefined
  },
}

const ResumeContext = React.createContext<Context>(contextValues)

const ResumeProvider = ({ initialData, templateName, children }: any) => {
  const [cssReady, setCssReady] = useState(false)
  const [fontsReady, setFontsReady] = useState(false)
  const [queryEnabled, setQueryEnabled] = useState(false)
  const [step, setStep] = useState(1)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [template, setTemplate] = useState(templateName)
  const [limitsReached, setLimitsReached] = useState(false)
  const { setNotify } = useNotify()
  const queryClient = useQueryClient()

  const methods = useForm<IResumeDefault>({
    mode: "onChange",
    defaultValues,
    criteriaMode: "all",
    resolver: yupResolver(validateResumeFrom),
  })
  const {
    data: templateData,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
  } = getResumeTemplate(template, queryEnabled && !!templateName)

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
    const resumeData = {
      title: initialData.title || "Untitled",
      first_name: fields.first_name || "",
      last_name: fields.last_name || "",
      avatar: fields.avatar || defaultAvatar,
      email_address: fields.email_address || "",
      phone_number: fields.phone_number || "",
      designation: fields.designation || "",
      address: fields.address || "",
      about_info: fields.about_info || "",
      experience: fields.experience || [],
      education: fields.education || [],
      skills: fields.skills || [],
      courses: fields.courses || [],
      internships: fields.internships || [],
      languages: fields.languages || [],
      references: fields.references || [],
    }

    reset(resumeData, {
      keepDirty: true,
      keepIsValid: true,
      keepErrors: true,
    })
    setQueryEnabled(true)
  }, [initialData])

  useEffect(() => {
    setCssReady(false)
  }, [template])

  // console.log(templateData, 'templatedata')

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

    return () => setFontsReady(true)
  }, [templateData, queryEnabled])

  useEffect(() => {
    if (!document || !queryEnabled || cssReady) return
    const old = document.getElementById("css_style")
    if (old) {
      old.remove()
    }
    const link = document.createElement("link")
    link.id = "css_style"
    link.setAttribute("rel", "stylesheet")
    link.setAttribute("type", "text/css")
    link.setAttribute(
      "href",
      `${process.env.API_HOST}/css/resumes/${template}.css`
    )

    document.head.appendChild(link)

    /* istanbul ignore next */
    link.onload = () => {
      setCssReady(true)
    }
    /* istanbul ignore next */
    link.onerror = () => {
      return console.log("stylesheet could not be loaded")
    }
  }, [cssReady, queryEnabled])

  const currData = watch()

  const regex = /(<([^>]+)>)/gi
  const hasTextinDescription = currData.about_info.replace(regex, "").length

  useEffect(() => {
    if (!hasTextinDescription && isDirty) {
      setValue("about_info", "")
    }
  }, [currData.about_info])

  const data = queryClient.getQueriesData("resumes")

  const submitResume = async (
    type?: "txt" | "pdf" | "docx" | null,
    autoSave?: boolean
  ) => {
    const submitForm = async (data: any) => {
      return await submitResumeFrom(
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
    // const submitForm = async (data: any) => {
    //   try {
    //     setSubmitSuccess(false)
    //     if (!data) return
    //     const { data: resData, error } = await updateResume({
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
    //         const name = resData.title ? resData.title : ''
    //         await handleResumeDownload(
    //           name,
    //           initialData._id,
    //           type as any,
    //           setNotify
    //         )
    //       }

    //       const resumes: Array<any> | undefined =
    //         queryClient.getQueryData('resumes')
    //       if (resumes) {
    //         const find = resumes.findIndex((item) => item._id === resData._id)
    //         if (find >= 0) {
    //           resumes.splice(find, 1, resData)
    //         } else {
    //           resumes.unshift(resData)
    //         }
    //         queryClient.setQueryData('resumes', resumes)
    //       }

    //       resData.fields = watch()

    //       queryClient.setQueryData(['resume', resData._id], resData)
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
          type: "warning",
          heading: "Invalid fields!",
          message: "Valid fields are required to proceed",
        })
      }
    }

    if (isDirty || initialData.template !== template) {
      setIsSaving(true)
      await handleSubmit(submitForm)()
      setIsSaving(false)
    } else {
      setIsSaving(true)
      const name = currData.title
      await handleResumeDownload(
        name,
        initialData._id,
        type as any,
        setNotify,
        setLimitsReached
      )
      setIsSaving(false)
    }
    return true
  }

  return (
    <ResumeContext.Provider
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
        submitResume,
        step,
        setStep,
        isSaving,
      }}
    >
      {limitsReached && (
        <UpgradePlan handleClose={() => setLimitsReached(false)} />
      )}
      <FormProvider {...methods}>{children}</FormProvider>
    </ResumeContext.Provider>
  )
}

export default ResumeProvider

const useResume = () => {
  const {
    data,
    isTemplateReady,
    templateData,
    setTemplate,
    template,
    submitResume,
    submitSuccess,
    isSaving,
    step,
    setStep,
  } = React.useContext(ResumeContext)

  return {
    data,
    isTemplateReady,
    templateData,
    setTemplate,
    template,
    submitResume,
    submitSuccess,
    isSaving,
    step,
    setStep,
  }
}

export { ResumeProvider, useResume }

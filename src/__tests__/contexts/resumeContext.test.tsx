import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import { Fragment } from 'react'
import { act } from 'react-dom/test-utils'
import * as form from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as resumeApis from '../../apis/resume'
import * as notifyContext from '../../contexts/notify'
import ResumeProvider, { useResume } from '../../contexts/resume'
import * as fontHelper from '../../helpers/loadFonts'
import * as resumeHelper from '../../helpers/resume'
import * as resumeQueries from '../../queries/resumeQueries'
import { resumesData } from '../../__mocks__/resumes'
import { resumeTemplate } from '../../__mocks__/resumeTemplate'
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('Resume Context', () => {
  const getResumeTemplateSpy = jest.spyOn(resumeQueries, 'getResumeTemplate')
  const loadFontsSpy = jest.spyOn(fontHelper, 'loadFonts')
  const useNotifySpy = jest.spyOn(notifyContext, 'useNotify')
  const useFormSpy = jest.spyOn(form, 'useForm')

  const updateResumeSpy = jest.spyOn(resumeApis, 'updateResume')
  const handleResumeDownloadSpy = jest.spyOn(
    resumeHelper,
    'handleResumeDownload'
  )

  Object.defineProperty(document, 'fonts', {
    value: { add: Promise.resolve({}), ready: Promise.resolve({}) },
  })

  beforeEach(() => {
    loadFontsSpy.mockResolvedValue(true)
    handleResumeDownloadSpy.mockResolvedValue('true' as any)
    updateResumeSpy.mockResolvedValue({ data: resumesData[1], error: null })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const Wrapper = () => {
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
    } = useResume()

    const queryClient = useQueryClient()

    queryClient.setQueryData(['resumes', { page: 0, limit: 15 }], {
      items: resumesData,
    })
    return (
      <Fragment>
        <p>Resume Data: {JSON.stringify(data.title)}</p>
        <p>Template Data: {JSON.stringify(templateData.name)}</p>
        <p>Template: {template}</p>
        <p>Is Template Ready: {isTemplateReady ? 'true' : 'false'}</p>
        <p>Step: {step}</p>
        <p>Is Saving: {isSaving ? 'true' : 'false'}</p>
        <p>Submit Success: {submitSuccess ? 'true' : 'false'}</p>
        <button onClick={() => setStep(2)}>Set Step</button>
        <button onClick={() => submitResume('pdf', true)}>Submit</button>
        <button onClick={() => submitResume('pdf', false)}>
          Submit without Autosave
        </button>

        <button onClick={() => setTemplate('template8')}>Set Template</button>
      </Fragment>
    )
  }

  test('should render successfully', async () => {
    getResumeTemplateSpy.mockReturnValue({
      data: resumeTemplate[0],
      isError: false,
      isLoading: false,
    } as any)

    const link = document.createElement('link')
    link.id = 'css_style'
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute(
      'href',
      `${process.env.API_HOST}/css/resumes/template-1.css`
    )

    document.head.appendChild(link)

    let screen: any

    await act(async () => {
      screen = render(
        <TestingWrapper>
          <ResumeProvider
            initialData={resumesData[0]}
            templateName="template-1"
          >
            <Wrapper />
          </ResumeProvider>
        </TestingWrapper>
      ) as RenderResult
    })

    await waitFor(() => {
      expect(getResumeTemplateSpy).toBeCalled()
    })
    const data = screen.getByText(/Resume Data:/) as HTMLElement
    const templateData = screen.getByText(/Template Data:/i) as HTMLElement
    const template = screen.getByText(/Template:/i) as HTMLElement
    const isTemplateReady = screen.getByText(
      /Is Template Ready:/i
    ) as HTMLElement
    const step = screen.getByText(/Step:/i) as HTMLElement
    const IsSaving = screen.getByText(/Is Saving:/i) as HTMLElement
    const isSuccess = screen.getByText(/Submit Success:/i) as HTMLElement

    expect(data.textContent).toEqual(
      `Resume Data: ${JSON.stringify(resumesData[0].title)}`
    )
    expect(templateData.textContent).toEqual(
      `Template Data: ${JSON.stringify(resumeTemplate[0].name)}`
    )
    expect(template.textContent).toBe(`Template: ${resumeTemplate[0].name}`)
    expect(isTemplateReady.textContent).toBe(`Is Template Ready: false`)
    expect(step.textContent).toEqual('Step: 1')
    expect(IsSaving.textContent).toBe(`Is Saving: false`)
    expect(isSuccess.textContent).toBe(`Submit Success: false`)

    const setStep = screen.getByText('Set Step')
    const submit = screen.getByText('Submit')
    const setTemplate = screen.getByText('Set Template')

    fireEvent.click(setStep)

    expect(step.textContent).toEqual('Step: 2')

    fireEvent.click(setTemplate)

    expect(template.textContent).toBe(`Template: ${resumeTemplate[1].name}`)

    fireEvent.click(submit)

    expect(IsSaving.textContent).toBe(`Is Saving: true`)

    await waitFor(() => {
      expect(isSuccess.textContent).toBe(`Submit Success: true`)

      // expect(data.textContent).toEqual(
      //   `Resume Data: ${JSON.stringify(resumesData[0].title)}`
      // )
    })
  })

  test('Submit form without autoSave and download directly', async () => {
    const trigger = jest.fn()

    useFormSpy.mockReturnValue({
      trigger,
      formState: { isValid: true },
      watch: jest.fn().mockReturnValue({ about_info: '<p>Aubout info</p>' }),
      reset: jest.fn(),
    } as any)

    getResumeTemplateSpy.mockReturnValue({
      data: resumeTemplate[0],
      isError: false,
      isLoading: false,
    } as any)

    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <ResumeProvider
            initialData={resumesData[0]}
            templateName="template-1"
          >
            <Wrapper />
          </ResumeProvider>
        </TestingWrapper>
      ) as RenderResult
    })

    const submit = screen.getByText('Submit without Autosave')
    const IsSaving = screen.getByText(/Is Saving:/i) as HTMLElement

    expect(submit).toBeInTheDocument()
    fireEvent.click(submit)

    expect(trigger).toBeCalledTimes(1)
    expect(handleResumeDownloadSpy).toBeCalledTimes(1)

    await waitFor(() => {
      expect(trigger).toBeCalledTimes(1)
      expect(IsSaving.textContent).toBe(`Is Saving: false`)
    })

    expect(updateResumeSpy).not.toBeCalled()
  })

  test('Submit form without autoSave and invalid form state', async () => {
    const trigger = jest.fn()
    const setNotify = jest.fn()
    useNotifySpy.mockReturnValue({
      setNotify,
    })
    useFormSpy.mockReturnValue({
      trigger,
      formState: { isValid: false },
      watch: jest.fn().mockReturnValue({ about_info: '<p>Aubout info</p>' }),
      reset: jest.fn(),
    } as any)

    getResumeTemplateSpy.mockReturnValue({
      data: resumeTemplate[0],
      isError: false,
      isLoading: false,
    } as any)

    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <ResumeProvider
            initialData={resumesData[1]}
            templateName="template-1"
          >
            <Wrapper />
          </ResumeProvider>
        </TestingWrapper>
      ) as RenderResult
    })

    const submit = screen.getByText('Submit without Autosave')

    expect(submit).toBeInTheDocument()
    fireEvent.click(submit)

    await waitFor(() => {
      expect(trigger).toBeCalledTimes(1)
      expect(setNotify).toBeCalledTimes(1)
    })
  })
})

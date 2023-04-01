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
import * as coverletterApis from '../../apis/coverLetter'
import * as notifyContext from '../../contexts/notify'
import * as fontHelper from '../../helpers/loadFonts'
import * as coverletterHelper from '../../helpers/coverletter'
import * as coverletterQueries from '../../queries/coverLetterQueries'
import TestingWrapper from '../../__mocks__/TestingWrapper'
import CoverLetterProvider, { useCoverLetter } from '../../contexts/coverLetter'
import { coverLetterData } from '../../__mocks__/coverletters'
import { coverletterTemplate } from '../../__mocks__/coverletterTemplate'

describe('Coverletter Context', () => {
  const getCoverletterTemplateSpy = jest.spyOn(
    coverletterQueries,
    'getCoverLetterTemplate'
  )
  const loadFontsSpy = jest.spyOn(fontHelper, 'loadFonts')
  const useNotifySpy = jest.spyOn(notifyContext, 'useNotify')
  const useFormSpy = jest.spyOn(form, 'useForm')

  const updateCoverletterSpy = jest.spyOn(coverletterApis, 'updateCoverLetter')
  const handleCoverletterDownloadSpy = jest.spyOn(
    coverletterHelper,
    'handleCoverletterDownload'
  )

  Object.defineProperty(document, 'fonts', {
    value: { add: Promise.resolve({}), ready: Promise.resolve({}) },
  })

  beforeEach(() => {
    loadFontsSpy.mockResolvedValue(true)
    handleCoverletterDownloadSpy.mockResolvedValue('true' as any)
    updateCoverletterSpy.mockResolvedValue({
      data: coverLetterData[1],
      error: null,
    })
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
      submitCoverletter,
      submitSuccess,
      isSaving,
      step,
      setStep,
    } = useCoverLetter()

    const queryClient = useQueryClient()

    queryClient.setQueryData(['coverletters', { limit: 15, page: 0 }], {
      items: [coverLetterData],
    })
    return (
      <Fragment>
        <p>Coveletter Data: {JSON.stringify(data.title)}</p>
        <p>Template Data: {JSON.stringify(templateData.name)}</p>
        <p>Template: {template}</p>
        <p>Is Template Ready: {isTemplateReady ? 'true' : 'false'}</p>
        <p>Step: {step}</p>
        <p>Is Saving: {isSaving ? 'true' : 'false'}</p>
        <p>Submit Success: {submitSuccess ? 'true' : 'false'}</p>
        <button onClick={() => setStep(2)}>Set Step</button>
        <button onClick={() => submitCoverletter('pdf', true)}>Submit</button>
        <button onClick={() => submitCoverletter('pdf', false)}>
          Submit without Autosave
        </button>

        <button onClick={() => setTemplate('template8')}>Set Template</button>
      </Fragment>
    )
  }

  test('should render successfully', async () => {
    getCoverletterTemplateSpy.mockReturnValue({
      data: coverletterTemplate[0],
      isError: false,
      isLoading: false,
    } as any)

    const link = document.createElement('link')
    link.id = 'css_style'
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute(
      'href',
      `${process.env.API_HOST}/css/coverletter/template-1.css`
    )

    document.head.appendChild(link)

    let screen: any

    await act(async () => {
      screen = render(
        <TestingWrapper>
          <CoverLetterProvider
            initialData={coverLetterData[0]}
            templateName="template-1"
          >
            <Wrapper />
          </CoverLetterProvider>
        </TestingWrapper>
      ) as RenderResult
    })

    await waitFor(() => {
      expect(getCoverletterTemplateSpy).toBeCalled()
    })
    const data = screen.getByText(/Coveletter Data:/) as HTMLElement
    const templateData = screen.getByText(/Template Data:/i) as HTMLElement
    const template = screen.getByText(/Template:/i) as HTMLElement
    const isTemplateReady = screen.getByText(
      /Is Template Ready:/i
    ) as HTMLElement
    const step = screen.getByText(/Step:/i) as HTMLElement
    const IsSaving = screen.getByText(/Is Saving:/i) as HTMLElement
    const isSuccess = screen.getByText(/Submit Success:/i) as HTMLElement

    expect(data.textContent).toEqual(
      `Coveletter Data: ${JSON.stringify(coverLetterData[0].title)}`
    )
    expect(templateData.textContent).toEqual(
      `Template Data: ${JSON.stringify(coverletterTemplate[0].name)}`
    )
    expect(template.textContent).toBe(
      `Template: ${coverletterTemplate[0].name}`
    )
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

    expect(template.textContent).toBe(
      `Template: ${coverletterTemplate[1].name}`
    )

    fireEvent.click(submit)

    expect(IsSaving.textContent).toBe(`Is Saving: true`)

    await waitFor(() => {
      expect(isSuccess.textContent).toBe(`Submit Success: true`)

      expect(data.textContent).toEqual(
        `Coveletter Data: ${JSON.stringify(coverLetterData[0].title)}`
      )
    })
  })

  test('Submit form without autoSave and download directly', async () => {
    const trigger = jest.fn()

    useFormSpy.mockReturnValue({
      trigger,
      formState: { isValid: true },
      watch: jest.fn().mockReturnValue({ description: '<p></p>' }),
      reset: jest.fn(),
    } as any)

    getCoverletterTemplateSpy.mockReturnValue({
      data: coverletterTemplate[0],
      isError: false,
      isLoading: false,
    } as any)

    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <CoverLetterProvider
            initialData={coverLetterData[0]}
            templateName="template-1"
          >
            <Wrapper />
          </CoverLetterProvider>
        </TestingWrapper>
      ) as RenderResult
    })

    const submit = screen.getByText('Submit without Autosave')
    const IsSaving = screen.getByText(/Is Saving:/i) as HTMLElement

    expect(submit).toBeInTheDocument()
    fireEvent.click(submit)

    expect(trigger).toBeCalledTimes(1)
    expect(handleCoverletterDownloadSpy).toBeCalledTimes(1)

    await waitFor(() => {
      expect(trigger).toBeCalledTimes(1)
      expect(IsSaving.textContent).toBe(`Is Saving: false`)
    })

    expect(updateCoverletterSpy).not.toBeCalled()
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
      watch: jest.fn().mockReturnValue({ description: '<p>Aubout info</p>' }),
      reset: jest.fn(),
    } as any)

    getCoverletterTemplateSpy.mockReturnValue({
      data: coverletterTemplate[0],
      isError: false,
      isLoading: false,
    } as any)

    let screen: any
    await act(async () => {
      screen = render(
        <TestingWrapper>
          <CoverLetterProvider
            initialData={coverLetterData[1]}
            templateName="template-1"
          >
            <Wrapper />
          </CoverLetterProvider>
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

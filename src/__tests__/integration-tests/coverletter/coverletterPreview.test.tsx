import { render, waitFor } from '@testing-library/react'
import Previewer from '../../../pages/coverletters/preview'
import TestingWrapper from '../../../__mocks__/TestingWrapper'
import * as reactFrom from 'react-hook-form'
import * as coverletterContext from '../../../contexts/coverLetter'
import { coverletterTemplate } from '../../../__mocks__/coverletterTemplate'
import { coverLetterData } from '../../../__mocks__/coverletters'

// import styled from 'styled-components'
// import { Button } from '../../../styled/button'
// import TemplateFormSekleton from '../../../components/ui/tempFormSekleton'
// import HeaderStepper from '../../../components/ui/headerStepper'
// import CoverLetterStepper from '../../../pages/coverletters/builder/coverLetterStepper'
// import { useState } from 'react'
// import * as previewHelpers from '../../../helpers/previewer'

describe('<Previewer/>', () => {
  const formContextSpy = jest.spyOn(reactFrom, 'useFormContext')
  const useCoverletterSpy = jest.spyOn(coverletterContext, 'useCoverLetter')
  // const getPreviewTemplateBufferHeightSpy = jest.spyOn(
  //   previewHelpers,
  //   'getPreviewTemplateBufferHeight'
  // )
  beforeEach(() => {
    formContextSpy.mockReturnValue({
      formState: {
        isSubmitting: false,
      },
    } as any)
  })

  const PreviewWrapper = (
    <TestingWrapper>
      <Previewer isDataLoading={false} />
    </TestingWrapper>
  )

  // test('Should render loading screen', () => {
  //   const { container } = render(PreviewWrapper)
  //   const loader = container.getElementsByClassName(
  //     'template_skeleton'
  //   )[0] as HTMLElement
  //   expect(loader).toBeInTheDocument()
  //   expect(loader.parentElement?.style.visibility).toBe('visible')
  // })

  test('Should render preview screen', async () => {
    useCoverletterSpy.mockReturnValue({
      isTemplateReady: true,
      templateData: coverletterTemplate,
      data: coverLetterData,
    } as any)

    // getPreviewTemplateBufferHeightSpy.mockReturnValue({
    //   dummyBufferEl: jest.fn(),
    //   bufferHeight: 20,
    // } as any)

    const { container } = render(PreviewWrapper)
    const style = document.createElement('style')
    container.appendChild(style)

    // await waitFor(() => {
    //   expect(getByText(/Jhon/i)).toBeInTheDocument()
    // })
    expect(
      container.getElementsByClassName('template_skeleton')[0]
    ).toBeInTheDocument()
    // debug()
  })
})

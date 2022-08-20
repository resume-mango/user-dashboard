import { render, RenderResult, waitFor } from '@testing-library/react'
import SingleCoverLetter from '../../../pages/coverletters'
import TestingWrapper from '../../../__mocks__/TestingWrapper'
import dom from 'react-router'
import { act } from 'react-dom/test-utils'
import * as NewCoverLetter from '../../../pages/coverletters/createNew'
import * as OldCoverLetter from '../../../pages/coverletters/oldCoverletter'

describe('<SingleCoverLetter/>', () => {
  const useParamsSpy = jest.spyOn(dom, 'useParams')
  // const viewportSpy = jest.spyOn(viewport, 'useViewport')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  const Wrapper = (
    <TestingWrapper>
      <SingleCoverLetter />
    </TestingWrapper>
  )

  test('Should Render <PageNotFound />', async () => {
    const { getByText } = render(Wrapper)
    expect(getByText('This page could not be found')).toBeInTheDocument()
  })

  test('Should Render <NewCoverLetter />', async () => {
    const NewCoverLetterSpy = jest
      .spyOn(NewCoverLetter, 'default')
      .mockReturnValue(null as any)

    const id = 'abc'
    useParamsSpy.mockReturnValue({ id, type: 'new' })

    let screen: any
    act(() => {
      screen = render(Wrapper) as RenderResult
    })

    if (!screen) throw new Error('Failed to load screen')
    await waitFor(() => {
      expect(
        screen.container.getElementsByClassName('loading-spinner')[0]
      ).toBeFalsy()
    })
    expect(NewCoverLetterSpy).toHaveBeenCalledWith({ templateName: id }, {})
  })
  test('Should Render <OldCoverletter />', async () => {
    const oldCoverletterSpy = jest
      .spyOn(OldCoverLetter, 'default')
      .mockReturnValue(null as any)

    const id = 'abc'
    useParamsSpy.mockReturnValue({ id, type: 'edit' })

    let screen: any
    act(() => {
      screen = render(Wrapper) as RenderResult
    })

    if (!screen) throw new Error('Failed to load screen')
    await waitFor(() => {
      expect(
        screen.container.getElementsByClassName('loading-spinner')[0]
      ).toBeFalsy()
    })
    expect(oldCoverletterSpy).toHaveBeenCalledWith(
      { id, type: 'edit', width: 1024 },
      {}
    )
  })
})

// import {
//   fireEvent,
//   prettyDOM,
//   render,
//   RenderResult,
//   waitFor,
// } from '@testing-library/react'
// import SingleCoverLetter from '../../../pages/coverletters'
// import TestingWrapper from '../../../__mocks__/TestingWrapper'
// import dom from 'react-router'
// import * as viewport from '../../../contexts/viewPort'
// import * as coverletterQueries from '../../../queries/coverLetterQueries'
// import * as authProvider from '../../../contexts/authProvider'
// import preview from 'jest-preview'
// import axios from 'axios'
// import { act } from 'react-dom/test-utils'
// import nock from 'nock'
// import { QueryClient, QueryClientProvider } from 'react-query'
// // import { renderHook, act } from '@testing-library/react-hooks'
// import getQueryAdvance from '../../../hooks/getQueryAdvance'
// import Cookies from 'universal-cookie'
// import * as authApi from '../../../helpers/fetchAuthData'
// import { coverLetterData } from '../../../__mocks__/coverletters'
// import { useCoverLetter } from '../../../contexts/coverLetter'
// import { useAuth } from '../../../contexts/authProvider'
// import { singleCoverletter } from '../../../__mocks__/singleCoverletter'
// import { coverletterTemplate12 } from '../../../__mocks__/coverletterTemplate'

// const id = 'abc'
// const cookies = new Cookies()
// cookies.set('rm_ia', true)

// describe('<SingleCoverLetter/>', () => {
//   jest.mock('universal-cookie')

//   const useParamsSpy = jest.spyOn(dom, 'useParams')
//   const viewportSpy = jest.spyOn(viewport, 'useViewport')
//   const getCoverletterSpy = jest.spyOn(coverletterQueries, 'getCoverLetter')
//   const fetchAuthDataSpy = jest.spyOn(authApi, 'fetchAuthData')
//   const useAuthSpy = jest.spyOn(authProvider, 'useAuth')
//   const mockedAxios = axios as jest.Mocked<typeof axios>
//   const axiosGetSpy = jest.spyOn(mockedAxios, 'get')

//   jest.setTimeout(30000)

//   afterEach(() => {
//     jest.resetAllMocks()
//     jest.clearAllMocks()
//   })

//   const Wrapper = (
//     <TestingWrapper>
//       <SingleCoverLetter />
//     </TestingWrapper>
//   )

//   // test('Should render <NewCoverLetter/>', async () => {
//   //   axiosGetSpy.mockReturnValue({ data: 'abc' } as any)
//   //   useParamsSpy.mockReturnValue({ id, type: 'edit' })
//   //   const { container } = render(Wrapper)

//   //   await waitFor(() => {
//   //     const spinner = container.getElementsByClassName('loading-spinner')[0]

//   //     expect(spinner).toBeInTheDocument()
//   //   })
//   //   expect(1).toBe(1)
//   // })

//   // test('Should render with Error message due to samll screen', () => {
//   //   const useHistorySpy = jest.spyOn(dom, 'useHistory')

//   //   useParamsSpy.mockReturnValue({ id, type: 'new' })
//   //   viewportSpy.mockReturnValue({ width: 767 } as any)
//   //   useHistorySpy.mockReturnValue({ push: jest.fn() } as any)
//   //   const { getByText } = render(Wrapper)
//   //   const error = getByText(/Builder/i)
//   //   const dashButton = getByText(/Back/i)
//   //   expect(error).toBeInTheDocument()
//   //   expect(dashButton).toBeInTheDocument()
//   //   fireEvent.click(dashButton)
//   //   expect(useHistorySpy).toBeCalledTimes(1)
//   // })

//   test('Should render <OldCoverLetter/>', async () => {
//     const useHistorySpy = jest.spyOn(dom, 'useHistory')
//     // getCoverletterSpy.mockReturnValueOnce({
//     //   data: 'abc',
//     //   isError: false,
//     //   isLoading: false,
//     // } as any)

//     // axiosGetSpy.mockReturnValue({ data: 'abc' } as any)

//     const expectation = nock('http://localhost:4000')
//       .persist()
//       .get(`/v1/coverletter/${id}`)
//       .reply(200, singleCoverletter)

//     const expectation1 = nock('http://localhost:4000')
//       .persist()
//       .get(`/v1/templates/coverletter/${singleCoverletter.template}`)
//       .reply(200, coverletterTemplate12)

//     const expectation2 = nock('http://localhost:4001')
//       .persist()
//       .get(`/auth/data`)
//       .reply(200, {
//         token: 'dummy-token',
//         user: {
//           firstName: 'abc',
//           lastName: 'efg',
//           role: ['standard'],
//           ref: 'google|1234',
//         },
//       })

//     const onload = jest.fn()

//     Object.defineProperty(window, 'onload', onload)

//     useParamsSpy.mockReturnValue({ id, type: 'edit' })
//     viewportSpy.mockReturnValue({ width: 1200 } as any)
//     useHistorySpy.mockReturnValue({
//       block: jest.fn(),
//     } as any)

//     let comp: any

//     await act(async () => {
//       comp = render(Wrapper)
//     })

//     if (!comp) throw new Error('Error no componet rendered')

//     const { getByText, container } = comp as RenderResult

//     await waitFor(() => {
//       expect(fetchAuthDataSpy).toBeCalled()
//       // console.log(useAuthSpy.mock.results[1])
//       expect(useAuthSpy).toBeCalled()
//       expect(useAuthSpy.mock.results[0].value.token).toBeDefined()

//       expect(getCoverletterSpy).toBeCalled()
//       expect(
//         container.getElementsByClassName('template_page')[0]
//       ).toBeInTheDocument()
//     })
//     // console.log(prettyDOM(container))
//     // await waitFor(() => {
//     //   expect(fetchAuthData).toBeCalled()
//     //   expect(coverletterQueries.getCoverLetter).toBeCalled()
//     // })

//     // await waitFor(() =>
//     //   expect(
//     //     container.getElementsByClassName('template_page')[0]
//     //   ).toBeInTheDocument()
//     // )
//     // await new Promise((r) => setTimeout(r, 5000))
//     // await waitFor(() =>
//     //   expect(coverletterQueries.getCoverLetter).toHaveBeenCalledTimes(1)
//     // )
//     // http
//     //   .createServer(function (req, res) {
//     //     res.write('<html><head></head><body>')
//     //     res.write('')
//     //     res.end('</body></html>')
//     //   })
//     //   .listen(1337)

//     // const step1 = getByText('Personal Info')
//     // const step2 = getByText('Letter Body')

//     // expect(step1).toBeInTheDocument()
//     // expect(step2).toBeInTheDocument()
//     expect(1).toBe(1)
//     // fireEvent.click(step1)
//     preview.debug()
//   })

//   // test('Testing custom query componet', async () => {
//   //   const queryClient = new QueryClient()
//   //   const wrapper = ({ children }: any) => (
//   //     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   //   )

//   //   const fetchResume = async (id: string) => {
//   //     const { data } = await axios.get(`/coverletter/${id}`)
//   //     return data
//   //   }

//   //   const { result, waitFor } = renderHook(
//   //     () => getQueryAdvance(['coverletter', id], () => fetchResume(id), true),
//   //     { wrapper }
//   //   )

//   //   await waitFor(() => result.current.isSuccess)

//   //   expect(result.current.data).toEqual('Hello')
//   // })
// })

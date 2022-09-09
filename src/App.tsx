import React, { Fragment, useEffect, useState, Suspense } from 'react'
import axios from 'axios'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GlobalStyles } from './styled/global'
import { Theme } from './styled/theme'
import { ViewportProvider } from './contexts/viewPort'
import { NotifyProvider } from './contexts/notify'
import { ReactQueryDevtools } from 'react-query/devtools'
import './public/fonts/style.css'
import { useAuth } from './contexts/authProvider'
import { Spinner } from './styled/loader'
import Cookies from 'universal-cookie'
import AllRoutes from './routes'

const twentyFourHoursInMs = 1000 * 60 * 60 * 24
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 2,
      staleTime: twentyFourHoursInMs,
    },
  },
})

export const history = createBrowserHistory()

export interface Cypresswindow extends Window {
  Cypress: any
  tgHistory: any
}
declare let window: Cypresswindow

if (window.Cypress) {
  console.log('hit')
  window.tgHistory = history
}
const cookie = new Cookies()

const App = () => {
  const XSRFToken = cookie.get('XSRF-TOKEN')
  const [csrf, setCsrf] = useState(XSRFToken)
  axios.defaults.baseURL = `${process.env.API_HOST}/v1`
  axios.defaults.withCredentials = true

  useEffect(() => {
    if (!XSRFToken) return
    setCsrf(XSRFToken)
  }, [XSRFToken])

  axios.interceptors.request.use(
    async (config: any) => {
      if (config.method && !['get', 'options'].includes(config.method)) {
        if (
          !config.headers ||
          !config.headers.common ||
          !config.headers.common['X-CSRF-TOKEN' as any]
        ) {
          if (csrf) {
            config.headers.common['X-CSRF-TOKEN'] = csrf
          } else {
            await axios
              .request({
                method: 'GET',
                url: '/csrf',
              })
              .then((req: any) => {
                if (!req.data || !req.data.token) Promise.reject('Invalid CSRF')
                config.headers.common['X-CSRF-TOKEN'] = req.data.token
                return
              })
              .catch((_err) => {
                Promise.reject('Failed to sync CSRF')
              })
          }
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const { isLoading, token } = useAuth()

  return (
    <Fragment>
      <Router history={history}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ViewportProvider>
            <ThemeProvider theme={Theme}>
              <GlobalStyles />
              <NotifyProvider>
                {isLoading ? (
                  <div className="align-center">
                    <Spinner size="2.5rem" type="primary" />
                  </div>
                ) : (
                  <AllRoutes />
                )}
              </NotifyProvider>
            </ThemeProvider>
          </ViewportProvider>
        </QueryClientProvider>
      </Router>
    </Fragment>
  )
}

export default App

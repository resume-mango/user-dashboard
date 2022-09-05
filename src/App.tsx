import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Switch, Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GlobalStyles } from './styled/global'
import { Theme } from './styled/theme'
import { ViewportProvider } from './contexts/viewPort'
import { NotifyProvider } from './contexts/notify'
import { ReactQueryDevtools } from 'react-query/devtools'
import './public/fonts/style.css'
import Subscribe from './pages/subscribe'
import PageNotFound from './pages/404'
import DashboardLayout from './components/ui/dashboardLayout'
import Homepage from './pages/homepage'
import HelpSupport from './pages/help-support'
// import JobSearch from './pages/jobsearch'
import MyAccount from './pages/my-account'
import TaskCalender from './pages/tasks-calender'
import TipsTricks from './pages/tips-tricks'
import SingleResume from './pages/resumes'
import SingleCoverLetter from './pages/coverletters'
import ResumeDashboard from './pages/resumes/dashboard'
import CoverLetterDashboard from './pages/coverletters/dashboard'
import ProgressTracker from './pages/progress-tracker'
import { useAuth } from './contexts/authProvider'
import { Spinner } from './styled/loader'
// import Resources from './pages/resources'
import CommingSoon from './pages/comingSoon'
import Protected from './components/privateRoute'
import AccessDenied from './pages/401'
import Cookies from 'universal-cookie'
import Classes from './pages/classes'

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
                  <Switch>
                    <Route
                      exact
                      path={[
                        '/',
                        '/progress-tracker',
                        '/resources',
                        // '/resources/:id',
                        '/interviews',
                        '/job-search',
                        '/tips-tricks',
                        '/classes',
                        '/resumes',
                        '/resumes/templates/:type',
                        '/coverletters',
                        '/coverletters/all-templates',
                        '/calendar',
                        '/calendar/view/:year?/:month?/:day?',
                        '/calendar/event/:type',
                        '/my-account',
                        '/my-account/membership',
                        '/my-account/payments',
                        '/support',
                      ]}
                    >
                      <DashboardLayout>
                        <Route path="/" exact component={Homepage} />
                        <Protected
                          path="/resumes"
                          role={['pro', 'ceo']}
                          component={ResumeDashboard}
                        />
                        <Protected
                          path="/coverletters"
                          role={['pro', 'ceo']}
                          component={CoverLetterDashboard}
                        />
                        <Route path="/my-account" component={MyAccount} />

                        <Route path="/support" exact component={HelpSupport} />

                        <Route path="/resources" component={CommingSoon} />
                        <Route
                          path="/job-search"
                          exact
                          component={CommingSoon}
                        />
                        <Route path="/interviews" component={CommingSoon} />

                        <Protected
                          role={['standard']}
                          path="/tips-tricks"
                          exact
                          component={TipsTricks}
                        />

                        <Protected
                          path="/progress-tracker"
                          role={['pro', 'ceo']}
                          component={ProgressTracker}
                        />
                        <Protected
                          path="/calendar"
                          role={['pro', 'ceo']}
                          component={TaskCalender}
                        />
                        <Protected
                          path="/classes"
                          exact
                          role={['pro', 'ceo']}
                          component={Classes}
                        />
                      </DashboardLayout>
                    </Route>
                    <Route path="/subscribe" component={Subscribe} />
                    <Route
                      path="/resumes/:type/:id?"
                      exact
                      component={SingleResume}
                    />
                    <Route
                      path="/coverletters/:type/:id?"
                      exact
                      component={SingleCoverLetter}
                    />
                    <Route component={PageNotFound} />
                  </Switch>
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

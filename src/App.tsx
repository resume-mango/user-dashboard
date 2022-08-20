import React, { Fragment } from 'react'
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
// import Classes from './pages/classes'
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

const App = () => {
  axios.defaults.baseURL = `${process.env.API_HOST}/v1`
  axios.defaults.withCredentials = true

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
                          role={['standard', 'premium']}
                          component={ResumeDashboard}
                        />
                        <Protected
                          path="/coverletters"
                          role={['standard', 'premium']}
                          component={CoverLetterDashboard}
                        />
                        <Route path="/my-account" component={MyAccount} />

                        <Route path="/support" exact component={HelpSupport} />

                        <Route path="/classes" exact component={CommingSoon} />
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
                          role={['standard', 'premium']}
                          component={ProgressTracker}
                        />
                        <Protected
                          path="/calendar"
                          role={['standard', 'premium']}
                          component={TaskCalender}
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

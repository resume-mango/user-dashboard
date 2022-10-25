import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import DashboardLayout from './components/ui/dashboardLayout'
import Protected from './components/privateRoute'
import AccessDenied from './pages/401'
import SuspenseWrapper from './components/ui/suspenseWrapper'
import { useViewport } from './contexts/viewPort'
import NotSupported from './pages/NotSupported'

// import LazyHomePage from './pages/homepage'
// import LazyResumeDashboard from './pages/resumes/dashboard'
// import LazyCoverLetterDashboard from './pages/coverletters/dashboard'
// import LazyProgressTracker from './pages/progress-tracker'
// import LazyMyAccount from './pages/my-account'
// import LazyTaskCalender from './pages/tasks-calender'
// import LazyTipsTricks from './pages/tips-tricks'
// import LazySingleResume from './pages/resumes'
// import LazySingleCoverLetter from './pages/coverletters'
// import LazyClasses from './pages/classes'
// import LazyCommingSoon from './pages/comingSoon'
// import LazyHelpSupport from './pages/help-support'
// import LazySubscribe from './pages/subscribe'
// import LazyPageNotFound from './pages/404'

const LazyHomePage = React.lazy(() => import('./pages/homepage'))

const LazyCoverLetterDashboard = React.lazy(
  () => import('./pages/coverletters/dashboard')
)
const LazyResumeDashboard = React.lazy(
  () => import('./pages/resumes/dashboard')
)
const LazyProgressTracker = React.lazy(() => import('./pages/progress-tracker'))
const LazyResumeReviewList = React.lazy(
  () => import('./pages/resume-review/ReviewList')
)
const LazyResumeReviewChat = React.lazy(
  () => import('./pages/resume-review/ReviewChat')
)
const LazyMyAccount = React.lazy(() => import('./pages/my-account'))
const LazyTaskCalender = React.lazy(() => import('./pages/tasks-calender'))
const LazyTipsTricks = React.lazy(() => import('./pages/tips-tricks'))
const LazySingleResume = React.lazy(() => import('./pages/resumes'))
const LazySingleCoverLetter = React.lazy(() => import('./pages/coverletters'))
const LazyClasses = React.lazy(() => import('./pages/classes'))
const LazyCommingSoon = React.lazy(() => import('./pages/comingSoon'))
const LazyHelpSupport = React.lazy(() => import('./pages/help-support'))
const LazySubscribe = React.lazy(() => import('./pages/subscribe'))
const LazyPageNotFound = React.lazy(() => import('./pages/404'))

const AllRoutes = () => {
  const { width } = useViewport()
  return (
    <Fragment>
      {width < 1024 ? (
        <NotSupported />
      ) : (
        <Switch>
          <Route
            exact
            path={[
              '/',
              '/progress-tracker',
              '/resources',
              '/resume-review',
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
              <Route
                path="/"
                exact
                //   component={LazyHomePage}
                render={() => (
                  <SuspenseWrapper>
                    <LazyHomePage />
                  </SuspenseWrapper>
                )}
              />
              <Protected
                path="/resumes"
                role={['pro', 'ceo']}
                //   component={LazyResumeDashboard}
                component={
                  <SuspenseWrapper>
                    <LazyResumeDashboard />
                  </SuspenseWrapper>
                }
              />
              <Protected
                path="/coverletters"
                role={['pro', 'ceo']}
                component={
                  <SuspenseWrapper>
                    <LazyCoverLetterDashboard />
                  </SuspenseWrapper>
                }
              />
              <Protected
                path="/resume-review"
                role={['pro', 'ceo']}
                component={
                  <SuspenseWrapper>
                    <LazyResumeReviewList />
                  </SuspenseWrapper>
                }
              />
              <Route
                path="/my-account"
                //  component={LazyMyAccount}
                render={() => (
                  <SuspenseWrapper>
                    <LazyMyAccount />
                  </SuspenseWrapper>
                )}
              />

              <Route
                path="/support"
                exact
                // component={LazyHelpSupport}
                render={() => (
                  <SuspenseWrapper>
                    <LazyHelpSupport />
                  </SuspenseWrapper>
                )}
              />

              <Route
                path="/resources"
                // component={LazyCommingSoon}
                render={() => (
                  <SuspenseWrapper>
                    <LazyCommingSoon />
                  </SuspenseWrapper>
                )}
              />
              <Route
                path="/job-search"
                exact
                // component={LazyCommingSoon}
                render={() => (
                  <SuspenseWrapper>
                    <LazyCommingSoon />
                  </SuspenseWrapper>
                )}
              />
              <Route
                path="/interviews"
                // component={LazyCommingSoon}
                render={() => (
                  <SuspenseWrapper>
                    <LazyCommingSoon />
                  </SuspenseWrapper>
                )}
              />

              <Protected
                role={['standard']}
                path="/tips-tricks"
                exact
                //   component={LazyTipsTricks}
                component={
                  <SuspenseWrapper>
                    <LazyTipsTricks />
                  </SuspenseWrapper>
                }
              />

              <Protected
                path="/progress-tracker"
                role={['pro', 'ceo']}
                //   component={LazyProgressTracker}
                component={
                  <SuspenseWrapper>
                    <LazyProgressTracker />
                  </SuspenseWrapper>
                }
              />
              <Protected
                path="/calendar"
                role={['pro', 'ceo']}
                //   component={LazyTaskCalender}
                component={
                  <SuspenseWrapper>
                    <LazyTaskCalender />
                  </SuspenseWrapper>
                }
              />
              <Protected
                path="/classes"
                exact
                role={['pro', 'ceo']}
                //   component={LazyClasses}
                component={
                  <SuspenseWrapper>
                    <LazyClasses />
                  </SuspenseWrapper>
                }
              />
            </DashboardLayout>
          </Route>

          <Protected
            path="/resume-review/:ticket"
            role={['pro', 'ceo']}
            component={
              <SuspenseWrapper>
                <LazyResumeReviewChat />
              </SuspenseWrapper>
            }
          />

          <Route
            path="/subscribe"
            // component={LazySubscribe}
            render={() => (
              <SuspenseWrapper>
                <LazySubscribe />
              </SuspenseWrapper>
            )}
          />
          <Route
            path="/resumes/:type/:id?"
            exact
            // component={LazySingleResume}
            render={() => (
              <SuspenseWrapper>
                <LazySingleResume />
              </SuspenseWrapper>
            )}
          />
          <Route
            path="/coverletters/:type/:id?"
            exact
            //   component={LazySingleCoverLetter}
            render={() => (
              <SuspenseWrapper>
                <LazySingleCoverLetter />
              </SuspenseWrapper>
            )}
          />
          <Route
            // component={LazyPageNotFound}
            render={() => (
              <SuspenseWrapper>
                <LazyPageNotFound />
              </SuspenseWrapper>
            )}
          />
        </Switch>
      )}
    </Fragment>
  )
}

export default AllRoutes

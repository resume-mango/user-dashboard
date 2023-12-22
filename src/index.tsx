import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/authProvider"
import { WindowFocusContextProvider } from "./contexts/windowFocus"
import * as Sentry from "@sentry/react"
import ReactGA from "react-ga4"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})

ReactGA.initialize([
  {
    trackingId: String(process.env.GA_MESUREMENT_ID),
    gaOptions: {
      cookieDomain: "auto",
    },
    gtagOptions: {
      cookieDomain: "auto",
      page_location: window.location.pathname,
    },
  },
])

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter
      getUserConfirmation={() => {
        /* Empty callback to block the default browser prompt */
      }}
    >
      <WindowFocusContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </WindowFocusContextProvider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
)

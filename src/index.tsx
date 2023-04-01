import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authProvider'
import { WindowFocusContextProvider } from './contexts/windowFocus'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})

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

  document.getElementById('root')
)

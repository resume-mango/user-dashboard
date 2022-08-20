import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authProvider'
import { WindowFocusContextProvider } from './contexts/windowFocus'

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

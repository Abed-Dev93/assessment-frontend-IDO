import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { QuoteProvider } from './contexts/QuoteProvider'
import { ListProvider } from './contexts/ListProvider'
import { UserProvider } from './contexts/UserProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ListProvider>
          <QuoteProvider>
            <App />
          </QuoteProvider>
        </ListProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()

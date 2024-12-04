import React from 'react'
import ReactDOM from 'react-dom/client'
import { SettingsProvider } from './settingsContext'
import App from './App'
import './css/fonts.css'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')

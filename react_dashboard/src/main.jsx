// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CountProvider } from './context_api/CountProvider.jsx'

createRoot(document.getElementById('root')).render(
  <CountProvider>
    <App />
  </CountProvider>,
)

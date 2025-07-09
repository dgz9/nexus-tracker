import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthProvider from './contexts/AuthProvider'
import { ThemeProvider } from './contexts/ThemeProvider'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <HeroUIProvider>
        <ToastProvider placement="top-center" />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
            <Analytics />
            <App />
          </AuthProvider>
        </BrowserRouter>
      </HeroUIProvider>
    </ThemeProvider>
  </StrictMode>,
)
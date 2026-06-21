import React, { useState, useEffect } from 'react'
import AppRoutes from './routes/routes'
import { ReportProvider } from './context/ReportContext'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      window.deferredPrompt = e
      window.dispatchEvent(new Event('pwa-installable'))
      console.log('✅ Install prompt captured')
    }

    const handleAppInstalled = () => {
      window.deferredPrompt = null
      window.dispatchEvent(new Event('pwa-installed'))
      console.log('✅ App installed')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[4000] flex flex-col items-center justify-center gap-6 px-6 bg-[#171717]">
        <img
          src="/logo3 (2).png"
          className="h-[380px] w-auto max-w-[620px] object-contain animate-pulse"
          alt="Fouady Logo"
        />
      </div>
    )
  }

  return (
    <ReportProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#171717',
            color: '#fff',
            border: '1px solid #d49a3e',
            fontFamily: 'Noto Sans Arabic, sans-serif',
            fontSize: '13px',
            padding: '12px 16px',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#d49a3e',
              secondary: '#171717',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#171717',
            },
            style: {
              border: '1px solid #ef4444',
            },
          },
        }}
      />

      <AppRoutes />
    </ReportProvider>
  )
}
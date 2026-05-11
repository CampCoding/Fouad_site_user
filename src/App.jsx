import React from 'react'
import Routes from './routes/routes'
import { ReportProvider } from './context/ReportContext'

export default function App() {
  return (
    <ReportProvider>
      <Routes />
    </ReportProvider>
  )
}

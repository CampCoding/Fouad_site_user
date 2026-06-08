import React, { useState, useEffect } from 'react'
import Routes from './routes/routes'
import { ReportProvider } from './context/ReportContext'

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#171717] z-[1000]">
        <img 
          src="/logo.png" 
          className="h-[220px] w-full max-w-[450px] object-contain animate-pulse" 
          alt="Fouady Logo" 
        />
      </div>
    );
  }
  
  return (
    <ReportProvider>
      <Routes />
    </ReportProvider>
  )
}

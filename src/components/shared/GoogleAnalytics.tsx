'use client'

import { useEffect } from 'react'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

const isProduction = import.meta.env.PROD

declare global {
  interface Window {
    gtag: (...args: GtagCommand) => void
  }
}

type GtagCommand = [
  'config' | 'event' | 'js',
  string,
  Record<string, unknown>?
]

export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID && !isProduction) {
      console.warn('⚠️ [GoogleAnalytics]: VITE_GA_MEASUREMENT_ID is not defined.')
    }

    if (!isProduction || !GA_MEASUREMENT_ID) return

    const scriptId = 'gtag-script'
    const inlineScriptId = 'gtag-init'

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script)
    }

    if (!document.getElementById(inlineScriptId)) {
      const inlineScript = document.createElement('script')
      inlineScript.id = inlineScriptId
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
      `
      document.head.appendChild(inlineScript)
    }

    const sendPageView = () => {
      if (typeof window.gtag !== 'function') return
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
      })
    }

    sendPageView()
  }, [])

  if (!isProduction || !GA_MEASUREMENT_ID) return null

  return null
}

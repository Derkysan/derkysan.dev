'use client'

import { useEffect } from 'react'
import { 
  usePathname, 
  // useSearchParams 
} from 'next/navigation'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const isProduction = process.env.NODE_ENV === 'production'

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
  const pathname = usePathname()
  // const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID && !isProduction) {
      console.warn('⚠️ [GoogleAnalytics]: NEXT_PUBLIC_GA_MEASUREMENT_ID is not defined.')
    }

    if (!isProduction || !GA_MEASUREMENT_ID) return

    // const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        // page_path: url,
        page_path: pathname,
      })
    }
  }, [
    pathname, 
    // searchParams
  ])

  if (!isProduction || !GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());          
        `}
      </Script>
    </>
  )
}

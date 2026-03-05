'use client'

import { AppLayoutWithSidebar } from '@/components/shared'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayoutWithSidebar
      expandOnHover={true}
      defaultExpanded={false}
    >
      {children}
    </AppLayoutWithSidebar>
  )
}

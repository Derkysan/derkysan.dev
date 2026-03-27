// EJEMPLOS DE USO DEL LAYOUT CON SIDEBAR

// ============================================
// Opción 1: Usar el layout directamente en una página
// ============================================

// src/app/dashboard/page.tsx
'use client'

import { AppLayoutWithSidebar } from '@/components/shared'

export default function DashboardPage() {
  return (
    <AppLayoutWithSidebar>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Contenido del dashboard aquí...</p>
      </div>
    </AppLayoutWithSidebar>
  )
}

// ============================================
// Opción 2: Usar el DashboardLayout predefinido
// ============================================

// src/app/dashboard/projects/page.tsx
'use client'

import { DashboardLayout } from '@/components/shared'

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Mis Proyectos</h1>
        <div className="grid grid-cols-3 gap-4">
          {/* Tu contenido aquí */}
        </div>
      </div>
    </DashboardLayout>
  )
}

// ============================================
// Opción 3: Usar HOC withSidebar
// ============================================

// src/app/profile/page.tsx
'use client'

import { withSidebar } from '@/components/shared'

function ProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Mi Perfil</h1>
      <p>Información del perfil...</p>
    </div>
  )
}

export default withSidebar(ProfilePage, {
  expandOnHover: true,
  defaultExpanded: false,
})

// ============================================
// Opción 4: Layout con menú personalizado
// ============================================

// src/app/admin/page.tsx
'use client'

import { AppLayoutWithSidebar } from '@/components/shared'
import { Shield, Users, Database, Settings } from 'lucide-react'

export default function AdminPage() {
  const adminMenuItems = [
    {
      id: 'overview',
      label: 'Vista General',
      icon: <Shield className="h-5 w-5" />,
      href: '/admin',
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: <Users className="h-5 w-5" />,
      href: '/admin/users',
      badge: '12',
    },
    {
      id: 'database',
      label: 'Base de Datos',
      icon: <Database className="h-5 w-5" />,
      href: '/admin/database',
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings className="h-5 w-5" />,
      href: '/admin/settings',
    },
  ]

  return (
    <AppLayoutWithSidebar
      menuItems={adminMenuItems}
      expandOnHover={false}
      defaultExpanded={true}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
        {/* Tu contenido aquí */}
      </div>
    </AppLayoutWithSidebar>
  )
}

// ============================================
// Opción 5: Layout con brand y footer personalizado
// ============================================

// src/app/custom/page.tsx
'use client'

import { AppLayoutWithSidebar } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { LogOut, Settings } from 'lucide-react'

export default function CustomLayoutPage() {
  const customBrand = (
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
      <div className="flex flex-col">
        <span className="font-bold text-lg">Mi App</span>
        <span className="text-xs text-muted-foreground">Pro Plan</span>
      </div>
    </div>
  )

  const customFooter = (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-2 py-1">
        <img
          src="/avatar.jpg"
          alt="User"
          className="h-8 w-8 rounded-full"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm font-medium truncate">John Doe</span>
          <span className="text-xs text-muted-foreground truncate">
            john@example.com
          </span>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
        <Settings className="h-4 w-4" />
        <span>Configuración</span>
      </Button>
      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
        <LogOut className="h-4 w-4" />
        <span>Cerrar sesión</span>
      </Button>
    </div>
  )

  return (
    <AppLayoutWithSidebar
      customBrand={customBrand}
      customFooter={customFooter}
      expandOnHover={true}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Layout Personalizado</h1>
        {/* Tu contenido aquí */}
      </div>
    </AppLayoutWithSidebar>
  )
}

// ============================================
// Opción 6: Crear un layout global compartido
// ============================================

// src/app/(with-sidebar)/layout.tsx
'use client'

import { AppLayoutWithSidebar } from '@/components/shared'

export default function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayoutWithSidebar expandOnHover={true}>
      {children}
    </AppLayoutWithSidebar>
  )
}

// Luego en tus páginas dentro de (with-sidebar) solo necesitas:
// src/app/(with-sidebar)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1>Dashboard</h1>
      {/* El sidebar ya está incluido por el layout padre */}
    </div>
  )
}

// ============================================
// Opción 7: Sidebar condicional (mostrar/ocultar)
// ============================================

// src/app/conditional/page.tsx
'use client'

import { useState } from 'react'
import { AppLayoutWithSidebar } from '@/components/shared'
import { Button } from '@/components/ui/button'

export default function ConditionalSidebarPage() {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <AppLayoutWithSidebar hideSidebar={!showSidebar}>
      <div className="p-8">
        <Button onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? 'Ocultar' : 'Mostrar'} Sidebar
        </Button>
        <h1 className="text-3xl font-bold mt-4">Contenido</h1>
      </div>
    </AppLayoutWithSidebar>
  )
}

// ============================================
// Opción 8: Sidebar responsive (mobile)
// ============================================

// src/app/responsive/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { AppLayoutWithSidebar } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function ResponsivePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="relative h-screen">
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </Button>
        </div>
      )}
      
      <AppLayoutWithSidebar
        hideSidebar={isMobile && !sidebarOpen}
        expandOnHover={!isMobile}
        defaultExpanded={!isMobile}
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Responsive Layout</h1>
          <p>El sidebar se adapta al tamaño de pantalla</p>
        </div>
      </AppLayoutWithSidebar>
    </div>
  )
}

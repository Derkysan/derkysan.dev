# Guía de Implementación del Layout con Sidebar

## 📋 Componentes Creados

### 1. **SideBar.tsx**
Componente sidebar base con todas las funcionalidades.

### 2. **AppLayoutWithSidebar.tsx** ✨
Layout completo que integra el sidebar con tu contenido.

### 3. **Dashboard** (Ejemplo implementado)
Página de ejemplo funcional en `/dashboard`

---

## 🚀 Implementación Rápida

### Método 1: Layout de Next.js (Recomendado)

Ya está implementado en [`/dashboard`](src/app/dashboard):

**Estructura:**
```
src/app/dashboard/
  ├── layout.tsx    ← Wrapper con sidebar
  └── page.tsx      ← Tu contenido
```

**Código del layout:**
```tsx
// src/app/dashboard/layout.tsx
'use client'

import { AppLayoutWithSidebar } from '@/components/shared'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayoutWithSidebar
      expandOnHover={true}
      defaultExpanded={false}
    >
      {children}
    </AppLayoutWithSidebar>
  )
}
```

**Código de la página:**
```tsx
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1>Mi Dashboard</h1>
      {/* Tu contenido aquí */}
    </div>
  )
}
```

### Método 2: Usar directamente en una página

```tsx
'use client'

import { AppLayoutWithSidebar } from '@/components/shared'

export default function MyPage() {
  return (
    <AppLayoutWithSidebar>
      <div className="p-8">
        <h1>Mi Página</h1>
      </div>
    </AppLayoutWithSidebar>
  )
}
```

---

## 🎯 Probar el Dashboard

1. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

2. **Navega a:**
   ```
   http://localhost:3000/dashboard
   ```

3. **Funcionalidades disponibles:**
   - ✅ Sidebar colapsable/expandible
   - ✅ Expansión automática con hover
   - ✅ Brand con logo personalizado
   - ✅ Menú con navegación
   - ✅ Footer con toggle de tema y redes sociales
   - ✅ Tooltips en modo colapsado
   - ✅ Animaciones suaves

---

## ⚙️ Personalización

### Cambiar Items del Menú

```tsx
import { Home, Settings, User } from 'lucide-react'

const customMenuItems = [
  {
    id: 'home',
    label: 'Inicio',
    icon: <Home className="h-5 w-5" />,
    href: '/',
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: <User className="h-5 w-5" />,
    href: '/profile',
    badge: '3', // Opcional
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: <Settings className="h-5 w-5" />,
    onClick: () => console.log('Settings clicked'),
  },
]

// Usar en el layout:
<AppLayoutWithSidebar
  menuItems={customMenuItems}
/>
```

### Personalizar Brand

```tsx
const customBrand = (
  <div className="flex items-center gap-3">
    <img src="/my-logo.png" alt="Logo" className="h-10 w-10 rounded-lg" />
    <div className="flex flex-col">
      <span className="font-bold text-lg">Mi App</span>
      <span className="text-xs text-muted-foreground">v2.0</span>
    </div>
  </div>
)

<AppLayoutWithSidebar
  customBrand={customBrand}
/>
```

### Personalizar Footer

```tsx
import { LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const customFooter = (
  <div className="space-y-2">
    <div className="flex items-center gap-2 px-2">
      <img 
        src="/avatar.jpg" 
        alt="User" 
        className="h-8 w-8 rounded-full" 
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">John Doe</p>
        <p className="text-xs text-muted-foreground truncate">
          john@example.com
        </p>
      </div>
    </div>
    <Button 
      variant="ghost" 
      className="w-full justify-start gap-2"
      onClick={() => console.log('Logout')}
    >
      <LogOut className="h-4 w-4" />
      <span>Cerrar sesión</span>
    </Button>
  </div>
)

<AppLayoutWithSidebar
  customFooter={customFooter}
/>
```

---

## 📐 Props Disponibles

### AppLayoutWithSidebar

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Requerido**. Contenido principal |
| `menuItems` | `SidebarMenuItem[]` | Items por defecto | Items del menú |
| `expandOnHover` | `boolean` | `true` | Expandir al hacer hover |
| `defaultExpanded` | `boolean` | `false` | Estado inicial |
| `customBrand` | `ReactNode` | Logo DerkySan | Contenido del brand |
| `customFooter` | `ReactNode` | Footer por defecto | Contenido del footer |
| `hideSidebar` | `boolean` | `false` | Ocultar sidebar completamente |

### SidebarMenuItem

```typescript
interface SidebarMenuItem {
  id: string              // ID único
  label: string          // Texto del item
  icon: ReactNode        // Icono
  onClick?: () => void   // Manejador de click
  href?: string          // URL de navegación
  badge?: string | number // Badge opcional
}
```

---

## 🎨 Ejemplos Avanzados

### Grupos de Menú

```tsx
<AppLayoutWithSidebar>
  <nav className="flex-1 px-2 py-4">
    <div className="space-y-1 mb-4">
      <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
        Principal
      </p>
      {/* Items del menú principal */}
    </div>
    
    <div className="border-t my-2" />
    
    <div className="space-y-1">
      <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
        Admin
      </p>
      {/* Items de admin */}
    </div>
  </nav>
</AppLayoutWithSidebar>
```

### Sidebar Responsive

```tsx
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
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          className="fixed top-4 left-4 z-50"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
        </Button>
      )}
      
      <AppLayoutWithSidebar
        hideSidebar={isMobile && !sidebarOpen}
        expandOnHover={!isMobile}
        defaultExpanded={!isMobile}
      >
        {/* Tu contenido */}
      </AppLayoutWithSidebar>
    </>
  )
}
```

### Múltiples Layouts

Puedes crear diferentes layouts para diferentes secciones:

```tsx
// src/app/(admin)/layout.tsx
export default function AdminLayout({ children }) {
  return (
    <AppLayoutWithSidebar
      menuItems={adminMenuItems}
      customBrand={<AdminBrand />}
    >
      {children}
    </AppLayoutWithSidebar>
  )
}

// src/app/(user)/layout.tsx
export default function UserLayout({ children }) {
  return (
    <AppLayoutWithSidebar
      menuItems={userMenuItems}
      customBrand={<UserBrand />}
    >
      {children}
    </AppLayoutWithSidebar>
  )
}
```

---

## 🔧 Configuración del Sidebar Base

Si necesitas personalizar el sidebar a bajo nivel, puedes usar directamente el componente `SideBar`:

```tsx
import { SideBar } from '@/components/shared'

<SideBar
  brand={<MyBrand />}
  menuItems={items}
  footer={<MyFooter />}
  expandOnHover={true}
  defaultExpanded={false}
  expandedWidth="280px"      // Ancho expandido
  collapsedWidth="72px"      // Ancho colapsado
  togglePosition="inline"    // 'inline' | 'top'
/>
```

---

## 📱 Navegación

### Usando href (navegación nativa)

```tsx
const menuItems = [
  {
    id: 'home',
    label: 'Inicio',
    icon: <Home />,
    href: '/dashboard',  // ← Navegación
  },
]
```

### Usando onClick (lógica personalizada)

```tsx
const menuItems = [
  {
    id: 'action',
    label: 'Acción',
    icon: <Star />,
    onClick: () => {
      // Tu lógica aquí
      console.log('Clicked!')
    },
  },
]
```

---

## 🎯 Tips de Uso

1. **Para Landing Pages**: Usa `hideSidebar={true}` o no uses el layout
2. **Para Dashboards**: Usa el layout con `expandOnHover={true}`
3. **Para Apps Admin**: Usa `defaultExpanded={true}`
4. **Para Mobile**: Implementa toggle manual con `hideSidebar`

---

## 🐛 Troubleshooting

### El sidebar no aparece
✅ Verifica que estés usando `'use client'` en el layout  
✅ Asegúrate de que el componente esté dentro de `<Providers>`

### Las animaciones no funcionan
✅ Verifica que `motion` esté instalado: `npm install motion`  
✅ Revisa que no haya conflictos con otros providers

### El tema no cambia
✅ El ThemeProvider debe estar en el layout raíz  
✅ Verifica que `useTheme` esté dentro de un componente cliente

---

## 📚 Archivos de Referencia

- [SideBar.tsx](src/components/shared/SideBar.tsx) - Componente base
- [AppLayoutWithSidebar.tsx](src/components/shared/AppLayoutWithSidebar.tsx) - Layout wrapper
- [Dashboard Example](src/app/dashboard/page.tsx) - Ejemplo implementado
- [Layout Examples](LAYOUT_EXAMPLES.tsx) - 8 ejemplos de uso
- [Sidebar Usage](SIDEBAR_USAGE.md) - Documentación detallada del sidebar

---

## ✅ Checklist de Implementación

- [x] Componente SideBar creado
- [x] Layout wrapper creado
- [x] Dashboard de ejemplo implementado
- [x] Integración con tema
- [x] Animaciones configuradas
- [x] Tooltips funcionando
- [x] Responsive básico
- [x] Documentación completa

¡Listo para usar! 🚀

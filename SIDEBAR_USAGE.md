# SideBar Component

Componente sidebar expandible y colapsable con soporte para hover y separación semántica.

## Características

✅ **Expandible/Colapsable**: Por botón o hover  
✅ **Áreas Semánticas**: Brand, Menu, Footer separados  
✅ **Animaciones Suaves**: Usando Framer Motion  
✅ **Tooltips**: Muestra labels cuando está colapsado  
✅ **TypeScript**: Totalmente tipado  
✅ **Accesible**: ARIA labels y navegación por teclado  
✅ **Personalizable**: Props para controlar todo

## Uso Básico

```tsx
import { SideBar } from '@/components/shared'
import { Home, User, Settings, LogOut } from 'lucide-react'

function App() {
  const menuItems = [
    {
      id: 'home',
      label: 'Inicio',
      icon: <Home className="h-5 w-5" />,
      onClick: () => console.log('Home'),
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: <User className="h-5 w-5" />,
      href: '/profile',
      badge: '3',
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings className="h-5 w-5" />,
      onClick: () => console.log('Settings'),
    },
  ]

  return (
    <SideBar
      menuItems={menuItems}
      defaultExpanded={false}
    />
  )
}
```

## Con Brand Personalizado

```tsx
<SideBar
  brand={
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Logo" className="h-8 w-8" />
      <span className="font-bold text-lg">Mi App</span>
    </div>
  }
  menuItems={menuItems}
/>
```

## Con Footer

```tsx
import { Button } from '@/components/ui/button'

<SideBar
  menuItems={menuItems}
  footer={
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        <p>Usuario</p>
        <p className="font-semibold">derkysan@example.com</p>
      </div>
      <Button variant="ghost" className="w-full justify-start gap-3">
        <LogOut className="h-5 w-5" />
        <span>Cerrar sesión</span>
      </Button>
    </div>
  }
/>
```

## Expandible con Hover

```tsx
<SideBar
  menuItems={menuItems}
  expandOnHover={true}
  defaultExpanded={false}
/>
```

## Controlado (Controlled)

```tsx
function App() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <SideBar
      expanded={isExpanded}
      onExpandedChange={setIsExpanded}
      menuItems={menuItems}
    />
  )
}
```

## Contenido Personalizado

```tsx
<SideBar
  brand={<MyCustomBrand />}
  footer={<MyCustomFooter />}
>
  {/* Contenido de menú personalizado */}
  <nav className="flex-1 space-y-1 px-2">
    <CustomNavItem />
    <CustomNavItem />
    <div className="border-t my-2" />
    <CustomNavGroup />
  </nav>
</SideBar>
```

## Props

### SidebarProps

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `brand` | `ReactNode` | - | Contenido del área del brand/logo |
| `menuItems` | `SidebarMenuItem[]` | `[]` | Items del menú |
| `footer` | `ReactNode` | - | Contenido del footer |
| `defaultExpanded` | `boolean` | `false` | Estado inicial expandido |
| `expandOnHover` | `boolean` | `false` | Expandir al hacer hover |
| `expanded` | `boolean` | - | Estado controlado |
| `onExpandedChange` | `(expanded: boolean) => void` | - | Callback al cambiar estado |
| `className` | `string` | - | Clase CSS adicional |
| `expandedWidth` | `string` | `"240px"` | Ancho expandido |
| `collapsedWidth` | `string` | `"72px"` | Ancho colapsado |
| `togglePosition` | `"top" \| "inline"` | `"inline"` | Posición del botón toggle |
| `children` | `ReactNode` | - | Contenido personalizado |

### SidebarMenuItem

```typescript
interface SidebarMenuItem {
  id: string              // ID único
  label: string          // Texto a mostrar
  icon: ReactNode        // Icono del item
  onClick?: () => void   // Handler de click
  href?: string          // URL para navegación
  badge?: string | number // Badge (notificación)
}
```

## Subcomponentes Exportados

- `SidebarHeader`: Para personalizar el header
- `SidebarMenu`: Para personalizar el área del menú
- `SidebarFooter`: Para personalizar el footer
- `SideBarExample`: Componente de ejemplo completo

## Ejemplos Avanzados

### Sidebar con Grupos de Menú

```tsx
<SideBar>
  <nav className="flex-1 px-2 py-4">
    <div className="space-y-1 mb-4">
      <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
        Principal
      </p>
      {mainMenuItems.map(item => (
        <SidebarMenuItem key={item.id} item={item} expanded={true} />
      ))}
    </div>
    
    <div className="border-t my-2" />
    
    <div className="space-y-1">
      <p className="px-3 text-xs font-semibold text-muted-foreground uppercase">
        Configuración
      </p>
      {settingsItems.map(item => (
        <SidebarMenuItem key={item.id} item={item} expanded={true} />
      ))}
    </div>
  </nav>
</SideBar>
```

### Sidebar con Tema Dark/Light

```tsx
import { Sun, Moon } from 'lucide-react'

<SideBar
  menuItems={menuItems}
  footer={
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="w-full"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  }
/>
```

### Sidebar Responsivo

```tsx
function ResponsiveSidebar() {
  const [isMobile, setIsMobile] = useState(false)
  const [expanded, setExpanded] = useState(!isMobile)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setExpanded(window.innerWidth >= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <SideBar
      expanded={expanded}
      onExpandedChange={setExpanded}
      expandOnHover={!isMobile}
      menuItems={menuItems}
    />
  )
}
```

## Estilos Personalizados

Puedes personalizar los estilos usando Tailwind classes:

```tsx
<SideBar
  className="bg-slate-900 border-slate-800"
  menuItems={menuItems}
/>
```

## Accesibilidad

El componente incluye:
- ARIA labels en botones
- Navegación por teclado
- Tooltips descriptivos cuando está colapsado
- Semántica HTML correcta (aside, header, nav, footer)

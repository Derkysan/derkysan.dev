# 🎯 SidebarLayout - Guía de Uso Rápida

## ✅ Implementación Completada

El SidebarLayout ya está integrado en tu aplicación principal y listo para usar.

## 🚀 Cómo Activar/Desactivar el Sidebar

### Método Simple (Recomendado)

Edita el archivo [`sidebar.config.ts`](src/config/sidebar.config.ts):

```typescript
export const sidebarConfig = {
  enabled: true,  // ← Cambia a false para desactivar el sidebar
  expandOnHover: true,
  defaultExpanded: false,
  // ... más opciones
}
```

## ⚙️ Configuración Disponible

### En [`sidebar.config.ts`](src/config/sidebar.config.ts):

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Activar/desactivar sidebar globalmente |
| `expandOnHover` | boolean | `true` | Expandir al hacer hover |
| `defaultExpanded` | boolean | `false` | Estado inicial expandido |
| `expandedWidth` | string | `"240px"` | Ancho cuando está expandido |
| `collapsedWidth` | string | `"72px"` | Ancho cuando está colapsado |
| `togglePosition` | `'inline'` \| `'top'` | `'inline'` | Posición del botón toggle |

### Redes Sociales

```typescript
social: {
  github: 'https://github.com/Derkysan',
  linkedin: 'https://www.linkedin.com/in/derkysan/',
}
```

### Información de la App

```typescript
appInfo: {
  name: 'DerkySan',
  subtitle: 'Developer',
  version: 'v1.0.0',
}
```

## 🎨 Personalización del Menú

El menú por defecto incluye:
- 🏠 Inicio
- 👤 Sobre mí
- 💼 Proyectos
- 💻 Habilidades
- 📧 Contacto

### Para personalizar los items del menú:

Edita [`SidebarLayout.tsx`](src/components/layouts/SidebarLayout.tsx) línea 54:

```tsx
const defaultMenuItems: SidebarMenuItem[] = [
  {
    id: "home",
    label: "Inicio",
    icon: <Home className="h-5 w-5" />,
    href: "/",
  },
  // Agrega tus propios items aquí...
]
```

O pasa items personalizados desde App.tsx:

```tsx
import { Home, Star } from 'lucide-react'

const customMenuItems = [
  {
    id: 'custom',
    label: 'Mi Item',
    icon: <Star className="h-5 w-5" />,
    href: '/custom',
    badge: '3', // opcional
  },
]

<SidebarLayout menuItems={customMenuItems}>
  <Page />
</SidebarLayout>
```

## 🔧 Características Incluidas

### ✨ En el Sidebar:

1. **Brand/Logo** - Tu CustomLogo en el header
2. **Menú de Navegación** - Items personalizables con iconos
3. **Footer** con:
   - Toggle de tema Dark/Light
   - Links a GitHub y LinkedIn
   - Número de versión

### 🎯 Funcionalidades:

- ✅ Colapsar/expandir con botón flotante
- ✅ Expandir automáticamente con hover (opcional)
- ✅ Tooltips cuando está colapsado
- ✅ Animaciones suaves
- ✅ Responsive
- ✅ Integrado con el sistema de temas

## 📱 Estructura de Archivos

```
src/
├── App.tsx                              ← Layout principal con sidebar
├── config/
│   └── sidebar.config.ts                ← Configuración del sidebar
├── components/
│   ├── layouts/
│   │   └── SidebarLayout.tsx            ← Layout wrapper
│   └── shared/
│       └── SideBar.tsx                  ← Componente base
└── app/
    └── page.tsx                         ← Tu contenido (ajustado)
```

## 🎮 Casos de Uso

### Desactivar temporalmente el sidebar

```typescript
// src/config/sidebar.config.ts
export const sidebarConfig = {
  enabled: false,  // ← Desactivar
}
```

### Sidebar expandido por defecto

```typescript
// src/config/sidebar.config.ts
export const sidebarConfig = {
  enabled: true,
  expandOnHover: false,
  defaultExpanded: true,  // ← Siempre expandido
}
```

### Solo expandir con botón (sin hover)

```typescript
// src/config/sidebar.config.ts
export const sidebarConfig = {
  enabled: true,
  expandOnHover: false,  // ← Sin hover
  defaultExpanded: false,
}
```

## 🐛 Resolución de Problemas

### El sidebar no aparece
1. Verifica que `enabled: true` en `sidebar.config.ts`
2. Asegúrate de que estás en desarrollo: `npm run dev`
3. Limpia el cache: `rm -rf node_modules/.vite`

### Los iconos no se muestran
- Verifica que `lucide-react` esté instalado: `npm install lucide-react`

### El contenido se ve cortado
- El contenido de la página ya fue ajustado para funcionar con el sidebar
- Si necesitas más espacio, ajusta el ancho del contenedor en `page.tsx`

## 📝 Cambios Realizados

### 1. App.tsx
- ✅ Importado `SidebarLayout`
- ✅ Envuelto `<Page />` con el layout
- ✅ Integrado con configuración

### 2. page.tsx
- ✅ Ajustado `min-h-svh` → `min-h-[calc(100vh-4rem)]`
- ✅ Ajustado ancho del contenedor para mejor layout
- ✅ Mantenido todo el contenido original

### 3. Nuevos Archivos
- ✅ `src/config/sidebar.config.ts` - Configuración centralizada

## 🚀 Próximos Pasos

1. **Prueba el sidebar**: `npm run dev` y navega a tu app
2. **Personaliza el menú**: Agrega tus propias secciones
3. **Ajusta estilos**: Modifica colores y dimensiones según tu diseño
4. **Agrega badges**: Muestra notificaciones en items del menú

## 📚 Documentación Adicional

- [LAYOUT_IMPLEMENTATION.md](../LAYOUT_IMPLEMENTATION.md) - Guía completa
- [SIDEBAR_USAGE.md](../SIDEBAR_USAGE.md) - Uso del componente SideBar
- [LAYOUT_EXAMPLES.md](../LAYOUT_EXAMPLES.md) - Ejemplos avanzados

---

¿Necesitas ayuda? Revisa los archivos de documentación o ajusta la configuración en `sidebar.config.ts` 🚀

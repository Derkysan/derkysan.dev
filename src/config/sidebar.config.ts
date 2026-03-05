/**
 * Configuración del Sidebar Layout
 * 
 * Este archivo te permite controlar fácilmente el comportamiento del sidebar
 * en toda tu aplicación desde un solo lugar.
 */

export const sidebarConfig = {
  // Activar/desactivar el sidebar globalmente
  enabled: false,
  
  // Comportamiento del sidebar
  expandOnHover: true,
  defaultExpanded: false,
  
  // Dimensiones
  expandedWidth: '240px',
  collapsedWidth: '72px',
  
  // Posición del botón toggle
  togglePosition: 'inline' as 'inline' | 'top',
  
  // Redes sociales
  social: {
    github: 'https://github.com/Derkysan',
    linkedin: 'https://www.linkedin.com/in/derkysan/',
  },
  
  // Información de la app
  appInfo: {
    name: 'DerkySan',
    subtitle: 'Developer',
    version: 'v1.0.0',
  },
}

// Exportar como default también
export default sidebarConfig

"use client"

import React from "react"
import { SideBar, type SidebarMenuItem } from "../shared/SideBar"
import { CustomLogo } from "../shared/CustomLogo"
import {
  Menu,
  X,
  Mail,
  Settings,
  FileText,
  Home,
  Briefcase,
} from "lucide-react"
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

interface SidebarLayoutProps {
  children: React.ReactNode
  /** Override default menu items */
  menuItems?: SidebarMenuItem[]
  /** Enable sidebar expand on hover */
  expandOnHover?: boolean
  /** Initial expanded state */
  defaultExpanded?: boolean
  /** Custom brand component */
  customBrand?: React.ReactNode
  /** Custom footer component */
  customFooter?: React.ReactNode
  /** Hide sidebar completely */
  hideSidebar?: boolean
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  menuItems,
  expandOnHover = true,
  defaultExpanded = false,
  customBrand,
  customFooter,
  hideSidebar = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  const defaultMenuItems: SidebarMenuItem[] = [
    {
      id: "github",
      label: "GitHub",
      icon: <FiGithub className="h-5 w-5" />,
      href: "https://github.com/Derkysan",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <FaLinkedinIn className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/derkysan/",
    },
    {
      id: "email",
      label: "Contactar",
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:contacto@derkysan.dev",
    },
  ]

  const defaultBrand = (expanded: boolean) => (
    <div className="flex items-center gap-3">
      <div className="border rounded-full w-10 aspect-square">
        <CustomLogo active={expanded} />
      </div>
    </div>
  )

  const defaultFooter = (isExpanded: boolean) => (
    <div className="space-y-3">
      {/* Theme Toggle */}
      {/* <Button
        variant="outline"
        className="w-full justify-start gap-3"
        onClick={toggleTheme}
      >
        {currentTheme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span>{currentTheme === "dark" ? "Modo Claro" : "Modo Oscuro"}</span>
      </Button> */}

      {/* Social Links */}
      {/* <div className="flex gap-2 justify-center"> */}
        {/* <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8"
        >
          <a
            href="https://github.com/derkysan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub className="h-4 w-4" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8"
        >
          <a
            href="https://linkedin.com/in/derkysan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="h-4 w-4" />
          </a>
        </Button> */}
      {/* </div> */}

      {/* Version */}
      <div className="flex flex-col gap-y-0 items-center justify-center text-xs text-muted-foreground whitespace-nowrap">
        {/* v1.0.0 */}
        <span className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>© copyright</span>
        {/* <span>{new Date().getFullYear()}</span> */}
        <span>20</span>
        <span>26</span>
      </div>
    </div>
  )

  if (hideSidebar) {
    return <>{children}</>
  }

  React.useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  const resolvedMenuItems = menuItems || defaultMenuItems
  const mobileMenuItems = resolvedMenuItems.map((item) => ({
    ...item,
    onClick: () => {
      item.onClick?.()
      setMobileMenuOpen(false)
    },
  }))

  return (
    <div className="flex h-screen overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[#F07D00] bg-background/95 px-4 backdrop-blur md:hidden">
        <div className="h-8 w-8">
          <CustomLogo />
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#F07D00]/40 text-primary transition-colors hover:bg-accent"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" aria-hidden={!mobileMenuOpen}>
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-black/45"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 h-full">
            <SideBar
              className="h-dvh"
              brand={customBrand || defaultBrand}
              menuItems={mobileMenuItems}
              footer={customFooter || defaultFooter}
              expanded={true}
              expandOnHover={false}
              expandedWidth="84vw"
              collapsedWidth="84vw"
            />
          </div>
        </div>
      )}

      <div className="hidden md:block">
        <SideBar
          brand={customBrand || defaultBrand}
          menuItems={resolvedMenuItems}
          footer={customFooter || defaultFooter}
          expandOnHover={expandOnHover}
          defaultExpanded={defaultExpanded}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background pt-14 md:pt-0">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  )
}

// Layout con Sidebar para páginas específicas
export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const dashboardMenuItems: SidebarMenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      id: "projects",
      label: "Proyectos",
      icon: <Briefcase className="h-5 w-5" />,
      href: "/dashboard/projects",
      badge: "5",
    },
    {
      id: "documents",
      label: "Documentos",
      icon: <FileText className="h-5 w-5" />,
      href: "/dashboard/documents",
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <Settings className="h-5 w-5" />,
      href: "/dashboard/settings",
    },
  ]

  return (
    <SidebarLayout
      menuItems={dashboardMenuItems}
      expandOnHover={true}
      defaultExpanded={false}
    >
      {children}
    </SidebarLayout>
  )
}

// Simple wrapper para usar en páginas con layout personalizado
export const withSidebar = (
  Component: React.ComponentType,
  options?: Partial<SidebarLayoutProps>
) => {
  return function WithSidebarWrapper(props: any) {
    return (
      <SidebarLayout {...options}>
        <Component {...props} />
      </SidebarLayout>
    )
  }
}

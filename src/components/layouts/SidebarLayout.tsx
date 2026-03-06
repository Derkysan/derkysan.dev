"use client"

import React from "react"
import { AnimatePresence, motion } from "motion/react"
import { SideBar, type SidebarMenuItem } from "../shared/SideBar"
import { CustomLogo } from "../shared/CustomLogo"
import {
  ArrowUpRight,
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

const SIDEBAR_BRAND_TRANSITION = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
}

const MOBILE_PANEL_TRANSITION = {
  duration: 0.32,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
}

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
    // {
    //   id: "linkedin",
    //   label: "LinkedIn",
    //   icon: <FaLinkedinIn className="h-5 w-5" />,
    //   href: "https://www.linkedin.com/in/derkysan/",
    // },
    {
      id: "email",
      label: "Contactar",
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:derkysan.dev@gmail.com",
    },
  ]

  const defaultBrand = (expanded: boolean) => (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
        <CustomLogo active={expanded} />
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.span
            key="brand-text"
            initial={{ opacity: 0, width: 0, x: -10 }}
            animate={{ opacity: 1, width: "auto", x: 0 }}
            exit={{ opacity: 0, width: 0, x: -10 }}
            transition={SIDEBAR_BRAND_TRANSITION}
            className="overflow-hidden whitespace-nowrap text-sm tracking-[0.24em] font-mono"
          >
            DERKYSAN
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )

  const defaultFooter = (isExpanded: boolean) => (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
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
      <div className={`flex ${isExpanded ? "flex-row w-full text-left justify-start pl-4" : "flex-col gap-y-0"}  text-[10px] text-muted-foreground whitespace-nowrap leading-tight`}>
        {/* v1.0.0 */}
        <span className={`transition-all duration-300 ease-in-out overflow-hidden text-nowrap uppercase ${isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"}`}>© copyright</span>
        {/* <span>{new Date().getFullYear()}</span> */}
        <span className={`${isExpanded ? 'text-gray-100' : 'text-white'}`}>20</span>
        <span className={`${isExpanded ? 'text-gray-100' : 'text-white'}`}>26</span>
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

  const handleMobileItemClick = (item: SidebarMenuItem) => {
    item.onClick?.()
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-[#F07D00]/20 bg-background/80 px-4 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3 rounded-full border border-[#F07D00]/20 bg-background/80 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <div className="h-8 w-8 shrink-0 overflow-hidden">
            <CustomLogo contained />
          </div>
          <span className="text-[11px] tracking-[0.28em] text-foreground/80">DERKYSAN</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[#F07D00]/30 bg-background/80 text-primary shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors hover:bg-accent"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden" aria-hidden={!mobileMenuOpen}>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={MOBILE_PANEL_TRANSITION}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={MOBILE_PANEL_TRANSITION}
              className="absolute inset-x-3 bottom-3 top-3 overflow-hidden rounded-[28px] border border-[#F07D00]/25 bg-background/92 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,125,0,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%)]" />

              <div className="relative flex h-full flex-col px-5 pb-5 pt-4">
                <div className="flex items-start justify-between gap-4 border-b border-[#F07D00]/15 pb-4">
                  {customBrand ? (
                    <div className="min-w-0 flex-1 overflow-hidden">
                      {customBrand}
                    </div>
                  ) : (
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden">
                        <CustomLogo active contained />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/60">
                          Menu
                        </p>
                        <p className="truncate text-sm tracking-[0.22em] text-foreground">
                          DERKYSAN
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F07D00]/20 bg-background/80 text-primary transition-colors hover:bg-accent"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                  <motion.div
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.04,
                        },
                      },
                    }}
                    className="space-y-3"
                  >
                    {mobileMenuItems.map((item) => {
                      const isExternalLink = !!item.href && /^(https?:\/\/|mailto:)/i.test(item.href)
                      const itemClasses =
                        "group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition-all duration-300 ease-in-out hover:border-[#F07D00]/30 hover:bg-white/[0.06]"

                      const content = (
                        <>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#F07D00]/20 bg-[#F07D00]/10 text-[#F7A23B]">
                            {item.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm text-foreground">
                              {item.label}
                            </span>
                            <span className="block truncate pt-1 text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                              {item.href?.replace(/^mailto:/, "") || "Abrir"}
                            </span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/35 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F7A23B]" />
                        </>
                      )

                      return (
                        <motion.div
                          key={item.id}
                          variants={{
                            hidden: { opacity: 0, y: 14 },
                            show: { opacity: 1, y: 0 },
                          }}
                          transition={MOBILE_PANEL_TRANSITION}
                        >
                          {item.href ? (
                            <a
                              href={item.href}
                              target={isExternalLink ? "_blank" : undefined}
                              rel={isExternalLink ? "noopener noreferrer" : undefined}
                              onClick={() => handleMobileItemClick(item)}
                              className={itemClasses}
                            >
                              {content}
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleMobileItemClick(item)}
                              className={itemClasses}
                            >
                              {content}
                            </button>
                          )}
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>

                <div className="border-t border-[#F07D00]/15 pt-4">
                  {customFooter ? (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      {customFooter}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-foreground/55">
                      <span>© 2026</span>
                      <span className="text-[#F7A23B]">Software Developer</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="hidden md:block p-3">
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

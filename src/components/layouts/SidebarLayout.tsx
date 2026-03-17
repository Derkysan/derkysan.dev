
import React from "react"
import { AnimatePresence, motion } from "motion/react"
import { SideBar, type SidebarMenuItem } from "../shared/SideBar"
import { CustomLogo } from "../shared/CustomLogo"
import {
  Mail,
  Settings,
  FileText,
  Home,
  Briefcase,
  Plus,
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
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)
  
  const defaultMenuItems: SidebarMenuItem[] = [
    // {
    //   id: "home-view",
    //   label: "About",
    //   icon: <Home className="h-5 w-5" />,
    //   href: "/",
    // },
    // {
    //   id: "pymes-view",
    //   label: "Pymes",
    //   icon: <Briefcase className="h-5 w-5" />,
    //   href: "/pymes",
    // },
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
      href: "mailto:derkysan.dev@gmail.com",
    },
  ]

  const defaultBrand = (expanded: boolean) => (
    <a href="/" className="flex min-w-0 items-center gap-3">
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
    </a>
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
      <div className={`flex flex-row items-center text-[10px] text-muted-foreground whitespace-nowrap leading-tight ${isExpanded ? "w-full justify-start pl-4" : "justify-center"}`}>
        <span className={`transition-all duration-300 ease-in-out overflow-hidden text-nowrap uppercase ${isExpanded ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"}`}>  copyright&nbsp;</span>
        <span className={`${isExpanded ? 'text-gray-100' : 'text-white'}`}>2026</span>
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
      <header className="fixed inset-x-0 top-0 z-40 flex py-6 items-center justify-between border-[#F07D00]/20 px-4 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3 rounded-full border-[#F07D00]/20 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          <div className="h-10 shrink-0 overflow-hidden">
            <CustomLogo contained />
            {/* <AnimatePresence initial={false}>
              {mobileMenuOpen && (
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
            </AnimatePresence> */}
          </div>
          <AnimatePresence initial={false}>
            {mobileMenuOpen && (
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
          {/* <span className="text-[11px] tracking-[0.28em] text-foreground/80">DERKYSAN</span> */}
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[#F07D00]/30 bg-background/80 text-primary shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors hover:bg-accent"
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Plus className="h-5 w-5" />
          </motion.div>
        </button>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-center bg-black/65 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={MOBILE_PANEL_TRANSITION}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.12,
                  },
                },
              }}
              className="flex flex-col items-center gap-10"
              onClick={(e) => e.stopPropagation()}
            >
              {mobileMenuItems.map((item) => {
                const isExternalLink = !!item.href && /^(https?:\/\/|mailto:)/i.test(item.href)

                const content = (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="flex items-center"
                  >
                    <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em] text-gray-300">
                      {item.label}
                    </span>
                  </motion.div>
                )

                return item.href ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target={isExternalLink ? "_blank" : undefined}
                    rel={isExternalLink ? "noopener noreferrer" : undefined}
                    onClick={() => handleMobileItemClick(item)}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMobileItemClick(item)}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {content}
                  </button>
                )
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:block">
        <SideBar
          brand={customBrand || defaultBrand}
          menuItems={resolvedMenuItems}
          footer={customFooter || defaultFooter}
          expandOnHover={expandOnHover}
          defaultExpanded={defaultExpanded}
          onExpandedChange={setIsExpanded}
        />
      </div>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto bg-background md:pt-0`}>
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

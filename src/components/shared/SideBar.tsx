"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  Menu, 
  Home,
  User,
  Settings,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Types
export interface SidebarMenuItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  href?: string
  badge?: string | number
}

export interface SidebarProps {
  /** Content for the brand/logo area */
  brand?: React.ReactNode | ((expanded: boolean) => React.ReactNode)
  /** Menu items to display */
  menuItems?: SidebarMenuItem[]
  /** Content for the footer area */
  footer?: React.ReactNode | ((expanded: boolean) => React.ReactNode)
  /** Initial expanded state */
  defaultExpanded?: boolean
  /** Enable expand on hover */
  expandOnHover?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Custom className */
  className?: string
  /** Width when expanded (in pixels or CSS value) */
  expandedWidth?: string
  /** Width when collapsed (in pixels or CSS value) */
  collapsedWidth?: string
  /** Position of the toggle button */
  togglePosition?: "top" | "inline"
  /** Children to render custom content */
  children?: React.ReactNode
}

export const SideBar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      brand,
      menuItems = [],
      footer,
      defaultExpanded = false,
      expandOnHover = false,
      expanded: controlledExpanded,
      onExpandedChange,
      className,
      expandedWidth = "180px",
      collapsedWidth = "72px",
      children,
    },
    ref
  ) => {
    // State management
    const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
    const [isHovering, setIsHovering] = React.useState(false)

    const isControlled = controlledExpanded !== undefined
    const isExpanded = isControlled ? controlledExpanded : internalExpanded

    // Compute actual expanded state considering hover
    const actualExpanded = expandOnHover ? isExpanded || isHovering : isExpanded

    const handleMouseEnter = () => {
      if (expandOnHover) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      if (expandOnHover) {
        setIsHovering(false)
      }
    }

    const resolvedBrand =
      typeof brand === "function" ? brand(actualExpanded) : brand
    
    const resolvedFooter =
      typeof footer === "function" ? footer(actualExpanded) : footer

    return (
      <TooltipProvider delayDuration={0}>
        <motion.aside
          ref={ref}
          className={cn(
            "relative flex flex-col h-screen bg-background border-r border-[#F07D00] transition-all duration-100 ease-linear",
            className
          )}
          initial={false}
          animate={{ width: actualExpanded ? expandedWidth : collapsedWidth }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header/Brand Area */}
          <SidebarHeader>
            <div className={cn(
              "flex items-center px-4 py-6",
              // !actualExpanded && "justify-center px-2"
            )}>
              {resolvedBrand || (
                <DefaultBrand expanded={actualExpanded} />
              )}
            </div>
          </SidebarHeader>

          {/* Navigation Menu Area */}
          <SidebarMenu>
            {children || (
              <nav className="flex h-full flex-col justify-center space-y-1 px-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem
                    key={item.id}
                    item={item}
                    expanded={actualExpanded}
                  />
                ))}
              </nav>
            )}
          </SidebarMenu>

          {/* Footer Area */}
          {resolvedFooter && (
            <SidebarFooter expanded={actualExpanded}>
              {resolvedFooter}
            </SidebarFooter>
          )}
        </motion.aside>
      </TooltipProvider>
    )
  }
)

SideBar.displayName = "SideBar"

// Subcomponents

interface SidebarHeaderProps {
  children: React.ReactNode
  className?: string
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ 
  children, 
  className 
}) => {
  return (
    <header className={cn("shrink-0 border-b border-[#F07D00]", className)}>
      {children}
    </header>
  )
}

interface SidebarMenuProps {
  children: React.ReactNode
  className?: string
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("flex-1 overflow-y-auto py-4", className)}>
      {children}
    </div>
  )
}

interface SidebarFooterProps {
  children: React.ReactNode
  expanded: boolean
  className?: string
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ 
  children, 
  expanded,
  className 
}) => {
  return (
    <footer className={cn(
      "shrink-0 border-t border-[#F07D00] p-4",
      !expanded && "px-2",
      className
    )}>
      {children}
    </footer>
  )
}

interface SidebarMenuItemProps {
  item: SidebarMenuItem
  expanded: boolean
}
// !expanded && "justify-center px-2"
const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, expanded }) => {
  const isExternalLink = !!item.href && /^(https?:\/\/|mailto:)/i.test(item.href)

  const content = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 relative text-gray-400",
        
      )}
      onClick={item.onClick}
      asChild={!!item.href}
    >
      {item.href ? (
        <a
          href={item.href}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noopener noreferrer" : undefined}
        >
          <span className="shrink-0">{item.icon}</span>
          <AnimatePresence mode="wait">
            {/* {expanded && ( */}
              <motion.span
                // initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                // exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            {/* )} */}
          </AnimatePresence>
          {item.badge && expanded && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full"
            >
              {item.badge}
            </motion.span>
          )}
        </a>
      ) : (
        <>
          <span className="shrink-0">{item.icon}</span>
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          {item.badge && expanded && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full"
            >
              {item.badge}
            </motion.span>
          )}
        </>
      )}
    </Button>
  )

  if (!expanded) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{item.label}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}

// Default brand component
const DefaultBrand: React.FC<{ expanded: boolean }> = ({ expanded }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
        <Menu className="h-5 w-5 text-primary-foreground" />
      </div>
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="font-semibold text-lg overflow-hidden whitespace-nowrap"
          >
            Brand
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

// Example usage component
export const SideBarExample: React.FC = () => {
  const menuItems: SidebarMenuItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      onClick: () => console.log("Home clicked"),
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
      onClick: () => console.log("Profile clicked"),
      badge: "3",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      onClick: () => console.log("Settings clicked"),
    },
  ]

  return (
    <SideBar
      brand={
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">DS</span>
          </div>
          <span className="font-semibold text-lg">DerkySan</span>
        </div>
      }
      menuItems={menuItems}
      footer={
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      }
      expandOnHover
      defaultExpanded={false}
    />
  )
}

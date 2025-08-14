"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { PanelLeft, PanelRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Sidebar({ 
  className, 
  children, 
  side = "left",
  defaultOpen = true,
  ...props 
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  
  const ToggleIcon = side === "right" ? PanelRight : PanelLeft
  
  return (
    <CollapsiblePrimitive.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "group relative flex h-full flex-nowrap transition-[width] duration-200",
        isOpen ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      <div className="flex h-full w-full flex-col border-r bg-background">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "absolute top-4 z-10 h-8 w-8 rounded-full p-0",
          side === "right" 
            ? "-left-4 group-data-[state=open]:left-auto group-data-[state=open]:-right-4"
            : "-right-4 group-data-[state=open]:-left-4"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ToggleIcon className="h-4 w-4" />
        <span className="sr-only">
          {isOpen ? "Collapse" : "Expand"} sidebar
        </span>
      </Button>
    </CollapsiblePrimitive.Root>
  )
}

const SidebarHeader = ({ className, ...props }) => (
  <div
    className={cn("flex h-16 items-center border-b px-4", className)}
    {...props}
  />
)

const SidebarContent = ({ className, ...props }) => (
  <div className={cn("flex-1 overflow-y-auto p-4", className)} {...props} />
)

const SidebarFooter = ({ className, ...props }) => (
  <div
    className={cn("border-t p-4", className)}
    {...props}
  />
)

const SidebarTitle = ({ className, ...props }) => (
  <h3
    className={cn("text-lg font-semibold tracking-tight", className)}
    {...props}
  />
)

const SidebarDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
)

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTitle,
  SidebarDescription,
}

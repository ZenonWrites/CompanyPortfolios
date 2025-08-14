"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef(({ 
  src, 
  alt = "Profile picture", 
  width = 400, 
  height = 400, 
  className, 
  ...props 
}, ref) => {
  // Check if it's a local image (starts with /)
  const isLocalImage = src?.startsWith('/')
  
  // For local images, we'll use Next.js Image component
  if (isLocalImage) {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "h-full w-full object-cover object-center",
          className
        )}
        {...props}
      />
    )
  }
  
  // For remote images, use regular img with object-fit
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn(
        "h-full w-full object-cover object-center",
        className
      )}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef(({ 
  className, 
  children, 
  ...props 
}, ref) => {
  const fallbackText = children || '?'
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-lg font-medium",
        className
      )}
      {...props}
    >
      {fallbackText}
    </div>
  )
})
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
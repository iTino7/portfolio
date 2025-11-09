import { cn } from "../lib/utils"
import type { SectionStripProps } from "../types/components"

export function SectionStrip({ children, className, innerClassName, fullWidth = false, useThemeColors = true }: SectionStripProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden border-t border-foreground/10 transition-colors",
        fullWidth && "w-screen max-w-none md:w-screen md:max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]",
        useThemeColors && "bg-foreground text-background dark:bg-background dark:text-foreground",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-center overflow-hidden px-6 py-10 md:px-12 lg:px-20",
          fullWidth ? "max-w-none" : "max-w-6xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}

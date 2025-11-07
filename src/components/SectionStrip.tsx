import { cn } from "../lib/utils"
import type { SectionStripProps } from "../types/components"

export function SectionStrip({ children, className, innerClassName, fullWidth = false }: SectionStripProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden border-t border-foreground/10 bg-foreground text-background transition-colors dark:bg-background dark:text-foreground",
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

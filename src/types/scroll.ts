import type { CSSProperties, ReactNode, RefObject } from "react"

export interface VelocityMapping {
  input: [number, number]
  output: [number, number]
}

export interface VelocityTextProps {
  children: ReactNode
  baseVelocity: number
  scrollContainerRef?: RefObject<HTMLElement>
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: CSSProperties
  scrollerStyle?: CSSProperties
  separator?: ReactNode
  separatorClassName?: string
}

export interface ScrollVelocityProps {
  scrollContainerRef?: RefObject<HTMLElement>
  texts: string[]
  velocity?: number
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: CSSProperties
  scrollerStyle?: CSSProperties
  separator?: ReactNode
  separatorClassName?: string
}

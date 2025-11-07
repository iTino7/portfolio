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
  texts: ReactNode[]
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

export interface ScrollRevealProps {
  children: string
  scrollContainerRef?: RefObject<HTMLElement>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
  fromColor?: string
  toColor?: string
}

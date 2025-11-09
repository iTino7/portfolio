import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

import { Navbar, SectionStrip, ScrollVelocity } from "../components"
import AboutSection from "./About"
import { ContactBanner, ContactSection, FooterSection, WorksSection } from "./Works"
import { Button } from "../components/ui/button"

const NAME = "Sabatino"

function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-stretch gap-24 pt-12 pb-0">
        <section
          id="home"
          data-scroll-target
          className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-16 px-6 py-12 md:px-12 lg:px-20"
        >
          <div className="text-center sm:text-right space-y-6">
            <p className="font-initials text-7xl font-semibold leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl lg:text-[10rem]">
              Hello
            </p>
            <p className="font-initials text-7xl font-semibold leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl lg:text-[10rem]">
              I&apos;m{' '}
              <span className="inline-flex items-baseline gap-1 whitespace-nowrap">
                <span className="relative inline-block">
                  <span
                    className="pointer-events-none absolute inset-0 translate-x-[6px] translate-y-[6px] select-none text-sky-300/75 -z-10"
                    aria-hidden="true"
                  >
                    {NAME.charAt(0)}
                  </span>
                  <span className="relative z-10">{NAME.charAt(0)}</span>
                </span>
                <span>{NAME.slice(1)}</span>
              </span>
            </p>
          </div>

          <div className="flex w-full max-w-6xl justify-start text-xl leading-relaxed text-muted-foreground">
            <p className="max-w-sm text-left">
              <span className="font-semibold text-primary">I am a front-end developer</span>{' '}
              who constantly seeks out innovative solutions to everyday problems.
            </p>
          </div>
        </section>
        <SectionStrip
          fullWidth
          innerClassName="px-0"
          useThemeColors={false}
          className="bg-[#0d1a13] text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
        >
          <div className="flex w-full flex-col items-center gap-2 px-4 py-1 md:px-8">
            <ScrollVelocity
              texts={["GIVING LIFE TO PROJECTS"]}
              velocity={40}
              className="px-3 text-xs font-semibold uppercase tracking-[0.45em]"
              parallaxClassName="w-full"
              scrollerClassName="gap-4"
              separator={
                <span className="flex items-center gap-0.5" aria-hidden="true">
                  <span className="h-px w-3 rounded-full bg-current" />
                  <span className="h-px w-3 rounded-full bg-current/70" />
                  <span className="h-px w-3 rounded-full bg-current" />
                </span>
              }
              separatorClassName="text-current/70"
            />
          </div>
        </SectionStrip>
        <AboutSection />
        <div className="px-6 pb-16 md:px-12 lg:px-20 space-y-24">
          <WorksSection id="works" />
          <ContactBanner />
          <ContactSection id="contact" />
        </div>
      </main>
      <FooterSection />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={`group fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full border-foreground/30 bg-background/75 shadow-lg backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 ${
          showScrollTop
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2"
        }`}
        onClick={handleScrollToTop}
        aria-label="Torna all'inizio"
        tabIndex={showScrollTop ? 0 : -1}
        aria-hidden={!showScrollTop}
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </Button>
    </div>
  )
}

export default Home
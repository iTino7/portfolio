import { ChevronDown } from "lucide-react"
import { Navbar, SectionStrip, ScrollVelocity } from "../components"
import { Button } from "../components/ui/button"

const NAME = "Sabatino"

function Home() {
  const handleScrollHintClick = () => {
    const target = document.querySelector("[data-scroll-target]") as HTMLElement | null

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-stretch px-6 py-12 md:px-12 lg:px-20">
        <section className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-16 py-12">
          <div className="text-center sm:text-right">
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

          <div className="flex w-full max-w-6xl items-center justify-between gap-6 text-xl leading-relaxed text-muted-foreground">
            <p className="max-w-sm text-left">
              <span className="font-semibold text-primary">I am a front-end developer</span>{' '}
              who constantly seeks out innovative solutions to everyday problems.
            </p>
            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              className="relative mr-1 cursor-pointer rounded-full border border-foreground/20 bg-background/70 hover:-translate-y-0.5"
              onClick={handleScrollHintClick}
              aria-label="Scroll down"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </section>
      </main>
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
    </div>
  )
}

export default Home
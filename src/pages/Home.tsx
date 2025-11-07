import { ChevronDown } from "lucide-react"
import { Navbar } from "../components"
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
          <div className="text-right">
            <p className="font-initials text-7xl font-semibold leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl lg:text-[10rem]">
              Hello
            </p>
            <p className="font-initials text-7xl font-semibold leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl lg:text-[10rem]">
              I&apos;m{' '}
              <span className="relative inline-block">
                <span
                  className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 select-none text-sky-300/75"
                  aria-hidden="true"
                >
                  {NAME.charAt(0)}
                </span>
                <span className="relative">{NAME.charAt(0)}</span>
              </span>
              {NAME.slice(1)}
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
    </div>
  )
}

export default Home
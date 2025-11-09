import { ChevronDown } from "lucide-react"
import { Navbar, SectionStrip, ScrollVelocity } from "../components"
import { Button } from "../components/ui/button"
import {
  SiBootstrap,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiMui,
  SiReact,
  SiReactquery,
  SiSass,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from "react-icons/si"

const NAME = "Sabatino"

const techIcons = [
  { id: "html", Icon: SiHtml5, hoverClass: "group-hover:text-[#e34f26] dark:group-hover:text-[#e34f26]" },
  { id: "css", Icon: SiCss3, hoverClass: "group-hover:text-[#1572b6] dark:group-hover:text-[#1572b6]" },
  { id: "javascript", Icon: SiJavascript, hoverClass: "group-hover:text-[#f7df1e] dark:group-hover:text-[#f7df1e]" },
  { id: "typescript", Icon: SiTypescript, hoverClass: "group-hover:text-[#3178c6] dark:group-hover:text-[#3178c6]" },
  { id: "scss", Icon: SiSass, hoverClass: "group-hover:text-[#cf649a] dark:group-hover:text-[#cf649a]" },
  { id: "react", Icon: SiReact, hoverClass: "group-hover:text-[#61dafb] dark:group-hover:text-[#61dafb]" },
  { id: "tailwind", Icon: SiTailwindcss, hoverClass: "group-hover:text-[#38bdf8] dark:group-hover:text-[#38bdf8]" },
  { id: "shadcn", Icon: SiShadcnui, hoverClass: "group-hover:text-[#0f172a] dark:group-hover:text-[#0f172a]" },
  { id: "zod", Icon: SiZod, hoverClass: "group-hover:text-[#19a974] dark:group-hover:text-[#19a974]" },
  { id: "tanstack-query", Icon: SiReactquery, hoverClass: "group-hover:text-[#ff4154] dark:group-hover:text-[#ff4154]" },
  { id: "bootstrap", Icon: SiBootstrap, hoverClass: "group-hover:text-[#7952b3] dark:group-hover:text-[#7952b3]" },
  { id: "mui", Icon: SiMui, hoverClass: "group-hover:text-[#007fff] dark:group-hover:text-[#007fff]" },
]

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
      <main className="flex flex-1 flex-col items-stretch gap-24 pt-12 pb-0">
        <section
          id="home"
          data-scroll-target
          className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-16 px-6 py-12 md:px-12 lg:px-20"
        >
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
        <section
          id="about"
          data-scroll-target
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 pb-0 text-center md:px-12 lg:px-20"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">About Me</p>

          <div className="relative flex w-full flex-col items-center gap-5 text-muted-foreground">
            <span className="pointer-events-none absolute left-0 top-0 -translate-x-2 -translate-y-2 font-script text-4xl text-foreground/30 dark:text-foreground/40">
              &lt;h/&gt;
            </span>
            <div className="flex w-full max-w-xl flex-col gap-6 text-center">
              <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-relaxed font-medium text-center text-muted-foreground">
                Sono Sabatino, front-end developer che dà vita a interfacce pulite e coerenti con l’identità del brand. Mi piace trasformare concept grezzi in esperienze tangibili, curando micro-interazioni, performance e qualità del codice. Collaboro con designer e stakeholder per ottenere feedback rapidi e trovare soluzioni chiare, funzionali e pensate per le persone.
              </p>
              <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-relaxed font-medium text-center text-muted-foreground">
                Fuori dallo schermo mi dedico a design system, tipografia e motion per portarli nel lavoro di tutti i giorni. Il mio obiettivo è creare esperienze accessibili e piacevoli, dove estetica e funzionalità si incontrano in un equilibrio naturale.
              </p>
            </div>
            <span className="pointer-events-none absolute bottom-0 right-0 translate-x-2 translate-y-2 font-script text-4xl text-foreground/30 dark:text-foreground/40">
              &lt;h/&gt;
            </span>
          </div>
        </section>
        <SectionStrip
          fullWidth
          innerClassName="px-0"
          useThemeColors={false}
          className="bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950"
        >
          <div className="flex w-full flex-col gap-2 px-4 py-5 text-center md:px-6">
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-current/70 font-initials">
              Strumenti che uso ogni giorno
            </p>
            <ScrollVelocity
              texts={[
                <div key="tech-strip" className="flex items-center gap-4">
                  {techIcons.map(({ id, Icon, hoverClass }) => (
                    <span
                      key={id}
                      className="group inline-flex cursor-pointer items-center justify-center px-3 text-current transition-colors duration-200"
                    >
                      <Icon
                        className={`h-7 w-7 text-inherit transition-colors duration-200 ${hoverClass}`}
                      />
                    </span>
                  ))}
                </div>
              ]}
              velocity={20}
              numCopies={3}
              className=""
              parallaxClassName="w-full"
              scrollerClassName="gap-0"
              separator={null}
            />
          </div>
        </SectionStrip>
      </main>
    </div>
  )
}

export default Home
import { ArrowUpRight, Github } from "lucide-react"

import { Navbar } from "../components"

const GITHUB_USERNAME = "iTino7"

type WorksSectionProps = {
  id?: string
}

export function WorksSection({ id }: WorksSectionProps) {
  return (
    <section
      id={id}
      data-scroll-target={id ? true : undefined}
      className="mx-auto flex w-full max-w-6xl flex-col gap-12"
    >
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4">
          <p className="font-initials text-6xl font-semibold leading-none text-foreground sm:text-7xl md:text-8xl">
            Selected Works
          </p>
          <figure className="h-32 w-32 overflow-hidden rounded-full border border-foreground/10 bg-background shadow-md md:h-40 md:w-40">
            <img
              src={`https://github.com/${GITHUB_USERNAME}.png?size=360`}
              alt={`Avatar GitHub di ${GITHUB_USERNAME}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            Una selezione dei progetti più recenti dal mio profilo GitHub.
          </p>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition hover:text-foreground"
        >
          <Github className="h-4 w-4" /> Visita il mio GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </header>

      <section className="rounded-3xl border border-foreground/5 bg-background/60 p-6 shadow-sm">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-lg">Cronologia contributi</p>
            <p className="text-sm text-muted-foreground">
              Attività degli ultimi 12 mesi su GitHub.
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=overview&from=${new Date().getFullYear()}-01-01`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-foreground/70 transition hover:text-foreground"
          >
            Vedi dettagli
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </header>
        <figure className="mt-6 overflow-hidden rounded-2xl border border-foreground/10 bg-background">
          <img
            src={`https://ghchart.rshah.org/0C4A6E/${GITHUB_USERNAME}`}
            alt={`Github contribution chart for ${GITHUB_USERNAME}`}
            className="w-full"
            loading="lazy"
          />
        </figure>
      </section>
    </section>
  )
}

export default function Works() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16 md:px-12 lg:px-20">
        <WorksSection />
      </main>
    </div>
  )
}

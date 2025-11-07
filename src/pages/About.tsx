import { Navbar, SectionStrip } from "../components"

const bullets = [
  {
    title: "Esperienza",
    detail: "Più di 4 anni di sviluppo front-end tra UI moderne e performance ottimizzate.",
  },
  {
    title: "Stack",
    detail: "React, TypeScript, Tailwind CSS, Next.js, Node.js, React Query.",
  },
  {
    title: "Focus",
    detail: "Design system, accessibilità, performance, collaborazione cross-team.",
  },
]

function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-start px-6 py-16 md:px-12 lg:px-20">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-16">
          <header className="space-y-6 text-left md:text-right">
            <p className="font-initials text-6xl font-semibold leading-none text-foreground sm:text-7xl md:text-8xl">
              About Me
            </p>
            <p className="max-w-2xl text-muted-foreground md:ml-auto">
              Sono un front-end developer focalizzato sulla creazione di esperienze digitali curate, accessibili e performanti. Amo collaborare con designer e stakeholder per trasformare le idee in prodotti reali, scalabili e facili da usare.
            </p>
          </header>

          <div className="grid gap-10 md:grid-cols-2">
            <article className="space-y-6">
              <h2 className="text-xl font-semibold">Chi sono</h2>
              <p className="text-muted-foreground">
                Basato in Italia, lavoro con team remoti e ibridi aiutando a costruire interfacce robuste e fluide. Mi guidano curiosità e attenzione ai dettagli, con l&apos;obiettivo di unire estetica, dati e micro-interazioni memorabili.
              </p>
              <p className="text-muted-foreground">
                Quando non sono al computer, approfondisco product design, tipografia e motion, tutto ciò che può rendere un prodotto utile e gradevole.
              </p>
            </article>

            <aside className="space-y-6 rounded-3xl border border-foreground/5 bg-background/70 p-8 shadow-sm">
              <h2 className="text-xl font-semibold">In breve</h2>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {bullets.map((item) => (
                  <li key={item.title}>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p>{item.detail}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </main>
      <SectionStrip fullWidth innerClassName="px-0">
        <div className="flex w-full flex-col items-center gap-4 px-4 py-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.4em] text-background/70 dark:text-foreground/70">
            Collaboriamo su prodotti, brand e interfacce
          </p>
        </div>
      </SectionStrip>
    </div>
  )
}

export default About

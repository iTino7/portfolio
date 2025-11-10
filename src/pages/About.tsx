import { SectionStrip, ScrollVelocity } from "../components"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiSass,
  SiReact,
  SiTailwindcss,
  SiShadcnui,
  SiZod,
  SiReactquery,
  SiBootstrap,
  SiMui,
} from "react-icons/si"

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
];

export default function AboutSection() {
  return (
    <section id="about" data-scroll-target className="px-6 pt-16 pb-0 md:px-12 lg:px-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">About Me</p>

        <div className="relative flex w-full flex-col items-center gap-5 text-muted-foreground">
          <span className="pointer-events-none absolute left-0 top-0 -translate-x-2 -translate-y-2 font-script text-4xl text-foreground/30 dark:text-foreground/40">
            &lt;h/&gt;
          </span>
          <div className="flex w-full max-w-xl flex-col gap-6 text-center">
            <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-relaxed font-medium text-muted-foreground">
              Sono Sabatino, front-end developer che dà vita a interfacce pulite e coerenti con l’identità del brand. Mi piace trasformare concept grezzi in esperienze tangibili, curando micro-interazioni, performance e qualità del codice. Collaboro con designer e stakeholder per ottenere feedback rapidi e trovare soluzioni chiare, funzionali e pensate per le persone.
            </p>
            <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-relaxed font-medium text-muted-foreground">
              Fuori dallo schermo mi dedico alle mie passioni: sport, film e serie TV. Mi aiutano a mantenere disciplina, intuito narrativo e attenzione ai dettagli—gli stessi ingredienti che porto nei progetti digitali per renderli coinvolgenti e ben equilibrati.
            </p>
          </div>
          <span className="pointer-events-none absolute bottom-0 right-0 translate-x-2 translate-y-2 font-script text-4xl text-foreground/30 dark:text-foreground/40">
            &lt;h/&gt;
          </span>
        </div>
      </div>

      <div className="-mx-6 mt-12 md:-mx-12 lg:-mx-20">
        <SectionStrip
          fullWidth
          innerClassName="px-0"
          useThemeColors={false}
          className="bg-[#0d1a13] text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
        >
          <div className="flex w-full flex-col items-center gap-2 px-4 py-3 text-center md:px-8">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-current/70 font-initials">
              Strumenti che uso ogni giorno
            </p>
            <ScrollVelocity
              texts={[
                <div key="tech-strip" className="flex w-full items-center justify-center gap-4">
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
              className="px-3"
              parallaxClassName="w-full"
              scrollerClassName="gap-4"
              separator={null}
            />
          </div>
        </SectionStrip>
      </div>
    </section>
  )
}

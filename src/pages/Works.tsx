import { type FormEvent, useState } from "react"
import { ArrowUpRight, Github, Linkedin, Mail, Phone, SendHorizonal } from "lucide-react"

import { Navbar, SectionStrip } from "../components"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

const GITHUB_USERNAME = "iTino7"
const CONTACT_EMAIL = "Sabatino.b007@gmail.com"
const CONTACT_PHONE = "+39 331 149 4312"
const CONTACT_LINKEDIN = "https://www.linkedin.com/in/tinoborrelli"

type WorksSectionProps = {
  id?: string
}

type ContactSectionProps = {
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

export function ContactSection({ id }: ContactSectionProps) {
  const [status, setStatus] = useState<"idle" | "success">("idle")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    form.reset()
    setStatus("success")
  }

  return (
    <section
      id={id}
      data-scroll-target={id ? true : undefined}
      className="mx-auto grid w-full max-w-6xl gap-12 rounded-3xl border border-foreground/5 bg-background/70 p-8 shadow-sm lg:grid-cols-[1.1fr_1fr]"
    >
      <div className="space-y-8">
        <header className="space-y-4">
          <p className="font-initials text-5xl font-semibold leading-none text-foreground sm:text-6xl md:text-7xl">
            Let&apos;s get in touch
          </p>
          <p className="max-w-md text-base text-muted-foreground">
            Raccontami il tuo progetto o la tua idea. Preferisci una call? Scrivimi direttamente via
            email, su LinkedIn oppure lasciami un messaggio qui sotto.
          </p>
        </header>

        <ul className="space-y-4 text-sm text-muted-foreground">
          <li className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10">
              <Mail className="h-4 w-4" />
            </span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-primary">
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10">
              <Phone className="h-4 w-4" />
            </span>
            <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} className="transition-colors hover:text-primary">
              {CONTACT_PHONE}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10">
              <Linkedin className="h-4 w-4" />
            </span>
            <a
              href={CONTACT_LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
          </li>
        </ul>

        <p className="text-xs text-muted-foreground/70">
          Aggiorna i dati di contatto con le tue informazioni reali o collegali a un servizio di
          automazione per ricevere messaggi direttamente nella tua inbox.
        </p>
      </div>

      <div className="rounded-3xl border border-foreground/5 bg-background/80 p-6 shadow-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" placeholder="Il tuo nome" required autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="tuo@indirizzo.com" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefono (opzionale)</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+39 333 000 0000" autoComplete="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Messaggio</Label>
            <Textarea id="message" name="message" placeholder="Raccontami qualcosa del tuo progetto..." required rows={6} />
          </div>
          <Button type="submit" className="w-full justify-center gap-2">
            Invia messaggio
            <SendHorizonal className="h-4 w-4" />
          </Button>
          {status === "success" && (
            <p className="text-sm text-primary">Messaggio inviato! Ti risponderò il prima possibile.</p>
          )}
        </form>
      </div>
    </section>
  )
}

export function ContactBanner() {
  return (
    <SectionStrip
      useThemeColors={false}
      className="border-t-0 bg-foreground text-background dark:bg-neutral-50 dark:text-neutral-900"
      innerClassName="flex flex-col gap-6 px-6 text-center md:flex-row md:items-center md:justify-between md:px-12 md:text-left lg:px-20"
      fullWidth
    >
      <div className="space-y-2">
        <p className="font-initials text-4xl font-semibold leading-none sm:text-5xl md:text-6xl">
          Pronto a collaborare?
        </p>
        <p className="text-sm text-muted-foreground md:max-w-md dark:text-muted-foreground/80">
          Dimmi qualche dettaglio sul tuo progetto: posso aiutarti a trasformare un&apos;idea in un prodotto digitale curato e performante.
        </p>
      </div>
      <Button
        asChild
        size="lg"
        className="px-6 bg-background text-foreground hover:bg-background/90 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
      >
        <a href="#contact">Parliamone</a>
      </Button>
    </SectionStrip>
  )
}

export function FooterSection() {
  return (
    <SectionStrip
      useThemeColors={false}
      className="bg-foreground text-background dark:bg-neutral-50 dark:text-neutral-900"
      innerClassName="px-6 text-center text-xs opacity-80 md:px-12 lg:px-20"
      fullWidth
    >
      © {new Date().getFullYear()} Sabatino B. Tutti i diritti riservati.
    </SectionStrip>
  )
}

export default function Works() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16 md:px-12 lg:px-20">
        <div className="flex flex-col gap-24">
          <WorksSection id="works" />
          <ContactBanner />
          <ContactSection id="contact" />
        </div>
      </main>
      <FooterSection />
    </div>
  )
}

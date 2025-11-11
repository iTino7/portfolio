import { type FormEvent, useCallback, useMemo, useState } from "react"
import { Linkedin, Mail, Phone, SendHorizonal } from "lucide-react"

import { toast } from "sonner"

import { SectionStrip } from "./SectionStrip"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { type ContactFormErrors, type ContactFormValues, validateContactForm } from "../lib/contact-schema"

const CONTACT_EMAIL = "Sabatino.b007@gmail.com"
const CONTACT_PHONE = "+39 331 149 4312"
const CONTACT_WHATSAPP_URL = "https://wa.me/393311494312"
const CONTACT_LINKEDIN = "https://www.linkedin.com/in/tinoborrelli"

type ContactSectionProps = {
  id?: string
}

type SubmitStatus = "idle" | "loading" | "success" | "error"

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL?.toString() ?? "http://localhost:3002/api/contact"

function scrollToContact(id: string) {
  const target = document.querySelector(id)
  if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export function ContactSection({ id }: ContactSectionProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const mappedEndpoint = useMemo(() => CONTACT_API_URL, [])

  const clearError = (field: keyof ContactFormValues) => {
    setErrors((previous) => {
      if (!previous[field]) {
        return previous
      }
      const next = { ...previous }
      delete next[field]
      return next
    })
  }

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      setStatus("idle")
      setServerError(null)

      const formData = new FormData(form)
      const rawData: ContactFormValues = {
        name: formData.get("name")?.toString()?.trim() ?? "",
        email: formData.get("email")?.toString()?.trim() ?? "",
        phone: (() => {
          const value = formData.get("phone")?.toString().trim()
          return value ? value : undefined
        })(),
        message: formData.get("message")?.toString()?.trim() ?? "",
      }

      const parsed = validateContactForm(rawData)

      if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors
        setErrors({
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          phone: fieldErrors.phone?.[0],
          message: fieldErrors.message?.[0],
        })
        return
      }

      setErrors({})
      setStatus("loading")

      try {
        const response = await fetch(mappedEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsed.data),
        })

        if (response.status === 400) {
          let payload: unknown = null
          try {
            payload = await response.json()
          } catch {
            payload = null
          }

          if (payload && typeof payload === "object" && !Array.isArray(payload)) {
            const incomingErrors = payload as Record<string, unknown>
            const nextErrors: ContactFormErrors = {}
            ;(Object.keys(incomingErrors) as Array<keyof ContactFormValues>).forEach((key) => {
              const value = incomingErrors[key]
              if (typeof value === "string") {
                nextErrors[key] = value
              }
              if (Array.isArray(value) && typeof value[0] === "string") {
                nextErrors[key] = value[0]
              }
            })

            if (Object.keys(nextErrors).length > 0) {
              setErrors(nextErrors)
            }
          }

          setStatus("error")
          const feedbackMessage = "Controlla i campi evidenziati e riprova."
          setServerError(feedbackMessage)
          toast.error(feedbackMessage, { duration: Infinity })
          return
        }

        if (!response.ok) {
          setStatus("error")
          const feedbackMessage = "Si è verificato un errore durante l'invio. Riprova più tardi."
          setServerError(feedbackMessage)
          toast.error(feedbackMessage, { duration: Infinity })
          return
        }

        form.reset()
        setServerError(null)
        setStatus("success")
        toast.success("Messaggio inviato! Ti risponderò il prima possibile.", { duration: Infinity })
      } catch {
        setStatus("error")
        const feedbackMessage = "Connessione al server non riuscita. Verifica la rete o riprova più tardi."
        setServerError(feedbackMessage)
        toast.error(feedbackMessage, { duration: Infinity })
      }
    },
    [mappedEndpoint]
  )

  return (
    <section
      id={id}
      data-scroll-target={id ? true : undefined}
      className="mx-auto grid w-full max-w-6xl gap-12 rounded-3xl border border-foreground/5 bg-background/70 p-8 shadow-sm scroll-mt-32 lg:grid-cols-[1.1fr_1fr]"
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
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-primary"
            >
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
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              placeholder="Il tuo nome"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              onChange={() => clearError("name")}
            />
            {errors.name && (
              <p id="contact-name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tuo@indirizzo.com"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              onChange={() => clearError("email")}
            />
            {errors.email && (
              <p id="contact-email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefono (opzionale)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+39 333 000 0000"
              autoComplete="tel"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              onChange={() => clearError("phone")}
            />
            {errors.phone && (
              <p id="contact-phone-error" className="text-sm text-destructive">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Messaggio</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Raccontami qualcosa del tuo progetto..."
              rows={6}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              onChange={() => clearError("message")}
            />
            {errors.message && (
              <p id="contact-message-error" className="text-sm text-destructive">
                {errors.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full justify-center gap-2 cursor-pointer"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Invio in corso..." : "Invia messaggio"}
            <SendHorizonal className="h-4 w-4" />
          </Button>
          {serverError && <p className="text-sm text-destructive">{serverError}</p>}
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
        <a
          href="#contact"
          onClick={(event) => {
            event.preventDefault()
            scrollToContact("#contact")
          }}
        >
          Parliamone
        </a>
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

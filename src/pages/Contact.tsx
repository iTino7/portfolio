import { FormEvent, useState } from "react"
import { Mail, Phone, Linkedin, SendHorizonal } from "lucide-react"

import { Navbar } from "../components"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

const CONTACT_EMAIL = "Sabatino.b007@gmail.com"
const CONTACT_PHONE = "+39 331 149 4312"
const CONTACT_LINKEDIN = "https://www.linkedin.com/in/sabatino"

function Contact() {
  const [status, setStatus] = useState<"idle" | "success">("idle")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    // Qui potresti integrare un servizio come Formspree, Resend, EmailJS, ecc.
    // Per ora simuliamo l'invio e resettiamo il form.
    form.reset()
    setStatus("success")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-start px-6 py-16 md:px-12 lg:px-20">
        <section className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-10">
            <header className="space-y-4">
              <p className="font-initials text-6xl font-semibold leading-none text-foreground sm:text-7xl md:text-8xl">
                Let&apos;s get in touch
              </p>
              <p className="max-w-md text-base text-muted-foreground">
                Raccontami il tuo progetto o la tua idea. Preferisci una call? Scrivimi
                direttamente via email, su LinkedIn oppure lasciami un messaggio qui sotto.
              </p>
            </header>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-primary"
                >
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

          <div className="rounded-3xl border border-foreground/5 bg-background/70 p-8 shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" placeholder="Il tuo nome" required autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tuo@indirizzo.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono (opzionale)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+39 333 000 0000"
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Messaggio</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Raccontami qualcosa del tuo progetto..."
                  required
                  rows={6}
                />
              </div>
              <Button type="submit" className="w-full justify-center gap-2">
                Invia messaggio
                <SendHorizonal className="h-4 w-4" />
              </Button>
              {status === "success" && (
                <p className="text-sm text-primary">
                  Messaggio inviato! Ti risponderò il prima possibile.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Contact

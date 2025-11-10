import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Inserisci almeno 2 caratteri.")
    .max(80, "Il nome è troppo lungo."),
  email: z
    .string()
    .trim()
    .email("Inserisci un'email valida."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^[\d\s()+-]+$/.test(value),
      "Inserisci un numero di telefono valido."
    ),
  message: z
    .string()
    .trim()
    .min(10, "Il messaggio deve contenere almeno 10 caratteri.")
    .max(2000, "Il messaggio è troppo lungo."),
})

export type ContactFormValues = z.infer<typeof contactSchema>
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

export function validateContactForm(data: ContactFormValues) {
  return contactSchema.safeParse(data)
}

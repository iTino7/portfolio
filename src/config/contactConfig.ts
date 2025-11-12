export const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL?.toString() ??
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3002/api/contact"
    : `${typeof window !== "undefined" ? window.location.origin.replace(/\/$/, "") : ""}/api/contact`)


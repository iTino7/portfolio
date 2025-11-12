export const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL?.toString() ??
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3002/api/contact"
    : "https://portfolio-be-h15w.onrender.com/api/contact")


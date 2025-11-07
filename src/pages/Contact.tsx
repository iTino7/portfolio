import { Navbar } from "../components"

function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-4 text-muted-foreground">
          Entriamo in contatto per nuovi progetti.
        </p>
      </main>
    </div>
  )
}

export default Contact

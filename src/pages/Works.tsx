import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { ArrowUpRight, Github, Star } from "lucide-react"

import { Navbar } from "../components"

const GITHUB_USERNAME = "iTino7"

interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  fork: boolean
  archived: boolean
  updated_at: string
}

async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=24`
  )

  if (!response.ok) {
    throw new Error("Impossibile recuperare i repository da GitHub")
  }

  return response.json()
}

function Works() {
  const {
    data: repos,
    isLoading,
    isError,
    error,
  } = useQuery<GithubRepo[], Error>({
    queryKey: ["github", "repos", GITHUB_USERNAME],
    queryFn: fetchGithubRepos,
    staleTime: 1000 * 60 * 5,
  })

  const filteredRepos = useMemo(() => {
    if (!repos) return []
    return repos
      .filter((repo) => !repo.fork && !repo.archived)
      .sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 12)
  }, [repos])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16 md:px-12 lg:px-20">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-initials text-6xl font-semibold leading-none text-foreground sm:text-7xl md:text-8xl">
                Selected Works
              </p>
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
                src={`https://ghchart.rshah.org/0A5C63/${GITHUB_USERNAME}`}
                alt={`Github contribution chart for ${GITHUB_USERNAME}`}
                className="w-full"
                loading="lazy"
              />
            </figure>
          </section>

          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-foreground/5 bg-background/60 p-6"
                >
                  <div className="h-6 w-2/3 rounded bg-foreground/10" />
                  <div className="mt-4 h-4 w-full rounded bg-foreground/5" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-foreground/5" />
                  <div className="mt-6 h-4 w-1/3 rounded bg-foreground/10" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
              {error?.message ?? "Si è verificato un errore inatteso"}
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredRepos.map((repo) => (
                <article
                  key={repo.id}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-foreground/5 bg-background/70 p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-xl transition-colors hover:text-primary"
                      >
                        {repo.name}
                      </a>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    {repo.description ? (
                      <p className="text-sm text-muted-foreground">
                        {repo.description}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground/70">
                        Nessuna descrizione disponibile.
                      </p>
                    )}
                  </div>

                  <footer className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {repo.language && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-foreground/10 px-3 py-1 text-xs">
                          {repo.language}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        {repo.stargazers_count}
                      </span>
                    </div>
                    <span>
                      Aggiornato il {new Date(repo.updated_at).toLocaleDateString("it-IT", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </footer>
                </article>
              ))}

              {filteredRepos.length === 0 && (
                <p className="col-span-full rounded-xl border border-foreground/5 bg-background/60 p-6 text-sm text-muted-foreground">
                  Nessun repository disponibile da mostrare al momento.
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Works

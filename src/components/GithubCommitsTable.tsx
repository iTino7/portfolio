import { useQuery } from "@tanstack/react-query"
import { GitCommit, ExternalLink, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { it } from "date-fns/locale"

type GithubCommit = {
  sha: string
  message: string
  html_url: string
  author: {
    name: string
    date: string
  }
  repository: {
    name: string
    full_name: string
    html_url: string
  }
}

type GithubEvent = {
  id: string
  type: string
  created_at: string
  repo: {
    name: string
  }
  payload: {
    commits?: Array<{
      sha: string
      message: string
      author: {
        name: string
        email: string
      }
      url: string
    }>
  }
}

type GithubCommitsTableProps = {
  username: string
}

async function fetchGithubCommits(username: string): Promise<GithubCommit[]> {
  try {
    // First, try to get commits from user events
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
    if (eventsResponse.ok) {
      const events: GithubEvent[] = await eventsResponse.json()
      
      if (Array.isArray(events)) {
        const commits: GithubCommit[] = []
        const seenCommits = new Set<string>()

        for (const event of events) {
          if (event.type === "PushEvent" && event.payload?.commits && Array.isArray(event.payload.commits)) {
            for (const commit of event.payload.commits) {
              if (seenCommits.has(commit.sha)) continue
              seenCommits.add(commit.sha)

              commits.push({
                sha: commit.sha.substring(0, 7),
                message: commit.message.split("\n")[0],
                html_url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
                author: {
                  name: commit.author.name,
                  date: event.created_at,
                },
                repository: {
                  name: event.repo.name.split("/")[1],
                  full_name: event.repo.name,
                  html_url: `https://github.com/${event.repo.name}`,
                },
              })

              if (commits.length >= 50) break
            }
            if (commits.length >= 50) break
          }
        }

        if (commits.length > 0) {
          return commits
        }
      }
    }
  } catch (error) {
    console.warn("Failed to fetch from events API, trying repositories API", error)
  }

  // Fallback: get commits from user repositories
  try {
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
    if (!reposResponse.ok) {
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`)
    }
    const repos = await reposResponse.json()
    
    if (!Array.isArray(repos)) {
      throw new Error("Invalid response from GitHub API")
    }

    const commits: GithubCommit[] = []
    const seenCommits = new Set<string>()

    for (const repo of repos) {
      if (repo.fork || repo.archived) continue
      
      try {
        const commitsResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=10&author=${username}`)
        if (commitsResponse.ok) {
          const repoCommits = await commitsResponse.json()
          
          if (Array.isArray(repoCommits)) {
            for (const commit of repoCommits) {
              if (seenCommits.has(commit.sha)) continue
              seenCommits.add(commit.sha)

              commits.push({
                sha: commit.sha.substring(0, 7),
                message: commit.commit.message.split("\n")[0],
                html_url: commit.html_url,
                author: {
                  name: commit.commit.author.name,
                  date: commit.commit.author.date,
                },
                repository: {
                  name: repo.name,
                  full_name: repo.full_name,
                  html_url: repo.html_url,
                },
              })

              if (commits.length >= 50) break
            }
          }
        }
      } catch (error) {
        console.warn(`Failed to fetch commits from ${repo.name}`, error)
      }

      if (commits.length >= 50) break
    }

    return commits
  } catch (error) {
    throw new Error(`Failed to fetch GitHub commits: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export function GithubCommitsTable({ username }: GithubCommitsTableProps) {
  const { data: commits, isLoading, error } = useQuery({
    queryKey: ["github-commits", username],
    queryFn: () => fetchGithubCommits(username),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-foreground/5 bg-background/60 p-6 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-muted-foreground">Caricamento commit...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-foreground/5 bg-background/60 p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <div className="text-sm text-muted-foreground">Errore nel caricamento dei commit</div>
          <div className="text-xs text-muted-foreground/70">
            {error instanceof Error ? error.message : "Errore sconosciuto"}
          </div>
        </div>
      </section>
    )
  }

  if (!commits || commits.length === 0) {
    return (
      <section className="rounded-3xl border border-foreground/5 bg-background/60 p-6 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-muted-foreground">Nessun commit trovato</div>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-3xl border border-foreground/5 bg-background/60 p-3 sm:p-6 shadow-sm">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <GitCommit className="h-5 w-5" />
          <p className="font-semibold text-lg">Commit GitHub</p>
        </div>
        <p className="text-sm text-muted-foreground">
          I miei commit più recenti su GitHub.
        </p>
      </header>

      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Repository</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Messaggio</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden md:table-cell">
                  Autore
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground hidden lg:table-cell">
                  Data
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Hash</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {commits.map((commit, index) => (
                <tr
                  key={`${commit.sha}-${index}`}
                  className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <a
                      href={commit.repository.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                    >
                      {commit.repository.name}
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {commit.message}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">
                    {commit.author.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground hidden lg:table-cell">
                    <div className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDistanceToNow(new Date(commit.author.date), {
                        addSuffix: true,
                        locale: it,
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {commit.sha}
                    </a>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-foreground/10 transition-colors"
                      aria-label={`Vai al commit ${commit.sha}`}
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}


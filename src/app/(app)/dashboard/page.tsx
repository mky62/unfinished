import { auth, clerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getGithubToken } from "@/src/lib/github"
import ConnectGithubBanner from "@/src/components/dashborad-ui/connect-pill"
import RepoList from "../../../components/repo-list"

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }

  const token = await getGithubToken(userId)

  // not connected → show connect button
  if (!token) return <ConnectGithubBanner />

  // connected → fetch repos
  const reposRes = await fetch(
    "https://api.github.com/user/repos?sort=updated&per_page=100",
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  )

  const repos = await reposRes.json()

  // Persist the user's top-starred repo (public, no token stored)
  const topRepo = Array.isArray(repos)
    ? repos.reduce((best: any, r: any) => {
        if (!best) return r
        return (r?.stargazers_count ?? 0) > (best?.stargazers_count ?? 0) ? r : best
      }, null)
    : null

  if (topRepo) {
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        topRepo: {
          id: topRepo.id,
          full_name: topRepo.full_name,
          html_url: topRepo.html_url,
          description: topRepo.description ?? null,
          language: topRepo.language ?? null,
          stargazers_count: topRepo.stargazers_count ?? 0,
          forks_count: topRepo.forks_count ?? 0,
          owner_login: topRepo.owner?.login ?? null,
          owner_avatar_url: topRepo.owner?.avatar_url ?? null,
          updatedAt: new Date().toISOString(),
        },
      },
    })
  }

  return <RepoList repos={repos} token={token} />
}
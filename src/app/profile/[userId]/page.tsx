import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getGithubToken } from "@/src/lib/github"
import RepoList from "../../../components/repo-list"

type PageProps = {
  params: { userId: string }
}

export default async function PublicProfile({ params }: PageProps) {
  const { userId: visitorId } = await auth()

  // must be logged in to view
  if (!visitorId) redirect("/sign-in")

  // get the profile owner's token
  const token = await getGithubToken(params.userId)
  if (!token) return <p>This user hasn&apos;t connected GitHub yet</p>

  const res = await fetch(
    "https://api.github.com/user/repos?sort=updated&per_page=100",
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  )

  const repos = await res.json()

  return <RepoList repos={repos} token={token} />
}


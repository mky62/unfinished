// if GitHub is connected, return the token
import { clerkClient } from "@clerk/nextjs/server"

export async function getGithubToken(userId: string) {
  const client = await clerkClient()
  const tokens = await client.users.getUserOauthAccessToken(
    userId,
    "oauth_github",
  )
  const firstToken = tokens.data[0]
  return firstToken?.token ?? null // null = not connected
}
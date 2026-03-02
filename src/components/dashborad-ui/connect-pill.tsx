"use client"

import { useUser } from "@clerk/nextjs"

export default function ConnectGithubBanner() {
  const { user } = useUser()

  const connect = async () => {
    const res = await user?.createExternalAccount({
      strategy: "oauth_github",
      redirectUrl: "/dashboard",
    })
    window.location.href = res?.verification?.externalVerificationRedirectURL?.toString()!
  }

  return (
    <div>
      <h2>Connect your GitHub to get started</h2>
      <p>We need access to show your repos and stats</p>
      <button onClick={connect}>Connect GitHub</button>
    </div>
  )
}
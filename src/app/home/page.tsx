import Image from "next/image"
import Link from "next/link"
import Logo from "@/public/croplogo.png"
import { auth, clerkClient } from "@clerk/nextjs/server"
import Banner from '@/public/unbg.jpg'
import Navbar from "@/src/components/navbar/Navbar"

type FeaturedRepo = {
  id: number
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  owner_login: string | null
  owner_avatar_url: string | null
  updatedAt: string
}

export default async function LandingPage() {
  const client = await clerkClient()
  const { userId } = await auth()
  const viewer = userId ? await client.users.getUser(userId) : null

  const users = await client.users.getUserList({ limit: 100 })

  const featured = (users.data ?? [])
    .map((u: any) => u?.publicMetadata?.topRepo as FeaturedRepo | undefined)
    .filter((r): r is FeaturedRepo => Boolean(r?.full_name && r?.html_url))
    .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
    .slice(0, 12)

  return (
  <main className="min-h-screen bg-black">

  {/* Fixed Navbar */}
  <Navbar />

  {/* Page Wrapper */}
  <div className="pt-16 flex flex-col">

    {/* Hero Section */}
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">

      {/* Background Image */}
      <Image
        src={Banner}
        alt="Banner"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content Layer */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 text-center">
        <div className="max-w-3xl space-y-6 text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Discover Top GitHub Projects
          </h1>

          <p className="text-lg md:text-xl text-white/80">
            Connect your GitHub, showcase your profile, and explore
            the most starred repositories on the platform.
          </p>

          <button className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition">
            Get Started
          </button>
        </div>
      </div>

    </section>

  </div>
</main>
  )
}


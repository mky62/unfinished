import Image from "next/image"
import { auth, clerkClient } from "@clerk/nextjs/server"
import Banner from '@/public/whiteban.jpg'
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
  <main className="min-h-screen
bg-[linear-gradient(195deg,#399be6_4%,#a1dfe6_39%,#f0902a_97%)]
">    <Navbar />

<div
  className="
  fixed
  top-24
  left-1/2 -translate-x-1/2
  w-[90%] max-w-6xl
  bottom-0
  rounded-tr-4xl
  rounded-tl-4xl
  overflow-hidden
"
    >

        <Image
        src={Banner}
        alt="Banner"
        fill
        priority
        className="object-cover object-center "
      />


      <section className="h-full overflow-y-auto scrollbar-"> 
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
        </div>
    </section>
    </div>
</main>
  )
}


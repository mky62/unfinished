"use client";

import Link from "next/link";
import Logo from "@/public/croplogo.png"
import Image from "next/image";
import { GithubUser } from '@/src/lib/types'


export default function Navbar({user}: {user?: GithubUser}) {
  return (
    <nav
  className="
        fixed top-6 left-1/2 -translate-x-1/2
        w-[70%] max-w-6xl
        z-50
        rounded-2xl
        bg-linear-to-r
        from-[#ddeaf3]
        via-[#87c6d8]
        to-[#f0902a]
        shadow-[inset_0_1px_15px_rgba(0,0,0,.25)]
        "
>
      <div className="px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
          src={Logo} 
          alt="app"
          width={40}
          height={40}
          className="rounded-xl"
          />
        </Link>

        {/* Center links
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/">Products</Link>
          <Link href="/">Docs</Link>
          <Link href="/">Changelog</Link>
          <Link href="/">Company</Link>
          <Link href="/">Pricing</Link>
        </div> */}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          
        {user?.avatar_url && (
          <img
            src={user.avatar_url}
            alt={user.login}
            className="h-20 w-20 rounded-2xl border border-slate-200 object-cover shadow-lg md:h-24 md:w-24 dark:border-slate-700/80"
          />
        )}
            

          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm rounded-lg
                shadow-[inset_0_11px_15px_rgba(111,111,111,.25)]
                 bg-sky-400/50 hover:bg-gray-200"
          >
            Dashboard →
          </Link>
        </div>

      </div>
    </nav>
  );
}
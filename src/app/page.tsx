import { SignInButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <SignInButton>
      <button>Custom sign in button</button>
    </SignInButton>
  )
}
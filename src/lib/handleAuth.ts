import React,{ useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Step, OAuthProvider } from './types'

export const useHandleAuth = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [step, setStep] = useState<Step>('initial')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null)

  // ── OAuth ─────────────────────────────────────────────────────────────────

  const handleOAuth = async (provider: OAuthProvider) => {
    if (!isLoaded) return
    setOauthLoading(provider)
    setError('')
    try {
      await signUp.authenticateWithRedirect({
        strategy: provider === 'google' ? 'oauth_google' : 'oauth_github',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      })
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? 'OAuth sign-up failed.')
      setOauthLoading(null)
    }
  }

  // ── Email / Password ──────────────────────────────────────────────────────

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')
    try {
      await signUp.create({ emailAddress: email, password })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setStep('verifying')
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // ── Verify ────────────────────────────────────────────────────────────────

  const handleVerify = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message ?? 'Invalid verification code.')
    } finally {
      setLoading(false)
    }
  }

  return {
    step,
    email,
    password,
    code,
    error,
    loading,
    oauthLoading,
    setEmail,
    setPassword,
    setCode,
    setError,
    setStep,
    handleOAuth,
    handleSubmit,
    handleVerify,
  }
}

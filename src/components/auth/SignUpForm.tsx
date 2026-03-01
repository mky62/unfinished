'use client'


import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Separator } from '@/src/components/ui/separator'
import { Alert, AlertDescription } from '@/src/components/ui/alert'
import { Loader2, AlertCircle, Mail } from 'lucide-react'
import { GitHubIcon, GoogleIcon } from '@/src/components/icons/Icons'
import Image from 'next/image'
import Logo from '@/public/croplogo.png'
import { useHandleAuth } from '@/src/lib/handleAuth'


export default function CustomSignUp() {
  const {
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
  } = useHandleAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d3692c] p-4">
      <div className="w-full max-w-sm space-y-6">

        {/* Header */}
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
          <Image
            src={Logo}
            alt="Logo"
            width={32}
            height={32}
          />
            {step === 'initial' ? 'Create an account' : 'Check your email'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 'initial'
              ? 'Sign up with your preferred method below'
              : (
                <>
                  We sent a 6-digit code to{' '}
                  <span className="font-medium text-foreground">{email}</span>
                </>
              )}
          </p>
        </div>

        {/* ── Initial step ── */}
        {step === 'initial' && (
          <>

            {/* Email + password */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

            <div className="relative flex items-center">
              <Separator className="flex-1" />
              <span className="mx-3 text-xs text-muted-foreground uppercase tracking-widest">
                or
              </span>
              <Separator className="flex-1" />
            </div>


              <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => handleOAuth('google')}
                disabled={!!oauthLoading}
              >
                {oauthLoading === 'google'
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <GoogleIcon />}
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => handleOAuth('github')}
                disabled={!!oauthLoading}
              >
                {oauthLoading === 'github'
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <GitHubIcon />}
                Continue with GitHub
              </Button>
            </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create account
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <a
                href="/sign-in"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                Sign in
              </a>
            </p>
          </>
        )}

        {/* ── Verify step ── */}
        {step === 'verifying' && (
          <>
            <div className="flex justify-center">
              <div className="flex items-center justify-center rounded-full bg-muted w-12 h-12">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification code</Label>
                <Input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  placeholder="000000"
                  maxLength={6}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  required
                  autoFocus
                  className="text-center tracking-[0.5em] text-lg font-semibold"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify email
              </Button>
            </form>

            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => { setStep('initial'); setError('') }}
            >
              ← Back
            </Button>
          </>
        )}

      </div>
    </div>
  )
}
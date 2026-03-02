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
import AuthBg from '@/public/animebg.jpg'
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
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 py-14 sm:py-20">
      <Image
        src={AuthBg}
        alt="Authentication background"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/15 to-black/35" />

      <div className="w-full max-w-[420px] mx-auto">
        {/* Card */}
        <div className="bg-white/[0.9] backdrop-blur-xl rounded-3xl shadow-2xl m-4 px-6 py-8 sm:px-8 sm:py-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="flex items-center justify-center size-14 rounded-2xl bg-white/75 ring-1 ring-black/5 shadow-sm">
                <Image src={Logo} alt="Logo" width={28} height={28} />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight">
                {step === "initial" ? "Unfinished" : "Check your email"}
              </h1>

              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {step === "initial" ? (
                  "New here? Sign up to get started"
                ) : (
                  <>
                    We sent a 6-digit code to{" "}
                    <span className="font-medium text-foreground">{email}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* ───────── INITIAL STEP ───────── */}
          {step === "initial" && (
            <>
              {/* Email Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="h-12 text-sm bg-white/70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="h-12 text-sm bg-white/70"
                  />
                </div>

                {/* Divider */}
                <div className="relative flex items-center py-1">
                  <Separator className="flex-1" />
                  <span className="mx-3 text-xs uppercase tracking-widest text-muted-foreground">
                    or
                  </span>
                  <Separator className="flex-1" />
                </div>

                {/* OAuth Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 h-12 bg-white/70 hover:bg-white"
                    onClick={() => handleOAuth("google")}
                    disabled={!!oauthLoading}
                  >
                    {oauthLoading === "google" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <GoogleIcon />
                    )}
                    Continue with Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 h-12 bg-white/70 hover:bg-white"
                    onClick={() => handleOAuth("github")}
                    disabled={!!oauthLoading}
                  >
                    {oauthLoading === "github" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <GitHubIcon />
                    )}
                    Continue with GitHub
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}


                {/* Clerk's CAPTCHA widget placeholder */}  
                <div
                  id="clerk-captcha"
                  data-cl-theme="auto"      // 'light' | 'dark' | 'auto'
                  data-cl-size="normal"     // 'normal' | 'flexible' | 'compact'
                  data-cl-language="auto"   // or e.g. 'en-US'
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-sm font-medium"
                  disabled={loading}
                >
                  {loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create account
                </Button>
              </form>

              {/* Footer */}
              <p className="pt-1 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
                >
                  Sign in
                </a>
              </p>
            </>
          )}

          {/* ───────── VERIFY STEP ───────── */}
          {step === "verifying" && (
            <>
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted">
                  <Mail className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>

              <form onSubmit={handleVerify} className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code">Verification code</Label>
                  <Input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    maxLength={6}
                    value={code}
                    onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
                    required
                    autoFocus
                    className="h-12 text-center tracking-[0.35em] sm:tracking-[0.6em] text-lg font-semibold bg-white/70"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={loading}
                >
                  {loading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Verify email
                </Button>
              </form>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => {
                  setStep("initial")
                  setError("")
                }}
              >
                ← Back
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
    );

}
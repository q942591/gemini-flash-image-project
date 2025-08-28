import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsentBanner from '@/components/CookieConsentBanner'
import GlobalBackground from '@/components/GlobalBackground'
import { LanguageProvider } from '@/hooks/useLanguage'
import { AuthProvider } from '@/contexts/AuthContext'

import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gemini Flash Image - Edit Images Anywhere, Anytime',
  description: 'AI-powered image editing tool that understands natural language instructions. Experience the magic of conversational editing.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <GlobalBackground />
            <Header />
            {children}
            <Footer />
            <CookieConsentBanner />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
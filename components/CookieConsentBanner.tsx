'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, Settings, Shield } from 'lucide-react'
import CookieSettings from '@/components/CookieSettings'

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }

    // Listen for cookie settings trigger
    const handleOpenSettings = () => {
      setShowSettings(true)
      setIsVisible(true)
    }

    window.addEventListener('openCookieSettings', handleOpenSettings)
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings)
  }, [])

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
    setShowSettings(false)
  }

  const handleAcceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
    setShowSettings(false)
  }

  const handleCustomSettings = (settings: any) => {
    const consent = {
      ...settings,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    setIsVisible(false)
    setShowSettings(false)
  }

  if (!isVisible) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/50 backdrop-blur-sm">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Cookie Consent
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to improve your user experience, analyze website traffic, and provide personalized content.
                    You can choose to accept all cookies, accept only necessary cookies, or customize your preferences.
                    View our
                    <a href="/privacy-policy" className="text-purple-600 hover:text-purple-700 underline mx-1">
                      Privacy Policy
                    </a>
                    for more information.
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                aria-label="Close cookie banner"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowSettings(!showSettings)}
                className="sm:order-1"
              >
                <Settings className="h-4 w-4 mr-2" />
                Customize Settings
              </Button>
              
              <Button
                variant="outline"
                onClick={handleAcceptNecessary}
                className="sm:order-2"
              >
                Necessary Only
              </Button>
              
              <Button
                onClick={handleAcceptAll}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 sm:order-3"
              >
                Accept All
              </Button>
            </div>

            {showSettings && (
              <div className="mt-6 border-t pt-6">
                <CookieSettings onSave={handleCustomSettings} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
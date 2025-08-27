'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface CookieSettingsProps {
  onSave: (settings: any) => void
}

export default function CookieSettings({ onSave }: CookieSettingsProps) {
  const [settings, setSettings] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false
  })

  useEffect(() => {
    // Load existing settings if available
    const existingConsent = localStorage.getItem('cookie-consent')
    if (existingConsent) {
      try {
        const parsed = JSON.parse(existingConsent)
        setSettings({
          necessary: true, // Always true
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false,
          preferences: parsed.preferences || false
        })
      } catch (error) {
        console.error('Error parsing cookie consent:', error)
      }
    }
  }, [])

  const handleToggle = (key: string) => {
    if (key === 'necessary') return // Cannot toggle necessary cookies
    
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  const handleSave = () => {
    onSave(settings)
  }

  const cookieTypes = [
    {
      key: 'necessary',
      title: 'Necessary Cookies',
      description: 'These cookies are essential for the basic functionality of the website and cannot be disabled. They are usually only set when you perform certain actions, such as setting privacy preferences, logging in, or filling out forms.',
      required: true
    },
    {
      key: 'analytics',
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with the website by anonymously collecting and reporting information to improve website performance.',
      required: false
    },
    {
      key: 'marketing',
      title: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across different websites with the purpose of displaying relevant and personalized advertisements.',
      required: false
    },
    {
      key: 'preferences',
      title: 'Preference Cookies',
      description: 'These cookies enable the website to remember choices that change the behavior or appearance of the website, such as your preferred language or the region you are in.',
      required: false
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          Cookie Preferences
        </h4>
        <p className="text-sm text-gray-600 mb-6">
          Please select the types of cookies you wish to allow. You can change these preferences at any time in the Cookie Settings in the footer.
        </p>
      </div>

      <div className="space-y-6">
        {cookieTypes.map((cookie) => (
          <div key={cookie.key} className="flex items-start space-x-4">
            <div className="flex items-center space-x-2 mt-1">
              <Switch
                id={cookie.key}
                checked={settings[cookie.key as keyof typeof settings]}
                onCheckedChange={() => handleToggle(cookie.key)}
                disabled={cookie.required}
                aria-describedby={`${cookie.key}-description`}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <Label
                htmlFor={cookie.key}
                className="text-sm font-medium text-gray-900 cursor-pointer flex items-center"
              >
                {cookie.title}
                {cookie.required && (
                  <span className="ml-2 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    Required
                  </span>
                )}
              </Label>
              <p
                id={`${cookie.key}-description`}
                className="text-xs text-gray-600 mt-1 leading-relaxed"
              >
                {cookie.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Save Settings
        </Button>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Gemini Flash Image Logo" 
                className="h-8 w-8 object-cover"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">
              {t('common.brandName')}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                {t('common.home')}
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                {t('common.pricing')}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="text-gray-700 hover:text-gray-900"
              onClick={toggleLanguage}
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'zh' ? 'English' : '中文'}
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              {t('common.signIn')}
            </Button>
            <Link href="/image-edit">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                {t('common.getStarted')}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col space-y-2">
              <Link href="/">
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 w-full">
                  {t('common.home')}
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 w-full">
                  {t('common.pricing')}
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="justify-start text-gray-700 hover:text-gray-900"
                onClick={toggleLanguage}
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === 'zh' ? 'English' : '中文'}
              </Button>
              <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900">
                {t('common.signIn')}
              </Button>
              <Link href="/image-edit">
                <Button className="justify-start bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  {t('common.getStarted')}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
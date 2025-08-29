'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, User, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { useAuth } from '@/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const { user, signOut } = useAuth()

  // 获取用户头像
  const getUserAvatar = () => {
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url
    }
    if (user?.user_metadata?.picture) {
      return user.user_metadata.picture
    }
    return null
  }

  const avatarUrl = getUserAvatar()

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem 
                  onClick={() => toggleLanguage()}
                  className="cursor-pointer"
                >
                  {language === 'zh' ? 'English' : '中文'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => toggleLanguage()}
                  className="cursor-pointer"
                >
                  {language === 'zh' ? '中文' : 'English'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white overflow-hidden">
                    {avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        alt="用户头像"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      {t('header.profile')}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('header.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  {t('common.signIn')}
                </Button>
              </Link>
            )}
            <Link href="/function">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 w-full">
                    <Globe className="w-4 h-4 mr-2" />
                    {language === 'zh' ? 'English' : '中文'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem 
                    onClick={() => toggleLanguage()}
                    className="cursor-pointer"
                  >
                    {language === 'zh' ? 'English' : '中文'}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => toggleLanguage()}
                    className="cursor-pointer"
                  >
                    {language === 'zh' ? '中文' : 'English'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 w-full">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs overflow-hidden">
                            {avatarUrl ? (
                              <img 
                                src={avatarUrl} 
                                alt="用户头像"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs">
                                {user.email?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            )}
                          </div>
                          <span>{user.email?.split('@')[0] || t('header.user')}</span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer">
                          <User className="w-4 h-4 mr-2" />
                          个人空间
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={signOut}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        退出登录
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 w-full">
                    {t('common.signIn')}
                  </Button>
                </Link>
              )}
              <Link href="/function">
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
'use client'

import { Button } from '@/components/ui/button'
import { Zap, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-xl border-t border-white/40 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
                <img src="/logo.png" alt="Gemini Flash Image" className="h-full w-full object-cover" />
              </div>
              <span className="text-xl font-bold text-gray-600">
                Gemini Flash Image
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Revolutionary AI image editing tool that makes creativity accessible. Achieve professional-level image editing effects with natural language descriptions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600 hover:bg-gray-100">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600 hover:bg-gray-100">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600 hover:bg-gray-100">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Product Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                  关于我们
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-gray-600 hover:text-purple-600 transition-colors">
                  退款政策
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/privacy-policy" 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms-of-service" 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-gray-600 hover:text-purple-600 justify-start"
                  onClick={() => {
                    // Trigger cookie settings modal
                    const event = new CustomEvent('openCookieSettings')
                    window.dispatchEvent(event)
                  }}
                >
                  Cookie Settings
                </Button>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Gemini Flash Image. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              Compliant with GDPR and EU Accessibility Standards
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
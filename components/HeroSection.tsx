'use client'

import Link from 'next/link'
import RollingGallery from '@/components/RollingGallery'
import { useLanguage } from '@/hooks/useLanguage'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 内容层 */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Use Gemini 2.5 Flash Image
            </div>
            <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-400 bg-clip-text text-transparent">
              to easily create teaching illustrations and creative artwork
            </div>
          </h1>
        </div>

        {/* 图片场景展示 */}
        <div className="relative z-20 mb-2">
          <RollingGallery autoplay={false} pauseOnHover={false} />
        </div>

        {/* 功能入口按钮 */}
        <div className="flex justify-center space-x-6 mb-12">
          <Link href="/image-edit">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 backdrop-blur-md text-white font-semibold rounded-full border border-purple-400/40 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105">
              {t('hero.startCreating')}
            </button>
          </Link>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg">
            {t('hero.learnMore')}
          </button>
        </div>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400/20 rounded-full animate-pulse delay-2000" />
    </section>
  )
}
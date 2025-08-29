'use client'

import Link from 'next/link'
import RollingGallery from '@/components/RollingGallery'
import { useLanguage } from '@/hooks/useLanguage'
import FuzzyText from '@/components/FuzzyText'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <>
      {/* SVG渐变定义 */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      
      <section className="relative min-h-screen">
        {/* 内容层 */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 drop-shadow-2xl">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 block">
                Gemini 2.5 Flash Image
              </div>
              {/* 电脑端副标题 - 完全不动 */}
              <div className="hidden md:block text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed max-w-4xl mx-auto text-left">
                <div className="mb-2">
                  <FuzzyText
                    fontSize="clamp(1.5rem, 4vw, 2.5rem)"
                    fontWeight={600}
                    color="#1e40af"
                    baseIntensity={0.15}
                    hoverIntensity={0.4}
                    enableHover={true}
                  >
                    Easily create instructional illustrations and
                  </FuzzyText>
                </div>
                <div>
                  <FuzzyText
                    fontSize="clamp(1.5rem, 4vw, 2.5rem)"
                    fontWeight={600}
                    color="#1e40af"
                    baseIntensity={0.15}
                    hoverIntensity={0.4}
                    enableHover={true}
                  >
                    creative artwork
                  </FuzzyText>
                </div>
              </div>

              {/* 移动端副标题 - 字体更小并居中 */}
              <div className="md:hidden text-2xl font-semibold leading-relaxed max-w-4xl mx-auto text-center flex flex-col items-center">
                <div className="mb-2 text-center">
                  <FuzzyText
                    fontSize="clamp(0.875rem, 2.5vw, 1.25rem)"
                    fontWeight={600}
                    color="#1e40af"
                    baseIntensity={0.15}
                    hoverIntensity={0.4}
                    enableHover={true}
                  >
                    Easily create instructional illustrations and
                  </FuzzyText>
                </div>
                <div className="text-center">
                  <FuzzyText
                    fontSize="clamp(0.875rem, 2.5vw, 1.25rem)"
                    fontWeight={600}
                    color="#1e40af"
                    baseIntensity={0.15}
                    hoverIntensity={0.4}
                    enableHover={true}
                  >
                    creative artwork
                  </FuzzyText>
                </div>
              </div>
            </h1>
          </div>

          {/* 图片场景展示 */}
          <div className="relative z-20 -mb-24">
            {/* 电脑端图片展示 - 完全不变 */}
            <div className="hidden md:block">
              <RollingGallery autoplay={false} pauseOnHover={false} />
            </div>
            
            {/* 移动端图片展示 - 缩小尺寸，往上移动，露得更多 */}
            <div className="md:hidden scale-90 transform origin-center -mt-8">
              <RollingGallery autoplay={false} pauseOnHover={false} />
            </div>
          </div>

          {/* 功能入口按钮 */}
          <div className="flex justify-center space-x-6">
            {/* 电脑端按钮 - 完全不变 */}
            <div className="hidden md:flex justify-center space-x-6">
              <Link href="/function">
                <button className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 backdrop-blur-md text-white font-semibold rounded-full border border-purple-400/40 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105">
                  {t('hero.startCreating')}
                </button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg">
                  {t('hero.learnMore')}
                </button>
              </Link>
            </div>
            
            {/* 移动端按钮 - 往上移动 */}
            <div className="md:hidden flex justify-center space-x-6 -mt-12">
              <Link href="/function">
                <button className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 backdrop-blur-md text-white font-semibold rounded-full border border-purple-400/40 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105">
                  {t('hero.startCreating')}
                </button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-4 bg-white/80 backdrop-blur-md text-gray-800 font-semibold rounded-full border border-gray-300/40 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                  {t('hero.learnMore')}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 装饰性元素 - 完全透明，只保留动画 */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full animate-pulse delay-2000" />
      </section>
    </>
  )
}
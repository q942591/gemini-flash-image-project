'use client'

import { Users, Target, Award, Globe, Zap, Heart, Star, Lightbulb } from 'lucide-react'
import GlobalBackground from '@/components/GlobalBackground'
import { useLanguage } from '@/hooks/useLanguage'

export default function About() {
  const { t } = useLanguage()

  return (
    <>
      <GlobalBackground />
      <div className="min-h-screen pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            {/* 页面标题区域 */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-full mb-8 border border-white/30">
                <Users className="w-12 h-12 text-purple-300" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
                {t('about.title')}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
                {t('about.subtitle')}
              </p>
            </div>
            
            {/* 公司介绍部分 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 mb-16 hover:bg-white/15 transition-all duration-300">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">{t('about.ourStory')}</h2>
                <p className="text-white/90 text-lg leading-relaxed max-w-4xl mx-auto">
                  {t('about.storyContent')}
                </p>
              </div>
            </div>

            {/* 使命愿景部分 */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6">
                    <Target className="w-8 h-8 text-blue-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('about.mission')}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {t('about.missionContent')}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-6">
                    <Star className="w-8 h-8 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('about.vision')}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {t('about.visionContent')}
                  </p>
                </div>
              </div>
            </div>

            {/* 核心价值部分 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">{t('about.coreValues')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Zap className="w-8 h-8 text-yellow-300" />,
                    title: t('about.values.innovation.title'),
                    description: t('about.values.innovation.description')
                  },
                  {
                    icon: <Heart className="w-8 h-8 text-red-300" />,
                    title: t('about.values.userFirst.title'),
                    description: t('about.values.userFirst.description')
                  },
                  {
                    icon: <Globe className="w-8 h-8 text-blue-300" />,
                    title: t('about.values.inclusive.title'),
                    description: t('about.values.inclusive.description')
                  },
                  {
                    icon: <Lightbulb className="w-8 h-8 text-purple-300" />,
                    title: t('about.values.creativity.title'),
                    description: t('about.values.creativity.description')
                  }
                ].map((value, index) => (
                  <div key={index} className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-full mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">{value.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 技术优势部分 */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-10 border border-purple-300/30 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">{t('about.technicalAdvantages')}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full mb-6">
                    <Zap className="w-10 h-10 text-purple-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('about.advantages.speed.title')}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {t('about.advantages.speed.description')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-full mb-6">
                    <Award className="w-10 h-10 text-blue-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('about.advantages.quality.title')}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {t('about.advantages.quality.description')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/30 to-purple-500/30 rounded-full mb-6">
                    <Globe className="w-10 h-10 text-green-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('about.advantages.intelligence.title')}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {t('about.advantages.intelligence.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* 联系我们部分 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">{t('about.joinUs')}</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                {t('about.joinUsContent')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                  <p className="text-white font-semibold">
                    📧 {t('about.businessCooperation')}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                  <p className="text-white font-semibold">
                    💼 {t('about.joinTeam')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

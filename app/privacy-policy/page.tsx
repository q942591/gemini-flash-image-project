'use client'

import { Shield, Eye, Lock, UserCheck, Cookie, Database, Mail } from 'lucide-react'
import GlobalBackground from '@/components/GlobalBackground'
import { useLanguage } from '@/hooks/useLanguage'

export default function PrivacyPolicy() {
  const { t } = useLanguage()

  return (
    <>
      <GlobalBackground />
      <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            {/* 页面标题区域 */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
                <Shield className="w-10 h-10 text-purple-300" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                {t('privacyPolicy.title')}
        </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-lg">
                {t('privacyPolicy.subtitle')}
              </p>
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 inline-block">
                <p className="text-white/90 text-lg">
                  {t('privacyPolicy.lastUpdated')}
                </p>
              </div>
            </div>
            
            {/* 内容区域 */}
            <div className="space-y-8">
              {/* 概述部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('privacyPolicy.overview.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('privacyPolicy.overview.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 信息收集部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">{t('privacyPolicy.informationCollection.title')}</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <UserCheck className="w-5 h-5 mr-2 text-purple-300" />
                          {t('privacyPolicy.informationCollection.directInfo.title')}
                        </h3>
                        <ul className="space-y-2 ml-7">
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            {t('privacyPolicy.informationCollection.directInfo.accountInfo')}
                          </li>
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            {t('privacyPolicy.informationCollection.directInfo.uploadedImages')}
                          </li>
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            {t('privacyPolicy.informationCollection.directInfo.contactInfo')}
                          </li>
            </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <Database className="w-5 h-5 mr-2 text-blue-300" />
                          {t('privacyPolicy.informationCollection.automaticInfo.title')}
                        </h3>
                        <ul className="space-y-2 ml-7">
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            {t('privacyPolicy.informationCollection.automaticInfo.deviceInfo')}
                          </li>
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            {t('privacyPolicy.informationCollection.automaticInfo.usageData')}
                          </li>
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            {t('privacyPolicy.informationCollection.automaticInfo.cookiesInfo')}
                          </li>
            </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 信息使用部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('privacyPolicy.informationUsage.title')}</h2>
                    <p className="text-white/90 mb-4">{t('privacyPolicy.informationUsage.subtitle')}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {Array.isArray(t('privacyPolicy.informationUsage.items')) ? 
                        (t('privacyPolicy.informationUsage.items') as unknown as string[]).map((item, index) => (
                          <div key={index} className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            {item}
                          </div>
                        )) : null
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookie使用部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('privacyPolicy.cookieUsage.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('privacyPolicy.cookieUsage.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 数据保护部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('privacyPolicy.dataProtection.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('privacyPolicy.dataProtection.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 您的权利部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('privacyPolicy.userRights.title')}</h2>
                    <p className="text-white/90 mb-4">{t('privacyPolicy.userRights.subtitle')}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {Array.isArray(t('privacyPolicy.userRights.items')) ? 
                        (t('privacyPolicy.userRights.items') as unknown as string[]).map((item, index) => (
                          <div key={index} className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            {item}
                          </div>
                        )) : null
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* 联系我们部分 */}
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-purple-300/30 hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-200" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('privacyPolicy.contactUs.title')}</h2>
                    <p className="text-white/90 mb-4">
                      {t('privacyPolicy.contactUs.subtitle')}
                    </p>
                    <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                      <p className="text-white font-semibold">
                        {t('privacyPolicy.contactUs.email')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
'use client'

import { FileText, CheckCircle, Shield, User, Lock, Copyright, AlertTriangle, Scale, Mail, Clock } from 'lucide-react'
import GlobalBackground from '@/components/GlobalBackground'
import { useLanguage } from '@/hooks/useLanguage'

export default function TermsOfService() {
  const { t } = useLanguage()

  return (
    <>
      <GlobalBackground />
      <div className="min-h-screen pt-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            {/* 页面标题区域 */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-green-500/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
                <FileText className="w-10 h-10 text-blue-300" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                {t('termsOfService.title')}
        </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-lg">
                {t('termsOfService.subtitle')}
              </p>
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 inline-block">
                <p className="text-white/90 text-lg">
                  {t('termsOfService.lastUpdated')}
                </p>
              </div>
            </div>
            
            {/* 内容区域 */}
            <div className="space-y-8">
              {/* 接受条款部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.acceptTerms.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('termsOfService.acceptTerms.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 服务描述部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.serviceDescription.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('termsOfService.serviceDescription.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 用户账户部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.userAccount.title')}</h2>
                    <p className="text-white/90 mb-4">{t('termsOfService.userAccount.subtitle')}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {Array.isArray(t('termsOfService.userAccount.requirements')) ? 
                        (t('termsOfService.userAccount.requirements') as unknown as string[]).map((item, index) => (
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

              {/* 可接受使用部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.acceptableUse.title')}</h2>
                    <p className="text-white/90 mb-4">{t('termsOfService.acceptableUse.subtitle')}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {Array.isArray(t('termsOfService.acceptableUse.prohibitions')) ? 
                        (t('termsOfService.acceptableUse.prohibitions') as unknown as string[]).map((item, index) => (
                          <div key={index} className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                            {item}
                          </div>
                        )) : null
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* 知识产权部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                    <Copyright className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.intellectualProperty.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('termsOfService.intellectualProperty.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 隐私部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.privacy.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('termsOfService.privacy.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 免责声明部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.disclaimer.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('termsOfService.disclaimer.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 责任限制部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <Scale className="w-6 h-6 text-red-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.liabilityLimitation.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('termsOfService.liabilityLimitation.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 条款修改部分 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.termsModification.title')}</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('termsOfService.termsModification.content')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 联系信息部分 */}
              <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 backdrop-blur-md rounded-2xl p-8 border border-blue-300/30 hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-200" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{t('termsOfService.contactInfo.title')}</h2>
                    <p className="text-white/90 mb-4">
                      {t('termsOfService.contactInfo.subtitle')}
                    </p>
                    <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                      <p className="text-white font-semibold">
                        {t('termsOfService.contactInfo.email')}
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
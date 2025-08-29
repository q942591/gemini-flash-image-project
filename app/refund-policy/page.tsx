'use client'

import GlobalBackground from '@/components/GlobalBackground'
import { Shield, CreditCard, Clock, MessageCircle, FileText, CheckCircle, AlertTriangle, Mail } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export default function RefundPolicyPage() {
  const { t } = useLanguage()

  return (
    <>
      <GlobalBackground />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              {t('refundPolicy.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg">
              {t('refundPolicy.lastUpdated')}
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
                <span className="text-white/80 text-sm">
                  {t('refundPolicy.readCarefully')}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 space-y-12">
              
              {/* Section 1 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center">
                    <CreditCard className="w-8 h-8 mr-3 text-red-400" />
                    {t('refundPolicy.allSalesFinal')}
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    {t('refundPolicy.allSalesFinalContent')}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-white/90 font-medium">{t('refundPolicy.unusedCredits')}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-white/90 font-medium">{t('refundPolicy.insufficientUsage')}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-white/90 font-medium">{t('refundPolicy.personalReasons')}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-white/90 font-medium">{t('refundPolicy.unsatisfactoryResults')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center">
                    <Clock className="w-8 h-8 mr-3 text-blue-400" />
                    {t('refundPolicy.creditUsage')}
                  </h2>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6 mb-6">
                    <p className="text-white/90 leading-relaxed text-lg mb-4">
                      {t('refundPolicy.creditUsageContent')}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Array.isArray(t('refundPolicy.creditFeatures')) ? 
                        (t('refundPolicy.creditFeatures') as unknown as string[]).map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                            <span className="text-white/90">{feature}</span>
                          </div>
                        )) : null
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center">
                    <Shield className="w-8 h-8 mr-3 text-green-400" />
                    {t('refundPolicy.serviceInterruption')}
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    {t('refundPolicy.serviceInterruptionContent')}
                  </p>
                  <div className="space-y-4">
                    {Array.isArray(t('refundPolicy.interruptionCompensation')) ? 
                      (t('refundPolicy.interruptionCompensation') as unknown as string[]).map((item, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                            <span className="text-white/90">{item}</span>
                          </div>
                        </div>
                      )) : null
                    }
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center">
                    <MessageCircle className="w-8 h-8 mr-3 text-purple-400" />
                    {t('refundPolicy.disputeResolution')}
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    {t('refundPolicy.disputeResolutionContent')}
                  </p>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {Array.isArray(t('refundPolicy.disputeSteps')) ? 
                        (t('refundPolicy.disputeSteps') as unknown as string[]).map((step, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            <span className="text-white/90">{step}</span>
                          </div>
                        )) : null
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">5</span>
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center">
                    <FileText className="w-8 h-8 mr-3 text-orange-400" />
                    {t('refundPolicy.policyModification')}
                  </h2>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {t('refundPolicy.policyModificationContent')}
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">6</span>
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center">
                    <CheckCircle className="w-8 h-8 mr-3 text-indigo-400" />
                    {t('refundPolicy.termsAcceptance')}
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    {t('refundPolicy.termsAcceptanceContent')}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Array.isArray(t('refundPolicy.acceptanceItems')) ? 
                      (t('refundPolicy.acceptanceItems') as unknown as string[]).map((item, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-white/90">{item}</span>
                        </div>
                      )) : null
                    }
                  </div>
                </div>
              </div>

              {/* Section 7 */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">7</span>
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg flex items-center">
                    <Mail className="w-8 h-8 mr-3 text-teal-400" />
                    {t('refundPolicy.contactInfo')}
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    {t('refundPolicy.contactInfoContent')}
                  </p>
                  <div className="bg-gradient-to-r from-teal-500/20 to-green-500/20 border border-teal-500/30 rounded-2xl p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Mail className="w-6 h-6 text-teal-300" />
                        </div>
                        <p className="text-white/90 font-semibold">{t('refundPolicy.email')}</p>
                        <p className="text-teal-300">media@aiqwen.cc</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-teal-300" />
                        </div>
                        <p className="text-white/90 font-semibold">{t('refundPolicy.serviceHours')}</p>
                        <p className="text-teal-300">{t('refundPolicy.serviceHoursDetail')}</p>
                        <p className="text-teal-300 text-sm">{t('refundPolicy.beijingTime')}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <MessageCircle className="w-6 h-6 text-teal-300" />
                        </div>
                        <p className="text-white/90 font-semibold">{t('refundPolicy.responseTime')}</p>
                        <p className="text-teal-300">{t('refundPolicy.responseTimeDetail')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-8">
                <div className="flex items-start">
                  <AlertTriangle className="w-8 h-8 text-red-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {t('refundPolicy.importantNotice')}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-lg">
                      {t('refundPolicy.importantNoticeContent')}
                    </p>
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

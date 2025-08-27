import GlobalBackground from '@/components/GlobalBackground'
import { Shield, CreditCard, Clock, MessageCircle, FileText, CheckCircle, AlertTriangle, Mail } from 'lucide-react'

export default function RefundPolicyPage() {
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
              退款政策
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg">
              最后更新日期: 2025-04-22
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
                <span className="text-white/80 text-sm">
                  📋 请仔细阅读以下条款
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
                    所有销售均为最终交易
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    由于数字服务的即时访问特性，所有积分购买一旦支付，即视为最终交易，不予退款。这包括但不限于以下情况：
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-white/90 font-medium">未使用的积分余额</span>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-white/90 font-medium">账户使用不足</span>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-white/90 font-medium">因用户个人原因取消</span>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span className="text-white/90 font-medium">积分已用于图像处理但结果不满意</span>
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
                    积分使用说明
                  </h2>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6 mb-6">
                    <p className="text-white/90 leading-relaxed text-lg mb-4">
                      我们的服务采用积分制，<span className="font-bold text-blue-300">每次图像处理消耗15积分</span>
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-white/90">积分购买后立即到账，可随时使用</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-white/90">积分无使用期限，永久有效</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-white/90">每次处理完成后，相应积分自动扣除</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-white/90">积分不可转让、不可兑换现金</span>
                      </div>
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
                    服务中断的异常处理
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    若发生重大服务中断：
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                        <span className="text-white/90">非不可抗力因素导致的持续超过72小时的重大服务中断，用户可申请等值积分的补偿</span>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                        <span className="text-white/90">此补偿为唯一救济，不涉及现金退款</span>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                        <span className="text-white/90">补偿积分将直接添加到用户账户</span>
                      </div>
                    </div>
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
                    争议解决
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    如果您对扣款有任何疑问，请在7个工作日内联系我们：
                  </p>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        <span className="text-white/90">联系 media@aiqwen.cc 并提供交易ID</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        <span className="text-white/90">提供扣费凭证和问题描述</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        <span className="text-white/90">我们将进行调查并在15个工作日内给予书面答复</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        <span className="text-white/90">所有争议解决结果为最终决定</span>
                      </div>
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
                    政策修改权利
                  </h2>
                  <p className="text-white/80 leading-relaxed text-lg">
                    Gemini Flash Image 保留随时修改本政策的权利，修改后的政策将在网站上公开发布后立即生效。
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
                    条款认可
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    通过购买积分，您确认：
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-white/90">已充分理解并接受本政策</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-white/90">确认数字服务的特殊性</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-white/90">同意放弃任何要求退款的权利</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-white/90">理解积分系统的运作方式</span>
                    </div>
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
                    联系信息
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6 text-lg">
                    如对此政策或账单有疑问，请联系我们：
                  </p>
                  <div className="bg-gradient-to-r from-teal-500/20 to-green-500/20 border border-teal-500/30 rounded-2xl p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Mail className="w-6 h-6 text-teal-300" />
                        </div>
                        <p className="text-white/90 font-semibold">邮箱</p>
                        <p className="text-teal-300">media@aiqwen.cc</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-teal-300" />
                        </div>
                        <p className="text-white/90 font-semibold">服务时间</p>
                        <p className="text-teal-300">周一至周五 9:00-18:00</p>
                        <p className="text-teal-300 text-sm">(北京时间)</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <MessageCircle className="w-6 h-6 text-teal-300" />
                        </div>
                        <p className="text-white/90 font-semibold">响应时间</p>
                        <p className="text-teal-300">24小时内回复</p>
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
                      ⚠️ 重要提醒
                    </h3>
                    <p className="text-white/90 leading-relaxed text-lg">
                      请在使用我们的服务前仔细阅读本退款政策。购买积分即表示您完全理解并同意本政策的所有条款。
                      我们建议您在购买前充分了解我们的服务内容和积分使用规则。
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

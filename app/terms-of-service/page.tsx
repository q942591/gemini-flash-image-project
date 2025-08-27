import { FileText, CheckCircle, Shield, User, Lock, Copyright, AlertTriangle, Scale, Mail, Clock } from 'lucide-react'
import GlobalBackground from '@/components/GlobalBackground'

export default function TermsOfService() {
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
                服务条款
        </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-lg">
                使用我们的服务即表示您同意遵守以下条款和条件
              </p>
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 inline-block">
                <p className="text-white/90 text-lg">
                  最后更新：2025年1月
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">1. 接受条款</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      通过访问和使用Gemini Flash Image服务，您同意受这些服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">2. 服务描述</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      Gemini Flash Image是一个基于人工智能的图像编辑服务，允许用户通过自然语言指令编辑图像。我们提供在线图像编辑工具和相关功能。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">3. 用户账户</h2>
                    <p className="text-white/90 mb-4">使用某些服务功能需要创建账户。您必须：</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        '提供准确完整的信息',
                        '保持账户信息更新',
                        '保护账户密码安全',
                        '对账户下的所有活动负责'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-white/90">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">4. 可接受使用</h2>
                    <p className="text-white/90 mb-4">您同意不：</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        '上传非法、有害或侵犯他人权利的内容',
                        '试图破坏或干扰服务的正常运行',
                        '使用自动化工具过度访问服务',
                        '反向工程或复制服务技术'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-white/90">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">5. 知识产权</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      服务和其内容受版权、商标和其他知识产权法律保护。您上传的内容仍然是您的，但您授予我们必要的许可来处理该内容以提供服务。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">6. 隐私</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      您的隐私对我们很重要。请查看我们的隐私政策，了解我们如何收集、使用和保护您的信息。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">7. 免责声明</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      服务按"现状"提供，不提供任何明示或暗示的保证。我们不保证服务的连续性、准确性或无错误运行。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">8. 责任限制</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      在法律允许的最大范围内，我们对任何间接、偶然、特殊或后果性损害不承担责任。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">9. 条款修改</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      我们保留随时修改这些服务条款的权利。重大变更将通过适当方式通知您。继续使用服务表示您接受修改后的条款。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">10. 联系信息</h2>
                    <p className="text-white/90 mb-4">
                      如果您对这些服务条款有任何疑问，请联系我们：
                    </p>
                    <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                      <p className="text-white font-semibold">
                        📧 邮箱：legal@geminiflashimage.com
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
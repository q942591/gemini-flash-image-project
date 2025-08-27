import { Shield, Eye, Lock, UserCheck, Cookie, Database, Mail } from 'lucide-react'
import GlobalBackground from '@/components/GlobalBackground'

export default function PrivacyPolicy() {
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
                隐私政策
        </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-lg">
                我们致力于保护您的隐私，确保您的个人信息安全
              </p>
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 inline-block">
                <p className="text-white/90 text-lg">
                  最后更新：2025年1月
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">1. 概述</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      Gemini Flash Image（"我们"、"我们的"或"服务"）致力于保护您的隐私。本隐私政策说明了我们如何收集、使用、披露和保护您在使用我们服务时提供的信息。
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
                    <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">2. 我们收集的信息</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <UserCheck className="w-5 h-5 mr-2 text-purple-300" />
                          2.1 您直接提供的信息
                        </h3>
                        <ul className="space-y-2 ml-7">
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            账户信息（邮箱地址、用户名）
                          </li>
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            您上传的图片和编辑指令
                          </li>
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            联系信息（当您联系我们时）
                          </li>
            </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                          <Database className="w-5 h-5 mr-2 text-blue-300" />
                          2.2 自动收集的信息
                        </h3>
                        <ul className="space-y-2 ml-7">
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            设备信息（浏览器类型、操作系统）
                          </li>
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            使用数据（访问时间、页面浏览）
                          </li>
                          <li className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            通过cookies和类似技术收集的信息
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">3. 我们如何使用信息</h2>
                    <p className="text-white/90 mb-4">我们使用收集的信息来：</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        '提供和改进我们的服务',
                        '处理您的图像编辑请求',
                        '与您沟通服务相关信息',
                        '分析服务使用情况以改进',
                        '确保服务安全并防止欺诈'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-white/90">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">4. Cookie使用</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      我们使用cookies和类似技术来改善您的用户体验。您可以通过浏览器设置控制cookie使用，或使用我们网站上的cookie偏好设置。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">5. 数据保护</h2>
                    <p className="text-white/90 leading-relaxed text-lg">
                      我们实施适当的技术和组织措施，保护您的个人信息免受未经授权的访问、使用或披露。
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
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">6. 您的权利</h2>
                    <p className="text-white/90 mb-4">根据GDPR，您有权：</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        '访问您的个人数据',
                        '纠正不准确的数据',
                        '删除您的数据',
                        '限制处理',
                        '数据可携带性',
                        '反对处理'
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

              {/* 联系我们部分 */}
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-purple-300/30 hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-200" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">7. 联系我们</h2>
                    <p className="text-white/90 mb-4">
                      如果您对本隐私政策有任何疑问或需要行使您的权利，请联系我们：
                    </p>
                    <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                      <p className="text-white font-semibold">
                        📧 邮箱：privacy@geminiflashimage.com
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
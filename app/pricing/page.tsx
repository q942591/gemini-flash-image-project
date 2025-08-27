import GlobalBackground from '@/components/GlobalBackground'

export default function Pricing() {
  return (
    <>
      <GlobalBackground />
      <main className="min-h-screen pt-16">
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                定价方案
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg">
                选择最适合您需求的AI图像编辑方案
              </p>
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 inline-block">
                <p className="text-white/90 text-lg">
                  <span className="text-yellow-300 font-semibold">每次处理消耗15积分</span>
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* 基础版 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">基础版</h3>
                <div className="text-3xl font-bold text-white mb-2">
                  $1.99
                </div>
                <div className="text-lg text-white/80 mb-4">
                  160积分
                </div>
                <div className="text-sm text-white/60 mb-6">
                  约10次AI编辑
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    标准分辨率输出
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    基础模板使用
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    邮件支持
                  </li>
                </ul>
                <button className="w-full bg-white/20 text-white py-3 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
                  立即购买
                </button>
              </div>
              
              {/* 标准版 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">标准版</h3>
                <div className="text-3xl font-bold text-white mb-2">
                  $5.99
                </div>
                <div className="text-lg text-white/80 mb-4">
                  550积分
                </div>
                <div className="text-sm text-white/60 mb-6">
                  约36次AI编辑
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    高清分辨率输出
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    所有基础模板
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    优先客服支持
                  </li>
                </ul>
                <button className="w-full bg-white/20 text-white py-3 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
                  立即购买
                </button>
              </div>
              
              {/* 专业版 */}
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-300/30 relative hover:scale-105 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    推荐
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">专业版</h3>
                <div className="text-3xl font-bold text-white mb-2">
                  $19.99
                </div>
                <div className="text-lg text-white/80 mb-4">
                  2700积分
                </div>
                <div className="text-sm text-white/60 mb-6">
                  约180次AI编辑
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    4K超高清输出
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    所有高级模板
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    批量处理功能
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    专属客服支持
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                  立即购买
                </button>
              </div>
              
              {/* 企业版 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">企业版</h3>
                <div className="text-3xl font-bold text-white mb-2">
                  $49.9
                </div>
                <div className="text-lg text-white/80 mb-4">
                  9000积分
                </div>
                <div className="text-sm text-white/60 mb-6">
                  约600次AI编辑
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    8K超高清输出
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    团队协作功能
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    API接口访问
                  </li>
                  <li className="flex items-center text-white/80 text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    专属客户经理
                  </li>
                </ul>
                <button className="w-full bg-white/20 text-white py-3 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300">
                  立即购买
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

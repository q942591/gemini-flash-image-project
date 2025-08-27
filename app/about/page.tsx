import { Users, Target, Award, Globe, Zap, Heart, Star, Lightbulb } from 'lucide-react'
import GlobalBackground from '@/components/GlobalBackground'

export default function About() {
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
                关于我们
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
                我们是一支充满激情的团队，致力于通过AI技术让图像编辑变得简单、高效、有趣
              </p>
            </div>
            
            {/* 公司介绍部分 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 mb-16 hover:bg-white/15 transition-all duration-300">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">我们的故事</h2>
                <p className="text-white/90 text-lg leading-relaxed max-w-4xl mx-auto">
                  Gemini Flash Image 诞生于对创意无限可能的追求。我们相信，每个人都是天生的艺术家，
                  而AI技术应该成为释放创造力的工具，而不是障碍。通过自然语言描述来编辑图像，
                  我们让复杂的图像处理变得像说话一样简单。
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
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">我们的使命</h3>
                  <p className="text-white/90 leading-relaxed">
                    让AI图像编辑技术惠及每一个人，无论你是专业设计师还是普通用户，
                    都能轻松实现创意想法，让想象力不再受限。
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-6">
                    <Star className="w-8 h-8 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">我们的愿景</h3>
                  <p className="text-white/90 leading-relaxed">
                    成为全球领先的AI图像编辑平台，重新定义创意工作流程，
                    让每个人都能成为数字时代的艺术家。
                  </p>
                </div>
              </div>
            </div>

            {/* 核心价值部分 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">核心价值</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Zap className="w-8 h-8 text-yellow-300" />,
                    title: "创新驱动",
                    description: "持续探索AI技术前沿，为用户带来最新最强大的功能"
                  },
                  {
                    icon: <Heart className="w-8 h-8 text-red-300" />,
                    title: "用户至上",
                    description: "以用户体验为核心，让复杂的技术变得简单易用"
                  },
                  {
                    icon: <Globe className="w-8 h-8 text-blue-300" />,
                    title: "开放包容",
                    description: "拥抱多样性，为全球用户提供本地化的优质服务"
                  },
                  {
                    icon: <Lightbulb className="w-8 h-8 text-purple-300" />,
                    title: "创意无限",
                    description: "激发每个人的创造力，让创意想法自由绽放"
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center drop-shadow-lg">技术优势</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full mb-6">
                    <Zap className="w-10 h-10 text-purple-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">闪电般快速</h3>
                  <p className="text-white/90 leading-relaxed">
                    采用最新的AI模型和优化算法，图像处理速度比传统方法快10倍以上
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/30 to-green-500/30 rounded-full mb-6">
                    <Award className="w-10 h-10 text-blue-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">专业品质</h3>
                  <p className="text-white/90 leading-relaxed">
                    训练于数百万张高质量图像，确保输出结果达到专业设计师水准
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/30 to-purple-500/30 rounded-full mb-6">
                    <Globe className="w-10 h-10 text-green-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">智能理解</h3>
                  <p className="text-white/90 leading-relaxed">
                    支持多语言自然语言描述，AI能准确理解您的创意需求并执行
                  </p>
                </div>
              </div>
            </div>

            {/* 联系我们部分 */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">加入我们</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                无论您是寻找AI图像编辑解决方案的企业，还是对技术充满热情的开发者，
                我们都期待与您合作，共同创造更美好的数字世界。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                  <p className="text-white font-semibold">
                    📧 商务合作：business@geminiflashimage.com
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30">
                  <p className="text-white font-semibold">
                    💼 加入团队：careers@geminiflashimage.com
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

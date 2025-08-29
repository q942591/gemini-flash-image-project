'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface FeatureCard {
  id: string
  title: string
  description: string
  beforeImage: string
  afterImage: string
  category: string
}

const features: FeatureCard[] = [
  {
    id: 'poster',
    title: '海报生成',
    description: '从创意到精美海报，AI助你一键生成专业级设计',
    beforeImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '设计工具'
  },
  {
    id: 'illustration',
    title: '教学插图',
    description: '将复杂概念转化为清晰易懂的可视化插图',
    beforeImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '教育'
  },
  {
    id: 'data-viz',
    title: '数据图解',
    description: '让枯燥的数据变得生动有趣，提升信息传达效果',
    beforeImage: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '数据分析'
  },
  {
    id: 'whiteboard',
    title: '白板转可视化',
    description: '将手绘草图和笔记转换为专业可视化图表',
    beforeImage: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '办公工具'
  },
  {
    id: 'moodboard',
    title: 'Moodboard',
    description: '创建灵感板，激发创意灵感，统一设计风格',
    beforeImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: '创意设计'
  },
  {
    id: 'ai-sketch',
    title: 'AI 草图',
    description: '从简单线条到完整设计，AI助你快速完成创意',
    beforeImage: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=400',
    afterImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'AI创作'
  }
]

export default function FeatureShowcase() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureCard | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  const openFeature = (feature: FeatureCard) => {
    setSelectedFeature(feature)
  }

  const closeFeature = () => {
    setSelectedFeature(null)
  }

  return (
    <section className="relative py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            六大场景展示
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              轮播卡片
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            横向滑动 + hover 动效 + 点击放大全屏（含「立即体验」按钮）
          </p>
        </div>

        {/* 轮播容器 */}
        <div className="relative max-w-7xl mx-auto">
          {/* 导航按钮 */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* 卡片容器 */}
          <div className="flex gap-6 overflow-hidden px-16">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`flex-shrink-0 w-80 transition-all duration-700 ease-out ${
                  index === currentIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
                }`}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  onClick={() => openFeature(feature)}
                >
                  <CardContent className="p-0">
                    {/* 图片区域 */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Before/After 对比 */}
                      <div className="relative h-full">
                        <img
                          src={feature.beforeImage}
                          alt={`${feature.title} - Before`}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* 悬浮图标 */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                            <Maximize2 className="w-8 h-8 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 内容区域 */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {feature.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 group-hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation()
                          openFeature(feature)
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        立即体验
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* 指示器 */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 全屏弹窗 */}
      <Dialog open={!!selectedFeature} onOpenChange={closeFeature}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedFeature && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {selectedFeature.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Before/After 对比 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-700 text-center">Before</h4>
                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={selectedFeature.beforeImage}
                        alt="Before"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute bottom-4 left-4 text-white bg-black/60 px-2 py-1 rounded">
                        <p className="text-sm opacity-80">手写笔记、低质量截图</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-700 text-center">After</h4>
                    <div className="relative rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={selectedFeature.afterImage}
                        alt="After"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute bottom-4 left-4 text-white bg-black/60 px-2 py-1 rounded">
                        <p className="text-sm opacity-80">结构清晰可视化图稿</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 描述 */}
                <div className="text-center">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {selectedFeature.description}
                  </p>
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-center space-x-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    立即体验
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={closeFeature}
                  >
                    关闭
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { UserReviewsMarquee } from './UserReviewsMarquee'

// Before/After对比组件
function BeforeAfterComparison() {
  const { t } = useLanguage()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 overflow-hidden rounded-lg cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Before图片（底层，铺满整个容器） */}
      <img
        src="/ppt美化后.png"
        alt="Before: 手写笔记、低质量截图"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="/ppt美化.png"
          alt="After: 结构清晰可视化图稿"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 分割线滑块 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-purple-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* 标签 */}
      <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.before')}
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.after')}
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        {t('common.dragToCompare')}
      </div>
    </div>
  )
}

// 海报生成对比组件
function PosterComparison() {
  const { t } = useLanguage()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 overflow-hidden rounded-lg cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Before图片（底层，铺满整个容器） */}
      <img
        src="/海报后.png"
        alt="Before: 原始设计"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="/海报.png"
          alt="After: 精美海报"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(1.2) contrast(1.1)' }}
        />
      </div>

      {/* 分割线滑块 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-purple-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* 标签 */}
      <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.before')}
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.after')}
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        {t('common.dragToCompare')}
      </div>
    </div>
  )
}

// 数据图解对比组件
function DataVizComparison() {
  const { t } = useLanguage()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 overflow-hidden rounded-lg cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Before图片（底层，铺满整个容器） */}
      <img
        src="/图表后.png"
        alt="Before: 原始数据"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="/图表.png"
          alt="After: 生动图解"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 分割线滑块 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-purple-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* 标签 */}
      <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.before')}
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.after')}
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        {t('common.dragToCompare')}
      </div>
    </div>
  )
}

// 白板转可视化对比组件
function WhiteboardComparison() {
  const { t } = useLanguage()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 overflow-hidden rounded-lg cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Before图片（底层，铺满整个容器） */}
      <img
        src="/白板后.png"
        alt="Before: 手绘草图"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="/白板.png"
          alt="After: 专业图表"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(1.4) contrast(1.3) brightness(1.2)' }}
        />
      </div>

      {/* 分割线滑块 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-purple-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* 标签 */}
      <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.before')}
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.after')}
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        {t('common.dragToCompare')}
      </div>
    </div>
  )
}

// Moodboard对比组件
function MoodboardComparison() {
  const { t } = useLanguage()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 overflow-hidden rounded-lg cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Before图片（底层，铺满整个容器） */}
      <img
        src="/板子后.png"
        alt="Before: 原始素材"
        className="absolute inset-0 w-full h-full object-cover"

      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="/板子.png"
          alt="After: 灵感板"
          className="absolute inset-0 w-full h-full object-cover"

        />
      </div>

      {/* 分割线滑块 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-purple-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* 标签 */}
      <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.before')}
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.after')}
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        {t('common.dragToCompare')}
      </div>
    </div>
  )
}

// AI 草图对比组件
function AISketchComparison() {
  const { t } = useLanguage()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 overflow-hidden rounded-lg cursor-col-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Before图片（底层，铺满整个容器） */}
      <img
        src="/草图后.png"
        alt="Before: 简单线条"
        className="absolute inset-0 w-full h-full object-cover"

      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="/草图.jpg"
          alt="After: 完整设计"
          className="absolute inset-0 w-full h-full object-cover"

        />
      </div>

      {/* 分割线滑块 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 shadow-lg"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-purple-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* 标签 */}
      <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.before')}
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        {t('common.after')}
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        {t('common.dragToCompare')}
      </div>
    </div>
  )
}

// FAQ折叠组件
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="bg-white/95 backdrop-blur-md border-gray-200 shadow-lg">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-50 hover:shadow-md hover:scale-[1.02] hover:border-purple-300 hover:text-purple-700 transition-all duration-200 group"
        >
          <h3 className="text-lg font-bold text-gray-800 pr-4 group-hover:text-purple-700">{question}</h3>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0 group-hover:text-purple-700 group-hover:scale-110 transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0 group-hover:text-purple-700 group-hover:scale-110 transition-transform duration-200" />
          )}
        </button>
        {isOpen && (
          <div className="px-6 pb-6">
            <p className="text-gray-700 text-sm leading-relaxed font-medium">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function FunctionPage() {
  const { t } = useLanguage()
  
  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-2xl">
            <span className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
              {t('functionPage.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 drop-shadow-lg">
            {t('functionPage.description')}
          </p>
        </div>



        {/* 功能卡片展示 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {/* 功能卡片1：教学前后案例对比 */}
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/95 backdrop-blur-md border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <BeforeAfterComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 backdrop-blur-md text-purple-800 text-xs font-semibold rounded-full border border-purple-200 shadow-sm">
                    {t('features.teachingComparison.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {t('features.teachingComparison.title')}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed mb-4 font-medium">
                  {t('features.teachingComparison.description')}
                </p>
                <Link href="/function">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('common.experienceNow')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 功能卡片2：海报生成 */}
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/95 backdrop-blur-md border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <PosterComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 backdrop-blur-md text-purple-800 text-xs font-semibold rounded-full border border-purple-200 shadow-sm">
                    {t('features.posterGeneration.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {t('features.posterGeneration.title')}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed mb-4 font-medium">
                  {t('features.posterGeneration.description')}
                </p>
                <Link href="/function">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('common.experienceNow')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 功能卡片3：数据图解 */}
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/95 backdrop-blur-md border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <DataVizComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 backdrop-blur-md text-purple-800 text-xs font-semibold rounded-full border border-purple-200 shadow-sm">
                    {t('features.dataVisualization.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {t('features.dataVisualization.title')}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed mb-4 font-medium">
                  {t('features.dataVisualization.description')}
                </p>
                <Link href="/function">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('common.experienceNow')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 功能卡片4：白板转可视化 */}
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/95 backdrop-blur-md border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <WhiteboardComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="mb-3">
                    <span className="inline-block px-3 py-1 bg-purple-100 backdrop-blur-md text-purple-800 text-xs font-semibold rounded-full border border-purple-200 shadow-sm">
                      {t('features.whiteboardToVisual.category')}
                    </span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {t('features.whiteboardToVisual.title')}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed mb-4 font-medium">
                  {t('features.whiteboardToVisual.description')}
                </p>
                <Link href="/function">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 0z" />
                    </svg>
                    {t('common.experienceNow')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 功能卡片5：Moodboard */}
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/95 backdrop-blur-md border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <MoodboardComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 backdrop-blur-md text-purple-800 text-xs font-semibold rounded-full border border-purple-200 shadow-sm">
                    {t('features.moodboard.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {t('features.moodboard.title')}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed mb-4 font-medium">
                  {t('features.moodboard.description')}
                </p>
                <Link href="/function">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('common.experienceNow')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 功能卡片6：AI 草图 */}
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/95 backdrop-blur-md border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <AISketchComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-purple-100 backdrop-blur-md text-purple-800 text-xs font-semibold rounded-full border border-purple-200 shadow-sm">
                    {t('features.aiSketch.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {t('features.aiSketch.title')}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed mb-4 font-medium">
                  {t('features.aiSketch.description')}
                </p>
                <Link href="/function">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('common.experienceNow')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 模型介绍（SEO 区） */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
                {t('modelIntro.title')}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto drop-shadow-lg">
              {t('modelIntro.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/95 backdrop-blur-md border-gray-200 shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">{t('modelIntro.features.textUnderstanding.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('modelIntro.features.textUnderstanding.description')}
              </p>
            </Card>

            <Card className="bg-white/95 backdrop-blur-md border-gray-200 shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">{t('modelIntro.features.imageGeneration.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('modelIntro.features.imageGeneration.description')}
              </p>
            </Card>

            <Card className="bg-white/95 backdrop-blur-md border-gray-200 shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">{t('modelIntro.features.realTimeOptimization.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('modelIntro.features.realTimeOptimization.description')}
              </p>
            </Card>
          </div>
        </div>

        {/* 用户评价（老师/设计师） */}
        <UserReviewsMarquee />

        {/* FAQ 区（教育场景常见问题） */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
                {t('faq.title')}
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto drop-shadow-lg">
              {t('faq.subtitle')}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <FAQItem
              question={t('faq.questions.formatSupport.question')}
              answer={t('faq.questions.formatSupport.answer')}
            />
            
            <FAQItem
              question={t('faq.questions.descriptionTips.question')}
              answer={t('faq.questions.descriptionTips.answer')}
            />
            
            <FAQItem
              question={t('faq.questions.commercialUse.question')}
              answer={t('faq.questions.commercialUse.answer')}
            />
            
            <FAQItem
              question={t('faq.questions.batchProcessing.question')}
              answer={t('faq.questions.batchProcessing.answer')}
            />
            
            <FAQItem
              question={t('faq.questions.generationTime.question')}
              answer={t('faq.questions.generationTime.answer')}
            />
            
            <FAQItem
              question={t('faq.questions.languageSupport.question')}
              answer={t('faq.questions.languageSupport.answer')}
            />
            
            <FAQItem
              question={t('faq.questions.qualityGuarantee.question')}
              answer={t('faq.questions.qualityGuarantee.answer')}
            />
            
            <FAQItem
              question={t('faq.questions.imageEditing.question')}
              answer={t('faq.questions.imageEditing.answer')}
            />
          </div>
        </div>

        {/* 行动召唤区域 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                {t('cta.title')}
              </span>
            </h3>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 drop-shadow-lg">
              {t('cta.subtitle')}
            </p>
            <div className="flex justify-center">
              <Link href="/function">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2">
                  <span>{t('cta.button')}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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
          src="/ppt美化.jpg"
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
        Before
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        After
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        ← 拖动查看对比 →
      </div>
    </div>
  )
}

// 海报生成对比组件
function PosterComparison() {
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
        src="https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Before: 原始设计"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(30%) brightness(0.8)' }}
      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=400"
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
        Before
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        After
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        ← 拖动查看对比 →
      </div>
    </div>
  )
}

// 数据图解对比组件
function DataVizComparison() {
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
        style={{ filter: 'grayscale(40%) brightness(0.7)' }}
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
          style={{ filter: 'saturate(1.3) contrast(1.2) brightness(1.1)' }}
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
        Before
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        After
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        ← 拖动查看对比 →
      </div>
    </div>
  )
}

// 白板转可视化对比组件
function WhiteboardComparison() {
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
        style={{ filter: 'grayscale(50%) brightness(0.6)' }}
      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="/白板.jpg"
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
        Before
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        After
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        ← 拖动查看对比 →
      </div>
    </div>
  )
}

// Moodboard对比组件
function MoodboardComparison() {
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
        src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Before: 原始素材"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(35%) brightness(0.75)' }}
      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="After: 灵感板"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(1.5) contrast(1.1) brightness(1.15)' }}
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
        Before
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        After
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        ← 拖动查看对比 →
      </div>
    </div>
  )
}

// AI 草图对比组件
function AISketchComparison() {
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
        src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400"
        alt="Before: 简单线条"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(45%) brightness(0.65)' }}
      />
      
      {/* After图片（顶层，铺满整个容器，通过clip-path控制显示区域） */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="After: 完整设计"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(1.6) contrast(1.4) brightness(1.25)' }}
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
        Before
      </div>
      <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
        After
      </div>

      {/* 拖动提示 */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-xs">
        ← 拖动查看对比 →
      </div>
    </div>
  )
}

// FAQ折叠组件
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
        >
          <h3 className="text-lg font-bold text-gray-700 pr-4">{question}</h3>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
          )}
        </button>
        {isOpen && (
          <div className="px-6 pb-6">
            <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
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
            <span className="bg-gradient-to-r from-purple-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
              {t('functionPage.subtitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 drop-shadow-lg">
            {t('functionPage.description')}
          </p>
        </div>



        {/* 功能卡片展示 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {/* 功能卡片1：教学前后案例对比 */}
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <BeforeAfterComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                    {t('features.teachingComparison.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {t('features.teachingComparison.title')}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {t('features.teachingComparison.description')}
                </p>
                <Link href="/image-edit">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group-hover:scale-105">
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
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <PosterComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                    {t('features.posterGeneration.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {t('features.posterGeneration.title')}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {t('features.posterGeneration.description')}
                </p>
                <Link href="/image-edit">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group-hover:scale-105">
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
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <DataVizComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                    {t('features.dataVisualization.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {t('features.dataVisualization.title')}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {t('features.dataVisualization.description')}
                </p>
                <Link href="/image-edit">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group-hover:scale-105">
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
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <WhiteboardComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="mb-3">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                      {t('features.whiteboardToVisual.category')}
                    </span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {t('features.whiteboardToVisual.title')}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {t('features.whiteboardToVisual.description')}
                </p>
                <Link href="/image-edit">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group-hover:scale-105">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('common.experienceNow')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 功能卡片5：Moodboard */}
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <MoodboardComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                    {t('features.moodboard.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {t('features.moodboard.title')}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {t('features.moodboard.description')}
                </p>
                <Link href="/image-edit">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group-hover:scale-105">
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
          <Card className="group cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
                <AISketchComparison />
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
                    {t('features.aiSketch.category')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {t('features.aiSketch.title')}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {t('features.aiSketch.description')}
                </p>
                <Link href="/image-edit">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group-hover:scale-105">
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
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center">
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

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">{t('modelIntro.features.imageGeneration.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('modelIntro.features.imageGeneration.description')}
              </p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center">
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
              question="Gemini Flash Image 支持哪些图像格式？"
              answer="支持JPG、PNG、SVG、WebP等多种主流图像格式，输出分辨率最高可达8K，满足不同应用场景的需求。"
            />
            
            <FAQItem
              question="如何描述才能生成最准确的图像？"
              answer="建议使用具体、详细的描述，包括主题、风格、颜色、构图等要素。例如：'创建一个现代简约风格的数据图表，使用蓝色和紫色渐变，包含柱状图和折线图'。"
            />
            
            <FAQItem
              question="生成的图像可以商用吗？"
              answer="根据您的订阅计划，生成的图像可以用于个人和商业用途。我们提供完整的版权保护和使用授权说明。"
            />
            
            <FAQItem
              question="是否支持批量处理？"
              answer="专业版和企业版支持批量处理功能，可以同时处理多张图像，大幅提升工作效率，特别适合教育机构和设计团队使用。"
            />
            
            <FAQItem
              question="图像生成需要多长时间？"
              answer="标准分辨率图像通常在5-15秒内完成，高分辨率图像可能需要20-30秒。Flash架构确保响应速度始终保持在毫秒级。"
            />
            
            <FAQItem
              question="支持哪些语言描述？"
              answer="目前支持中文、英文、日文、韩文等多种语言，AI能够准确理解不同语言的表达习惯和文化背景。"
            />
            
            <FAQItem
              question="如何保证生成图像的质量？"
              answer="我们采用最新的AI模型和严格的训练数据，确保生成的图像在清晰度、色彩准确性和艺术性方面都达到专业水准。"
            />
            
            <FAQItem
              question="是否支持图像编辑和修改？"
              answer="支持！您可以对生成的图像进行进一步的编辑，包括调整色彩、裁剪、添加文字等，让图像更符合您的具体需求。"
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
              <Link href="/image-edit">
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

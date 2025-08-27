'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Play, RotateCcw, Upload, Image as ImageIcon } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

export default function ImageEditPage() {
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [editedImage, setEditedImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [showComparison, setShowComparison] = useState(false)

  const quickPrompts = [
    '将手写笔记转换为清晰的可视化图表',
    '生成专业的数据分析图表',
    '创建精美的海报设计',
    '将草图转换为完整设计稿',
    '生成教学插图',
    '创建品牌视觉元素'
  ]

  const handlePromptClick = (promptText: string) => {
    setPrompt(promptText)
  }

  const handleExecute = async () => {
    if (!uploadedImage || !prompt) return

    setIsLoading(true)
    setShowComparison(false)

    try {
      // 模拟API调用
      const response = await fetch('/api/edit-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
          prompt: prompt
        })
      })

      if (response.ok) {
        const data = await response.json()
        setEditedImage(data.editedImageUrl)
        setShowComparison(true)
      }
    } catch (error) {
      console.error('Error editing image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setEditedImage('')
    setPrompt('')
    setShowComparison(false)
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
            图片编辑
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              功能页面
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg">
            上传图片，体验AI图像编辑的魔法。支持多种编辑指令和快速模板。
          </p>
        </div>

        <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 左侧 - 图片上传和显示 */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full mb-4 border border-white/30">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    上传图片
                  </h3>
                  <p className="text-white/80 text-sm">
                    支持JPG、PNG、SVG等格式，最大10MB
                  </p>
                </div>
                
                <div className="relative">
                  <ImageUpload
                    uploadedImage={uploadedImage}
                    setUploadedImage={setUploadedImage}
                    isLoading={isLoading}
                  />
                  
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                      <div className="text-center text-white">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p>AI正在处理中...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Before/After 对比 */}
                {showComparison && editedImage && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">编辑结果</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="text-xs border-white/30 text-white hover:bg-white/20"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        重置
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-white/80 mb-2 text-center">原始图片</p>
                        <img
                          src={uploadedImage}
                          alt="Original image"
                          className="w-full h-32 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-white/80 mb-2 text-center">编辑后</p>
                        <img
                          src={editedImage}
                          alt="Edited image"
                          className="w-full h-32 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 右侧 - 控制面板 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    快速模板
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {quickPrompts.map((promptText, index) => (
                      <button
                        key={index}
                        onClick={() => handlePromptClick(promptText)}
                        className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                          prompt === promptText
                            ? 'border-purple-400 bg-purple-500/20 text-purple-200'
                            : 'border-white/30 hover:border-purple-400 hover:bg-purple-500/20 text-white'
                        }`}
                      >
                        <div className="flex items-center">
                          <ImageIcon className="w-4 h-4 mr-2 text-purple-300" />
                          <span className="text-sm">{promptText}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label htmlFor="custom-prompt" className="text-sm font-medium text-white">
                    自定义编辑指令
                  </label>
                  <Input
                    id="custom-prompt"
                    type="text"
                    placeholder="描述你想要的编辑效果..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-white/10 border-white/30 text-white placeholder-white/60"
                  />
                </div>

                <Button
                  onClick={handleExecute}
                  disabled={!uploadedImage || !prompt || isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 h-12 text-lg font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      处理中...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      开始编辑
                    </>
                  )}
                </Button>

                {/* 功能说明 */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                  <h4 className="font-semibold text-white mb-2">💡 使用提示</h4>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• 选择快速模板或输入自定义指令</li>
                    <li>• 支持自然语言描述编辑需求</li>
                    <li>• AI会自动理解并执行编辑任务</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

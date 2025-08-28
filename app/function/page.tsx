'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Upload, 
  RefreshCw, 
  Star,
  Gift,
  X
} from 'lucide-react'
import Plasma from '@/components/Plasma'

export default function FunctionPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedFunction, setSelectedFunction] = useState('image')
  const [creativeDescription, setCreativeDescription] = useState('Snowy weather, atmospheric')
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
    }
  }

  const handleGenerate = () => {
    if (!uploadedImage) {
      // 显示提示：请先上传图片
      return
    }
    // 处理图像生成逻辑
    console.log('开始生成图像...')
  }

  const getRandomDescription = () => {
    const descriptions = [
      'Snowy weather, atmospheric',
      'Sunset over mountains',
      'Ocean waves at dawn',
      'Forest path in autumn',
      'City lights at night'
    ]
    const randomIndex = Math.floor(Math.random() * descriptions.length)
    setCreativeDescription(descriptions[randomIndex])
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Plasma背景 - 完全覆盖全局背景 */}
      <div className="absolute inset-0 z-0">
        <Plasma 
          color="#8B5CF6" 
          speed={0.8} 
          scale={1.2} 
          opacity={0.7}
          mouseInteractive={true}
        />
      </div>
      
      {/* 页面内容 */}
      <div className="relative z-10 flex min-h-screen">
        {/* 左侧导航栏 - 模块化设计，向右移动，拉宽，高度与右侧模块一致 */}
        <aside className="w-86 bg-white/40 backdrop-blur-xl border-2 border-gray-300 rounded-2xl p-4 shadow-2xl m-6 ml-8 h-[800px] flex flex-col">
          {/* 顶部标题和模式 */}
          <div className="mb-4">
            <div className="mb-2">
              <h2 className="text-xl font-bold text-gray-800 drop-shadow-lg">图标编辑</h2>
            </div>
          </div>

          {/* 上传图片区域 */}
          <div className="mb-4">
            <h3 className="text-gray-800 font-medium mb-2 drop-shadow-lg">上传图片</h3>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center hover:border-blue-500 transition-colors bg-white/50 min-h-[160px] flex items-center justify-center relative">
              {uploadedImage ? (
                // 显示已上传的图片，铺满整个上传框
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="已上传的图片"
                    className="w-full h-full object-cover"
                  />
                  {/* 右上角删除按钮 */}
                  <Button
                    onClick={() => setUploadedImage(null)}
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white border-red-300 text-red-600 hover:text-red-700 rounded-full shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                // 显示上传提示
                <>
                  <input
                    type="file"
                    id="image-upload"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-700 text-sm font-medium mb-2">点击上传图片</p>
                    <p className="text-gray-500 text-xs">JPG, JPEG, PNG, WEBP, 最大 10MB</p>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* 参数设置 */}
          <div className="mb-4">
            <h3 className="text-gray-800 font-medium mb-2 drop-shadow-lg">参数设置</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-gray-800 text-sm mb-1 font-medium">创意描述</label>
                <div className="space-y-2">
                  <textarea
                    value={creativeDescription}
                    onChange={(e) => setCreativeDescription(e.target.value)}
                    className="w-full h-36 p-2 bg-white/70 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm font-medium"
                    placeholder="输入创意描述..."
                  />
                  <Button
                    onClick={getRandomDescription}
                    size="sm"
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    随机
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 底部操作区域 - 使用flex-grow填充剩余空间 */}
          <div className="mt-auto">
            <div className="bg-orange-500/30 border border-orange-400/50 rounded-lg p-2 mb-2 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-orange-600" />
                <span className="text-orange-800 text-sm font-semibold">消耗 15 个积分</span>
              </div>
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={!uploadedImage}
              className={`w-full ${
                uploadedImage 
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold shadow-lg' 
                  : 'bg-gray-400 cursor-not-allowed text-white'
              }`}
            >
              {uploadedImage ? (
                <>
                  <div className="w-2 h-2 bg-cyan-300 rounded-full mr-2"></div>
                  开始生成
                  <span className="ml-2 bg-emerald-700 px-2 py-1 rounded text-xs">- 15</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  请先上传图片
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* 主内容区域 - 更高更大的模块化框框，向上移动 */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-7xl">
            {/* 中央内容区域 - 更高更大的模块化框框，向上移动 */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-20 shadow-2xl min-h-[800px] flex items-center justify-center -mt-16">
              <div className="text-center w-full">
                {/* 虚线圆圈 */}
                <div className="w-96 h-96 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center relative mx-auto mb-16">
                  {/* 紫色礼物盒图标 */}
                  <div className="text-center">
                    <Gift className="w-24 h-24 text-purple-600 mx-auto mb-4 drop-shadow-lg" />
                    <div className="w-12 h-4 bg-orange-500 rounded-full mx-auto shadow-lg"></div>
                  </div>
                  
                  {/* 轨道上的发光点 */}
                  <div className="absolute inset-0 animate-spin">
                    <div className="absolute top-6 left-1/2 w-5 h-5 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/70"></div>
                  </div>
                  <div className="absolute inset-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
                    <div className="absolute bottom-6 left-1/2 w-5 h-5 bg-pink-500 rounded-full shadow-lg shadow-pink-500/70"></div>
                  </div>
                </div>
                
                {/* 主标题 */}
                <h1 className="text-6xl font-bold text-gray-800 mb-8 drop-shadow-lg">
                  你的启发,我会意识到
                </h1>
                
                {/* 副标题 */}
                <p className="text-3xl text-gray-700 font-semibold drop-shadow-lg">
                  开始创造奇迹
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Upload, 
  RefreshCw, 
  Star,
  Gift,
  X,
  Loader2,
  Download
} from 'lucide-react'
import Plasma from '@/components/Plasma'
import { supabase } from '@/lib/supabase'

export default function FunctionPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedFunction, setSelectedFunction] = useState('edit') // 默认选择编辑功能
  const [creativeDescription, setCreativeDescription] = useState('')
  const [showDefaultPrompt, setShowDefaultPrompt] = useState(true)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const [editedImageUrl, setEditedImageUrl] = useState<string>('')
  const [error, setError] = useState<string>('')



  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      setAnalysisResult('')
      setError('')
    }
  }

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError(t('functionPage.pleaseUploadImage'))
      return
    }

    if (!creativeDescription || creativeDescription.trim() === '') {
      setError(t('functionPage.pleaseEnterPrompt'))
      return
    }

    setIsAnalyzing(true)
    setError('')
    setAnalysisResult('')
    setEditedImageUrl('')

    let transactionId: string | null = null;

    try {
      // 如果是图片编辑功能，先扣除积分
      if (selectedFunction === 'edit') {
        try {
          // 获取用户token
          const { data: { session } } = await supabase.auth.getSession();
          console.log('用户会话状态:', session ? '已登录' : '未登录');
          
          if (!session?.access_token) {
            throw new Error(t('profile.pleaseLogin'));
          }

          console.log('开始扣除积分...');
          
          // 预扣积分
          const creditResponse = await fetch('/api/consume-credits', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json',
            },
          });

          console.log('积分扣除API响应状态:', creditResponse.status);

          if (!creditResponse.ok) {
            const errorText = await creditResponse.text();
            console.error('积分扣除API错误响应:', errorText);
            
            let errorData;
            try {
              errorData = JSON.parse(errorText);
            } catch (e) {
              errorData = { error: errorText };
            }
            
            throw new Error(errorData.error || `积分扣除失败: ${creditResponse.status}`);
          }

          const creditData = await creditResponse.json();
          console.log('积分扣除API成功响应:', creditData);
          
          if (creditData.success) {
            transactionId = creditData.transactionId;
            console.log('积分预扣成功:', creditData);
            console.log('交易ID:', transactionId);
            
            // 显示积分扣除成功提示
            console.log(`✅ 积分预扣成功！已扣除 ${creditData.consumedCredits} 积分，当前余额: ${creditData.newBalance}`);
          } else {
            throw new Error(creditData.error || '积分预扣失败');
          }
        } catch (creditError) {
          console.error('积分扣除失败:', creditError);
          setError(creditError instanceof Error ? creditError.message : '积分扣除失败');
          setIsAnalyzing(false);
          return;
        }
      }

      // 第一步：将图片转换为base64并上传到Supabase存储桶
      const reader = new FileReader()
      
      reader.onload = async (e) => {
        try {
          const base64Data = e.target?.result as string
          
          // 上传图片到Supabase存储桶
          const uploadResponse = await fetch('/api/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageData: base64Data,
              fileName: uploadedImage.name
            }),
          })

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json()
            throw new Error(errorData.error || `图片上传失败: ${uploadResponse.status}`)
          }

          const uploadData = await uploadResponse.json()
          
          if (!uploadData.success) {
            throw new Error(uploadData.error || '图片上传失败')
          }

          // 第二步：根据选择的功能调用相应的API
          if (selectedFunction === 'edit') {
            // 调用图片编辑API
            const editResponse = await fetch('/api/edit-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                imageUrl: uploadData.fileUrl,
                prompt: creativeDescription || '请编辑这张图片'
              }),
            })

            if (!editResponse.ok) {
              const errorData = await editResponse.json()
              throw new Error(errorData.error || `图片编辑失败: ${editResponse.status}`)
            }

            const editData = await editResponse.json()
            
            if (editData.success) {
              if (editData.editedImageData) {
                // 如果返回的是base64图片数据
                setEditedImageUrl(editData.editedImageData)
                console.log('图片编辑成功，积分扣除完成');
              } else if (editData.editedImageUrl) {
                // 如果返回的是图片URL
                setEditedImageUrl(editData.editedImageUrl)
                console.log('图片编辑成功，积分扣除完成');
              } else {
                throw new Error('编辑API没有返回图片数据')
              }
            } else {
              throw new Error(editData.error || '编辑失败')
            }
          } else {
            // 调用图片分析API
            const analysisResponse = await fetch('/api/analyze-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                imageUrl: uploadData.fileUrl,
                prompt: creativeDescription || '请分析这张图片并描述其内容'
              }),
            })

            if (!analysisResponse.ok) {
              const errorData = await analysisResponse.json()
              throw new Error(errorData.error || `图片分析失败: ${analysisResponse.status}`)
            }

            const analysisData = await analysisResponse.json()
            
            if (analysisData.success) {
              setAnalysisResult(analysisData.result)
            } else {
              throw new Error(analysisData.error || '分析失败')
            }
          }
        } catch (err) {
          console.error('处理错误:', err)
          
          // 如果是图片编辑失败且有预扣积分，需要返还积分
          if (selectedFunction === 'edit' && transactionId) {
            try {
              const { data: { session } } = await supabase.auth.getSession();
              if (session?.access_token) {
                await fetch('/api/refund-credits', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json',
                  },
                                body: JSON.stringify({
                transactionId: transactionId,
                reason: err instanceof Error ? err.message : t('functionPage.imageProcessingFailed')
              }),
            });
            console.log(t('functionPage.creditsRefunded'));
              }
            } catch (refundError) {
              console.error('积分返还失败:', refundError);
            }
          }
          
          setError(err instanceof Error ? err.message : '处理过程中出现错误')
        } finally {
          setIsAnalyzing(false)
        }
      }

      reader.onerror = () => {
        setError('图片读取失败，请重试')
        setIsAnalyzing(false)
      }

      // 读取图片为base64
      reader.readAsDataURL(uploadedImage)

    } catch (err) {
      console.error('处理错误:', err)
      
      // 如果是图片编辑失败且有预扣积分，需要返还积分
      if (selectedFunction === 'edit' && transactionId) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token) {
            await fetch('/api/refund-credits', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                transactionId: transactionId,
                reason: err instanceof Error ? err.message : t('functionPage.imageProcessingFailed')
              }),
            });
            console.log('积分已返还');
          }
        } catch (refundError) {
          console.error(t('functionPage.creditsRefundFailed'), refundError);
        }
      }
      
      setError(err instanceof Error ? err.message : t('functionPage.processingError'))
      setIsAnalyzing(false)
    }
  }

  const getRandomDescription = () => {
    if (selectedFunction === 'edit') {
      const editDescriptions = [
        '删除黑板上的文字，保持背景自然',
        '将背景改为日落时分',
        '添加一朵红花在图片中央',
        '移除图片中的水印',
        '将黑白图片转换为彩色',
        '调整图片亮度，使其更清晰'
      ]
      const randomIndex = Math.floor(Math.random() * editDescriptions.length)
      setCreativeDescription(editDescriptions[randomIndex])
      setShowDefaultPrompt(false)
    } else {
      const analyzeDescriptions = [
        '请分析这张图片并详细描述其内容',
        '描述图片中的主要元素和布局',
        '分析图片的色彩搭配和风格',
        '识别图片中的物体和场景',
        '描述图片的整体氛围和情感',
        '分析图片的构图和技术特点'
      ]
      const randomIndex = Math.floor(Math.random() * analyzeDescriptions.length)
      setCreativeDescription(analyzeDescriptions[randomIndex])
      setShowDefaultPrompt(false)
    }
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
        {/* 电脑端保持原有布局 - 完全不动 */}
        <aside className="hidden lg:block w-86 bg-white/40 backdrop-blur-xl border-2 border-gray-300 rounded-2xl p-4 shadow-2xl m-6 ml-8 h-[800px] flex flex-col">
          {/* 顶部标题和模式 */}
          <div className="mb-4">
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-gray-900 drop-shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t('functionPage.aiImageProcessing')}</h2>
            </div>
            
            {/* 功能选择器 */}
            <div className="mb-4">
              <h3 className="text-gray-900 font-semibold mb-2 drop-shadow-lg text-lg">{t('functionPage.selectFunction')}</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedFunction('edit')
                    setCreativeDescription('')
                    setShowDefaultPrompt(true)
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedFunction === 'edit'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white/70 text-gray-800 hover:bg-white/90 border border-gray-200'
                  }`}
                >
                  ✏️ {t('functionPage.imageEdit')}
                </button>
                <button
                  onClick={() => {
                    setSelectedFunction('analyze')
                    setCreativeDescription('')
                    setShowDefaultPrompt(true)
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedFunction === 'analyze'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/70 text-gray-800 hover:bg-white/90 border border-gray-200'
                  }`}
                >
                  🔍 {t('functionPage.imageAnalysis')}
                </button>
              </div>
            </div>
          </div>

          {/* 上传图片区域 */}
          <div className="mb-4">
            <h3 className="text-gray-900 font-semibold mb-2 drop-shadow-lg text-lg">{t('functionPage.uploadImage')}</h3>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center hover:border-blue-500 transition-colors bg-white/70 min-h-[160px] flex items-center justify-center relative">
              {uploadedImage ? (
                // 显示已上传的图片，铺满整个上传框
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt={t('functionPage.uploadedImage')}
                    className="w-full h-full object-cover"
                  />
                  {/* 右上角删除按钮 */}
                  <Button
                    onClick={() => setUploadedImage(null)}
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white border-red-400 text-red-600 hover:text-red-700 rounded-full shadow-lg"
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
                    <Upload className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-800 text-sm font-semibold mb-2">{t('functionPage.clickToUpload')}</p>
                    <p className="text-gray-600 text-xs font-medium">{t('functionPage.supportedFormats')}</p>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* 参数设置 */}
          <div className="mb-4">
            <h3 className="text-gray-900 font-semibold mb-2 drop-shadow-lg text-lg">{t('functionPage.parameterSettings')}</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-gray-800 text-sm mb-1 font-semibold">
                  {selectedFunction === 'edit' ? t('functionPage.editPrompt') : t('functionPage.analysisPrompt')}
                </label>
                <div className="space-y-2">
                  <textarea
                    value={showDefaultPrompt ? '' : creativeDescription}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') {
                        setShowDefaultPrompt(true)
                        setCreativeDescription('')
                      } else {
                        setShowDefaultPrompt(false)
                        setCreativeDescription(value)
                      }
                    }}
                    onFocus={() => {
                      if (showDefaultPrompt) {
                        setShowDefaultPrompt(false)
                        setCreativeDescription('')
                      }
                    }}
                    className="w-full h-36 p-3 bg-white/80 border-2 border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm font-medium text-base"
                    placeholder={selectedFunction === 'edit' ? 
                      t('functionPage.editPlaceholder') : 
                      t('functionPage.analysisPlaceholder')
                    }
                  />
                  <Button
                    onClick={getRandomDescription}
                    size="sm"
                    variant="outline"
                    className="w-full border-gray-400 text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t('functionPage.random')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 底部操作区域 - 使用flex-grow填充剩余空间 */}
          <div className="mt-auto">
            <div className="bg-orange-500/40 border-2 border-orange-500/60 rounded-lg p-3 mb-3 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-orange-700" />
                <span className="text-orange-900 text-sm font-bold">{t('functionPage.consume15Credits')}</span>
              </div>
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={!uploadedImage || isAnalyzing}
              className={`w-full ${
                uploadedImage && !isAnalyzing
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold shadow-lg' 
                  : 'bg-gray-400 cursor-not-allowed text-white'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {selectedFunction === 'edit' ? t('functionPage.editing') : t('functionPage.analyzing')}
                </>
              ) : uploadedImage ? (
                <>
                  <div className="w-2 h-2 bg-cyan-300 rounded-full mr-2"></div>
                  {selectedFunction === 'edit' ? t('functionPage.startProcessing') : t('functionPage.startProcessing')}
                  <span className="ml-2 bg-emerald-700 px-2 py-1 rounded text-xs">- 15</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {t('functionPage.pleaseUploadImage')}
                </>
              )}
            </Button>
          </div>
        </aside>

        {/* 电脑端主内容区域 - 完全不动 */}
        <main className="hidden lg:flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-7xl">
            {/* 中央内容区域 - 根据状态显示不同内容 */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl py-20 px-0 shadow-2xl -mt-16">
              {isAnalyzing ? (
                // 分析中状态
                <div className="text-center w-full flex items-center justify-center min-h-[600px]">
                  <div>
                    <Loader2 className="w-24 h-24 text-purple-600 mx-auto mb-8 animate-spin drop-shadow-lg" />
                    <h2 className="text-5xl font-bold text-gray-900 mb-6 drop-shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {selectedFunction === 'edit' ? t('functionPage.editingImage') : t('functionPage.analyzingImage')}
                    </h2>
                    <p className="text-2xl text-gray-700 drop-shadow-lg font-semibold">
                      {selectedFunction === 'edit' ? t('functionPage.pleaseWaitEditing') : t('functionPage.pleaseWaitAnalyzing')}
                    </p>
                  </div>
                </div>
              ) : editedImageUrl ? (
                // 显示编辑结果
                <div className="text-center w-full max-w-7xl">
                  <h2 className="text-5xl font-bold text-gray-900 mb-8 drop-shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{t('functionPage.editResults')}</h2>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-0 border-2 border-white/60 shadow-xl">
                    <img
                      src={editedImageUrl}
                      alt={t('functionPage.editedImageAlt')}
                      className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
                    />
                    {/* 下载按钮 - 右下角 */}
                    <Button
                      onClick={() => {
                        // 创建下载链接
                        const link = document.createElement('a');
                        link.href = editedImageUrl;
                        link.download = `edited-image-${Date.now()}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white shadow-lg font-semibold"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('functionPage.downloadImage')}
                    </Button>
                  </div>
                </div>
              ) : analysisResult ? (
                // 显示分析结果
                <div className="text-center w-full max-w-4xl">
                  <h2 className="text-5xl font-bold text-gray-900 mb-8 drop-shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('functionPage.analysisResults')}</h2>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/60 shadow-xl mb-6">
                    <p className="text-xl text-gray-800 leading-relaxed text-left whitespace-pre-wrap font-medium">
                      {analysisResult}
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => {
                        setAnalysisResult('')
                        setError('')
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      {t('common.retry')}
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedFunction('edit')
                        setAnalysisResult('')
                        setError('')
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                    >
                      {t('functionPage.switchToEdit')}
                    </Button>
                  </div>
                </div>
              ) : error ? (
                // 显示错误信息
                <div className="text-center w-full">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <X className="w-12 h-12 text-red-600" />
                  </div>
                  <h2 className="text-5xl font-bold text-red-900 mb-6 drop-shadow-lg">
                    {selectedFunction === 'edit' ? t('functionPage.editFailed') : t('functionPage.analysisFailed')}
                  </h2>
                  <p className="text-2xl text-red-700 drop-shadow-lg mb-6 font-semibold">{error}</p>
                  <Button
                    onClick={() => setError('')}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                  >
                    {t('common.retry')}
                  </Button>
                </div>
              ) : (
                // 默认状态
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
                  <h1 className="text-7xl font-bold text-gray-900 mb-8 drop-shadow-lg bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                    {selectedFunction === 'edit' ? t('functionPage.yourCreativity') : t('functionPage.yourInspiration')}
                  </h1>
                  
                  {/* 副标题 */}
                  <p className="text-4xl text-gray-800 font-bold drop-shadow-lg">
                    {selectedFunction === 'edit' ? t('functionPage.startCreating') : t('functionPage.startUnderstanding')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 移动端完全垂直布局 - 从上到下排布 */}
        <div className="lg:hidden w-full min-h-screen flex flex-col">
          {/* 移动端页面标题 */}
          <div className="text-center py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900 drop-shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t('functionPage.aiImageProcessing')}</h1>
          </div>

          {/* 移动端功能选择器 */}
          <div className="px-4 mb-6">
            <div className="bg-white/40 backdrop-blur-xl border-2 border-gray-300 rounded-2xl p-4 shadow-2xl">
              <h3 className="text-gray-900 font-semibold mb-3 drop-shadow-lg text-lg">{t('functionPage.selectFunction')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setSelectedFunction('edit')
                    setCreativeDescription('')
                    setShowDefaultPrompt(true)
                  }}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedFunction === 'edit'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white/70 text-gray-800 hover:bg-white/90 border border-gray-200'
                  }`}
                >
                  ✏️ {t('functionPage.imageEdit')}
                </button>
                <button
                  onClick={() => {
                    setSelectedFunction('analyze')
                    setCreativeDescription('')
                    setShowDefaultPrompt(true)
                  }}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    selectedFunction === 'analyze'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/70 text-gray-800 hover:bg-white/90 border border-gray-200'
                  }`}
                >
                  🔍 {t('functionPage.imageAnalysis')}
                </button>
              </div>
            </div>
          </div>

          {/* 移动端上传图片区域 */}
          <div className="px-4 mb-6">
            <div className="bg-white/40 backdrop-blur-xl border-2 border-gray-300 rounded-2xl p-4 shadow-2xl">
              <h3 className="text-gray-900 font-semibold mb-3 drop-shadow-lg text-lg">{t('functionPage.uploadImage')}</h3>
              <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center hover:border-blue-500 transition-colors bg-white/70 min-h-[160px] flex items-center justify-center relative">
                {uploadedImage ? (
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt={t('functionPage.uploadedImage')}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      onClick={() => setUploadedImage(null)}
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/90 hover:bg-white border-red-400 text-red-600 hover:text-red-700 rounded-full shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="image-upload-mobile"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image-upload-mobile" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-800 text-sm font-semibold mb-2">{t('functionPage.clickToUpload')}</p>
                      <p className="text-gray-600 text-xs font-medium">{t('functionPage.supportedFormats')}</p>
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 移动端参数设置 */}
          <div className="px-4 mb-6">
            <div className="bg-white/40 backdrop-blur-xl border-2 border-gray-300 rounded-2xl p-4 shadow-2xl">
              <h3 className="text-gray-900 font-semibold mb-3 drop-shadow-lg text-lg">{t('functionPage.parameterSettings')}</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-800 text-sm mb-2 font-semibold">
                    {selectedFunction === 'edit' ? t('functionPage.editPrompt') : t('functionPage.analysisPrompt')}
                  </label>
                  <div className="space-y-3">
                    <textarea
                      value={showDefaultPrompt ? '' : creativeDescription}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '') {
                          setShowDefaultPrompt(true)
                          setCreativeDescription('')
                        } else {
                          setShowDefaultPrompt(false)
                          setCreativeDescription(value)
                        }
                      }}
                      onFocus={() => {
                        if (showDefaultPrompt) {
                          setShowDefaultPrompt(false)
                          setCreativeDescription('')
                        }
                      }}
                      className="w-full h-32 p-3 bg-white/80 border-2 border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm font-medium text-base"
                      placeholder={selectedFunction === 'edit' ? 
                        t('functionPage.editPlaceholder') : 
                        t('functionPage.analysisPlaceholder')
                      }
                    />
                    <Button
                      onClick={getRandomDescription}
                      size="sm"
                      variant="outline"
                      className="w-full border-gray-400 text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {t('functionPage.random')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 移动端开始按钮 */}
          <div className="px-4 mb-6">
            <div className="bg-white/40 backdrop-blur-xl border-2 border-gray-300 rounded-2xl p-4 shadow-2xl">
              <div className="bg-orange-500/40 border-2 border-orange-500/60 rounded-lg p-3 mb-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-orange-700" />
                  <span className="text-orange-900 text-sm font-bold">{t('functionPage.consume15Credits')}</span>
                </div>
              </div>
              
              <Button
                onClick={handleGenerate}
                disabled={!uploadedImage || isAnalyzing}
                className={`w-full ${
                  uploadedImage && !isAnalyzing
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold shadow-lg' 
                    : 'bg-gray-400 cursor-not-allowed text-white'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {selectedFunction === 'edit' ? t('functionPage.editing') : t('functionPage.analyzing')}
                  </>
                ) : uploadedImage ? (
                  <>
                    <div className="w-2 h-2 bg-cyan-300 rounded-full mr-2"></div>
                    {selectedFunction === 'edit' ? t('functionPage.startProcessing') : t('functionPage.startProcessing')}
                    <span className="ml-2 bg-emerald-700 px-2 py-1 rounded text-xs">- 15</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    {t('functionPage.pleaseUploadImage')}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 移动端结果显示区域 - 占据剩余空间 */}
          <div className="flex-1 px-4 pb-6">
            {isAnalyzing ? (
              // 移动端分析中状态
              <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl py-12 px-6 shadow-2xl text-center h-full flex items-center justify-center">
                <div>
                  <Loader2 className="w-16 h-16 text-purple-600 mx-auto mb-6 animate-spin drop-shadow-lg" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {selectedFunction === 'edit' ? t('functionPage.editingImage') : t('functionPage.analyzingImage')}
                  </h2>
                  <p className="text-lg text-gray-700 drop-shadow-lg font-semibold">
                    {selectedFunction === 'edit' ? t('functionPage.pleaseWaitEditing') : t('functionPage.pleaseWaitAnalyzing')}
                  </p>
                </div>
              </div>
            ) : editedImageUrl ? (
              // 移动端显示编辑结果
              <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl py-8 px-6 shadow-2xl text-center h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 drop-shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{t('functionPage.editResults')}</h2>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-0 border-2 border-white/60 shadow-xl mb-4">
                  <img
                    src={editedImageUrl}
                    alt={t('functionPage.editedImageAlt')}
                    className="w-full h-auto max-h-[50vh] object-contain rounded-2xl"
                  />
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = editedImageUrl;
                      link.download = `edited-image-${Date.now()}.png`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="absolute bottom-3 right-3 bg-green-600 hover:bg-green-700 text-white shadow-lg font-semibold"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('functionPage.downloadImage')}
                  </Button>
                </div>
              </div>
            ) : analysisResult ? (
              // 移动端显示分析结果
              <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl py-8 px-6 shadow-2xl text-center h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 drop-shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('functionPage.analysisResults')}</h2>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/60 shadow-xl mb-4 flex-1 overflow-y-auto">
                  <p className="text-base text-gray-800 leading-relaxed text-left whitespace-pre-wrap font-medium">
                    {analysisResult}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => {
                      setAnalysisResult('')
                      setError('')
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    {t('common.retry')}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedFunction('edit')
                      setAnalysisResult('')
                      setError('')
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                  >
                    {t('functionPage.switchToEdit')}
                  </Button>
                </div>
              </div>
            ) : error ? (
              // 移动端显示错误信息
              <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl py-8 px-6 shadow-2xl text-center h-full flex flex-col justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-red-900 mb-4 drop-shadow-lg">
                  {selectedFunction === 'edit' ? t('functionPage.editFailed') : t('functionPage.analysisFailed')}
                </h2>
                <p className="text-lg text-red-700 drop-shadow-lg mb-6 font-semibold">{error}</p>
                <Button
                  onClick={() => setError('')}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  {t('common.retry')}
                </Button>
              </div>
            ) : (
              // 移动端默认状态
              <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl py-8 px-6 shadow-2xl text-center h-full flex flex-col justify-center">
                <div className="w-48 h-48 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center relative mx-auto mb-8">
                  <div className="text-center">
                    <Gift className="w-12 h-12 text-purple-600 mx-auto mb-3 drop-shadow-lg" />
                    <div className="w-8 h-3 bg-orange-500 rounded-full mx-auto shadow-lg"></div>
                  </div>
                  
                  <div className="absolute inset-0 animate-spin">
                    <div className="absolute top-3 left-1/2 w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/70"></div>
                  </div>
                  <div className="absolute inset-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
                    <div className="absolute bottom-3 left-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-lg shadow-pink-500/70"></div>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-6 drop-shadow-lg bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  {selectedFunction === 'edit' ? t('functionPage.yourCreativity') : t('functionPage.yourInspiration')}
                </h1>
                
                <p className="text-2xl text-gray-800 font-bold drop-shadow-lg">
                  {selectedFunction === 'edit' ? t('functionPage.startCreating') : t('functionPage.startUnderstanding')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Play, RotateCcw } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import PromptButton from '@/components/PromptButton'

export default function ImageEditor() {
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [editedImage, setEditedImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [showComparison, setShowComparison] = useState(false)

  const promptButtons = [
    {
      title: 'Quick Outfit Change',
      prompt: 'Change the t-shirt to a blue hoodie',
      beforeImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      afterImage: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Quick Remove',
      prompt: 'Remove the background from the image',
      beforeImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      afterImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Quick Transform',
      prompt: 'Change the scene to futuristic tech style',
      beforeImage: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=400',
      afterImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Quick Season Change',
      prompt: 'Change summer scene to winter snow scene',
      beforeImage: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=400',
      afterImage: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const handlePromptClick = (promptText: string) => {
    setPrompt(promptText)
  }

  const handleExecute = async () => {
    if (!uploadedImage || !prompt) return

    setIsLoading(true)
    setShowComparison(false)

    try {
      // Simulate API call
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
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Image Upload and Display */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              上传图片
            </h3>
            
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
                    <p>AI is processing...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Before/After Comparison */}
            {showComparison && editedImage && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Edit Result</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="text-xs"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Original</p>
                    <img
                      src={uploadedImage}
                      alt="Original image"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Edited</p>
                    <img
                      src={editedImage}
                      alt="Edited image"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Controls */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose Edit Command
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {promptButtons.map((button, index) => (
                  <PromptButton
                    key={index}
                    title={button.title}
                    onClick={() => handlePromptClick(button.prompt)}
                    isSelected={prompt === button.prompt}
                    beforeImage={button.beforeImage}
                    afterImage={button.afterImage}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label htmlFor="custom-prompt" className="text-sm font-medium text-gray-700">
                Or enter custom instruction
              </label>
              <Input
                id="custom-prompt"
                type="text"
                placeholder="Describe the editing effect you want..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleExecute}
              disabled={!uploadedImage || !prompt || isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Execute Edit
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
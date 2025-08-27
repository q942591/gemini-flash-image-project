'use client'

import { useRef } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  uploadedImage: string
  setUploadedImage: (image: string) => void
  isLoading: boolean
}

export default function ImageUpload({
  uploadedImage,
  setUploadedImage,
  isLoading
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select image file"
      />

      {uploadedImage ? (
        <div className="relative">
          <img
            src={uploadedImage}
            alt="上传的图片"
            className="w-full h-64 object-cover rounded-lg"
          />
          {!isLoading && (
            <Button
              variant="secondary"
              size="sm"
              onClick={triggerFileInput}
              className="absolute top-2 right-2"
            >
              Change Image
            </Button>
          )}
        </div>
      ) : (
        <div
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          role="button"
          tabIndex={0}
          aria-label="Image upload area"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              triggerFileInput()
            }
          }}
        >
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Click or drag to upload image
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, GIF formats
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
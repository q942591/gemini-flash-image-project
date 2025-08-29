'use client'

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion"

const IMAGES = [
  "/人口结构变化.png",
  "/学校科技节.png",
  "/白板上手写.png",
  "/白板白板.png",
  "/简笔画太阳系.png",
  "/AI草图.png",
  "/绘画图.png",
  "/情绪板.png",
  "/教室.png",
]

const RollingGallery = ({ autoplay = true, pauseOnHover = true }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false)

  useEffect(() => {
    setIsScreenSizeSm(window.innerWidth <= 640)
  }, [])

  const containerWidth = isScreenSizeSm ? 800 : 1200
  const imageWidth = 300
  const imageHeight = 220
  const spacing = 30

  const controls = useAnimation()
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const scrollX = useMotionValue(-(imageWidth + spacing) * 3.5)
  const initialPosition = -(imageWidth + spacing) * 3.5

  // 确保初始位置正确
  useEffect(() => {
    controls.set({ x: initialPosition })
  }, [controls, initialPosition])

  const handleDrag = (_: any, info: any) => {
    scrollX.set(scrollX.get() + info.offset.x)
  }

  const handleDragEnd = (_: any, info: any) => {
    const targetX = scrollX.get() + info.velocity.x * 0.1
    const maxScroll = -(IMAGES.length * (imageWidth + spacing) - containerWidth)
    
    controls.start({
      x: Math.max(maxScroll, Math.min(0, targetX)),
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1, ease: "easeOut" },
    })
  }

         useEffect(() => {
         if (autoplay) {
           autoplayRef.current = setInterval(() => {
             const currentX = scrollX.get()
             const maxScroll = -(IMAGES.length * (imageWidth + spacing) - containerWidth)
             const nextX = currentX - (imageWidth + spacing)
             
                      if (nextX <= maxScroll) {
               // 回到中心位置（第4、5张图片）
               const centerPosition = -(imageWidth + spacing) * 3.5
               controls.start({ x: centerPosition, transition: { duration: 1, ease: "easeInOut" } })
               scrollX.set(centerPosition)
             } else {
               controls.start({ x: nextX, transition: { duration: 2, ease: "linear" } })
               scrollX.set(nextX)
             }
           }, 3000)

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current)
        }
      }
    }
  }, [autoplay, scrollX, controls, containerWidth])

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
      controls.stop()
    }
  }

         const handleMouseLeave = () => {
         if (autoplay && pauseOnHover) {
           // 重新开始自动播放
           autoplayRef.current = setInterval(() => {
             const currentX = scrollX.get()
             const maxScroll = -(IMAGES.length * (imageWidth + spacing) - containerWidth)
             const nextX = currentX - (imageWidth + spacing)
             
                      if (nextX <= maxScroll) {
               // 回到中心位置（第4、5张图片）
               const centerPosition = -(imageWidth + spacing) * 3.5
               controls.start({ x: centerPosition, transition: { duration: 1, ease: "easeInOut" } })
               scrollX.set(centerPosition)
             } else {
               controls.start({ x: nextX, transition: { duration: 2, ease: "linear" } })
               scrollX.set(nextX)
             }
           }, 3000)
         }
       }

  return (
    <div className="relative w-full overflow-hidden">
      {/* 平面3D透视滚动内容 */}
      <div className="flex justify-center items-center py-20">
        <div className="relative" style={{ width: containerWidth, height: imageHeight + 100 }}>
          <motion.div
            drag="x"
            className="flex space-x-8"
            style={{ x: scrollX }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            dragConstraints={{ left: -(IMAGES.length * (imageWidth + spacing) - containerWidth), right: 0 }}
            dragElastic={0.1}
          >
            {IMAGES.map((url, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: imageWidth,
                  height: imageHeight,
                  transform: `perspective(1200px) rotateY(${i < 4 ? -Math.min(35, (4 - i) * 15) : i === 4 || i === 5 ? 0 : i > 5 ? Math.min(35, (i - 5) * 15) : 0}deg) rotateX(${Math.cos(i * 0.3) * 5}deg) translateZ(${i < 4 || i > 5 ? 40 : 0}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div 
                  className="w-full h-full rounded-2xl border border-white/30 shadow-2xl hover:scale-110 transition-all duration-500 overflow-hidden"
                  style={{
                    boxShadow: `
                      0 20px 40px rgba(0,0,0,0.3),
                      0 8px 16px rgba(0,0,0,0.2),
                      inset 0 1px 0 rgba(255,255,255,0.1)
                    `,
                    transform: `translateZ(${Math.abs(Math.sin(i * 0.5)) * 15}px)`,
                  }}
                >
                  <img 
                    src={url} 
                    alt={`Gallery image ${i + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RollingGallery

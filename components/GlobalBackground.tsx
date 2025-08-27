'use client'

import Prism from '@/components/Prism'

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Prism 
        height={4}
        baseWidth={6}
        animationType="3drotate"
        glow={1.2}
        noise={0.0}
        transparent={true}
        scale={4}
        hueShift={0.1}
        colorFrequency={1.5}
        timeScale={0.8}
        bloom={1.1}
      />
    </div>
  )
}

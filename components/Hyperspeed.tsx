'use client';

import { useEffect, useRef, useState } from 'react';

interface HyperspeedProps {
  effectOptions: {
    onSpeedUp: () => void;
    onSlowDown: () => void;
    distortion: string;
    length: number;
    roadWidth: number;
    islandWidth: number;
    lanesPerRoad: number;
    fov: number;
    fovSpeedUp: number;
    speedUp: number;
    carLightsFade: number;
    totalSideLightSticks: number;
    lightPairsPerRoadWay: number;
    shoulderLinesWidthPercentage: number;
    brokenLinesWidthPercentage: number;
    brokenLinesLengthPercentage: number;
    lightStickWidth: [number, number];
    lightStickHeight: [number, number];
    movingAwaySpeed: [number, number];
    movingCloserSpeed: [number, number];
    carLightsLength: [number, number];
    carLightsRadius: [number, number];
    carWidthPercentage: [number, number];
    carShiftX: [number, number];
    carFloorSeparation: [number, number];
    colors: {
      roadColor: number;
      islandColor: number;
      background: number;
      shoulderLines: number;
      brokenLines: number;
      leftCars: number[];
      rightCars: number[];
      sticks: number;
    };
  };
}

export default function Hyperspeed({ effectOptions }: HyperspeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 动画循环
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016; // 60fps
      
      // 清空画布
      ctx.fillStyle = `#${effectOptions.colors.background.toString(16).padStart(6, '0')}`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制道路效果
      const centerX = canvas.width / 2;
      const roadWidth = canvas.width * (effectOptions.roadWidth / 100);
      
      // 绘制主道路
      ctx.fillStyle = `#${effectOptions.colors.roadColor.toString(16).padStart(6, '0')}`;
      ctx.fillRect(centerX - roadWidth / 2, 0, roadWidth, canvas.height);

      // 绘制道路分隔线
      ctx.strokeStyle = `#${effectOptions.colors.brokenLines.toString(16).padStart(6, '0')}`;
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, canvas.height);
      ctx.stroke();

      // 绘制动态光效
      const lightStickCount = effectOptions.totalSideLightSticks;
      for (let i = 0; i < lightStickCount; i++) {
        const y = (canvas.height / lightStickCount) * i + (time * 50) % (canvas.height / lightStickCount);
        const alpha = Math.sin(time + i * 0.5) * 0.5 + 0.5;
        
        // 左侧光条
        ctx.fillStyle = `rgba(3, 179, 195, ${alpha * 0.6})`;
        ctx.fillRect(centerX - roadWidth / 2 - 20, y, 15, 3);
        
        // 右侧光条
        ctx.fillRect(centerX + roadWidth / 2 + 5, y, 15, 3);
      }

      // 绘制移动的车辆光点
      const carCount = 8;
      for (let i = 0; i < carCount; i++) {
        const lane = i % effectOptions.lanesPerRoad;
        const isLeft = i < carCount / 2;
        const laneWidth = roadWidth / effectOptions.lanesPerRoad;
        const x = centerX + (isLeft ? -roadWidth / 2 : roadWidth / 2) + 
                  (lane + 0.5) * (isLeft ? -laneWidth : laneWidth);
        const y = (time * (30 + i * 10)) % canvas.height;
        
        ctx.fillStyle = isLeft ? 
          `#${effectOptions.colors.leftCars[i % effectOptions.colors.leftCars.length].toString(16).padStart(6, '0')}` :
          `#${effectOptions.colors.rightCars[i % effectOptions.colors.rightCars.length].toString(16).padStart(6, '0')}`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [effectOptions, isClient]);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-black" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

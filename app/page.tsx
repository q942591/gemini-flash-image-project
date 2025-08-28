import HeroSection from '@/components/HeroSection'
import FunctionPage from '@/components/FunctionPage'

// 强制动态渲染，防止服务器端静态生成
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FunctionPage />
    </main>
  )
}
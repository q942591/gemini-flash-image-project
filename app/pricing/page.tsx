'use client'

import GlobalBackground from '@/components/GlobalBackground'
import { CREDIT_PLANS } from '@/config/credit-plans'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import PaymentModal from '@/components/PaymentModal'
import { CreditPlan } from '@/types/payment'

export default function Pricing() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<CreditPlan | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  // 调试信息
  console.log('Pricing组件渲染，用户状态:', {
    hasUser: !!user,
    userId: user?.id,
    userEmail: user?.email,
    userMetadata: user?.user_metadata
  })

  // 检查组件是否正确挂载
  useEffect(() => {
    console.log('Pricing组件已挂载')
    console.log('用户状态:', user)
    
    // 测试基本功能
    const testBasicFunctionality = () => {
      console.log('测试基本功能...')
      try {
        // 测试状态更新
        setLoadingPlan('test')
        setTimeout(() => {
          setLoadingPlan(null)
          console.log('状态更新测试完成')
        }, 1000)
        
        // 测试按钮点击
        console.log('测试按钮事件绑定...')
        const testButton = document.createElement('button')
        testButton.textContent = '测试按钮'
        testButton.onclick = () => console.log('测试按钮点击成功')
        testButton.click()
        console.log('按钮事件测试完成')
        
      } catch (error) {
        console.error('基本功能测试失败:', error)
      }
    }
    
    testBasicFunctionality()
  }, [user])

  // 添加全局错误处理
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('全局JavaScript错误:', event.error)
    }
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('未处理的Promise拒绝:', event.reason)
    }
    
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  const handlePurchase = async (planId: string) => {
    if (!user) {
      toast({
        title: "请先登录",
        description: "购买积分前需要先登录您的账户",
        variant: "destructive",
      })
      router.push('/login')
      return
    }

    console.log('开始购买流程，套餐ID:', planId)
    setLoadingPlan(planId)
    
    try {
      console.log('正在创建支付意图...')
      // 创建支付意图
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          planId,
          userId: user.id  // 传递用户ID
        }),
      })

      console.log('API响应状态:', response.status)
      console.log('API响应头:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API错误响应:', errorText)
        throw new Error(`Failed to create payment intent: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log('API响应数据:', data)
      
      // 设置支付弹窗数据
      const planWithUserId = {
        ...data.plan,
        userId: user.id  // 添加用户ID到plan对象
      }
      setSelectedPlan(planWithUserId)
      setClientSecret(data.clientSecret)
      setShowPaymentModal(true)
      console.log('支付弹窗已打开，计划:', planWithUserId, '密钥:', data.clientSecret ? '已设置' : '未设置')
      
    } catch (error) {
      console.error('购买错误:', error)
      toast({
        title: "购买失败",
        description: "创建支付时出现错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setLoadingPlan(null)
    }
  }

  const handlePaymentSuccess = (credits: number) => {
    toast({
      title: "购买成功！",
      description: `已成功获得 ${credits} 积分`,
    })
    
    // 支付成功后，积分信息会在个人空间页面自动刷新
    // 这里可以添加其他处理逻辑，比如更新全局状态等
    console.log(`用户成功购买 ${credits} 积分`)
  }

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false)
    setSelectedPlan(null)
    setClientSecret(null)
  }

  return (
    <>
      <GlobalBackground />
      <main className="min-h-screen pt-16">
        <section className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                定价方案
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto drop-shadow-lg">
                选择最适合您需求的AI图像编辑方案
              </p>
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 inline-block">
                <p className="text-white/90 text-lg">
                  <span className="text-yellow-300 font-semibold">每次处理消耗15积分</span>
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {CREDIT_PLANS.map((plan) => (
                <div 
                  key={plan.id}
                  className={`${
                    plan.popular 
                      ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-300/30' 
                      : 'bg-white/10 border-white/20'
                  } backdrop-blur-md rounded-2xl p-6 border hover:scale-105 transition-all duration-300 relative`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        推荐
                      </span>
                    </div>
                  )}
                  
                  <h3 className={`text-xl font-bold mb-4 ${
                    plan.id === 'basic' ? 'text-blue-300' :
                    plan.id === 'standard' ? 'text-purple-300' :
                    plan.id === 'professional' ? 'text-purple-300' :
                    'text-red-300'
                  }`}>
                    {plan.name}
                  </h3>
                  
                  <div className="text-3xl font-bold text-green-300 mb-2">
                    ${plan.price}
                  </div>
                  
                  <div className="text-lg text-yellow-300 mb-4 font-semibold">
                    {plan.credits}积分
                  </div>
                  
                  <div className="text-sm text-white/60 mb-6">
                    约{plan.estimatedEdits}次AI编辑
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.description.split('，').map((feature, index) => (
                      <li key={index} className="flex items-center text-white/80 text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => {
                      console.log('按钮被点击了！套餐ID:', plan.id)
                      handlePurchase(plan.id)
                    }}
                    disabled={loadingPlan === plan.id}
                    className={`w-full py-3 rounded-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                        : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                    }`}
                  >
                    {loadingPlan === plan.id ? '处理中...' : '立即购买'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 支付弹窗 */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handleClosePaymentModal}
        plan={selectedPlan}
        clientSecret={clientSecret}
        onSuccess={handlePaymentSuccess}
      />
    </>
  )
}

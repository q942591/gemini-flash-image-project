'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Calendar, LogOut, Coins, CreditCard, TrendingUp, ArrowRight } from 'lucide-react'
import LightRays from '@/components/LightRays'
import { supabase } from '@/lib/supabase'

// 积分信息接口
interface CreditInfo {
  current_credits: number
  total_earned: number
  total_consumed: number
}

// 积分交易记录接口
interface CreditTransaction {
  id: string
  amount: number
  type: string
  description: string
  created_at: string
  metadata?: any
}

export default function ProfilePage() {
  const { user, session, signOut, loading: authLoading } = useAuth()
  const router = useRouter()
  const [creditInfo, setCreditInfo] = useState<CreditInfo>({
    current_credits: 0,
    total_earned: 0,
    total_consumed: 0
  })
  const [transactions, setTransactions] = useState<CreditTransaction[]>([])
  const [loading, setLoading] = useState(true)

  // 如果认证还在加载中，显示加载状态
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">正在加载...</p>
        </div>
      </div>
    )
  }

  // 如果用户未认证，显示重定向状态
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">正在跳转到登录页面...</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    // 用户已认证，直接获取积分信息
    if (user) {
      fetchUserCredits()
    }
  }, [user])

  // 获取用户积分信息
  const fetchUserCredits = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // 获取用户积分余额
      const { data: creditData, error: creditError } = await supabase
        .from('gemini_flash_user_credits')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (creditError && creditError.code !== 'PGRST116') {
        console.error('获取积分信息失败:', creditError)
      }

      // 获取积分交易记录
      const { data: transactionData, error: transactionError } = await supabase
        .from('gemini_flash_credit_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (transactionError) {
        console.error('获取交易记录失败:', transactionError)
      }

      // 计算积分统计
      let currentCredits = 0
      let totalEarned = 0
      let totalConsumed = 0

      if (creditData) {
        currentCredits = creditData.balance || 0  // 使用balance字段
      }

      if (transactionData) {
        transactionData.forEach(transaction => {
          if (transaction.amount > 0) {
            totalEarned += transaction.amount
          } else {
            totalConsumed += Math.abs(transaction.amount)
          }
        })
      }

      setCreditInfo({
        current_credits: currentCredits,
        total_earned: totalEarned,
        total_consumed: totalConsumed
      })

      setTransactions(transactionData || [])

      // 检查是否是新用户（没有积分记录）
      console.log('检查新用户状态:')
      console.log('- 积分记录:', creditData)
      console.log('- 交易记录数量:', transactionData?.length || 0)
      
      if (!creditData && transactionData?.length === 0) {
        console.log('检测到新用户，自动赠送50积分...')
        await giveWelcomeCredits()
        
        // 强制重新获取数据
        setTimeout(async () => {
          console.log('强制重新获取积分数据...')
          await fetchUserCredits()
        }, 1000)
      } else if (creditData) {
        console.log('用户已有积分记录，无需赠送')
      } else {
        console.log('用户有交易记录但无积分记录，可能是数据不一致')
      }

    } catch (error) {
      console.error('获取用户积分信息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 给新用户赠送欢迎积分
  const giveWelcomeCredits = async () => {
    if (!user) {
      console.log('用户未登录，无法赠送积分')
      return
    }

    try {
      console.log('正在给新用户赠送50积分...')
      console.log('用户ID:', user.id)
      
      // 直接创建用户积分记录
      const { data: creditData, error: creditError } = await supabase
        .from('gemini_flash_user_credits')
        .insert({
          user_id: user.id,
          balance: 50,  // 使用balance字段
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()

      if (creditError) {
        console.error('创建积分记录失败:', creditError)
        return
      }

      console.log('积分记录创建成功:', creditData)

      // 创建积分交易记录
      const { data: transactionData, error: transactionError } = await supabase
        .from('gemini_flash_credit_transactions')
        .insert({
          user_id: user.id,
          amount: 50,
          type: 'WELCOME_BONUS',
          description: '新用户欢迎奖励',
          reference_id: 'welcome_bonus',
          metadata: { 
            type: 'welcome_bonus',
            amount: 50,
            message: '欢迎使用Gemini Flash Image！'
          },
          created_at: new Date().toISOString()
        })
        .select()

      if (transactionError) {
        console.error('创建交易记录失败:', transactionError)
        return
      }

      console.log('交易记录创建成功:', transactionData)
      console.log('成功赠送50积分！')
      
      // 刷新积分信息
      await fetchUserCredits()
      
    } catch (error) {
      console.error('赠送积分过程中出错:', error)
    }
  }

  // 格式化数字，添加千分位分隔符
  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN')
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  // 获取用户显示名称
  const getUserDisplayName = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user.user_metadata?.name) {
      return user.user_metadata.name
    }
    if (user.email) {
      return user.email.split('@')[0]
    }
    return '用户'
  }

  // 获取用户头像
  const getUserAvatar = () => {
    if (user.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url
    }
    if (user.user_metadata?.picture) {
      return user.user_metadata.picture
    }
    return null
  }

  const displayName = getUserDisplayName()
  const avatarUrl = getUserAvatar()

  return (
    <div className="min-h-screen bg-white relative">
      {/* LightRays背景 */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#F5F527"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.5}
          pulsating={true}
          fadeDistance={0.8}
          saturation={1.2}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      {/* 页面内容 */}
      <div className="relative z-10">
        {/* 个人空间标题 - 最上面 */}
        <div className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              个人空间
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              管理您的账户信息、积分状态和个性化设置
            </p>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
              
              {/* 用户资料卡片 */}
              <Card className="bg-white shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    {/* 用户头像 */}
                    {avatarUrl ? (
                      <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl">
                        <img 
                          src={avatarUrl} 
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-5xl font-bold text-white">
                          {displayName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    {/* 用户信息 */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                          {displayName}
                        </h2>
                        
                        {/* 购买积分按钮 */}
                        <Button 
                          onClick={() => router.push('/pricing')}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 px-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          购买积分
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                      
                      <p className="text-lg text-gray-600 mb-6">
                        欢迎来到您的个人空间
                      </p>
                      
                      {/* 用户统计信息 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-purple-500" />
                            <div className="text-left">
                              <p className="text-sm text-gray-500">邮箱地址</p>
                              <p className="font-medium text-gray-900 text-sm">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <div className="text-left">
                              <p className="text-sm text-gray-500">注册时间</p>
                              <p className="font-medium text-gray-900 text-sm">
                                {user.created_at ? new Date(user.created_at).toLocaleDateString('zh-CN') : '未知'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-green-500" />
                            <div className="text-left">
                              <p className="text-sm text-gray-500">用户ID</p>
                              <p className="font-medium text-gray-900 text-xs font-mono">{user.id}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 累计消费卡片 */}
              <Card className="bg-white shadow-xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                      <Coins className="w-6 h-6 text-white" />
                    </div>
                    累计消费
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    查看您的积分消费记录和使用情况
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6 space-y-8">
                  {/* 消费概览 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 当前积分 */}
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90 mb-1">当前积分</p>
                          <p className="text-4xl font-bold">{formatNumber(creditInfo.current_credits)}</p>
                          <p className="text-xs opacity-80 mt-1">可用余额</p>
                        </div>
                        <Coins className="w-16 h-16 opacity-80" />
                      </div>
                    </div>

                    {/* 累计获得 */}
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90 mb-1">累计获得</p>
                          <p className="text-4xl font-bold">{formatNumber(creditInfo.total_earned)}</p>
                          <p className="text-xs opacity-80 mt-1">总获得积分</p>
                        </div>
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">📈</span>
                        </div>
                      </div>
                    </div>

                    {/* 累计消耗 */}
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90 mb-1">累计消耗</p>
                          <p className="text-4xl font-bold">{formatNumber(creditInfo.total_consumed)}</p>
                          <p className="text-xs opacity-80 mt-1">总消耗积分</p>
                        </div>
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">📉</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 积分历史记录 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
                        积分历史记录
                      </h3>
                      <Button
                        onClick={fetchUserCredits}
                        disabled={loading}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        {loading ? '刷新中...' : '刷新'}
                      </Button>
                    </div>
                    <div className="max-h-96 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                      {loading ? (
                        <p className="text-center py-8">加载中...</p>
                      ) : transactions.length === 0 ? (
                        <p className="text-center py-8">暂无积分交易记录。</p>
                      ) : (
                        transactions.map(transaction => (
                          <div key={transaction.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm">🖼️</span>
                                </div>
                                <div>
                                  <span className="text-gray-700 font-medium">{transaction.description}</span>
                                  <p className="text-xs text-gray-500">
                                    {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString('zh-CN') : '未知时间'}
                                  </p>
                                </div>
                              </div>
                              <span className={`font-bold ${
                                transaction.amount > 0 ? 'text-purple-600' : 'text-red-600'
                              } text-lg`}>
                                {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

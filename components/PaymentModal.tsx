'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { CreditPlan } from '@/types/payment'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

// 加载Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: CreditPlan | null
  clientSecret: string | null
  onSuccess: (credits: number) => void
}

// 支付表单组件
function CheckoutForm({ plan, clientSecret, onSuccess, onClose }: {
  plan: CreditPlan
  clientSecret: string
  onSuccess: (credits: number) => void
  onClose: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    if (!user) {
      toast({
        title: "用户未登录",
        description: "请先登录后再进行支付",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // 确认支付
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      )

      if (stripeError) {
        toast({
          title: "支付失败",
          description: stripeError.message || "支付过程中出现错误",
          variant: "destructive",
        })
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        // 确认支付成功，添加积分
        const confirmResponse = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            paymentIntentId: paymentIntent.id,
            userId: user.id  // 使用AuthContext中的用户ID
          }),
        })

        if (confirmResponse.ok) {
          const confirmData = await confirmResponse.json()
          toast({
            title: "支付成功！",
            description: `已成功购买 ${plan.credits} 积分`,
          })
          
          // 支付成功后跳转到个人空间页面
          setTimeout(() => {
            router.push('/profile')
          }, 1500) // 1.5秒后跳转，让用户看到成功提示
          
          onSuccess(confirmData.credits)
          onClose()
        } else {
          throw new Error('Failed to confirm payment')
        }
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: "支付确认失败",
        description: "支付成功但积分添加失败，请联系客服",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">订单详情</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>套餐：{plan.name}</div>
            <div>积分：{plan.credits}</div>
            <div>价格：${plan.price}</div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            信用卡信息
          </label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          取消
        </Button>
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isLoading ? '处理中...' : `支付 $${plan.price}`}
        </Button>
      </div>
    </form>
  )
}

export default function PaymentModal({
  isOpen,
  onClose,
  plan,
  clientSecret,
  onSuccess,
}: PaymentModalProps) {
  console.log('PaymentModal渲染:', { isOpen, plan: plan?.name, hasClientSecret: !!clientSecret })
  
  if (!plan || !clientSecret) {
    console.log('PaymentModal条件不满足，返回null')
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>购买积分 - {plan.name}</DialogTitle>
        </DialogHeader>
        
        <Elements stripe={stripePromise}>
          <CheckoutForm
            plan={plan}
            clientSecret={clientSecret}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  )
}

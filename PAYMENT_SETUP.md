# 支付功能设置说明

## 🚀 功能概述

本项目已集成Stripe支付系统，支持用户购买积分套餐。包含以下功能：

- 4个积分套餐：基础版、标准版、专业版、企业版
- Stripe支付集成
- 支付状态跟踪
- 积分自动添加
- Webhook处理

## 📋 套餐详情

| 套餐 | 价格 | 积分 | 预计AI编辑次数 | 特色功能 |
|------|------|------|----------------|----------|
| 基础版 | $1.99 | 160 | 10次 | 标准分辨率输出，基础模板使用，邮件支持 |
| 标准版 | $5.99 | 550 | 36次 | 高清分辨率输出，所有基础模板，优先客服支持 |
| 专业版 | $19.99 | 2700 | 180次 | 4K超高清输出，所有高级模板，批量处理功能，专属客服支持 |
| 企业版 | $49.9 | 9000 | 600次 | 8K超高清输出，团队协作功能，API接口访问，专属客户经理 |

## 🔧 环境变量配置

在 `.env.local` 文件中添加以下配置：

```bash
# Stripe配置
STRIPE_SECRET_KEY=sk_test_... # 从Stripe Dashboard获取
STRIPE_PUBLISHABLE_KEY=pk_test_... # 从Stripe Dashboard获取
STRIPE_WEBHOOK_SECRET=whsec_... # 从Stripe Dashboard获取

# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🗄️ 数据库设置

### 1. 执行SQL脚本

在Supabase SQL编辑器中执行 `database-schema.sql` 文件中的SQL语句，创建必要的表和函数。

### 2. 表结构说明

- `stripe_payment_intents`: 存储Stripe支付意图
- `user_credits`: 用户积分余额
- `credit_transactions`: 积分交易记录

## 🔗 Stripe设置

### 1. 创建Stripe账户

1. 访问 [Stripe官网](https://stripe.com) 注册账户
2. 完成账户验证

### 2. 获取API密钥

1. 登录Stripe Dashboard
2. 进入"开发者" > "API密钥"
3. 复制"可发布密钥"和"密钥"

### 3. 设置Webhook

1. 进入"开发者" > "Webhook"
2. 添加端点：`https://yourdomain.com/api/webhooks/stripe`
3. 选择事件：`payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.canceled`
4. 复制Webhook签名密钥

### 4. 创建价格产品

在Stripe Dashboard中为每个套餐创建价格产品，并更新 `config/credit-plans.ts` 中的 `stripe_price_id`。

## 🎯 使用流程

### 用户购买流程

1. 用户选择套餐并点击"立即购买"
2. 系统创建支付意图
3. 打开支付弹窗，用户输入信用卡信息
4. 用户确认支付
5. Stripe处理支付
6. 支付成功后自动添加积分到用户账户

### 支付状态跟踪

- `requires_payment_method`: 等待支付方式
- `requires_confirmation`: 等待确认
- `requires_action`: 需要额外操作
- `processing`: 处理中
- `requires_capture`: 等待捕获
- `canceled`: 已取消
- `succeeded`: 支付成功

## 🛠️ 开发说明

### 文件结构

```
├── types/payment.ts              # 支付类型定义
├── config/credit-plans.ts        # 套餐配置
├── lib/stripe.ts                 # Stripe服务
├── components/PaymentModal.tsx   # 支付弹窗组件
├── app/api/payments/            # 支付API
│   ├── create-payment-intent/   # 创建支付意图
│   └── confirm/                 # 确认支付
└── app/api/webhooks/stripe/     # Stripe Webhook
```

### 主要组件

- `PaymentModal`: 支付弹窗组件
- `CreditPlan`: 套餐类型定义
- `createPaymentIntent`: 创建支付意图API
- `confirmPayment`: 确认支付API

### 自定义配置

可以在 `config/credit-plans.ts` 中修改套餐信息，包括价格、积分数量、描述等。

## 🧪 测试

### 测试卡号

Stripe提供以下测试卡号：

- 成功支付：`4242 4242 4242 4242`
- 需要验证：`4000 0025 0000 3155`
- 支付失败：`4000 0000 0000 0002`

### 测试环境

确保在Stripe Dashboard中使用测试模式，避免产生真实费用。

## 🚨 注意事项

1. **安全性**: 永远不要在前端暴露Stripe私钥
2. **Webhook**: 确保Webhook端点可公开访问
3. **错误处理**: 实现完善的错误处理和用户反馈
4. **测试**: 在生产环境部署前充分测试支付流程
5. **合规性**: 确保符合当地支付法规要求

## 📞 技术支持

如遇到问题，请检查：

1. 环境变量是否正确配置
2. 数据库表是否创建成功
3. Stripe API密钥是否有效
4. Webhook是否正确配置
5. 网络连接是否正常

## 🔄 更新日志

- v1.0.0: 初始版本，支持基础支付功能
- 支持4个积分套餐
- 集成Stripe支付系统
- 完整的支付流程
- Webhook处理

# Supabase 数据库设置指南

## 🚀 快速开始

### 1. 登录Supabase
访问 [Supabase Dashboard](https://supabase.com/dashboard) 并登录你的账户。

### 2. 选择项目
选择你的 Gemini Flash Image Project 项目，或者创建一个新项目。

### 3. 进入SQL编辑器
在左侧菜单中点击 "SQL Editor"。

### 4. 执行SQL脚本
复制 `supabase-simple.sql` 文件中的内容，粘贴到SQL编辑器中，然后点击 "Run" 按钮。

## 📋 数据库表说明

执行SQL脚本后，将创建以下5个表：

### 🏦 支付相关表
- **`gemini_flash_stripe_payment_intents`** - 存储Stripe支付意图
- **`gemini_flash_purchase_history`** - 记录用户购买历史

### 💰 积分管理表
- **`gemini_flash_user_credits`** - 用户积分余额
- **`gemini_flash_credit_transactions`** - 积分交易记录

### 🖼️ 图片处理表
- **`gemini_flash_image_processing_logs`** - 记录图片处理操作和积分消耗

## 🔐 行级安全策略 (RLS)

所有表都已启用RLS，确保用户只能访问自己的数据：

- 用户只能查看、插入、更新自己的记录
- 基于 `auth.uid()` 进行权限控制
- 自动与Supabase Auth集成

## 📊 表结构详情

### 支付意图表
```sql
gemini_flash_stripe_payment_intents
├── id (TEXT, 主键) - Stripe支付意图ID
├── user_id (UUID) - 用户ID
├── amount (INTEGER) - 支付金额（分）
├── currency (TEXT) - 货币类型
├── status (TEXT) - 支付状态
├── metadata (JSONB) - 元数据
├── plan_id (TEXT) - 套餐ID
├── credits (INTEGER) - 积分数量
├── created_at (TIMESTAMP) - 创建时间
├── confirmed_at (TIMESTAMP) - 确认时间
└── webhook_processed_at (TIMESTAMP) - Webhook处理时间
```

### 用户积分表
```sql
gemini_flash_user_credits
├── id (UUID, 主键)
├── user_id (UUID, 唯一) - 用户ID
├── balance (INTEGER) - 积分余额
├── created_at (TIMESTAMP) - 创建时间
└── updated_at (TIMESTAMP) - 更新时间
```

### 积分交易记录表
```sql
gemini_flash_credit_transactions
├── id (UUID, 主键)
├── user_id (UUID) - 用户ID
├── amount (INTEGER) - 交易金额（正数=获得，负数=消费）
├── type (TEXT) - 交易类型
├── description (TEXT) - 交易描述
├── reference_id (TEXT) - 参考ID
├── metadata (JSONB) - 元数据
└── created_at (TIMESTAMP) - 创建时间
```

## 🎯 使用场景

### 购买积分
1. 用户选择套餐
2. 创建支付意图 → `gemini_flash_stripe_payment_intents`
3. 支付成功后 → `gemini_flash_purchase_history`
4. 添加积分到账户 → `gemini_flash_user_credits`

### 消费积分
1. 用户处理图片
2. 记录处理日志 → `gemini_flash_image_processing_logs`
3. 扣除积分 → `gemini_flash_credit_transactions`
4. 更新余额 → `gemini_flash_user_credits`

## 🔍 查询示例

### 获取用户积分余额
```sql
SELECT balance FROM gemini_flash_user_credits 
WHERE user_id = 'your-user-id';
```

### 获取用户交易历史
```sql
SELECT * FROM gemini_flash_credit_transactions 
WHERE user_id = 'your-user-id' 
ORDER BY created_at DESC 
LIMIT 10;
```

### 获取用户购买历史
```sql
SELECT * FROM gemini_flash_purchase_history 
WHERE user_id = 'your-user-id' 
ORDER BY created_at DESC;
```

## ⚠️ 注意事项

1. **备份数据**: 在生产环境中，定期备份数据库
2. **监控性能**: 关注查询性能，必要时添加更多索引
3. **权限管理**: 确保RLS策略正确配置
4. **数据一致性**: 在应用层面确保数据一致性

## 🛠️ 故障排除

### 常见问题

**Q: 表创建失败**
A: 检查SQL语法，确保没有语法错误

**Q: RLS策略不生效**
A: 确保已启用RLS，并且策略正确创建

**Q: 索引创建失败**
A: 检查表是否已存在，使用 `IF NOT EXISTS`

**Q: 权限错误**
A: 确保用户已登录，并且RLS策略正确

### 调试技巧

1. 在SQL编辑器中测试查询
2. 检查Supabase日志
3. 验证RLS策略
4. 测试用户权限

## 📞 技术支持

如果遇到问题：

1. 检查Supabase文档
2. 查看Supabase社区论坛
3. 联系Supabase支持团队

## 🔄 下一步

数据库表创建完成后：

1. 配置Stripe API密钥
2. 设置环境变量
3. 测试支付流程
4. 集成到前端应用

---

**恭喜！** 🎉 你的Supabase数据库已经准备就绪，可以开始集成支付功能了！

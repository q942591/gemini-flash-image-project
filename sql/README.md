# SQL 文件夹说明

这个文件夹包含了 Gemini Flash Image Project 的所有数据库相关文件。

## 📁 文件说明

### 🚀 主要SQL文件（推荐使用）

- **`supabase-simple.sql`** - 简化版数据库结构，适合快速部署
  - 包含5个主要表
  - 启用行级安全策略(RLS)
  - 创建必要的索引
  - 适合大多数使用场景

- **`supabase-schema.sql`** - 完整版数据库结构
  - 包含所有表和函数
  - 包含复杂的PostgreSQL函数
  - 包含触发器和高级功能
  - 适合需要完整功能的场景

### 📚 其他文件

- **`database-schema.sql`** - 原始数据库结构文件
- **`SUPABASE_SETUP.md`** - 详细的Supabase设置指南
- **`README.md`** - 本说明文件

## 🎯 使用建议

### 首次部署
1. 使用 `supabase-simple.sql` 创建基础数据库结构
2. 按照 `SUPABASE_SETUP.md` 的说明进行配置

### 需要高级功能
1. 使用 `supabase-schema.sql` 创建完整功能
2. 包含积分管理函数和触发器

## 🔧 执行步骤

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 "SQL Editor"
4. 复制对应的SQL文件内容
5. 粘贴并执行

## 📋 表结构概览

执行SQL后，将创建以下表：

- `gemini_flash_stripe_payment_intents` - Stripe支付意图
- `gemini_flash_user_credits` - 用户积分余额
- `gemini_flash_credit_transactions` - 积分交易记录
- `gemini_flash_image_processing_logs` - 图片处理日志
- `gemini_flash_purchase_history` - 购买历史记录

## ⚠️ 注意事项

- 确保在正确的Supabase项目中执行
- 备份现有数据（如果有的话）
- 检查RLS策略是否正确应用
- 验证表创建和索引是否成功

---

**推荐使用 `supabase-simple.sql` 开始你的项目！** 🚀

# API 设置说明

## 环境变量配置

要使用图片编辑功能，你需要配置以下环境变量：

### 1. 创建 .env.local 文件

在项目根目录创建 `.env.local` 文件，内容如下：

```bash
# OpenRouter API配置
# 从 https://openrouter.ai/ 获取你的API密钥
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here

# 应用配置
NODE_ENV=development
```

### 2. 获取 OpenRouter API 密钥

1. 访问 [OpenRouter](https://openrouter.ai/)
2. 注册账户并登录
3. 在控制台中创建新的API密钥
4. 复制API密钥（以 `sk-or-v1-` 开头）

### 3. 配置API密钥

将你的API密钥替换到 `.env.local` 文件中：

```bash
OPENROUTER_API_KEY=sk-or-v1-3281e617fc8...
```

### 4. 重启开发服务器

配置完成后，重启你的Next.js开发服务器：

```bash
npm run dev
```

## 问题排查

### 环境变量未加载

如果看到 "OpenRouter API key is not configured" 错误：

1. 确认 `.env.local` 文件存在
2. 确认API密钥格式正确
3. 重启开发服务器

### API调用失败

如果API调用失败：

1. 检查API密钥是否有效
2. 确认网络连接正常
3. 检查OpenRouter账户余额

## 支持的模型

当前配置支持以下模型：

- `google/gemini-2.5-flash-image-preview` - 图片分析和生成
- 其他OpenRouter支持的模型

## 注意事项

- `.env.local` 文件不会被提交到Git仓库
- 生产环境需要配置相应的环境变量
- API密钥请妥善保管，不要泄露

# Supabase 存储桶配置指南

## 1. 创建存储桶

在你的Supabase项目中，导航到 **Storage** 部分，创建一个名为 `gemini-images` 的存储桶。

## 2. 配置存储桶权限

### 2.1 存储桶策略
为 `gemini-images` 存储桶创建以下策略：

```sql
-- 允许匿名用户上传图片
CREATE POLICY "Allow anonymous uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'gemini-images' AND
  auth.role() = 'anon'
);

-- 允许匿名用户查看图片
CREATE POLICY "Allow anonymous reads" ON storage.objects
FOR SELECT USING (
  bucket_id = 'gemini-images' AND
  auth.role() = 'anon'
);
```

### 2.2 存储桶设置
- 将存储桶设置为 **Public**（公开）
- 启用 **File size limit**，建议设置为 10MB
- 启用 **Allowed MIME types**，限制为图片类型：
  - `image/jpeg`
  - `image/png`
  - `image/webp`
  - `image/gif`

## 3. 环境变量配置

在你的 `.env.local` 文件中添加以下配置：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3.1 获取密钥
1. **Project URL**: 在Supabase项目设置中找到
2. **Anon Key**: 在API设置中找到
3. **Service Role Key**: 在API设置中找到（注意：这是敏感信息，不要暴露给前端）

## 4. 测试配置

配置完成后，你可以：

1. 启动开发服务器：`npm run dev`
2. 访问 `/function` 页面
3. 上传一张图片进行测试
4. 检查图片是否成功上传到 `gemini-images` 存储桶
5. 验证图片分析功能是否正常工作

## 5. 故障排除

### 5.1 常见错误
- **"Supabase配置缺失"**: 检查环境变量是否正确设置
- **"图片上传失败"**: 检查存储桶权限和策略
- **"图片无法被解析"**: 检查图片格式和大小

### 5.2 权限问题
如果遇到权限问题，确保：
- 存储桶设置为公开
- 策略正确配置
- 使用正确的API密钥

## 6. 安全注意事项

- 不要在前端代码中暴露 `SUPABASE_SERVICE_ROLE_KEY`
- 定期轮换API密钥
- 监控存储桶使用情况
- 设置合理的文件大小限制

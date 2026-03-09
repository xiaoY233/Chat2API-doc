# 首页设计计划

## 目标
创建一个简约时尚的首页，支持中英文切换。

## 设计风格
- **简约**：干净的布局，留白充足
- **时尚**：现代感设计，渐变色彩，流畅动画
- **专业**：清晰的信息层次

## 实现步骤

### 1. 更新首页组件 (`src/app/[locale]/page.tsx`)
使用 Fumadocs 的 `HomeLayout` 组件作为基础，创建包含以下部分的首页：

#### Hero 区域
- 大标题：博客/文档站名称
- 副标题：简短描述
- CTA 按钮：进入文档、GitHub 链接
- 背景效果：渐变或几何图案

#### 特性展示区域
- 3-4 个特性卡片
- 图标 + 标题 + 描述
- 响应式网格布局

#### 快速开始区域
- 简单的安装/使用说明
- 代码块展示

### 2. 创建首页组件
- `src/components/home/hero.tsx` - Hero 区域
- `src/components/home/features.tsx` - 特性展示
- `src/components/home/quick-start.tsx` - 快速开始

### 3. 添加国际化文本
更新 `messages/en.json` 和 `messages/zh.json`，添加首页相关翻译。

### 4. 样式设计
- 使用 Tailwind CSS
- 渐变背景
- 卡片阴影效果
- 悬停动画

## 文件变更清单
1. `src/app/[locale]/page.tsx` - 更新首页
2. `src/components/home/hero.tsx` - 新建 Hero 组件
3. `src/components/home/features.tsx` - 新建特性组件
4. `src/components/home/quick-start.tsx` - 新建快速开始组件
5. `messages/en.json` - 添加英文翻译
6. `messages/zh.json` - 添加中文翻译

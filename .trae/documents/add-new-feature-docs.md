# Chat2API 文档更新计划

## 目标

根据 Chat2API-Manager 代码库的功能，为 Fumadocs 文档项目添加缺失的功能文档。

## 分析结果

### 现有文档覆盖的功能

| 功能 | 文档位置 | 状态 |
|------|----------|------|
| 供应商配置 | providers/ | ✅ 已覆盖 |
| 代理基础配置 | proxy/basic-config.mdx | ✅ 已覆盖 |
| 负载均衡 | proxy/load-balancing.mdx | ✅ 已覆盖 |
| 模型映射 | proxy/model-mapping.mdx | ✅ 已覆盖 |
| API Key 管理 | api-keys.mdx | ✅ 已覆盖 |
| 模型管理 | models.mdx | ✅ 已覆盖 |
| 日志 | logs.mdx | ✅ 已覆盖 |
| 设置 | settings.mdx | ✅ 已覆盖 |

### 需要添加的新文档

根据代码分析，以下功能在文档中缺失或需要补充：

| 功能 | 重要性 | 说明 |
|------|--------|------|
| **Function Calling** | 高 | 为不支持原生工具调用的模型提供 Function Calling 能力 |
| **会话管理** | 高 | 单轮/多轮对话模式配置 |
| **自定义供应商** | 中 | 创建和配置自定义 AI 供应商 |
| **特殊功能参数** | 中 | 联网搜索、深度思考等特殊功能 |
| **Dashboard** | 低 | 仪表盘功能说明（可选） |

## 实施计划

### 第一步：添加 Function Calling 文档

创建 `content/docs/{en,zh}/function-calling.mdx`

**内容包括：**
- 功能概述
- 支持的模型
- 注入模式说明 (always/smart/never)
- 协议格式
- 使用示例
- 最佳实践

### 第二步：添加会话管理文档

创建 `content/docs/{en,zh}/session-management.mdx`

**内容包括：**
- 会话模式说明（单轮/多轮）
- 配置选项
- 会话超时设置
- 使用场景

### 第三步：添加自定义供应商文档

创建 `content/docs/{en,zh}/providers/custom.mdx`

**内容包括：**
- 自定义供应商概述
- 配置选项
- 认证方式
- 模型配置
- 示例

### 第四步：添加特殊功能参数文档

创建 `content/docs/{en,zh}/advanced-features.mdx`

**内容包括：**
- 联网搜索 (web_search)
- 深度思考 (reasoning_effort)
- 深度研究 (deep_research)
- 使用方式（请求参数/Header）

### 第五步：更新 meta.json

在 `content/docs/{en,zh}/meta.json` 中添加新页面引用

## 文件变更清单

### 新建文件

1. `content/docs/en/function-calling.mdx`
2. `content/docs/zh/function-calling.mdx`
3. `content/docs/en/session-management.mdx`
4. `content/docs/zh/session-management.mdx`
5. `content/docs/en/providers/custom.mdx`
6. `content/docs/zh/providers/custom.mdx`
7. `content/docs/en/advanced-features.mdx`
8. `content/docs/zh/advanced-features.mdx`

### 修改文件

1. `content/docs/en/meta.json` - 添加新页面
2. `content/docs/zh/meta.json` - 添加新页面
3. `content/docs/en/providers/meta.json` - 添加 custom 页面
4. `content/docs/zh/providers/meta.json` - 添加 custom 页面

## 文档模板

每个文档遵循以下结构：

```mdx
---
title: 页面标题
description: 页面描述
icon: 图标名称
---

## 功能概述

## 详细说明

## 使用方法

## 配置选项

## 示例

## 故障排除（可选）
```

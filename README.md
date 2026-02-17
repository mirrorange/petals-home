# 🌸 花瓣预设主页 Petals Home

> **花瓣预设 (Petals Preset)** 的官方主页 — 功能介绍、使用教程与关于页面。

🔗 **在线访问**: [petals.freesia.ink](https://petals.freesia.ink)

---

## 📖 简介

本项目是 [花瓣预设](https://discord.com/channels/1134557553011998840/1333735046120476686/1333735046120476686) 的主页网站，基于 React Router v7 构建。网站包含预设的功能特性展示、完整的使用教程，以及关于花瓣预设的故事与致谢信息。

花瓣预设是一个用于 **SillyTavern** 的高品质预设，核心理念是「与小苍兰一起写故事」。

## ✨ 网站内容

### 🏠 首页 (`/`)
- **Hero 展示区** — 花瓣预设品牌展示与快速入口
- **功能特性卡片** — 展示预设的六大核心功能：
  - **Petals CoT** — 思维链协作，双角色线性/迭代创作机制
  - **@Freesia** — 小苍兰智能指令系统，支持混合模式与纯元指令
  - **记忆系统** — 自动记录用户偏好，支持故事/全局两级记忆体系
  - **故事摘要** — 自动生成时间、地点、事件摘要，实时追踪故事进展
  - **故事选项** — 根据剧情上下文自动生成多样化选项
  - **代写回复** — 告诉 @Freesia 帮你代写用户回复

### 📚 使用教程 (`/tutorials`)
教程分为四大类别，涵盖从安装到进阶的完整指南：

- **快速开始** — 预设安装教程、重新设置预设、NoAss 插件配置（DeepSeek）
- **配置指南** — Petals CoT 配置、基本参数设置、预设功能设置
- **功能用法** — @Freesia 系统、记忆系统、故事摘要、选项与代回
- **定制教程** — 修改禁词表、定制 CoT 问题、自定义文风

### 💬 关于 (`/about`)
- **项目介绍** — 花瓣预设的创建者与发布信息
- **致谢** — 感谢为花瓣预设做出贡献的每一位小伙伴
- **支持方式** — 如何支持花瓣预设
- **联系方式** — 邮箱与 Discord 联系方式

## 🛠 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [React](https://react.dev) | v19 | UI 框架 |
| [React Router](https://reactrouter.com) | v7 | 路由与 SSR 框架 |
| [Tailwind CSS](https://tailwindcss.com) | v4 | 样式系统 |
| [Vite](https://vite.dev) | v7 | 构建工具 |
| [TypeScript](https://www.typescriptlang.org) | v5 | 类型安全 |
| [Lucide React](https://lucide.dev) | — | 图标库 |

## 🚀 本地开发

### 前置要求

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io)（推荐）

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

启动后访问 `http://localhost:5173` 即可预览网站。

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

### 类型检查

```bash
pnpm typecheck
```

## 🐳 Docker 部署

项目包含 `Dockerfile`，支持容器化部署：

```bash
docker build -t petals-home .
docker run -p 3000:3000 petals-home
```

## 📁 项目结构

```
petals-home/
├── app/
│   ├── routes/              # 页面路由
│   │   ├── home.tsx         # 首页
│   │   ├── tutorials.tsx    # 教程目录页
│   │   ├── tutorials.*.tsx  # 各教程详情页
│   │   └── about.tsx        # 关于页
│   ├── components/
│   │   ├── sections/        # 页面区块组件
│   │   └── ui/              # 通用 UI 组件
│   ├── routes.ts            # 路由配置
│   └── root.tsx             # 根布局
├── public/                  # 静态资源
├── docs/                    # 文档资源
├── Dockerfile               # Docker 部署配置
├── vite.config.ts           # Vite 配置
└── react-router.config.ts   # React Router 配置
```

## 📜 许可证

本项目内容以 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) 协议开放授权。

你可以自由使用、改编和分享，只需注明出处并且不用于商业用途。

---

**花瓣预设** 由 [@mirrorange 一只咕橘子](https://discord.com/users/1015268632466558996) 创建

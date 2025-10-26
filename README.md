# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 部署

本專案提供完整的部署文檔：

- 📘 [完整部署指南](./DEPLOYMENT_GUIDE.md) - 詳細的部署選項和配置說明
- ⚡ [Git 自動部署快速設置](./QUICK_GIT_SETUP.md) - 5 分鐘配置 Git 自動部署
- 🔧 [Git 自動部署完整指南](./docs/GIT_DEPLOYMENT.md) - 詳細的 Git 部署和 SSH 配置

### 快速部署命令

```bash
# 手動部署
npm run build && npm start

# 使用 PM2（推薦）
pm2 start ecosystem.config.js

# Git 自動部署（需先配置）
git push production master
```

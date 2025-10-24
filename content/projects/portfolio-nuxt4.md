---
title: Portfolio Website
description: 使用 Nuxt 4 打造的個人作品集網站，展示前端開發技能。
image: /images/projects/portfolio/cover.jpg
date: 2025-10-22
author: Your Name
tags:
  - Nuxt 4
  - TypeScript
  - Nuxt Content
  - SCSS
category: web
featured: true
published: true
github: https://github.com/yourusername/portfolio-nuxt4
---

# Portfolio Website

## 專案簡介

這是一個使用最新的 **Nuxt 4** 框架打造的個人作品集網站，結合 **Nuxt Content** 模組實現專案內容管理，展現現代化的前端開發技術。

## 設計理念

### 簡約現代

採用簡約的設計風格，讓作品本身成為焦點，避免過度裝飾影響內容呈現。

### 使用者體驗優先

- 直覺的導航結構
- 流暢的頁面過場效果
- 快速的載入速度
- 無障礙設計考量

## 技術棧

### 核心技術

- **Nuxt 4**：最新版本的 Vue 框架
- **Vue 3**：採用 Composition API
- **TypeScript**：完整的型別支援
- **Nuxt Content**：Markdown 內容管理

### 開發工具

- **Vite**：快速的建置工具
- **ESLint + Prettier**：程式碼品質控制
- **SCSS**：進階 CSS 功能

### UI/UX

- **自定義設計系統**：統一的視覺語言
- **響應式設計**：支援所有裝置
- **深色模式**：舒適的閱讀體驗

## 架構設計

### 資料層分離

```
data/projects.ts        → 專案元資料（列表顯示）
content/projects/*.md   → 專案詳細內容（內頁顯示）
```

這種架構的優點：
- ✅ 元資料集中管理，方便維護
- ✅ 內容使用 Markdown 撰寫，易於編輯
- ✅ 型別安全的資料結構
- ✅ 良好的開發體驗

### 元件架構

```
components/
├── AppHeader.vue         # 網站標頭
├── AppCard.vue           # 專案卡片
├── AppLoading.vue        # 載入動畫
└── Section/
    ├── HomeHero.vue      # 首頁主視覺
    ├── HomeProjects.vue  # 專案列表
    └── HomeAbout.vue     # 關於我
```

## 核心功能

### 1. 專案展示系統

結合 `data/projects.ts` 和 Nuxt Content：

```typescript
// 取得專案列表（來自 data/projects.ts）
const projects = getPublishedProjects()

// 取得專案詳細內容（來自 Markdown）
const { data: project } = await useAsyncData(
  `project-${slug}`,
  () => queryContent(`/projects/${slug}`).findOne()
)
```

### 2. 內容管理

使用 Nuxt Content 的 Markdown 功能：
- 程式碼語法高亮
- 自動生成目錄（TOC）
- 支援 Frontmatter 元資料
- 圖片優化處理

### 3. SEO 優化

- 自動生成 meta tags
- Open Graph 支援
- Sitemap 自動生成
- 結構化資料（JSON-LD）

## 開發流程

### 新增專案步驟

1. **新增元資料**到 `data/projects.ts`：

```typescript
{
  slug: 'new-project',
  title: '專案名稱',
  description: '簡短描述',
  // ...其他資料
}
```

2. **建立 Markdown 檔案** `content/projects/new-project.md`

3. **撰寫專案內容**（支援完整的 Markdown 語法）

4. **自動生成**對應的內頁路由

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置專案
npm run build

# 預覽建置結果
npm run preview
```

## 效能優化

### 圖片優化

使用 `@nuxt/image` 模組：
- 自動轉換 WebP 格式
- 響應式圖片尺寸
- 懶加載支援

### 程式碼分割

- 路由層級的程式碼分割
- 元件動態載入
- 第三方套件優化

### 快取策略

- 靜態資源長期快取
- API 回應快取
- PWA 離線支援

## Lighthouse 分數

- 🟢 **Performance**: 98
- 🟢 **Accessibility**: 100
- 🟢 **Best Practices**: 100
- 🟢 **SEO**: 100

## 專案特色

### 1. 型別安全

完整的 TypeScript 支援，減少執行時期錯誤：

```typescript
interface ProjectMeta {
  slug: string
  title: string
  description: string
  // ...
}
```

### 2. 開發體驗

- 熱模組替換（HMR）
- 自動匯入 API
- 完整的型別提示
- ESLint + Prettier 整合

### 3. 可維護性

- 模組化的 SCSS 架構
- 清晰的專案結構
- 完整的註解文件
- Git 版本控制

## 未來計畫

- [ ] 新增部落格功能
- [ ] 整合 CMS 系統
- [ ] 多語言支援
- [ ] 深色模式切換
- [ ] 動畫效果增強

## 學習收穫

### Nuxt 4 新特性

深入了解 Nuxt 4 的新功能和改進，包括：
- 更快的建置速度
- 改進的型別推斷
- 更好的開發體驗

### Content 驅動開發

學習如何使用 Nuxt Content 建立內容驅動的網站，平衡靈活性和易用性。

### 架構設計

實踐資料層分離的架構設計，提升專案的可維護性和擴展性。

---

*本專案持續更新中...*


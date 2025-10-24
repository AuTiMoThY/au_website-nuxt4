# 專案資料管理指南

本文件說明如何使用 **data/projects.ts** 結合 **Nuxt Content** 管理專案資料。

## 📁 檔案結構

```
portfolio-nuxt4/
├── data/
│   └── projects.ts                    # 專案元資料（列表顯示）
├── content/
│   └── projects/
│       ├── huhu38org.md              # 專案詳細內容（Markdown）
│       └── portfolio-nuxt4.md        # 專案詳細內容（Markdown）
├── app/
│   ├── composables/
│   │   └── useProjects.ts            # 專案相關的 Composable
│   ├── components/
│   │   ├── AppCard.vue               # 專案卡片元件
│   │   └── Section/
│   │       └── HomeProjects.vue      # 專案列表頁面
│   └── pages/
│       └── projects/
│           └── [slug].vue            # 專案內頁（動態路由）
```

## 🎯 設計理念

### 資料層分離

- **data/projects.ts**：存放專案的元資料（如標題、描述、標籤、圖片等），用於列表展示
- **content/projects/*.md**：存放專案的詳細內容，使用 Markdown 撰寫，用於內頁顯示

### 優點

✅ **型別安全**：TypeScript 介面確保資料結構正確  
✅ **易於維護**：元資料集中管理，內容使用 Markdown  
✅ **靈活性高**：可獨立編輯列表資料和詳細內容  
✅ **SEO 友善**：支援 SSR 和靜態生成  
✅ **開發體驗佳**：自動完成和型別提示

## 🚀 如何新增專案

### 步驟 1：新增元資料

編輯 `data/projects.ts`，在 `projects` 陣列中新增專案：

```typescript
{
    slug: 'my-new-project',              // 唯一識別碼（對應 URL 和 Markdown 檔名）
    title: '我的新專案',                  // 專案標題
    description: '這是一個很棒的專案',    // 簡短描述（用於卡片）
    image: '/images/projects/my-project/cover.jpg',  // 專案縮圖
    tags: ['Vue 3', 'TypeScript', 'Tailwind'],      // 技術標籤
    category: 'web',                     // 專案分類
    date: '2025-10-22',                  // 發布日期
    featured: true,                      // 是否為精選專案
    published: true,                     // 是否發布（false 則不顯示）
    link: 'https://example.com',         // 線上連結（選填）
    github: 'https://github.com/...',    // GitHub 連結（選填）
    order: 1                             // 排序權重（數字越大越前面）
}
```

### 步驟 2：建立 Markdown 檔案

在 `content/projects/` 目錄下建立 `my-new-project.md`（檔名必須與 slug 相同）：

```markdown
---
title: 我的新專案
description: 這是一個很棒的專案
image: /images/projects/my-project/cover.jpg
date: 2025-10-22
author: Your Name
tags:
  - Vue 3
  - TypeScript
  - Tailwind
category: web
featured: true
published: true
---

# 我的新專案

## 專案簡介

這裡可以寫詳細的專案介紹...

## 技術架構

### 前端框架
- **Vue 3**：採用 Composition API
- **TypeScript**：確保型別安全

## 核心功能

1. 功能一
2. 功能二

```javascript
// 可以加入程式碼範例
const example = 'Hello World'
```

## 專案截圖

![專案截圖](/images/projects/my-project/screenshot.jpg)

## 學習心得

透過這個專案學到了...
```

### 步驟 3：準備圖片

將專案圖片放到 `public/images/projects/my-project/` 目錄下。

### 步驟 4：完成！

專案會自動出現在首頁，並自動生成內頁路由：`/projects/my-new-project`

## 🔧 進階功能

### 1. 使用 Composable

在任何 Vue 元件中使用 `useProjects()`：

```vue
<script setup>
const { getAllProjects, getFeatured, filterByCategory } = useProjects()

// 取得所有專案
const allProjects = getAllProjects()

// 取得精選專案
const featured = getFeatured()

// 篩選網站開發類別
const webProjects = filterByCategory('web')
</script>
```

### 2. 取得專案詳細資料

```typescript
// 結合元資料和 Markdown 內容
const { getProjectDetail } = useProjects()
const projectDetail = await getProjectDetail('my-new-project')

// projectDetail.meta → 來自 data/projects.ts
// projectDetail.content → 來自 content/projects/my-new-project.md
```

### 3. 搜尋功能

```typescript
const { searchProjects } = useProjects()
const results = searchProjects('vue')
```

### 4. 標籤篩選

```typescript
const { filterByTag, getAllTags } = useProjects()

// 取得所有標籤
const tags = getAllTags()

// 根據標籤篩選
const vueProjects = filterByTag('Vue 3')
```

## 🎨 客製化卡片樣式

編輯 `app/assets/scss/components/app_card.scss` 來修改卡片樣式。

## 📝 Markdown 功能

Nuxt Content 支援的 Markdown 功能：

- ✅ 標題、段落、清單
- ✅ 程式碼區塊（語法高亮）
- ✅ 圖片、連結
- ✅ 表格
- ✅ Frontmatter 元資料
- ✅ 自動生成目錄（TOC）
- ✅ 自訂元件

### 程式碼高亮

支援的語言（可在 `nuxt.config.ts` 中設定）：

```javascript
// JavaScript 範例
const hello = 'world'
```

```vue
<!-- Vue 範例 -->
<template>
  <div>Hello Vue</div>
</template>
```

## 🔍 SEO 優化

專案內頁會自動生成：
- Meta tags
- Open Graph tags
- Twitter Card tags
- 結構化資料（可擴充）

## 🌐 部署注意事項

### 靜態生成（SSG）

更新 `nuxt.config.ts`，加入專案路由：

```typescript
nitro: {
    prerender: {
        routes: [
            '/',
            '/projects/huhu38org',
            '/projects/portfolio-nuxt4',
            // 新增更多專案路由...
        ]
    }
}
```

或使用動態爬蟲：

```typescript
// 在 nuxt.config.ts 中
import { getPublishedProjects } from './data/projects'

const projectRoutes = getPublishedProjects().map(p => `/projects/${p.slug}`)

export default defineNuxtConfig({
    nitro: {
        prerender: {
            routes: ['/', ...projectRoutes]
        }
    }
})
```

## 📚 資料結構參考

### ProjectMeta 介面

```typescript
interface ProjectMeta {
    slug: string                        // 必填：專案唯一識別碼
    title: string                       // 必填：專案標題
    description: string                 // 必填：簡短描述
    image: string                       // 必填：專案縮圖
    tags: string[]                      // 必填：技術標籤
    category: 'web' | 'mobile' | 'design' | 'other'  // 必填：專案分類
    date: string                        // 必填：發布日期
    featured?: boolean                  // 選填：是否為精選
    published?: boolean                 // 選填：是否發布（預設 true）
    link?: string                       // 選填：外部連結
    github?: string                     // 選填：GitHub 連結
    order?: number                      // 選填：排序權重
}
```

## 🎯 最佳實踐

1. **slug 命名**：使用小寫字母和連字號（kebab-case）
2. **圖片優化**：使用 WebP 格式，壓縮圖片大小
3. **日期格式**：使用 ISO 格式（YYYY-MM-DD）
4. **標籤一致性**：保持標籤命名統一（如 "Vue 3" 而非 "Vue3"）
5. **內容結構**：Markdown 使用清晰的標題層級
6. **定期更新**：保持 `order` 和 `date` 欄位最新

## 🐛 常見問題

### Q: 新增專案後沒有顯示？
A: 檢查 `published` 欄位是否為 `true`（或未設定）

### Q: 內頁顯示 404？
A: 確認 Markdown 檔名與 `slug` 完全相同

### Q: 圖片無法顯示？
A: 確認圖片路徑正確，且圖片存在於 `public/` 目錄下

### Q: 想要修改卡片樣式？
A: 編輯 `app/assets/scss/components/app_card.scss`

## 📖 相關文件

- [Nuxt Content 官方文件](https://content.nuxt.com/)
- [Nuxt 3 文件](https://nuxt.com/)
- [Markdown 語法指南](https://www.markdownguide.org/)

---

*最後更新：2025-10-22*


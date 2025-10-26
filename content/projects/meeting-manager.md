---
title: 會議管理系統(DEMO)
---

<span class="txt-secondary">登入帳密: demo / demo</span>

<h3 class="font-h3">
專案概述
</h3>

使用 Nuxt 3 + pinia + scss 開發的一個會議管理平台之前端頁面，提供使用者管理會議及會議室，並能將會議資訊傳送至設備。

![首頁](/images/projects/meeting-manager/index.png)

<h3 class="font-h3">
開發過程
</h3>

- 組件化開發，提高代碼復用性
- 自定義表格元件，如純文字、勾選框、依狀態變化顏色等，方便在各個表格間調用以及維護
- 自定義提示訊息元件，如新增完成、修改成功等，根據操作結果呈現不同訊息
- 編輯會議的頁面中，手刻多重下拉選單以及使用 nuxt-vcalendar 做為日期選擇器

![編輯頁](/images/projects/meeting-manager/meeting-edit.jpg)

![提示訊息元件](/images/projects/meeting-manager/meeting-modal.jpg)

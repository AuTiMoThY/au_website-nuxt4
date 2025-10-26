# 部署指南

本文檔說明如何將此 Nuxt 4 專案部署到 Node.js 伺服器。

## 快速開始

- **手動部署**：見下方各方案
- **自動部署（推薦）**：配置 Git 自動部署，詳見 [Git 自動部署指南](./docs/GIT_DEPLOYMENT.md)
  ```bash
  # 配置完成後，只需執行
  git push production master
  ```

## 部署選項

此專案支援以下兩種部署模式：

### 1. Node.js 伺服器模式（SSR - Server-Side Rendering）
使用 Nitro 引擎運行，支援完整的伺服器端渲染和 API 路由。

### 2. 靜態生成模式（SSG - Static Site Generation）
將整個網站預先生成為靜態檔案。

### 3. 混合模式
部分頁面 SSR，部分頁面 SSG。

---

## 方案一：部署為 Node.js 伺服器（推薦）

### 步驟 1: 構建專案

在專案根目錄執行：

```bash
npm run build
```

這會創建 `.output` 目錄，包含所有部署需要的檔案。

### 步驟 2: 準備生產環境

在伺服器上安裝 Node.js 和 npm（確保 Node.js 版本 >= 18）。

### 步驟 3: 部署檔案到伺服器

將以下檔案和目錄上傳到伺服器：
- `.output` 目錄
- `package.json`
- `node_modules` （或僅上傳 `package.json` 並在伺服器上運行 `npm install --production`）

### 步驟 4: 安裝依賴（僅生產依賴）

在伺服器上執行：

```bash
npm install --production
```

### 步驟 5: 運行應用程式

有兩種方式運行：

#### 方式 A: 使用 Nitro 內建的伺服器

```bash
node .output/server/index.mjs
```

預設會在 port 3000 啟動。

#### 方式 B: 使用 PM2（推薦用於生產環境）

安裝 PM2：
```bash
npm install -g pm2
```

啟動應用程式：
```bash
pm2 start .output/server/index.mjs --name portfolio
```

查看狀態：
```bash
pm2 status
```

設置開機自啟動：
```bash
pm2 startup
pm2 save
```

### 步驟 6: 配置反向代理（可選但推薦）

使用 Nginx 作為反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 方案二：靜態生成部署（適用於純前端展示網站）

### 步驟 1: 構建靜態檔案

```bash
npm run generate
```

這會生成 `.output/public` 目錄，包含所有靜態 HTML、CSS 和 JS 檔案。

### 步驟 2: 部署靜態檔案

將 `.output/public` 目錄中的所有檔案上傳到任何靜態檔案伺服器，例如：
- Nginx
- Apache
- 雲端儲存服務（如 AWS S3、Cloudflare Pages、Vercel 等）

### Nginx 配置範例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/.output/public;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 快取靜態資源
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 環境變數配置

如果需要配置環境變數，創建 `.env` 檔案：

```env
NODE_ENV=production
NUXT_PUBLIC_API_BASE=https://your-api-url.com
```

或使用 systemd 服務檔案設置環境變數：

```ini
[Unit]
Description=Portfolio Nuxt App
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/your/project
Environment=NODE_ENV=production
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=always

[Install]
WantedBy=multi-user.target
```

---

## 監控和日誌

使用 PM2 查看日誌：

```bash
# 查看日誌
pm2 logs portfolio

# 查看錯誤日誌
pm2 logs portfolio --err

# 查看輸出日誌
pm2 logs portfolio --out
```

---

## 故障排除

### 檢查 Node.js 版本
```bash
node --version
```
確保版本 >= 18

### 檢查應用程式是否運行
```bash
curl http://localhost:3000
```

### 檢查端口是否被佔用
```bash
netstat -tulpn | grep :3000
```

---

## 快速部署腳本

創建 `deploy.sh` 腳本自動化部署：

```bash
#!/bin/bash

# 構建專案
echo "正在構建專案..."
npm run build

# 如果使用 PM2，重啟服務
if command -v pm2 &> /dev/null; then
    echo "重啟 PM2 服務..."
    pm2 restart portfolio
else
    echo "請安裝 PM2 或手動啟動應用程式"
fi

echo "部署完成！"
```

使用方法：
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 性能優化建議

1. **使用 CDN**：將靜態資源（圖片、影片等）放在 CDN 上
2. **啟用 Gzip 壓縮**：在 Nginx 中啟用 gzip
3. **設置快取策略**：為靜態資源設置適當的快取時間
4. **啟用 HTTP/2**：提升傳輸效率

### Nginx Gzip 配置

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
```

---

## 維護和更新

### 更新應用程式
1. 在本地執行 `npm run build`
2. 上傳新的 `.output` 目錄到伺服器
3. 重啟應用程式：`pm2 restart portfolio`

### 備份
定期備份以下目錄：
- `.output` 目錄
- 配置檔案（`nuxt.config.ts`, `package.json` 等）
- 環境變數檔案（`.env`）


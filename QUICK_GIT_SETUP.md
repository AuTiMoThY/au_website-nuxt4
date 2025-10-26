# Git 自動部署快速設置

這是設置 Git 自動部署的超快速指南。配置完成後，您只需執行 `git push production master` 即可更新生產環境。

---

## 🎯 5 分鐘快速設置

### 步驟 1: 在伺服器上安裝 Git（如果還沒有）

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# CentOS/RHEL
sudo yum install git

# 驗證
git --version
```

### 步驟 2: 克隆您的專案到伺服器

```bash
# 假設專案在 /var/www
cd /var/www
git clone https://github.com/your-username/portfolio-nuxt4.git
cd portfolio-nuxt4
```

### 步驟 3: 安裝依賴並首次構建

```bash
npm install --production
npm run build
npm start  # 或 pm2 start ecosystem.config.js
```

### 步驟 4: 設置 Git Hook（自動部署）

```bash
# 從範例複製 hook
cp git-hooks/post-receive.example .git/hooks/post-receive

# 編輯並修改路徑
nano .git/hooks/post-receive

# 給腳本執行權限
chmod +x .git/hooks/post-receive
```

在編輯器中，修改這一行：
```bash
WORK_TREE="/var/www/portfolio-nuxt4"  # 改為您的實際路徑
```

### 步驟 5: 設置 SSH 免密碼登入（推薦）

#### 5.1 在本地電腦生成 SSH 金鑰

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# 按 Enter 使用預設位置
# 可選擇性地設置密碼
```

#### 5.2 將公鑰複製到伺服器

```bash
# 方式一：自動（推薦）
ssh-copy-id your-user@your-server-ip

# 方式二：手動
cat ~/.ssh/id_rsa.pub | ssh your-user@your-server-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

#### 5.3 測試是否可免密碼登入

```bash
ssh your-user@your-server-ip
# 應該可以直接登入，不需要密碼
```

### 步驟 6: 在本地添加伺服器 remote

```bash
# 在本地專案目錄
cd /path/to/your/local/project

# 添加生產環境 remote
git remote add production ssh://your-user@your-server-ip/var/www/portfolio-nuxt4/.git

# 或使用完整路徑
git remote add production your-user@your-server-ip:/var/www/portfolio-nuxt4
```

### 步驟 7: 測試自動部署

```bash
# 在本地
git add .
git commit -m "測試自動部署"
git push origin master        # 推送到 GitHub
git push production master    # 推送到生產環境並觸發自動部署
```

如果看到以下輸出，表示成功：
```
🚀 開始自動部署...
📥 拉取最新程式碼...
📦 安裝依賴...
🔨 構建專案...
🔄 重啟應用程式...
✅ 部署完成！
```

---

## 🛠️ 常見問題

### Q: Git push 後沒有任何反應？

**A:** 檢查幾個地方：

```bash
# 1. 確認 hook 腳本有執行權限
ls -la .git/hooks/post-receive

# 2. 手動執行 hook 測試
bash -x .git/hooks/post-receive

# 3. 檢查 hook 是否被正確觸發
# 在 hook 腳本開頭添加: set -x
```

### Q: 推送時要求輸入密碼？

**A:** SSH 金鑰設置有問題：

```bash
# 檢查 SSH 連接
ssh your-user@your-server-ip

# 確保可以使用金鑰登入
# 如果還需要密碼，重新執行 ssh-copy-id
```

### Q: 構建失敗怎麼辦？

**A:** 手動登入伺服器檢查：

```bash
ssh your-user@your-server-ip
cd /var/www/portfolio-nuxt4
npm run build
# 查看錯誤訊息
```

### Q: 如何回滾到之前的版本？

**A:** 在伺服器上：

```bash
cd /var/www/portfolio-nuxt4
git log                    # 查看歷史記錄
git reset --hard <commit-hash>  # 切換到指定版本
npm run build
pm2 restart portfolio  # 重啟應用程式
```

---

## 📝 日常使用

配置完成後，日常工作流程：

```bash
# 1. 本地開發
git add .
git commit -m "功能描述"

# 2. 推送到 GitHub（備份）
git push origin master

# 3. 推送到生產環境（自動部署）
git push production master

# 完成！伺服器會自動更新並重啟
```

---

## 🔒 安全性增強（可選）

### 1. 創建專用部署用戶

```bash
# 在伺服器上創建部署用戶
sudo useradd -m -s /bin/bash deploy
sudo chown -R deploy:deploy /var/www/portfolio-nuxt4
```

### 2. 限制 SSH 訪問

編輯 `/etc/ssh/sshd_config`：

```bash
# 只允許特定用戶
AllowUsers your-user deploy

# 禁用密碼登入（只用金鑰）
PasswordAuthentication no

# 重啟 SSH
sudo systemctl restart sshd
```

### 3. 設置防火牆

```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

---

## 📚 詳細文檔

需要更多資訊？查看：
- [完整 Git 部署指南](./docs/GIT_DEPLOYMENT.md)
- [部署指南](./DEPLOYMENT_GUIDE.md)

---

## ✅ 完成檢查清單

- [ ] 伺服器已安裝 Git
- [ ] 專案已克隆到伺服器
- [ ] 已設置 Git hook
- [ ] 已配置 SSH 金鑰
- [ ] 已添加 production remote
- [ ] 測試推送成功
- [ ] PM2 自動重啟正常
- [ ] 應用程式運行正常

設置完成！🎉


# Git 自動部署設置總結

## 📁 已創建的文件

1. **QUICK_GIT_SETUP.md** - 快速設置指南（5分鐘完成）
2. **docs/GIT_DEPLOYMENT.md** - 完整的 Git 部署文檔
3. **git-hooks/post-receive.example** - 自動部署腳本範例
4. **git-hooks/pre-push.example** - 推送前檢查腳本範例
5. **git-hooks/setup-hooks.sh** - 自動設置 Git hooks 的腳本
6. **ecosystem.config.js** - PM2 配置文件
7. **deploy.sh** / **deploy.bat** - 自動化部署腳本

---

## 🚀 快速開始

### 1. 閱讀快速設置指南

```bash
# 打開快速設置指南
cat QUICK_GIT_SETUP.md
```

### 2. 在伺服器上執行設置

```bash
# SSH 連接到伺服器
ssh your-user@your-server-ip

# 安裝 Git（如果沒有）
sudo apt install git

# 克隆專案
cd /var/www
git clone https://github.com/your-username/portfolio-nuxt4.git
cd portfolio-nuxt4

# 安裝依賴
npm install --production

# 構建專案
npm run build

# 設置 Git hook
cp git-hooks/post-receive.example .git/hooks/post-receive
chmod +x .git/hooks/post-receive

# 編輯 hook 腳本，修改路徑
nano .git/hooks/post-receive
```

### 3. 在本地配置 SSH

```bash
# 生成 SSH 金鑰（如果還沒有）
ssh-keygen -t rsa -b 4096

# 複製公鑰到伺服器
ssh-copy-id your-user@your-server-ip

# 測試連接
ssh your-user@your-server-ip
```

### 4. 添加 remote 並測試

```bash
# 在本地專案目錄
git remote add production ssh://your-user@your-server-ip/var/www/portfolio-nuxt4/.git

# 推送測試
git push production master
```

---

## 📝 設置後的工作流程

配置完成後，每次更新只需：

```bash
git add .
git commit -m "更新說明"
git push origin master        # GitHub 備份
git push production master    # 自動部署到生產環境
```

伺服器會自動：
1. ✅ 拉取最新程式碼
2. ✅ 安裝依賴
3. ✅ 構建專案
4. ✅ 重啟應用程式

---

## 🔍 驗證部署

### 查看部署日誌

```bash
# 在伺服器上查看 PM2 日誌
pm2 logs portfolio

# 或查看最近的部署
pm2 logs portfolio --lines 50
```

### 查看 Git 歷史

```bash
cd /var/www/portfolio-nuxt4
git log --oneline -10
```

### 檢查應用程式狀態

```bash
# 查看 PM2 狀態
pm2 status

# 查看詳細資訊
pm2 info portfolio

# 查看監控
pm2 monit
```

---

## 🛠️ 常用命令

### 本地端

```bash
# 推送到生產環境
git push production master

# 同時推送到 GitHub 和生產環境
git push origin master && git push production master

# 查看所有 remote
git remote -v
```

### 伺服器端

```bash
# 手動更新（緊急情況）
cd /var/www/portfolio-nuxt4
git pull origin master
npm install --production
npm run build
pm2 restart portfolio

# 回滾到之前版本
git log                    # 查看歷史
git reset --hard <commit-hash>
npm run build
pm2 restart portfolio

# 查看部署記錄
pm2 logs portfolio --lines 100
```

---

## ⚠️ 注意事項

### 安全建議

1. **使用 SSH 金鑰** - 不要使用密碼登入
2. **專用用戶** - 不要使用 root 用戶部署
3. **防火牆設置** - 只開放必要的端口
4. **定期備份** - 備份 `.output` 和配置檔案

### 故障排除

如果自動部署失敗：

```bash
# 1. 手動測試 hook
cd /var/www/portfolio-nuxt4
bash -x .git/hooks/post-receive

# 2. 檢查權限
ls -la .git/hooks/post-receive

# 3. 查看詳細日誌
pm2 logs portfolio --err
```

---

## 📚 相關文檔

- [快速設置指南](./QUICK_GIT_SETUP.md)
- [完整部署指南](./DEPLOYMENT_GUIDE.md)
- [Git 自動部署完整指南](./docs/GIT_DEPLOYMENT.md)
- [PM2 文檔](https://pm2.keymetrics.io/docs/usage/quick-start/)

---

## ✅ 設置檢查清單

- [ ] 伺服器已安裝 Git
- [ ] 專案已克隆到伺服器
- [ ] 已安裝 Node.js 和 npm
- [ ] 已安裝 PM2
- [ ] 已設置 Git hook
- [ ] 已配置 SSH 金鑰免密碼登入
- [ ] 已在本地添加 production remote
- [ ] 測試推送成功
- [ ] 自動構建正常
- [ ] PM2 自動重啟正常
- [ ] 應用程式正常運行
- [ ] 已設置防火牆
- [ ] 已配置備份策略

---

**完成設置後，您就可以透過簡單的 `git push` 來自動更新生產環境了！** 🎉


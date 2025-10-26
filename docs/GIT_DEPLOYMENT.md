# Git 自動部署指南

本指南說明如何設置 Git 伺服器端部署，讓您可以直接透過 `git push` 更新生產環境。

## 步驟 1: 在伺服器上安裝 Git

### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install git
```

### CentOS/RHEL:
```bash
sudo yum install git
```

### macOS:
Git 通常已預先安裝，如果沒有：
```bash
brew install git
```

### 驗證安裝:
```bash
git --version
```

---

## 步驟 2: 設置伺服器端的 Git Repository

### 方法一：裸倉庫（Bare Repository）- 推薦

在伺服器上創建裸倉庫：

```bash
# 在伺服器上
cd /var/www
git clone --bare https://github.com/your-username/your-repo.git portfolio.git
cd portfolio.git
```

設置工作目錄：

```bash
# 創建另一個目錄作為工作區
cd /var/www
mkdir portfolio-deploy
cd portfolio-deploy
git clone /var/www/portfolio.git .
```

### 方法二：直接在工作目錄克隆（較簡單）

```bash
cd /var/www
git clone https://github.com/your-username/portfolio-nuxt4.git
cd portfolio-nuxt4
```

---

## 步驟 3: 配置自動部署 Hook

### 創建 post-receive hook

在伺服器上的 `.git/hooks/post-receive` 或在裸倉庫的 `hooks/post-receive`：

```bash
#!/bin/bash
# 設定部署路徑
WORK_TREE="/var/www/portfolio-nuxt4"
GIT_DIR="/var/www/portfolio.git"

cd "$WORK_TREE"

# 拉取最新程式碼
git --git-dir="$GIT_DIR" --work-tree="$WORK_TREE" pull origin master

# 安裝依賴（如果 package.json 有更新）
npm install --production

# 構建專案
npm run build

# 重啟應用程式
if command -v pm2 &> /dev/null; then
    pm2 restart portfolio
else
    # 如果使用 systemd 或其他
    sudo systemctl restart portfolio
fi

# 發送通知（可選）
echo "✅ 部署完成: $(date)"
```

給腳本添加執行權限：

```bash
chmod +x .git/hooks/post-receive
# 或
chmod +x /var/www/portfolio.git/hooks/post-receive
```

---

## 步驟 4: 設置 SSH 金鑰（允許免密碼 push）

### 在本地電腦生成 SSH 金鑰（如果還沒有）

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### 將公鑰複製到伺服器

```bash
# 方式一：使用 ssh-copy-id（自動）
ssh-copy-id user@your-server-ip

# 方式二：手動複製
cat ~/.ssh/id_rsa.pub | ssh user@your-server-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 測試 SSH 連線

```bash
ssh user@your-server-ip
```

應該可以無密碼登入。

---

## 步驟 5: 添加伺服器端 Git Remote

### 方式 A：使用 SSH（推薦，需先配置 SSH 金鑰）

```bash
# 在本地專案中
git remote add production ssh://user@your-server-ip/path/to/repo.git

# 或如果使用裸倉庫
git remote add production ssh://user@your-server-ip/var/www/portfolio.git
```

### 方式 B：使用 HTTPS（需輸入帳密）

```bash
git remote add production https://github.com/your-username/portfolio-nuxt4.git
```

### 查看所有 remote

```bash
git remote -v
```

---

## 步驟 6: 測試自動部署

### 本地端推送

```bash
# 提交更改
git add .
git commit -m "部署配置更新"

# 推送到 GitHub
git push origin master

# 推送到生產環境
git push production master
```

伺服器應該會自動執行：
1. 拉取最新程式碼
2. 安裝依賴
3. 構建專案
4. 重啟應用程式

---

## 進階配置：使用 GitHub Actions 自動部署

如果您想使用 GitHub Actions 來自動化部署流程。

創建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Production

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy to Server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/portfolio-nuxt4
          git pull origin master
          npm install --production
          npm run build
          pm2 restart portfolio
```

需要在 GitHub 設定 Secrets：
- `HOST`: 伺服器 IP 或域名
- `USERNAME`: SSH 用戶名
- `SSH_KEY`: SSH 私鑰

---

## 安全建議

### 1. 限制 SSH 存取

編輯 `/etc/ssh/sshd_config`：

```bash
# 限制特定用戶
AllowUsers your-username

# 禁用密碼登入（只用金鑰）
PasswordAuthentication no

# 重啟 SSH 服務
sudo systemctl restart sshd
```

### 2. 使用部署用戶而非 root

```bash
# 創建專用部署用戶
sudo useradd -m -s /bin/bash deploy
sudo chown -R deploy:deploy /var/www/portfolio-nuxt4
```

### 3. 設置防火牆

```bash
# 只允許必要的端口
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

---

## 故障排除

### Git push 後沒有自動部署？

1. 檢查 hook 權限：
```bash
ls -la .git/hooks/
```

2. 檢查 hook 腳本是否有錯誤：
```bash
bash -x .git/hooks/post-receive
```

3. 檢查 Git 日誌：
```bash
git log --oneline -5
```

### PM2 沒有重啟？

手動執行 hook 腳本測試：
```bash
bash .git/hooks/post-receive
```

### 權限問題？

確保部署用戶有權限訪問專案目錄：
```bash
sudo chown -R deploy:deploy /var/www/portfolio-nuxt4
```

---

## 快速參考命令

```bash
# 本地測試後推送到生產環境
git add .
git commit -m "更新說明"
git push origin master        # 推送到 GitHub
git push production master    # 推送到生產環境

# 在伺服器上查看 PM2 日誌
pm2 logs portfolio

# 在伺服器上手動更新（緊急情況）
cd /var/www/portfolio-nuxt4
git pull origin master
npm run build
pm2 restart portfolio

# 回滾到之前的版本
cd /var/www/portfolio-nuxt4
git log                    # 查看歷史
git reset --hard <commit-hash>
npm run build
pm2 restart portfolio
```


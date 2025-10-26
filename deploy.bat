@echo off
REM Windows 部署腳本
REM 使用方式: deploy.bat

echo 🚀 開始部署 Portfolio 專案...

REM 檢查 Node.js 版本
node -v
if errorlevel 1 (
    echo ❌ 錯誤: 未安裝 Node.js
    pause
    exit /b 1
)

echo 📥 安裝依賴...
call npm install
if errorlevel 1 (
    echo ❌ 錯誤: 依賴安裝失敗
    pause
    exit /b 1
)

echo 🔨 構建專案...
call npm run build
if errorlevel 1 (
    echo ❌ 錯誤: 構建失敗
    pause
    exit /b 1
)

echo ✅ 構建完成！
echo.
echo 下一步：
echo 1. 如果已安裝 PM2，執行: pm2 start ecosystem.config.js
echo 2. 或直接運行: node .output/server/index.mjs
echo.
echo 檢查端口 3000 是否可用
netstat -ano | findstr :3000

pause


#!/bin/bash

# 部署腳本
# 使用方式: bash deploy.sh

set -e

echo "🚀 開始部署 Portfolio 專案..."

# 檢查 Node.js 版本
NODE_VERSION=$(node -v)
echo "📦 Node.js 版本: $NODE_VERSION"

# 安裝依賴
echo "📥 安裝依賴..."
npm install

# 構建專案
echo "🔨 構建專案..."
npm run build

# 檢查 PM2 是否安裝
if command -v pm2 &> /dev/null; then
    echo "⚙️  檢查 PM2 服務狀態..."
    
    # 檢查應用程式是否已在運行
    if pm2 list | grep -q "portfolio"; then
        echo "🔄 重啟現有服務..."
        pm2 restart portfolio
    else
        echo "▶️  啟動新服務..."
        pm2 start ecosystem.config.js
    fi
    
    echo "📊 顯示 PM2 狀態..."
    pm2 status
    
    echo "✅ 部署完成！"
    echo "📝 查看日誌: pm2 logs portfolio"
    echo "⏸️  停止服務: pm2 stop portfolio"
else
    echo "⚠️  PM2 未安裝，請手動啟動應用程式："
    echo "   node .output/server/index.mjs"
    echo ""
    echo "或安裝 PM2:"
    echo "   npm install -g pm2"
    echo "   然後執行: pm2 start ecosystem.config.js"
fi


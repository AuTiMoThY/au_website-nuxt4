#!/bin/bash
# Git Hooks 設置腳本
# 使用方式: bash git-hooks/setup-hooks.sh

set -e

echo "🔧 設置 Git Hooks..."

# 檢查是否在 Git repository 中
if [ ! -d ".git" ]; then
    echo "❌ 錯誤: 當前目錄不是 Git repository"
    exit 1
fi

# 複製 post-receive hook
if [ -f "git-hooks/post-receive.example" ]; then
    echo "📋 複製 post-receive hook..."
    cp git-hooks/post-receive.example .git/hooks/post-receive
    chmod +x .git/hooks/post-receive
    echo "✅ post-receive hook 已設置"
else
    echo "⚠️  找不到 git-hooks/post-receive.example"
fi

# 複製 pre-push hook（可選）
if [ -f "git-hooks/pre-push.example" ]; then
    echo "📋 複製 pre-push hook..."
    cp git-hooks/pre-push.example .git/hooks/pre-push
    chmod +x .git/hooks/pre-push
    echo "✅ pre-push hook 已設置"
fi

echo ""
echo "⚠️  重要: 請編輯 .git/hooks/post-receive 並修改以下配置："
echo "  - WORK_TREE: 伺服器上的實際工作目錄路徑"
echo "  - GIT_DIR: Git 倉庫路徑（如果使用裸倉庫）"
echo ""
echo "✅ Git hooks 設置完成！"


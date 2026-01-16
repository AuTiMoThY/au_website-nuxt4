# better-sqlite3 問題排除指南

## 📋 目錄

1. [問題描述](#問題描述)
2. [錯誤訊息](#錯誤訊息)
3. [問題原因分析](#問題原因分析)
4. [解決方案](#解決方案)
5. [預防措施](#預防措施)
6. [常見問題](#常見問題)

---

## 問題描述

在使用 `pnpm run generate` 執行 Nuxt 靜態網站生成時，出現 `better-sqlite3` 無法找到原生綁定文件（bindings file）的錯誤。此問題主要發生在 Windows 系統上使用 pnpm 套件管理器時。

### 為什麼需要 better-sqlite3？

`better-sqlite3` 是以下 Nuxt 模組的間接依賴：

- `@nuxt/content` - 使用 SQLite 作為內容存儲後端
- `@nuxt/image` - 透過 `db0` 和 `unstorage` 使用 SQLite 進行快取

雖然專案中可能沒有直接使用 `better-sqlite3`，但它會作為這些模組的依賴被自動安裝。

---

## 錯誤訊息

當執行 `pnpm run generate` 時，可能會看到以下錯誤：

```
ERROR  Could not locate the bindings file. Tried:
 → D:\_au\ref\au_website-nuxt4\node_modules\.pnpm\better-sqlite3@12.6.0\node_modules\better-sqlite3\build\better_sqlite3.node
 → D:\_au\ref\au_website-nuxt4\node_modules\.pnpm\better-sqlite3@12.6.0\node_modules\better-sqlite3\build\Debug\better_sqlite3.node
 → D:\_au\ref\au_website-nuxt4\node_modules\.pnpm\better-sqlite3@12.6.0\node_modules\better-sqlite3\build\Release\better_sqlite3.node
 ...
```

這表示 `better-sqlite3` 無法找到已編譯的原生模組文件（`.node` 文件）。

---

## 問題原因分析

### 1. 原生模組需要編譯

`better-sqlite3` 是一個**原生 Node.js 模組**（Native Addon），需要針對特定的作業系統和 Node.js 版本進行編譯。編譯過程會產生一個 `.node` 二進制文件，這是模組運行時必需的。

### 2. pnpm 預設禁用建置腳本

從 **pnpm v8.0.0** 開始，為了安全性考慮，pnpm 預設會**忽略套件的建置腳本**（build scripts），包括 `postinstall` 腳本。

`better-sqlite3` 使用 `postinstall` 腳本來執行 `prebuild-install`，這個工具會：
- 嘗試下載針對當前系統和 Node.js 版本的預編譯二進制文件
- 如果下載失敗，則嘗試使用 `node-gyp` 從源碼編譯

當 pnpm 忽略 `postinstall` 腳本時，`prebuild-install` 不會執行，導致二進制文件缺失。

### 3. 環境變數影響

如果環境中設定了 `npm_config_build_from_source=true` 或類似的變數，`prebuild-install` 會跳過預編譯二進制文件的下載，直接嘗試從源碼編譯。

在 Windows 系統上，從源碼編譯需要：
- **Visual Studio Build Tools** 或 **Visual Studio**（包含「Desktop development with C++」工作負載）
- **Python**（通常由 node-gyp 使用）
- **node-gyp**

如果這些工具未正確安裝，編譯會失敗。

### 4. Windows 上的特殊情況

在 Windows 上，原生模組的編譯特別容易出問題，因為：
- 需要安裝額外的建置工具（Visual Studio Build Tools）
- 編譯過程較慢且容易出錯
- pnpm 的符號連結機制可能導致路徑問題

---

## 解決方案

### 方案一：使用預編譯二進制文件（推薦）

這是最簡單且最可靠的方法，不需要安裝任何建置工具。

#### 步驟 1：建立 `.npmrc` 文件

在專案根目錄建立或編輯 `.npmrc` 文件，加入以下內容：

```ini
enable-pre-post-scripts=true
ignore-scripts=false
```

這些設定告訴 pnpm：
- `enable-pre-post-scripts=true`：允許執行 `preinstall` 和 `postinstall` 腳本
- `ignore-scripts=false`：不忽略任何建置腳本

#### 步驟 2：清除環境變數（如果存在）

如果環境中設定了 `npm_config_build_from_source`，需要清除它。在 PowerShell 中執行：

```powershell
Remove-Item Env:\npm_config_build_from_source -ErrorAction SilentlyContinue
```

在 CMD 中執行：

```cmd
set npm_config_build_from_source=
```

#### 步驟 3：重新安裝 better-sqlite3

```bash
pnpm remove better-sqlite3
pnpm install better-sqlite3
```

#### 步驟 4：手動觸發預編譯下載（如果需要）

如果安裝後仍然找不到二進制文件，可以手動執行 `prebuild-install`：

```bash
cd node_modules\.pnpm\better-sqlite3@12.6.0\node_modules\better-sqlite3
pnpm exec prebuild-install --verbose
```

這會下載針對當前系統和 Node.js 版本的預編譯二進制文件。

#### 步驟 5：驗證安裝

檢查二進制文件是否存在：

```powershell
Test-Path "node_modules\.pnpm\better-sqlite3@12.6.0\node_modules\better-sqlite3\build\Release\better_sqlite3.node"
```

如果返回 `True`，表示二進制文件已正確安裝。

#### 步驟 6：測試生成

```bash
pnpm run generate
```

如果沒有錯誤，問題已解決。

---

### 方案二：從源碼編譯（需要建置工具）

如果你希望從源碼編譯，或者預編譯二進制文件不可用（例如使用非標準的 Node.js 版本），可以按照以下步驟：

#### 前置需求

1. **安裝 Visual Studio Build Tools**
   - 下載並安裝 [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
   - 安裝時選擇「Desktop development with C++」工作負載

2. **確認 Python 已安裝**
   - node-gyp 需要 Python，通常會自動偵測

3. **確認 node-gyp 已安裝**
   ```bash
   pnpm add -D node-gyp
   ```

#### 編譯步驟

1. 確保 `.npmrc` 允許腳本執行（同方案一步驟 1）

2. 移除 `better-sqlite3` 並重新安裝，強制從源碼編譯：
   ```bash
   pnpm remove better-sqlite3
   $env:npm_config_build_from_source='true'
   pnpm install better-sqlite3
   ```

3. 或者手動編譯：
   ```bash
   cd node_modules\.pnpm\better-sqlite3@12.6.0\node_modules\better-sqlite3
   pnpm exec node-gyp rebuild
   ```

---

## 預防措施

### 1. 保留 `.npmrc` 配置

確保專案根目錄的 `.npmrc` 文件包含以下內容：

```ini
enable-pre-post-scripts=true
ignore-scripts=false
```

並將此文件提交到版本控制系統。

### 2. 檢查環境變數

避免在系統層級或 CI/CD 環境中設定 `npm_config_build_from_source=true`，除非你真的需要從源碼編譯。

### 3. 使用適當的 Node.js 版本

`better-sqlite3` v12.6.0 支援 Node.js v22.x.x，並提供預編譯二進制文件。使用官方支援的 Node.js 版本可以避免編譯問題。

### 4. 團隊協作

如果團隊成員使用不同的作業系統，建議在 `.gitignore` 中排除 `node_modules`，讓每個成員在自己的系統上安裝依賴，這樣可以確保每個平台都能獲得正確的原生模組。

---

## 常見問題

### Q1: 為什麼 npm 沒有這個問題？

npm 預設會執行所有建置腳本，包括 `postinstall`，所以 `prebuild-install` 會自動執行。pnpm 為了安全性，預設禁用了這些腳本。

### Q2: 可以使用 npm 代替 pnpm 嗎？

可以，但如果你已經使用 pnpm 的某些特性（如 workspace），切換到 npm 可能需要額外的配置。建議保持使用 pnpm，並按照本指南配置。

### Q3: 在 CI/CD 中如何處理？

在 CI/CD 環境中，確保：
1. `.npmrc` 文件被正確複製到構建環境
2. 不設定 `npm_config_build_from_source` 環境變數
3. 如果需要，可以在 CI 配置中明確執行 `prebuild-install`

例如，在 GitHub Actions 中：

```yaml
- name: Install dependencies
  run: pnpm install

- name: Ensure better-sqlite3 binary
  run: |
    cd node_modules/.pnpm/better-sqlite3@*/node_modules/better-sqlite3
    pnpm exec prebuild-install || true
```

### Q4: 如何確認 better-sqlite3 版本是否支援當前 Node.js？

檢查 [better-sqlite3 Releases](https://github.com/WiseLibs/better-sqlite3/releases) 頁面，查看特定版本是否提供針對你的 Node.js 版本的預編譯二進制文件。

例如，v12.6.0 支援：
- Node.js v14.x.x 到 v22.x.x
- Windows (x64, arm64)、macOS (x64, arm64)、Linux (x64, arm64)

### Q5: 可以移除 better-sqlite3 嗎？

不建議。雖然你可以從 `package.json` 中移除直接依賴，但它仍然是 `@nuxt/content` 和 `@nuxt/image` 的間接依賴。移除它可能會導致這些模組無法正常工作。

### Q6: 錯誤訊息中的 `node-v127-win32-x64` 是什麼意思？

這是 Node.js ABI 版本識別符：
- `node-v127`：Node.js v22.x.x 的 ABI 版本
- `win32`：Windows 作業系統
- `x64`：64 位元架構

`better-sqlite3` 需要匹配的二進制文件才能運行。

---

## 參考資源

- [better-sqlite3 GitHub](https://github.com/WiseLibs/better-sqlite3)
- [better-sqlite3 Releases](https://github.com/WiseLibs/better-sqlite3/releases)
- [pnpm 建置腳本配置](https://pnpm.io/npmrc#enable-pre-post-scripts)
- [node-gyp 安裝指南](https://github.com/nodejs/node-gyp#on-windows)
- [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)

---

## 更新記錄

- **2025-01-XX**：初始版本，記錄 better-sqlite3 v12.6.0 在 Windows + pnpm 環境下的問題排除方案

---

**最後更新：** 2025-01-XX

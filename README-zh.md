# md2png

將 Markdown 檔案轉換為圖片或 HTML 的工具。

[English](./README.md)

## 功能

- **md2png.js**: 將 Markdown 檔案轉換為高品質的 JPG 圖片
- **md2html.js**: 將 Markdown 檔案轉換為格式化的 HTML 檔案

## 安裝

```bash
npm install
```

## 使用方法

### 轉換為圖片

```bash
# 轉換單個檔案
node md2png.js example.md

# 轉換多個檔案
node md2png.js file1.md file2.md file3.md
```

### 轉換為 HTML

```bash
# 基本轉換
node md2html.js input.md

# 指定輸出目錄
node md2html.js input.md 輸出目錄

# 指定檔案前綴
node md2html.js input.md 輸出目錄 前綴_
```

## 特色

- 支援表格、程式碼區塊、圖片等 Markdown 語法
- 自動調整圖片尺寸以完整顯示內容
- 高解析度輸出，適合印刷或展示
- 支援批量轉換

## 依賴套件

- `markdown-it`: Markdown 解析器
- `puppeteer`: 網頁截圖工具
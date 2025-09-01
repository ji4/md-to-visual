// md2jpg_enhanced.js
// 增強版 Markdown 轉 JPG 轉換器，支援高解析度輸出
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true
});

// 檢查命令行參數
if (process.argv.length < 3) {
  console.error('請提供至少一個輸入檔案！');
  console.error('使用方式: node md2jpg_enhanced.js <檔案1.md> [檔案2.md] [檔案3.md] ...');
  process.exit(1);
}

// 獲取所有輸入檔案
const inputFiles = process.argv.slice(2);

// 檢查所有輸入檔案是否存在
for (const file of inputFiles) {
  if (!fs.existsSync(file)) {
    console.error(`錯誤：找不到檔案 "${file}"`);
    process.exit(1);
  }
  if (!file.endsWith('.md')) {
    console.error(`錯誤：檔案 "${file}" 不是 Markdown 檔案`);
    process.exit(1);
  }
}

(async () => {
  try {
    console.log(`準備轉換 ${inputFiles.length} 個 Markdown 檔案`);
    
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // 設置視口大小和設備像素比
    await page.setViewport({
      width: 1080,
      height: 1080,
      deviceScaleFactor: 1  // 降低設備像素比，但仍保持足夠清晰度
    });

    for (const file of inputFiles) {
      try {
        const mdContent = fs.readFileSync(file, 'utf-8');
        
        // 改進的 HTML 模板，包含更好的樣式
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset='utf-8'>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  padding: 40px;
                  max-width: 1360px;  /* 調整最大寬度，考慮內邊距 */
                  margin: 0 auto;
                  line-height: 1.6;
                  color: #333;
                }
                pre {
                  background: #f6f8fa;
                  padding: 16px;
                  border-radius: 8px;
                  overflow-x: auto;
                }
                code {
                  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
                  font-size: 14px;
                }
                h1, h2, h3, h4, h5, h6 {
                  margin-top: 24px;
                  margin-bottom: 16px;
                  font-weight: 600;
                  line-height: 1.25;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
                /* 改進的表格樣式 */
                table {
                  border-collapse: collapse;
                  width: 100%;
                  margin: 16px 0;
                  font-size: 14px;
                }
                table, th, td {
                  border: 1px solid #ddd;
                }
                th, td {
                  padding: 12px;
                  text-align: left;
                  vertical-align: top;
                }
                th {
                  background-color: #f2f2f2;
                  font-weight: 600;
                }
                tr:nth-child(even) {
                  background-color: #f8f8f8;
                }
                tr:hover {
                  background-color: #f5f5f5;
                }
                /* 支援表格中的列表樣式 */
                td ul, td ol {
                  margin: 0;
                  padding-left: 20px;
                }
                td li {
                  margin: 4px 0;
                }
                /* 支援表格中的換行 */
                td br {
                  margin: 4px 0;
                }
              </style>
            </head>
            <body>
              ${md.render(mdContent)}
            </body>
          </html>
        `;

        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        // 自動調整高度
        const bodyHandle = await page.$('body');
        const boundingBox = await bodyHandle.boundingBox();
        
        // 設置新的視口大小，確保完整捕獲內容
        await page.setViewport({
          width: Math.ceil(boundingBox.width),
          height: Math.ceil(boundingBox.height),
          deviceScaleFactor: 1.5  // 保持一致的設備像素比
        });

        // 在輸入檔案的同一目錄下生成輸出檔案
        const outName = path.basename(file, '.md') + '.jpg';
        const outputPath = path.join(path.dirname(file), outName);
        
        await page.screenshot({
          path: outputPath,
          fullPage: true,
          type: 'jpeg',
          quality: 90
        });
        
        await bodyHandle.dispose();
        console.log(`✅ 已轉換: ${file} → ${outName}`);
      } catch (err) {
        console.error(`❌ 轉換 ${file} 時發生錯誤:`, err.message);
      }
    }

    await browser.close();
    console.log('\n✨ 轉換完成！');
  } catch (err) {
    console.error('發生錯誤:', err);
    process.exit(1);
  }
})(); 
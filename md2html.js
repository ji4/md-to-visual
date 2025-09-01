// md2html.js
// 用 markdown-it 將 Markdown 轉成 HTML 檔案
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true
});

const inputFile = process.argv[2];
const outputDir = process.argv[3] || 'html輸出';
const prefix = process.argv[4] || '';

if (!inputFile) {
  console.error('請提供輸入檔案路徑');
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 檢查輸入是否為檔案
if (!fs.statSync(inputFile).isFile()) {
  console.error('輸入必須是檔案');
  process.exit(1);
}

// 處理單一檔案
const mdContent = fs.readFileSync(inputFile, 'utf-8');
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body {
      font-family: Helvetica, Arial, sans-serif;
      padding: 40px;
      max-width: 900px;
      line-height: 1.6;
    }
    pre {
      background: #f6f8fa;
      padding: 10px;
      border-radius: 6px;
    }
    code {
      font-size: 1em;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    table, th, td {
      border: 1px solid #ddd;
    }
    th, td {
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
${md.render(mdContent)}
</body>
</html>`;

const outName = prefix + path.basename(inputFile, '.md') + '.html';
fs.writeFileSync(path.join(outputDir, outName), html);
console.log(`✔ 已轉換: ${inputFile} → ${outName}`); 
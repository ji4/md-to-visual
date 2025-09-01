# md2png

A tool for converting Markdown files to images or HTML.

[繁體中文](./README-zh.md)

## Features

- **md2png.js**: Convert Markdown files to high-quality JPG images
- **md2html.js**: Convert Markdown files to formatted HTML files

## Installation

```bash
npm install
```

## Usage

### Convert to Image

```bash
# Convert single file
node md2png.js example.md

# Convert multiple files
node md2png.js file1.md file2.md file3.md
```

### Convert to HTML

```bash
# Basic conversion
node md2html.js input.md

# Specify output directory
node md2html.js input.md output_directory

# Specify file prefix
node md2html.js input.md output_directory prefix_
```

## Features

- Supports tables, code blocks, images and other Markdown syntax
- Automatically adjusts image size to display content completely
- High-resolution output suitable for printing or presentation
- Supports batch conversion

## Dependencies

- `markdown-it`: Markdown parser
- `puppeteer`: Web page screenshot tool
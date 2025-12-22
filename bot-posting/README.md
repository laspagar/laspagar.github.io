# 🤖 Kharisma Steel Posting Bot

Automated bot untuk membuat artikel blog dan produk di Jekyll Kharisma Steel.

## 📦 Installation

```bash
cd bot-posting
npm install
```

## 🚀 Usage

### Create Article
```bash
npm run post:article
```

Akan membuka interactive CLI untuk:
- Input judul artikel
- Deskripsi singkat
- Konten artikel
- Pilih kategori (kanopi, pagar, tangga, dll)
- Tambah tags
- Tentukan author

Hasil: File markdown di `_posts/YYYY-MM-DD-judul.md`

### Create Product
```bash
npm run post:product
```

Akan membuka interactive CLI untuk:
- Input nama produk
- Harga
- Pilih kategori (Kanopi, Pagar, Tangga, Railing, Pintu)
- Deskripsi produk
- Path gambar
- Keywords SEO
- Konten detail

Hasil: File markdown di `_products/nama-produk.md`

## 📝 Example

### Article Flow
```
$ npm run post:article

📝 Create New Blog Article

? Article Title: Cara Merawat Pagar Besi Agar Tidak Berkarat
? Short Description: Tips lengkap perawatan pagar besi untuk daya tahan maksimal
? Article Content: [input content or leave empty]
? Select Categories: kanopi, pagar, tips
? Tags: pagar-besi, perawatan, tips
? Author: Kharisma Steel

✅ Article created successfully!

File: ./_posts/2025-12-22-cara-merawat-pagar-besi-agar-tidak-berkarat.md
Title: Cara Merawat Pagar Besi Agar Tidak Berkarat
Date: 2025-12-22

💡 Next steps:
1. Edit the article in the created file
2. Add images if needed
3. Commit and push to GitHub
```

### Product Flow
```
$ npm run post:product

📦 Create New Product

? Product Title: Kanopi Alderon Warna Bening
? Product Price (e.g., Rp 1.500.000 / m): Rp 650.000 / m²
? Product Category: Kanopi
? Product Description: Kanopi alderon jernih dengan UV protection
? Image path: /assets/products/kanopi-alderon-bening.jpg
? Keywords: alderon, kanopi, polycarbonate
? Detailed content: [input or leave empty]

✅ Product created successfully!

File: ./_products/kanopi-alderon-warna-bening.md
Title: Kanopi Alderon Warna Bening
Category: Kanopi
Price: Rp 650.000 / m²

💡 Next steps:
1. Edit the product details in the created file
2. Upload product image to /assets/products/
3. Test on products page
```

## 📂 Directory Structure

```
bot-posting/
├── package.json
├── README.md
├── bin/
│   ├── create-article.js
│   └── create-product.js
└── utils/
    └── (optional utility functions)
```

## 🔧 Dependencies

- **inquirer**: Interactive CLI prompts
- **slugify**: URL-friendly slug generation
- **dayjs**: Date/time formatting
- **chalk**: Colored terminal output

## 📋 Frontmatter Automatically Generated

### Article
```yaml
---
layout: post
title: "Judul Artikel"
date: 2025-12-22 15:30:00 +0700
author: Kharisma Steel
description: Deskripsi singkat
categories: [kanopi, pagar, tips]
tags: [tag1, tag2, tag3]
---
```

### Product
```yaml
---
title: Nama Produk
price: Rp 1.500.000 / m
category: Kanopi
image: /assets/products/product.jpg
description: Deskripsi singkat
keywords: keyword1, keyword2, keyword3
---
```

## 💡 Tips

1. **Categories untuk Article:**
   - kanopi, pagar, tangga, balkon, pintu
   - studi-kasus, finishing, tips, harga

2. **Categories untuk Product:**
   - Kanopi, Pagar, Tangga, Railing, Pintu

3. **Image Path:**
   - Always use relative path: `/assets/products/nama.jpg`
   - Upload image ke `assets/products/` folder

4. **SEO:**
   - Gunakan keywords yang relevan
   - Title harus deskriptif
   - Description untuk snippet Google

## ⚙️ Advanced Usage (Future)

Planned features:
- Auto-upload images ke `/assets/products/`
- Auto-commit dan push ke GitHub
- Template variations untuk artikel berbeda
- Batch create multiple products
- Image optimization

## 🐛 Troubleshooting

**Issue:** `Cannot find module 'inquirer'`
```bash
npm install
```

**Issue:** File tidak tersimpan
- Check folder permissions
- Pastikan path sudah benar

**Issue:** Slug tidak sesuai
- Bot menggunakan slugify
- Spasi & karakter khusus di-convert otomatis

## 📝 License

MIT

## 👨‍💼 Author

Kharisma Steel Bandung

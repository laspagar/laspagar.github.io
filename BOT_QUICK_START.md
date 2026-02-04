# 🚀 Quick Start Guide - Bot Posting & New Product

## ✅ Yang Sudah Selesai

### 1️⃣ Node.js Bot Template untuk Posting Artikel
**Lokasi:** `/bot-posting/`

Struktur lengkap siap digunakan:
```
bot-posting/
├── package.json              # Dependencies
├── README.md                 # Dokumentasi lengkap
├── bin/
│   ├── create-article.js     # CLI untuk buat artikel
│   └── create-product.js     # CLI untuk buat produk
└── utils/
    └── helper.js             # Helper functions
```

### 2️⃣ 1 Produk Baru Ditambahkan
**Produk:** Kanopi Spandek Termurah Setu Bekasi  
**File:** `_products/kanopi-spandek-termurah-setu-bekasi.md`  
**Kategori:** Kanopi  
**Harga:** Rp 550.000 / m²  
**Status:** ✅ Live & Terintegrasi

---

## 🎯 Cara Menggunakan Bot

### Setup Pertama Kali

```bash
cd bot-posting
npm install
```

### 1. Membuat Artikel Baru

```bash
npm run post:article
```

**Input yang diminta:**
- 📝 Judul artikel
- 📄 Deskripsi singkat
- 📋 Konten artikel
- 🏷️ Kategori (pilih multiple)
- 🔖 Tags (comma-separated)
- 👤 Nama author

**Output:** File markdown di `_posts/YYYY-MM-DD-judul.md`

### 2. Membuat Produk Baru

```bash
npm run post:product
```

**Input yang diminta:**
- 📦 Nama produk
- 💰 Harga
- 📂 Kategori
- 📝 Deskripsi
- 🖼️ Path gambar
- 🔍 Keywords SEO
- 📋 Konten detail (opsional)

**Output:** File markdown di `_products/nama-produk.md`

---

## 📊 Statistik Produk Terkini

**Total Produk:** 12 items

### Breakdown by Category:
| Kategori | Jumlah | Examples |
|----------|--------|----------|
| **Kanopi** | 6 | Alderon, Kordoba, Kaca Stainless, Mezzanine, Spandek |
| **Pagar** | 2 | Laser Cutting, Motif WPC & Besi |
| **Tangga** | 1 | Tangga Besi Minimalis |
| **Railing** | 1 | Balkon Klasik Tempa |
| **Pintu** | 1 | Pintu Klasik Besi |
| **Lainnya** | 1 | (Reserved untuk kategori baru) |

---

## 🆕 Detail Produk Baru

### Kanopi Spandek Termurah Setu Bekasi

**Fitur Unggulan:**
- ✅ Harga paling terjangkau (Rp 550k/m²)
- ✅ Material SNI berkualitas
- ✅ Tahan 10-15 tahun
- ✅ Finishing galvanis anti-karat
- ✅ Instalasi cepat 2-3 hari
- ✅ Perawatan minimal

**Use Cases:**
- Carport rumah
- Teras sederhana
- Area gudang
- Parkir semi-permanen
- Toko/Warung outdoor

**Perbandingan Harga:**
- Spandek: **Rp 550.000/m²** ← Ekonomis
- Alderon: Rp 750.000/m²
- Kordoba: Rp 1.100.000/m²

---

## 💡 Tips Menggunakan Bot

### Best Practices

1. **Untuk Artikel:**
   ```bash
   npm run post:article
   ```
   - Pilih kategori yang relevan (minimal 1)
   - Gunakan tags yang spesifik (3-5 tags ideal)
   - Konten bisa diisi nanti atau di editor
   - Pastikan slug otomatis unik

2. **Untuk Produk:**
   ```bash
   npm run post:product
   ```
   - Image path HARUS di `/assets/products/`
   - Keywords penting untuk SEO
   - Content bisa template otomatis atau custom
   - Title harus deskriptif & SEO-friendly

### Automation Ideas (Advanced)

Bisa customize bot untuk:
```javascript
// Create article programmatically
const { createArticle } = require('./utils/helper.js');

createArticle({
    title: 'Memilih Kanopi yang Tepat',
    description: 'Panduan lengkap...',
    content: 'Artikel content...',
    categories: ['kanopi', 'tips'],
    tags: ['kanopi', 'material', 'desain']
});
```

---

## 📱 Products Page Update

**URL:** `/products/`

**Fitur Terbaru:**
- ✅ Grid responsive (2-3-4 kolom)
- ✅ Product cards dengan gambar & badge
- ✅ Pagination (9 items per page)
- ✅ Sidebar kategori
- ✅ Filter by category
- ✅ Latest articles sidebar

**Dengan 12 produk:**
- Halaman 1: 9 produk
- Halaman 2: 3 produk (akan muncul jika load page 2)

---

## 🔗 Links Penting

### Dalam Repo:
- Bot: `/bot-posting/`
- Produk: `/_products/`
- Artikel: `/_posts/`
- Products Page: `/products/`

### External:
- Site URL: `https://kharismasteel.github.io`
- WhatsApp: `https://wa.me/6281320087982`

---

## ⚡ Next Steps

### Untuk Admin/Content Team:

1. **Gunakan bot untuk posting:**
   ```bash
   cd bot-posting && npm install
   npm run post:article  # Buat artikel
   npm run post:product  # Buat produk
   ```

2. **Upload gambar produk:**
   - Simpan ke `/assets/products/`
   - Gunakan naming: `nama-produk.jpg`
   - Optimal size: 800x800px JPG/PNG

3. **Setelah posting:**
   ```bash
   git add .
   git commit -m "Add: Nama Produk"
   git push origin main
   ```

4. **Auto-deploy:**
   - GitHub Pages otomatis build
   - Live dalam 2-5 menit

### Untuk Developer:

- Edit template di `/bot-posting/bin/` jika perlu customize
- Extend helper functions di `/bot-posting/utils/helper.js`
- Tambah kategori baru di dalam prompts
- Setup auto-commit/push (opsional)

---

## 🎉 Siap!

Bot template + produk baru sudah ready.  
Tinggal mulai menggunakan dan posting! 

Setiap artikel/produk baru akan otomatis terintegrasi ke Jekyll site.

---

*Last updated: 22 Dec 2025*  
*Kharisma Steel - Bengkel Las Terbaik di Setu Bekasi*

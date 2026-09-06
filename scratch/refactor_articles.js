const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "../_posts");

if (!fs.existsSync(POSTS_DIR)) {
  console.error("❌ _posts directory not found!");
  process.exit(1);
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".markdown"));

console.log(`📋 Found ${files.length} article files in _posts/\n`);

// Title mapping for natural, high-converting titles
const titleReplacements = {
  "2025-12-04-studi-kasus-kanopi-kordoba-setu-bekasi.md": "Studi Kasus Pemasangan Kanopi Kordoba Minimalis Tahan Cuaca",
  "2025-12-06-railing-balkon-pilihan-material-setu-bekasi.md": "Panduan Memilih Material Railing Balkon Minimalis & Besi Tempa",
  "2025-12-08-memasang-tangga-besi-tips-setu-bekasi.md": "Tips Merancang Tangga Besi Minimalis Hemat Ruang untuk Rumah Tipe 36",
  "2025-12-10-inspirasi-pagar-laser-cut-setu-bekasi.md": "Inspirasi Model Pagar Plat Laser Cutting Modern untuk Rumah Minimalis",
  "2025-12-12-biaya-pasang-kanopi-estimasi-setu-bekasi.md": "Estimasi Rincian Biaya Pasang Kanopi Besi & Alderon per Meter 2026",
  "2025-12-14-finishing-powdercoat-vs-galvanis-setu-bekasi.md": "Perbandingan Finishing Cat Powder Coating vs Galvanis Anti Karat",
  "2025-12-16-panduan-ukuran-kanopi-setu-bekasi.md": "Panduan Menghitung Ukuran Rangka Kanopi Carport Rumah Minimalis",
  "2025-12-18-memilih-material-kanopi-setu-bekasi.md": "Memilih Atap Kanopi Terbaik: Alderon, Solarflat, atau Tempered Glass?",
  "2025-12-20-cara-merawat-pagar-besi-setu-bekasi.md": "Tips Perawatan Pagar Besi Minimalis Agar Tetap Mengkilap & Bebas Karat",
  "2025-12-22-trend-kanopi-minimalis-2025-setu-bekasi.md": "Tren Desain Kanopi Minimalis Modern Paling Populer di Priangan Timur",
  "2025-12-28-folding-gate-besi-galvanis-setu-bekasi.md": "Keunggulan Pintu Folding Gate Besi Galvanis untuk Toko & Ruko",
  "2025-12-28-harga-pintu-garasi-besi-per-meter.md": "Estimasi Harga Pintu Garasi Besi Minimalis per Meter 2026",
  "2025-12-28-harga-pintu-lipat-besi-setu-bekasi-2025.md": "Panduan Memilih Pintu Lipat Besi Toko & Garasi Tahan Lama",
  "2025-12-28-jasa-pintu-lipat-besi-custom-setu-bekasi.md": "Layanan Pembuatan Pintu Lipat Besi Custom Kualitas Premium",
  "2025-12-28-kanopi-kaca-tempered-setu-bekasi.md": "Kanopi Kaca Tempered Stainless Steel: Mewah, Sejuk, & Tahan Benturan",
  "2025-12-28-model-pintu-garasi-minimalis-terbaru.md": "Rekomendasi Model Pintu Garasi Lipat Besi Minimalis Modern",
  "2025-12-28-pagar-woodplank-vs-kayu-setu-bekasi.md": "Perbandingan Pagar Woodplank GRC vs Kayu Alami Tahan Hujan",
  "2025-12-28-panduan-kanopi-mezzanine-setu-bekasi.md": "Panduan Membuat Kanopi Mezzanine Besi untuk Tambahan Ruang Rumah",
  "2025-12-28-panduan-tangga-besi-setu-bekasi.md": "Panduan Desain Tangga Besi Putar & Tangga Rebah Rumah Minimalis",
  "2025-12-28-pintu-garasi-lipat-manual-otomatis-setu-bekasi.md": "Pilihan Pintu Garasi Lipat Manual vs Otomatis Remote Control",
  "2025-12-28-pintu-garasi-murah-setu-bekasi-terlengkap.md": "Panduan Lengkap Pintu Garasi Besi Minimalis Berkualitas SNI",
  "2025-12-28-pintu-lipat-besi-garasi-toko-setu-bekasi.md": "Aplikasi Pintu Lipat Besi untuk Garasi Rumah & Ruko Komersial",
  "2026-06-26-jasa-pasang-kanopi-minimalis-sekolah-priangan-timur-harga-murah.md": "Solusi Kanopi Minimalis Sekolah Tahan Cuaca & Bergaransi Resmi",
  "2026-06-27-rekomendasi-bengkel-las-kanopi-sekolah-priangan-timur-bergaransi.md": "Rekomendasi Bengkel Las Konstruksi Kanopi Sekolah Priangan Timur"
};

const productLinkBlock = `

---

### 🛍️ Rekomendasi Produk & Katalog Terkait Kinglas Tehnik

Untuk melihat sampel desain real, spesifikasi material besi SNI, dan estimasi biaya pembuatan secara mendalam, jelajahi katalog produk resmi kami:

- 🏠 **[Katalog Lengkap 1.000+ Produk Kinglas Tehnik](/products/)**
- ☀️ **[Pasang Kanopi Alderon Double Layer & Kaca Tempered](/products/kanopi-alderon-murah-cirebon)**
- 🚪 **[Pintu Lipat Besi Galvanis Anti Karat untuk Garasi & Toko](/products/pintu-lipat-galvanis-anti-karat)**
- 🪜 **[Desain Tangga Besi Minimalis & Mezzanine](/products/desain-tangga-besi-minimalis)**
- 🛡️ **[Pagar Plat Laser Cutting Custom Motif Modern](/products/pagar-plat-laser-cutting-cimahi-setu-bekasi)**

📲 **Konsultasi & Survey Lokasi Gratis:**
Dapatkan penawaran harga resmi dan pengukuran gratis untuk area **Tasikmalaya, Banjar, Ciamis, Cirebon, Pangandaran, Garut, Majalengka, Sumedang, dan Kuningan**. Hubungi kami via [WhatsApp 0821-2062-9736](https://wa.me/6282120629736).

`;

let updatedCount = 0;

for (const filename of files) {
  const filepath = path.join(POSTS_DIR, filename);
  let content = fs.readFileSync(filepath, "utf-8");

  // 1. Hapus kata "Pemalang" atau "Setu Bekasi" dari teks
  content = content
    .replace(/pemalang/gi, "Priangan Timur")
    .replace(/setu bekasi/gi, "Priangan Timur")
    .replace(/bekasi/gi, "Priangan Timur");

  // 2. Ganti Judul Front-Matter & H1 jika ada di map
  const newTitle = titleReplacements[filename];
  if (newTitle) {
    content = content.replace(/^title:\s*"?[^"\r\n]+"?/m, `title: "${newTitle}"`);
    content = content.replace(/^#\s+[^\r\n]+/m, `# ${newTitle}`);
  }

  // 3. Sisipkan Product Link Block jika belum ada
  if (!content.includes("Rekomendasi Produk & Katalog Terkait Kinglas Tehnik") && !content.includes("/products/")) {
    // Sisipkan sebelum section kontak/kesimpulan atau di paling bawah
    if (content.includes("## Kesimpulan")) {
      content = content.replace("## Kesimpulan", productLinkBlock + "\n## Kesimpulan");
    } else if (content.includes("## Hubungi Kami")) {
      content = content.replace("## Hubungi Kami", productLinkBlock + "\n## Hubungi Kami");
    } else {
      content = content + productLinkBlock;
    }
  } else if (!content.includes("Rekomendasi Produk & Katalog Terkait Kinglas Tehnik")) {
    content = content + productLinkBlock;
  }

  fs.writeFileSync(filepath, content, "utf-8");
  updatedCount++;
  console.log(`✅ Updated: ${filename}`);
}

console.log(`\n🎉 Successfully updated ${updatedCount} articles!`);

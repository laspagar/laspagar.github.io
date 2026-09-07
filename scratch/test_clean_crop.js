const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('../scripts/product-generator/node_modules/sharp');
const { processBrandedFrame } = require('../scripts/product-generator/frame-processor');

function downloadRaw(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', (e) => { fs.unlink(filepath, () => {}); reject(e); });
      } else if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        downloadRaw(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function run() {
  const url = 'https://artfasad.com/wp-content/uploads/2024/01/entrance-canopy-design-22.jpg';
  const rawPath = path.join(__dirname, 'test_clean_raw.jpg');
  const outPath = path.join(__dirname, 'test_clean_framed.webp');

  console.log('Downloading clean sample...');
  await downloadRaw(url, rawPath);

  console.log('Processing with frame and inward zoom...');
  // Inward zoom 1.08x to eliminate any edge / corner logos
  const meta = await sharp(rawPath).metadata();
  const cropW = Math.round(meta.width * 0.90);
  const cropH = Math.round(meta.height * 0.90);
  const left = Math.round((meta.width - cropW) / 2);
  const top = Math.round((meta.height - cropH) / 2);

  const cleanBuffer = await sharp(rawPath)
    .extract({ left, top, width: cropW, height: cropH })
    .toBuffer();

  await processBrandedFrame(cleanBuffer, outPath, 'Rp 550.000 / m²', {
    title: 'KANOPI ENTRANCE MINIMALIS MODERN',
    paletteIndex: 0,
    titleOpacity: 0.52
  });

  console.log('Done:', outPath);
}

run().catch(console.error);

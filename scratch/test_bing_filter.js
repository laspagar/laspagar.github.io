async function testBing() {
  const query = 'modern minimalist canopy residential architecture photography -watermark -logo -text -phone -banner -bengkel -iklan';
  const url = 'https://www.bing.com/images/search?q=' + encodeURIComponent(query) + '&form=HDRSC2&qft=+filterui:imagesize-large+filterui:photo-photo';
  
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  
  const html = await res.text();
  const regex = /mediaurl=([^&"'\s]+)/gi;
  let match;
  const urls = [];
  while ((match = regex.exec(html)) !== null && urls.length < 15) {
    const raw = decodeURIComponent(match[1]);
    urls.push(raw);
  }
  
  console.log('Total URLs found:', urls.length);
  urls.forEach((u, idx) => console.log(`[${idx + 1}] ${u}`));
}

testBing();

---
layout: default
title: Produk
permalink: /products/
---


# Layanan & Produk

Pilihan produk konstruksi besi unggulan kami. Klik sebuah produk untuk melihat detailnya.

<div class="grid md:grid-cols-3 gap-6 mt-6">
  {% for p in site.products %}
  <div class="product-card p-4">
    <h3 class="font-bold"><a href="{{ p.url }}">{{ p.title }}</a></h3>
    {% if p.price %}<p class="text-sm text-slate-500">{{ p.price }}</p>{% endif %}
  </div>
  {% endfor %}
</div>

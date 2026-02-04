// Simple example of using the bot programmatically
// For more advanced automation

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const dayjs = require('dayjs');

/**
 * Create article programmatically
 * @param {Object} options - Article options
 * @param {string} options.title - Article title
 * @param {string} options.description - Article description
 * @param {string} options.content - Article content
 * @param {Array} options.categories - Categories
 * @param {Array} options.tags - Tags
 * @param {string} options.author - Author name
 */
function createArticle(options) {
    const {
        title,
        description,
        content = '',
        categories = [],
        tags = [],
        author = 'Kharisma Steel'
    } = options;

    const now = dayjs();
    const dateStr = now.format('YYYY-MM-DD');
    const slug = slugify(title, { lower: true, strict: true });
    const filename = `${dateStr}-${slug}.md`;
    const filepath = path.join(__dirname, '..', '_posts', filename);

    const frontmatter = `---
layout: post
title: "${title}"
date: ${now.format('YYYY-MM-DD HH:mm:ss Z')}
author: ${author}
description: ${description}
categories: [${categories.join(', ')}]
tags: [${tags.join(', ')}]
---

${content}
`;

    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, frontmatter);

    return { filepath, filename, title, dateStr };
}

/**
 * Create product programmatically
 * @param {Object} options - Product options
 */
function createProduct(options) {
    const {
        title,
        price,
        category,
        description,
        image = '/assets/products/placeholder.jpg',
        keywords = '',
        content = ''
    } = options;

    const slug = slugify(title, { lower: true, strict: true });
    const filename = `${slug}.md`;
    const filepath = path.join(__dirname, '..', '_products', filename);

    const frontmatter = `---
title: ${title}
price: ${price}
category: ${category}
image: ${image}
description: ${description}
keywords: ${keywords}
---

${content}
`;

    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, frontmatter);

    return { filepath, filename, title, category };
}

module.exports = {
    createArticle,
    createProduct
};

// Example usage:
/*
const { createArticle, createProduct } = require('./utils/helper');

// Create article
createArticle({
    title: 'Tips Memilih Kanopi yang Tepat',
    description: 'Panduan lengkap memilih material dan desain kanopi',
    content: 'Artikel lengkap di sini...',
    categories: ['kanopi', 'tips'],
    tags: ['kanopi', 'material', 'desain'],
    author: 'Kharisma Steel'
});

// Create product
createProduct({
    title: 'Kanopi Minimalis PVC',
    price: 'Rp 1.200.000 / m²',
    category: 'Kanopi',
    description: 'Kanopi minimalis dengan plafon PVC tahan lama',
    image: '/assets/products/kanopi-pvc-minimalis.jpg',
    keywords: 'kanopi, minimalis, pvc, setu bekasi'
});
*/

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const slugify = require('slugify');
const chalk = require('chalk');

const PRODUCTS_DIR = path.join(__dirname, '../', '_products');

async function createProduct() {
    console.log(chalk.cyan.bold('\n📦 Create New Product\n'));

    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Product Title:',
                validate: (input) => input.length > 0 ? true : 'Title cannot be empty',
            },
            {
                type: 'input',
                name: 'price',
                message: 'Product Price (e.g., Rp 1.500.000 / m):',
                validate: (input) => input.length > 0 ? true : 'Price cannot be empty',
            },
            {
                type: 'list',
                name: 'category',
                message: 'Product Category:',
                choices: [
                    'Kanopi',
                    'Pagar',
                    'Tangga',
                    'Railing',
                    'Pintu',
                ],
            },
            {
                type: 'input',
                name: 'description',
                message: 'Product Description (short):',
                validate: (input) => input.length > 0 ? true : 'Description cannot be empty',
            },
            {
                type: 'input',
                name: 'image',
                message: 'Image path (e.g., /assets/products/product-name.jpg):',
                default: '/assets/products/placeholder.jpg',
            },
            {
                type: 'input',
                name: 'keywords',
                message: 'Keywords (comma-separated):',
            },
            {
                type: 'input',
                name: 'content',
                message: 'Detailed content (or leave empty to edit later):',
                default: '',
            },
        ]);

        // Generate filename
        const slug = slugify(answers.title, { lower: true, strict: true });
        const filename = `${slug}.md`;
        const filepath = path.join(PRODUCTS_DIR, filename);

        // Generate frontmatter
        const keywords = answers.keywords
            ? answers.keywords.split(',').map(k => k.trim()).join(', ')
            : answers.title;

        const frontmatter = `---
title: ${answers.title}
price: ${answers.price}
category: ${answers.category}
image: ${answers.image}
description: ${answers.description}
keywords: ${keywords}
---

${answers.content || `## ${answers.title}

${answers.description}

### Spesifikasi
- Material berkualitas SNI
- Finishing tahan karat
- Desain minimalis dan modern
- Instalasi profesional

### Keunggulan
- Produk terbaik kualitasnya
- Harga kompetitif
- Garansi kepuasan
- Layanan purna jual terbaik

Hubungi kami untuk konsultasi gratis dan penawaran terbaik.
`}
`;

        // Write file
        fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
        fs.writeFileSync(filepath, frontmatter);

        console.log(chalk.green.bold('\n✅ Product created successfully!\n'));
        console.log(chalk.gray(`File: ${filepath}`));
        console.log(chalk.gray(`Title: ${answers.title}`));
        console.log(chalk.gray(`Category: ${answers.category}`));
        console.log(chalk.gray(`Price: ${answers.price}`));
        console.log(chalk.yellow('\n💡 Next steps:'));
        console.log(chalk.gray('1. Edit the product details in the created file'));
        console.log(chalk.gray('2. Upload product image to /assets/products/'));
        console.log(chalk.gray('3. Test on products page\n'));

    } catch (error) {
        console.error(chalk.red.bold('\n❌ Error creating product:'), error.message);
        process.exit(1);
    }
}

createProduct();

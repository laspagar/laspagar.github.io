#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const slugify = require('slugify');
const dayjs = require('dayjs');
const chalk = require('chalk');

const POSTS_DIR = path.join(__dirname, '../', '_posts');
const SITE_ROOT = path.join(__dirname, '../');

async function createArticle() {
    console.log(chalk.cyan.bold('\n📝 Create New Blog Article\n'));

    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Article Title:',
                validate: (input) => input.length > 0 ? true : 'Title cannot be empty',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Short Description (for excerpt):',
                validate: (input) => input.length > 0 ? true : 'Description cannot be empty',
            },
            {
                type: 'input',
                name: 'content',
                message: 'Article Content (or leave empty to edit later):',
                default: '',
            },
            {
                type: 'checkbox',
                name: 'categories',
                message: 'Select Categories:',
                choices: [
                    'kanopi',
                    'pagar',
                    'tangga',
                    'balkon',
                    'pintu',
                    'studi-kasus',
                    'finishing',
                    'tips',
                    'harga'
                ],
            },
            {
                type: 'input',
                name: 'tags',
                message: 'Tags (comma-separated):',
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author:',
                default: 'Kharisma Steel',
            },
        ]);

        // Generate filename
        const now = dayjs();
        const dateStr = now.format('YYYY-MM-DD');
        const slug = slugify(answers.title, { lower: true, strict: true });
        const filename = `${dateStr}-${slug}.md`;
        const filepath = path.join(POSTS_DIR, filename);

        // Generate frontmatter
        const frontmatter = `---
layout: post
title: "${answers.title}"
date: ${now.format('YYYY-MM-DD HH:mm:ss Z')}
author: ${answers.author}
description: ${answers.description}
categories: [${answers.categories.join(', ')}]
tags: [${answers.tags.split(',').map(t => t.trim()).join(', ')}]
---

${answers.content || '<!-- Add your article content here -->'}
`;

        // Write file
        fs.mkdirSync(POSTS_DIR, { recursive: true });
        fs.writeFileSync(filepath, frontmatter);

        console.log(chalk.green.bold('\n✅ Article created successfully!\n'));
        console.log(chalk.gray(`File: ${filepath}`));
        console.log(chalk.gray(`Title: ${answers.title}`));
        console.log(chalk.gray(`Date: ${dateStr}`));
        console.log(chalk.yellow('\n💡 Next steps:'));
        console.log(chalk.gray('1. Edit the article in the created file'));
        console.log(chalk.gray('2. Add images if needed'));
        console.log(chalk.gray('3. Commit and push to GitHub\n'));

    } catch (error) {
        console.error(chalk.red.bold('\n❌ Error creating article:'), error.message);
        process.exit(1);
    }
}

createArticle();

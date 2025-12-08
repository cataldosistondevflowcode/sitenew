/**
 * Script para injetar configurações do Webflow no HTML
 * Execute: node scripts/inject-webflow-config.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Buscar todos os arquivos HTML no dist/
const distDir = path.join(__dirname, '../dist');
const htmlFiles = [];

if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            htmlFiles.push(path.join(distDir, file));
        }
    });
}

// Garantir que blog.html e blogpost.html estão na lista
const blogHtml = path.join(distDir, 'blog.html');
const blogpostHtml = path.join(distDir, 'blogpost.html');

if (fs.existsSync(blogHtml) && !htmlFiles.includes(blogHtml)) {
    htmlFiles.push(blogHtml);
}
if (fs.existsSync(blogpostHtml) && !htmlFiles.includes(blogpostHtml)) {
    htmlFiles.push(blogpostHtml);
}

const webflowToken = process.env.VITE_WEBFLOW_API_TOKEN || '';

if (!webflowToken) {
    console.warn('⚠️  Variável VITE_WEBFLOW_API_TOKEN não encontrada no .env');
    console.warn('   Adicione-a ao arquivo .env para usar o Webflow CMS');
}

htmlFiles.forEach(htmlPath => {
    if (!fs.existsSync(htmlPath)) {
        console.warn(`⚠️  Arquivo não encontrado: ${htmlPath}`);
        return;
    }

    let html = fs.readFileSync(htmlPath, 'utf8');

    // Atualizar meta tag do token
    const tokenMetaPattern = /<meta\s+name="webflow-api-token"\s+content="[^"]*">/;
    const tokenMetaReplacement = `<meta name="webflow-api-token" content="${webflowToken}">`;
    
    if (tokenMetaPattern.test(html)) {
        html = html.replace(tokenMetaPattern, tokenMetaReplacement);
        console.log(`✅ Token do Webflow injetado em ${path.basename(htmlPath)}`);
    } else {
        // Adicionar meta tag se não existir
        const headPattern = /(<head[^>]*>)/;
        if (headPattern.test(html)) {
            html = html.replace(headPattern, `$1\n    ${tokenMetaReplacement}`);
            console.log(`✅ Meta tag do Webflow adicionada em ${path.basename(htmlPath)}`);
        }
    }

    fs.writeFileSync(htmlPath, html, 'utf8');
});

console.log('✅ Configuração do Webflow injetada com sucesso!');


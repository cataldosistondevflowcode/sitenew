import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Criar diretório dist se não existir
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// IMPORTANTE: O Vite limpa o dist/ antes do build, então os arquivos HTML estáticos
// precisam ser copiados do git após o build.

// Criar arquivo .nojekyll para o GitHub Pages não processar com Jekyll
const nojekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('✅ Arquivo .nojekyll criado!');

// Lista de arquivos HTML estáticos que devem estar no dist/
const htmlFiles = [
  'blog.html',
  'blogpost.html',
  'imovel.html',
  'imoveis-rj.html',
  'imoveis-sp.html',
  'assessoria.html',
  'casos-reais.html',
  'contato.html',
  'direito-imobiliario.html',
  'distrato-imobiliario.html',
  'escritorio-imobiliario.html',
  'index.html'
];

// Copiar arquivos HTML do git para o dist/ se não existirem
htmlFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    try {
      // Copiar do git se existir
      const gitPath = `dist/${file}`;
      execSync(`git show HEAD:${gitPath} > "${filePath}"`, { cwd: rootDir, stdio: 'pipe' });
      console.log(`✅ ${file} copiado do git`);
    } catch (error) {
      console.warn(`⚠️ ${file} não encontrado no git`);
    }
  } else {
    console.log(`✅ ${file} já existe`);
  }
});

console.log('✅ Processo concluído!');


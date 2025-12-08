import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Criar diretório dist se não existir
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// IMPORTANTE: O Vite limpa o dist/ antes do build, então os arquivos HTML estáticos
// precisam ser preservados. Este script garante que o .nojekyll existe.
// Os arquivos HTML devem estar versionados no git e serão restaurados após o build.

// Criar arquivo .nojekyll para o GitHub Pages não processar com Jekyll
const nojekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('✅ Arquivo .nojekyll criado!');

// Verificar se os arquivos HTML importantes existem
const importantFiles = [
  'blog.html',
  'blogpost.html',
  'imovel.html',
  'imoveis-rj.html',
  'imoveis-sp.html',
  'index.html'
];

let missingFiles = [];
importantFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.warn(`⚠️ Arquivos HTML não encontrados no dist/: ${missingFiles.join(', ')}`);
  console.warn('⚠️ Certifique-se de que os arquivos estão versionados no git e serão restaurados após o build.');
} else {
  console.log('✅ Todos os arquivos HTML importantes estão presentes no dist/');
}


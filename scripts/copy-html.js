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
// precisam ser restaurados do git após o build.

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

// Verificar quais arquivos estão faltando
let missingFiles = [];
htmlFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.warn(`⚠️ Arquivos HTML não encontrados no dist/: ${missingFiles.join(', ')}`);
  console.warn('⚠️ Estes arquivos devem estar versionados no git em dist/');
  console.warn('⚠️ Em produção (GitHub Actions), eles serão restaurados do git automaticamente.');
} else {
  console.log('✅ Todos os arquivos HTML estão presentes no dist/');
}


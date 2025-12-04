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

// Criar arquivo .nojekyll para o GitHub Pages não processar com Jekyll
const nojekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('✅ Arquivo .nojekyll criado!');


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const backupDir = path.join(rootDir, '.html-backup');

// Criar diretório dist se não existir
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// IMPORTANTE: O Vite limpa o dist/ antes do build, então os arquivos HTML estáticos
// precisam ser preservados. Fazemos backup antes do build e restauramos depois.

// Criar arquivo .nojekyll para o GitHub Pages não processar com Jekyll
const nojekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('✅ Arquivo .nojekyll criado!');

// Lista de arquivos HTML estáticos que devem estar no dist/
// IMPORTANTE: index.html é gerado pelo Vite, NÃO copiar do git
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
  'escritorio-imobiliario.html'
  // index.html é gerado pelo Vite com os caminhos corretos baseados em VITE_BASE_PATH
];

// O backup é feito no prebuild hook, não aqui

// SEMPRE priorizar arquivos locais editados
// 1. Se houver backup (arquivo foi editado), restaurar do backup
// 2. Se não houver backup mas arquivo existe em dist/, manter (pode ter sido editado durante o build)
// 3. Só usar git como último recurso se arquivo não existir

htmlFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  const backupPath = path.join(backupDir, file);
  
  if (fs.existsSync(backupPath)) {
    // PRIORIDADE 1: Restaurar do backup (arquivo editado antes do build)
    fs.copyFileSync(backupPath, filePath);
    console.log(`✅ ${file} restaurado do backup (versão editada)`);
  } else if (fs.existsSync(filePath)) {
    // PRIORIDADE 2: Arquivo já existe (pode ter sido editado durante o build ou já estava lá)
    console.log(`✅ ${file} já existe (preservado)`);
  } else {
    // PRIORIDADE 3: Só usar git como último recurso
    try {
      const gitPath = `dist/${file}`;
      execSync(`git show HEAD:${gitPath} > "${filePath}"`, { cwd: rootDir, stdio: 'pipe' });
      console.log(`⚠️ ${file} copiado do git (fallback - arquivo não encontrado localmente)`);
    } catch (error) {
      console.warn(`❌ ${file} não encontrado no git nem localmente`);
    }
  }
});

console.log('✅ Processo concluído!');


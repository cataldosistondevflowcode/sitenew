import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const backupDir = path.join(rootDir, '.html-backup');

// Lista de arquivos HTML estáticos
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
];

// Criar diretório de backup
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Fazer backup dos arquivos HTML editados ANTES do build
// Isso garante que arquivos editados manualmente em dist/ sejam preservados
let backedUp = 0;
htmlFiles.forEach(file => {
  const sourcePath = path.join(distDir, file);
  if (fs.existsSync(sourcePath)) {
    const backupPath = path.join(backupDir, file);
    // Criar diretório de backup se não existir
    const backupFileDir = path.dirname(backupPath);
    if (!fs.existsSync(backupFileDir)) {
      fs.mkdirSync(backupFileDir, { recursive: true });
    }
    fs.copyFileSync(sourcePath, backupPath);
    backedUp++;
    console.log(`💾 Backup de ${file} criado`);
  }
});

if (backedUp > 0) {
  console.log(`✅ Backup de ${backedUp} arquivo(s) HTML criado antes do build`);
} else {
  console.log(`ℹ️ Nenhum arquivo HTML encontrado em dist/ para backup (normal se for primeiro build)`);
}


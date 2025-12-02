/**
 * Script para injetar configurações do Supabase no HTML
 * Execute: node scripts/inject-supabase-config.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const htmlPath = path.join(__dirname, '../imoveis-rj.html');

if (!fs.existsSync(htmlPath)) {
  console.error('❌ Arquivo imoveis-rj.html não encontrado');
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não encontradas no .env');
  console.warn('   Adicione-as ao arquivo .env para usar o Supabase');
  process.exit(0);
}

// Substitui a configuração do Supabase no HTML
const configScript = `
    // Configuração do Supabase (injetada automaticamente do .env)
    window.SUPABASE_URL = '${supabaseUrl}';
    window.SUPABASE_ANON_KEY = '${supabaseKey}';
`;

// Procura pelo script de configuração e substitui
const configPattern = /<script>\s*\/\/ Configuração do Supabase[\s\S]*?<\/script>/;
const replacement = `<script>${configScript}</script>`;

if (configPattern.test(html)) {
  html = html.replace(configPattern, replacement);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ Configuração do Supabase injetada com sucesso no imoveis-rj.html');
} else {
  // Se não encontrar, adiciona após o script do Supabase
  const supabaseScriptPattern = /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2[^<]*<\/script>/;
  if (supabaseScriptPattern.test(html)) {
    html = html.replace(
      supabaseScriptPattern,
      `$&${replacement}`
    );
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('✅ Configuração do Supabase adicionada ao imoveis-rj.html');
  } else {
    console.error('❌ Não foi possível encontrar o local para injetar a configuração');
    process.exit(1);
  }
}


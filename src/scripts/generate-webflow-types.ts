/**
 * Script para gerar tipos TypeScript baseados nas Collections do Webflow
 * 
 * Execute: npm run generate-webflow-types
 */

// IMPORTANTE: Carregar dotenv ANTES de qualquer import
import { config } from 'dotenv';
import { resolve } from 'path';
import { writeFile } from 'fs/promises';

// Carrega variáveis de ambiente
config({ path: resolve(process.cwd(), '.env') });

const { generateTypes } = await import('../lib/webflow/generate-types.js');

async function main() {
  try {
    console.log('🔍 Gerando tipos TypeScript das Collections do Webflow...\n');
    const types = await generateTypes();
    const outputPath = resolve(process.cwd(), 'src/lib/webflow/generated-types.ts');
    await writeFile(outputPath, types, 'utf-8');
    console.log('✅ Tipos gerados com sucesso em:', outputPath);
  } catch (error) {
    console.error('❌ Erro ao gerar tipos:');
    if (error instanceof Error) {
      console.error('Mensagem:', error.message);
      console.error('\nStack:', error.stack);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

main();

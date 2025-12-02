/**
 * Script para testar a conexão com a Webflow API
 * 
 * Execute: npm run test-webflow
 */

// IMPORTANTE: Carregar dotenv ANTES de qualquer import que use process.env
import { config } from 'dotenv';
import { resolve } from 'path';

// Carrega variáveis de ambiente do arquivo .env
const envResult = config({ path: resolve(process.cwd(), '.env') });

if (envResult.error) {
  console.error('⚠️  Erro ao carregar .env:', envResult.error.message);
  console.error('   Tentando continuar com variáveis do sistema...\n');
} else {
  console.log('✅ Arquivo .env carregado com sucesso\n');
}

// Debug: mostra as variáveis carregadas
console.log('Variáveis carregadas:');
console.log('  VITE_WEBFLOW_API_TOKEN:', process.env.VITE_WEBFLOW_API_TOKEN ? '✅ Configurado' : '❌ Não encontrado');
console.log('  VITE_WEBFLOW_SITE_ID:', process.env.VITE_WEBFLOW_SITE_ID ? '✅ Configurado' : '❌ Não encontrado');
console.log('  VITE_WEBFLOW_PROPERTIES_COLLECTION_ID:', process.env.VITE_WEBFLOW_PROPERTIES_COLLECTION_ID ? '✅ Configurado' : '❌ Não encontrado');
console.log('');

// Agora importa os módulos que dependem de process.env
const { getCollections, getCollectionItems } = await import('../lib/webflow/index.js');
const { WEBFLOW_CONFIG } = await import('../lib/webflow/config.js');

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com Webflow API...\n');
    console.log('Site ID:', WEBFLOW_CONFIG.siteId);
    console.log('Token:', WEBFLOW_CONFIG.token ? WEBFLOW_CONFIG.token.substring(0, 20) + '...' : 'NÃO CONFIGURADO');
    console.log('');

    if (!WEBFLOW_CONFIG.token) {
      throw new Error('VITE_WEBFLOW_API_TOKEN não configurado no .env');
    }

    if (!WEBFLOW_CONFIG.siteId) {
      throw new Error('VITE_WEBFLOW_SITE_ID não configurado no .env');
    }

    // Teste 1: Listar collections
    console.log('📋 Listando collections...');
    const collections = await getCollections();
    console.log(`✅ Encontradas ${collections.length} collections:\n`);
    
    collections.forEach((collection) => {
      console.log(`  - ${collection.displayName} (${collection.singularName})`);
      console.log(`    ID: ${collection.id}`);
      console.log(`    Slug: ${collection.slug}`);
      console.log(`    Campos: ${collection.fields?.length || 0}\n`);
    });

    // Teste 2: Buscar items da collection de imóveis
    const propertiesCollectionId = process.env.VITE_WEBFLOW_PROPERTIES_COLLECTION_ID || '69103abe35607f9876aac632';
    
    if (propertiesCollectionId) {
      console.log('🏠 Buscando items da collection de imóveis...');
      console.log(`Collection ID: ${propertiesCollectionId}\n`);
      
      const response = await getCollectionItems(propertiesCollectionId, { limit: 5 });
      console.log(`✅ Encontrados ${response.items.length} items (de ${response.pagination.total} total)\n`);
      
      if (response.items.length > 0) {
        console.log('Primeiro item:');
        const firstItem = response.items[0];
        console.log(`  ID: ${firstItem.id}`);
        console.log(`  Slug: ${firstItem.fieldData.slug || 'N/A'}`);
        console.log(`  Campos disponíveis:`, Object.keys(firstItem.fieldData).join(', '));
        console.log('\n  Dados do item:');
        console.log(JSON.stringify(firstItem.fieldData, null, 2));
      }
    } else {
      console.log('⚠️  VITE_WEBFLOW_PROPERTIES_COLLECTION_ID não configurado');
    }

    console.log('\n✅ Conexão testada com sucesso!');
  } catch (error) {
    console.error('\n❌ Erro ao testar conexão:');
    if (error instanceof Error) {
      console.error('Mensagem:', error.message);
      if ('code' in error) {
        console.error('Código:', (error as { code: number }).code);
      }
      console.error('\nStack:', error.stack);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

testConnection();


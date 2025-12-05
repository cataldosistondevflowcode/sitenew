/**
 * Script para buscar informações da collection do blog do Webflow
 * e identificar os campos reais
 */

import { config } from 'dotenv';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, '..', '.env') });

const WEBFLOW_API_TOKEN = process.env.VITE_WEBFLOW_API_TOKEN;
const WEBFLOW_SITE_ID = process.env.VITE_WEBFLOW_SITE_ID;
const BLOG_COLLECTION_ID = '69258d404822f7b278633cb8'; // Collection "Blogs"

function webflowRequest(endpoint) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.webflow.com',
            path: `/v2${endpoint}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
                'accept-version': '1.0.0',
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error(`Erro ao parsear JSON: ${e.message}`));
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

async function main() {
    try {
        console.log('🔍 Buscando informações da collection do blog...\n');
        
        // Buscar informações da collection
        console.log('1. Listando todas as collections...');
        const collections = await webflowRequest(`/sites/${WEBFLOW_SITE_ID}/collections`);
        
        console.log(`\n📋 Collections encontradas (${collections.collections.length}):\n`);
        collections.collections.forEach((col, i) => {
            console.log(`${i + 1}. ${col.displayName}`);
            console.log(`   ID: ${col.id}`);
            console.log(`   Slug: ${col.slug}`);
            console.log('');
        });
        
        const blogCollection = collections.collections.find(c => c.id === BLOG_COLLECTION_ID);
        
        if (!blogCollection) {
            console.error(`❌ Collection com ID ${BLOG_COLLECTION_ID} não encontrada!`);
            console.log('\n💡 Use um dos IDs acima ou verifique o ID correto.');
            return;
        }
        
        console.log(`✅ Collection encontrada: ${blogCollection.displayName}`);
        console.log(`   Slug: ${blogCollection.slug}`);
        console.log(`   ID: ${blogCollection.id}\n`);
        
        // Buscar schema completo da collection
        console.log('2. Buscando schema completo da collection...');
        const collectionSchema = await webflowRequest(`/collections/${BLOG_COLLECTION_ID}`);
        
        // Mostrar campos
        console.log('\n📋 Campos da collection:\n');
        if (collectionSchema.fields && collectionSchema.fields.length > 0) {
            collectionSchema.fields.forEach((field, index) => {
                console.log(`${index + 1}. ${field.displayName}`);
                console.log(`   - ID: ${field.id}`);
                console.log(`   - Tipo: ${field.type}`);
                console.log(`   - Slug: ${field.slug}`);
                if (field.isRequired) console.log(`   - Obrigatório: Sim`);
                if (field.helpText) console.log(`   - Help: ${field.helpText}`);
                console.log('');
            });
        } else {
            console.log('⚠️  Nenhum campo encontrado na resposta');
        }
        
        // Buscar um item de exemplo para ver a estrutura
        console.log('3. Buscando item de exemplo...');
        const items = await webflowRequest(`/collections/${BLOG_COLLECTION_ID}/items?limit=1`);
        
        if (items.items && items.items.length > 0) {
            const exampleItem = items.items[0];
            console.log(`✅ Item encontrado: ${exampleItem.fieldData.name || 'Sem nome'}\n`);
            console.log('4. Estrutura de dados do item:\n');
            console.log(JSON.stringify(exampleItem.fieldData, null, 2));
        } else {
            console.log('⚠️  Nenhum item encontrado na collection');
        }
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
        if (error.message.includes('401')) {
            console.error('   Token de autenticação inválido ou expirado');
        }
    }
}

main();


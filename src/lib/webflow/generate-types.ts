/**
 * Utilitário para gerar tipos TypeScript baseados nos schemas das collections
 * 
 * Execute este script para gerar tipos automaticamente:
 * npm run generate-webflow-types
 */

import { getCollections, getCollection, getCollectionItems } from './collections';
import type { WebflowField, WebflowFieldType } from './types';

/**
 * Mapeia tipos do Webflow para tipos TypeScript
 */
function mapFieldTypeToTS(fieldType: WebflowFieldType): string {
  const typeMap: Record<WebflowFieldType, string> = {
    PlainText: 'string',
    RichText: 'string',
    Email: 'string',
    Phone: 'string',
    Number: 'number',
    DateTime: 'string',
    Switch: 'boolean',
    Color: 'string',
    Image: 'WebflowImageField',
    MultiImage: 'WebflowImageField[]',
    Video: 'string',
    Link: 'WebflowLinkField',
    File: 'string',
    Option: 'WebflowOptionField',
    Reference: 'WebflowReferenceField',
    MultiReference: 'WebflowReferenceField[]',
  };
  
  return typeMap[fieldType] || 'unknown';
}

/**
 * Converte o nome do campo para um nome de propriedade TypeScript válido
 */
function toPropertyName(slug: string): string {
  // Remove caracteres especiais e converte para camelCase
  return slug
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Gera o tipo TypeScript para uma collection
 */
function generateCollectionType(collectionName: string, fields: WebflowField[]): string {
  const typeName = `${collectionName}Item`;
  const interfaceFields = fields
    .map((field) => {
      const propertyName = toPropertyName(field.slug);
      const tsType = mapFieldTypeToTS(field.type);
      const optional = field.isRequired ? '' : '?';
      const comment = field.helpText ? ` // ${field.helpText}` : '';
      
      return `  ${propertyName}${optional}: ${tsType};${comment}`;
    })
    .join('\n');
  
  return `export interface ${typeName}FieldData {
${interfaceFields}
}

export interface ${typeName} extends WebflowItem {
  fieldData: ${typeName}FieldData;
}`;
}

/**
 * Gera tipos para todas as collections
 */
export async function generateTypes(): Promise<string> {
  const collections = await getCollections();
  
  const imports = `import type { WebflowItem, WebflowImageField, WebflowLinkField, WebflowOptionField, WebflowReferenceField } from './types';`;
  
  // Busca os campos de cada collection individualmente
  const collectionsWithFields = await Promise.all(
    collections.map(async (collection) => {
      // A API v2 requer buscar a collection individual para obter os campos
      // Por enquanto, vamos inferir os campos dos items existentes
      try {
        const items = await getCollectionItems(collection.id, { limit: 1 });
        if (items.items.length > 0) {
          // Inferir campos do primeiro item
          const fieldData = items.items[0].fieldData;
          const inferredFields = Object.keys(fieldData).map((key) => {
            const value = fieldData[key];
            let type: WebflowFieldType = 'PlainText';
            
            if (typeof value === 'number') type = 'Number';
            else if (typeof value === 'boolean') type = 'Switch';
            else if (value === null) type = 'PlainText';
            else if (typeof value === 'string') {
              // Tenta detectar URLs de imagem
              if (value.startsWith('http') && (value.includes('.jpg') || value.includes('.png') || value.includes('.webp'))) {
                type = 'Image';
              } else {
                type = 'PlainText';
              }
            }
            
            return {
              id: key,
              displayName: key,
              slug: key,
              type,
              isRequired: false,
              isEditable: true,
            } as WebflowField;
          });
          
          return { ...collection, fields: inferredFields };
        }
      } catch (error) {
        console.warn(`⚠️  Não foi possível buscar campos da collection ${collection.displayName}:`, error);
      }
      
      return { ...collection, fields: [] };
    })
  );
  
  const typeDefinitions = collectionsWithFields
    .map((collection) => {
      const collectionName = collection.displayName
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/\s+/g, '');
      
      return generateCollectionType(collectionName, collection.fields || []);
    })
    .join('\n\n');
  
  return `${imports}

/**
 * Tipos gerados automaticamente baseados nas Collections do Webflow
 * 
 * Para regenerar, execute: npm run generate-webflow-types
 */

${typeDefinitions}
`;
}



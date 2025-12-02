/**
 * Helpers para trabalhar com Collections do Webflow
 */

import { webflowGet } from './client';
import { WEBFLOW_CONFIG } from './config';
import type {
  WebflowCollection,
  WebflowCollectionsResponse,
  WebflowCollectionItemsResponse,
  WebflowItem,
  WebflowItemLive,
} from './types';

/**
 * Lista todas as collections de um site
 */
export async function getCollections(): Promise<WebflowCollection[]> {
  const response = await webflowGet<WebflowCollectionsResponse>(
    `/sites/${WEBFLOW_CONFIG.siteId}/collections`
  );
  return response.collections;
}

/**
 * Obtém uma collection específica pelo ID
 */
export async function getCollection(collectionId: string): Promise<WebflowCollection> {
  const collections = await getCollections();
  const collection = collections.find((c) => c.id === collectionId);
  
  if (!collection) {
    throw new Error(`Collection com ID ${collectionId} não encontrada`);
  }
  
  return collection;
}

/**
 * Obtém uma collection pelo slug
 */
export async function getCollectionBySlug(slug: string): Promise<WebflowCollection> {
  const collections = await getCollections();
  const collection = collections.find((c) => c.slug === slug);
  
  if (!collection) {
    throw new Error(`Collection com slug "${slug}" não encontrada`);
  }
  
  return collection;
}

/**
 * Lista items de uma collection
 */
export async function getCollectionItems(
  collectionId: string,
  options: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<WebflowCollectionItemsResponse> {
  const params = new URLSearchParams();
  
  if (options.limit) {
    params.append('limit', options.limit.toString());
  }
  if (options.offset) {
    params.append('offset', options.offset.toString());
  }
  
  const queryString = params.toString();
  const endpoint = `/collections/${collectionId}/items${queryString ? `?${queryString}` : ''}`;
  
  return webflowGet<WebflowCollectionItemsResponse>(endpoint);
}

/**
 * Obtém um item específico de uma collection (draft)
 */
export async function getCollectionItem(
  collectionId: string,
  itemId: string
): Promise<WebflowItem> {
  return webflowGet<WebflowItem>(
    `/collections/${collectionId}/items/${itemId}`
  );
}

/**
 * Obtém um item específico de uma collection (live/published)
 */
export async function getCollectionItemLive(
  collectionId: string,
  itemId: string
): Promise<WebflowItemLive> {
  return webflowGet<WebflowItemLive>(
    `/collections/${collectionId}/items/${itemId}/live`
  );
}

/**
 * Busca items por slug
 */
export async function getCollectionItemBySlug(
  collectionId: string,
  slug: string
): Promise<WebflowItem | null> {
  const response = await getCollectionItems(collectionId, { limit: 100 });
  
  const item = response.items.find(
    (item) => (item.fieldData.slug as string) === slug
  );
  
  return item || null;
}

/**
 * Busca items por slug (versão live)
 */
export async function getCollectionItemBySlugLive(
  collectionId: string,
  slug: string
): Promise<WebflowItemLive | null> {
  const response = await getCollectionItems(collectionId, { limit: 100 });
  
  const item = response.items.find(
    (item) => (item.fieldData.slug as string) === slug
  );
  
  if (!item) {
    return null;
  }
  
  return getCollectionItemLive(collectionId, item.id);
}

/**
 * Obtém todos os items de uma collection (com paginação automática)
 */
export async function getAllCollectionItems(
  collectionId: string
): Promise<WebflowItem[]> {
  const allItems: WebflowItem[] = [];
  let offset = 0;
  const limit = 100;
  let hasMore = true;
  
  while (hasMore) {
    const response = await getCollectionItems(collectionId, { limit, offset });
    allItems.push(...response.items);
    
    hasMore = response.items.length === limit;
    offset += limit;
  }
  
  return allItems;
}


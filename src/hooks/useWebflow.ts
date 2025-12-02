/**
 * Hooks React para trabalhar com Webflow Data API
 */

import { useQuery } from '@tanstack/react-query';
import {
  getCollections,
  getCollection,
  getCollectionItems,
  getCollectionItem,
  getCollectionItemLive,
  getCollectionItemBySlug,
  getCollectionItemBySlugLive,
  getAllCollectionItems,
} from '@/lib/webflow';
import type {
  WebflowCollection,
  WebflowItem,
  WebflowItemLive,
} from '@/lib/webflow/types';

/**
 * Hook para listar todas as collections
 */
export function useCollections() {
  return useQuery<WebflowCollection[]>({
    queryKey: ['webflow', 'collections'],
    queryFn: () => getCollections(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

/**
 * Hook para obter uma collection específica
 */
export function useCollection(collectionId: string) {
  return useQuery<WebflowCollection>({
    queryKey: ['webflow', 'collection', collectionId],
    queryFn: () => getCollection(collectionId),
    enabled: !!collectionId,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para listar items de uma collection
 */
export function useCollectionItems(
  collectionId: string,
  options: { limit?: number; offset?: number } = {}
) {
  return useQuery({
    queryKey: ['webflow', 'collection', collectionId, 'items', options],
    queryFn: () => getCollectionItems(collectionId, options),
    enabled: !!collectionId,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para obter todos os items de uma collection
 * 
 * ⚠️ ATENÇÃO: Carregar todos os items pode ser lento.
 * Use useCollectionItems com paginação para melhor performance.
 */
export function useAllCollectionItems(collectionId: string) {
  return useQuery<WebflowItem[]>({
    queryKey: ['webflow', 'collection', collectionId, 'items', 'all'],
    queryFn: () => getAllCollectionItems(collectionId),
    enabled: !!collectionId,
    staleTime: 1000 * 60 * 10, // 10 minutos (cache mais longo)
    gcTime: 1000 * 60 * 30, // 30 minutos (mantém em cache)
  });
}

/**
 * Hook para obter items paginados (RECOMENDADO para performance)
 */
export function useCollectionItemsPaginated(
  collectionId: string,
  page: number = 1,
  limit: number = 20
) {
  const offset = (page - 1) * limit;
  
  return useQuery({
    queryKey: ['webflow', 'collection', collectionId, 'items', 'paginated', page, limit],
    queryFn: () => getCollectionItems(collectionId, { limit, offset }),
    enabled: !!collectionId,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });
}

/**
 * Hook para obter um item específico
 */
export function useCollectionItem(collectionId: string, itemId: string) {
  return useQuery<WebflowItem>({
    queryKey: ['webflow', 'collection', collectionId, 'item', itemId],
    queryFn: () => getCollectionItem(collectionId, itemId),
    enabled: !!collectionId && !!itemId,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para obter um item específico (live)
 */
export function useCollectionItemLive(collectionId: string, itemId: string) {
  return useQuery<WebflowItemLive>({
    queryKey: ['webflow', 'collection', collectionId, 'item', itemId, 'live'],
    queryFn: () => getCollectionItemLive(collectionId, itemId),
    enabled: !!collectionId && !!itemId,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para buscar um item por slug
 */
export function useCollectionItemBySlug(collectionId: string, slug: string) {
  return useQuery<WebflowItem | null>({
    queryKey: ['webflow', 'collection', collectionId, 'item', 'slug', slug],
    queryFn: () => getCollectionItemBySlug(collectionId, slug),
    enabled: !!collectionId && !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para buscar um item por slug (live)
 */
export function useCollectionItemBySlugLive(collectionId: string, slug: string) {
  return useQuery<WebflowItemLive | null>({
    queryKey: ['webflow', 'collection', collectionId, 'item', 'slug', slug, 'live'],
    queryFn: () => getCollectionItemBySlugLive(collectionId, slug),
    enabled: !!collectionId && !!slug,
    staleTime: 1000 * 60 * 5,
  });
}


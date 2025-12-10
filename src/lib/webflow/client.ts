/**
 * Cliente HTTP para Webflow Data API v2
 * 
 * Fornece métodos reutilizáveis para fazer requisições autenticadas
 */

import { WEBFLOW_CONFIG, validateWebflowConfig } from './config';
import type { WebflowError } from './types';

export class WebflowAPIError extends Error {
  constructor(
    public code: number,
    public msg: string,
    public originalError?: unknown
  ) {
    super(msg);
    this.name = 'WebflowAPIError';
  }
}

/**
 * Faz uma requisição autenticada para a Webflow API
 */
export async function webflowRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  validateWebflowConfig();

  const url = `${WEBFLOW_CONFIG.apiBaseUrl}${endpoint}`;
  
  // Em desenvolvimento com proxy do Vite, não precisa do token (o proxy adiciona)
  // Em produção com Netlify Function, também não precisa (a function adiciona)
  const isDevelopment = import.meta.env.DEV;
  const headers = new Headers({
    'accept-version': '1.0.0',
    'Content-Type': 'application/json',
    // Token não é necessário aqui - o proxy/function adiciona
    ...options.headers,
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as WebflowError;
      throw new WebflowAPIError(
        errorData.code || response.status,
        errorData.msg || errorData.err || `HTTP ${response.status}: ${response.statusText}`,
        errorData
      );
    }

    return await response.json() as T;
  } catch (error) {
    if (error instanceof WebflowAPIError) {
      throw error;
    }
    throw new WebflowAPIError(
      0,
      error instanceof Error ? error.message : 'Erro desconhecido na requisição',
      error
    );
  }
}

/**
 * Helper para fazer GET requests
 */
export async function webflowGet<T>(endpoint: string): Promise<T> {
  return webflowRequest<T>(endpoint, { method: 'GET' });
}

/**
 * Helper para fazer POST requests
 */
export async function webflowPost<T>(
  endpoint: string,
  body: unknown
): Promise<T> {
  return webflowRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Helper para fazer PATCH requests
 */
export async function webflowPatch<T>(
  endpoint: string,
  body: unknown
): Promise<T> {
  return webflowRequest<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

/**
 * Helper para fazer DELETE requests
 */
export async function webflowDelete<T>(endpoint: string): Promise<T> {
  return webflowRequest<T>(endpoint, { method: 'DELETE' });
}


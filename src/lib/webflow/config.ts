/**
 * Configuração da Webflow Data API v2
 * 
 * Para usar, defina a variável de ambiente WEBFLOW_API_TOKEN
 * e WEBFLOW_SITE_ID no arquivo .env
 */

// Suporta tanto Node.js (process.env) quanto Vite (import.meta.env)
const getEnv = (key: string): string => {
  // Node.js environment (para scripts)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] || '';
  }
  // Vite environment (para código do frontend) - só funciona no browser
  try {
    // @ts-ignore - import.meta.env só existe no contexto do Vite no browser
    if (typeof window !== 'undefined' && (import.meta as any)?.env) {
      // @ts-ignore
      return (import.meta as any).env[key] || '';
    }
  } catch {
    // Ignore se import.meta não estiver disponível
  }
  return '';
};

// Em desenvolvimento, usa o proxy do Vite. Em produção, usa a Netlify Function
const isDevelopment = import.meta.env.DEV;
const apiBaseUrl = isDevelopment 
  ? '/api/webflow'  // Proxy do Vite em desenvolvimento
  : '/api/webflow';  // Em produção, também usa /api/webflow que será redirecionado para a Netlify Function

export const WEBFLOW_CONFIG = {
  apiBaseUrl,
  token: getEnv('VITE_WEBFLOW_API_TOKEN'),
  siteId: getEnv('VITE_WEBFLOW_SITE_ID'),
} as const;

/**
 * Valida se a configuração está completa
 */
export function validateWebflowConfig(): void {
  if (!WEBFLOW_CONFIG.token) {
    throw new Error('WEBFLOW_API_TOKEN não configurado. Defina VITE_WEBFLOW_API_TOKEN no .env');
  }
  if (!WEBFLOW_CONFIG.siteId) {
    throw new Error('WEBFLOW_SITE_ID não configurado. Defina VITE_WEBFLOW_SITE_ID no .env');
  }
}

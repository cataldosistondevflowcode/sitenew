/**
 * Netlify Function para fazer proxy das requisições da Webflow API
 * Isso é necessário porque a API do Webflow não permite CORS direto do browser
 */

exports.handler = async (event, context) => {
  // Permitir CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, accept-version',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Obter o token da variável de ambiente
  const token = process.env.VITE_WEBFLOW_API_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'VITE_WEBFLOW_API_TOKEN não configurado' }),
    };
  }

  // Extrair o path da requisição
  // O redirect do netlify.toml: /api/webflow/* -> /.netlify/functions/webflow-proxy/:splat
  // O :splat contém apenas o que vem depois de /api/webflow/
  // Exemplo: /api/webflow/collections/123 -> :splat = /collections/123
  // event.path será: /.netlify/functions/webflow-proxy/collections/123
  let path = event.path.replace('/.netlify/functions/webflow-proxy', '');
  
  // Remover /api/webflow se estiver presente (por segurança, caso o redirect não funcione corretamente)
  path = path.replace(/^\/api\/webflow/, '');
  
  // Garantir que o path comece com /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  // Se o path estiver vazio, usar raiz
  if (path === '/') {
    path = '';
  }
  
  // Construir URL da API Webflow (v2)
  // A API Webflow v2 espera paths como: /v2/collections/..., não /v2/api/webflow/...
  const url = `https://api.webflow.com/v2${path}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : ''}`;
  
  console.log('Webflow Proxy Debug:', { 
    eventPath: event.path,
    eventRawPath: event.rawPath || 'N/A',
    extractedPath: path, 
    queryString: event.queryStringParameters,
    finalUrl: url 
  });

  try {
    // Fazer a requisição para a API do Webflow
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept-version': '1.0.0',
        'Content-Type': 'application/json',
      },
      body: event.body || undefined,
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Erro ao fazer proxy para Webflow API:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Erro ao fazer requisição para Webflow API',
        message: error.message || 'Erro desconhecido'
      }),
    };
  }
};


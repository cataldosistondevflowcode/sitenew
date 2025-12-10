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
  // O redirect do netlify.toml passa o path como :splat
  // event.path será /.netlify/functions/webflow-proxy/:splat
  // Precisamos extrair o :splat
  let path = event.path.replace('/.netlify/functions/webflow-proxy', '');
  
  // Se o path estiver vazio, tentar pegar do query string ou usar raiz
  if (!path || path === '/') {
    path = '';
  }
  
  const url = `https://api.webflow.com/v2${path}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters).toString() : ''}`;

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


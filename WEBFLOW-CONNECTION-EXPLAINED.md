# 🔗 Como Funciona a Conexão com Webflow - Explicação Simples

## 📋 Resumo Rápido

O sistema busca posts do blog diretamente da API do Webflow CMS e exibe na página HTML.

---

## 🔑 1. ONDE ESTÁ O TOKEN DA API?

O token está em **2 lugares**:

### A) Meta Tag no HTML (linha 6 do blog.html):
```html
<meta name="webflow-api-token" content="1a479f9b19f7b02182e1316007b62d4a4aeda6093de25677fb5207a75e226109">
```

### B) Arquivo .env (variável de ambiente):
```
VITE_WEBFLOW_API_TOKEN=1a479f9b19f7b02182e1316007b62d4a4aeda6093de25677fb5207a75e226109
```

**O JavaScript lê o token da meta tag primeiro**, se não encontrar, tenta do .env.

---

## 🌐 2. COMO A URL DA API É CONFIGURADA?

No arquivo `blog.html`, linha ~490:

```javascript
const WEBFLOW_CONFIG = {
    isLocalhost: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // Se estiver em localhost, usa o PROXY do Vite
    // Se estiver em produção, usa a API DIRETA do Webflow
    apiBaseUrl: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
        ? '/api/webflow'           // ← PROXY (localhost)
        : 'https://api.webflow.com/v2',  // ← API DIRETA (produção)
    
    apiToken: (() => {
        // Lê o token da meta tag
        const metaToken = document.querySelector('meta[name="webflow-api-token"]');
        if (metaToken) {
            return metaToken.getAttribute('content');
        }
        return null;
    })(),
};
```

---

## 🔄 3. DOIS CENÁRIOS DIFERENTES

### 📍 CENÁRIO 1: Desenvolvimento (localhost:3000)

**Fluxo:**
```
blog.html (JavaScript)
    ↓
Faz fetch para: '/api/webflow/collections/...'
    ↓
Vite Proxy (vite.config.ts linha 40)
    ↓
Adiciona token automaticamente do .env
    ↓
Faz requisição para: https://api.webflow.com/v2/collections/...
    ↓
Retorna dados
```

**Por que usar proxy?**
- Evita problemas de CORS (Cross-Origin Resource Sharing)
- O token fica seguro no servidor (não exposto no navegador)
- Funciona automaticamente

### 📍 CENÁRIO 2: Produção (site publicado)

**Fluxo:**
```
blog.html (JavaScript)
    ↓
Faz fetch para: 'https://api.webflow.com/v2/collections/...'
    ↓
Adiciona token da meta tag no header
    ↓
Faz requisição DIRETA para Webflow
    ↓
Retorna dados
```

**Problema:**
- Pode dar erro de CORS se o Webflow não permitir
- O token fica exposto no HTML (não é ideal, mas funciona)

---

## 📝 4. CÓDIGO QUE FAZ A REQUISIÇÃO

No arquivo `blog.html`, linha ~510:

```javascript
async function fetchWebflowData(endpoint) {
    // Monta a URL completa
    const url = `${WEBFLOW_CONFIG.apiBaseUrl}${endpoint}`;
    // Exemplo: '/api/webflow/collections/69258d404822f7b278633cb8/items'
    
    const headers = {
        'accept-version': '1.0.0',
        'Content-Type': 'application/json',
    };
    
    // Se tiver token, adiciona no header
    if (WEBFLOW_CONFIG.apiToken) {
        headers['Authorization'] = `Bearer ${WEBFLOW_CONFIG.apiToken}`;
    }
    
    // Faz a requisição
    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    });
    
    // Retorna os dados
    return await response.json();
}
```

---

## 🎯 5. COMO BUSCAR OS POSTS DO BLOG

No arquivo `blog.html`, linha ~562:

```javascript
async function fetchBlogPosts() {
    // ID da collection do blog no Webflow
    const WEBFLOW_BLOG_COLLECTION_ID = '69258d404822f7b278633cb8';
    
    // Chama a função que faz a requisição
    const response = await fetchWebflowData(
        `/collections/${WEBFLOW_BLOG_COLLECTION_ID}/items?limit=100`
    );
    
    // Retorna apenas os items (posts)
    return response.items || [];
}
```

**O que acontece:**
1. Monta a URL: `/api/webflow/collections/69258d404822f7b278633cb8/items?limit=100`
2. Faz a requisição
3. Recebe um JSON com todos os posts
4. Retorna apenas o array `items`

---

## 🔍 6. ESTRUTURA DOS DADOS RETORNADOS

A API do Webflow retorna algo assim:

```json
{
  "items": [
    {
      "id": "abc123",
      "fieldData": {
        "name": "Título do Post",
        "slug": "titulo-do-post",
        "conteudo": "<p>Conteúdo HTML...</p>",
        "data-de-publicacao": "2025-02-21",
        "author-first-name": "Raphael",
        "author-last-name": "Siston",
        "imagem-de-capa": {
          "url": "https://..."
        }
      }
    }
  ]
}
```

---

## ⚠️ 7. PROBLEMAS COMUNS

### Problema 1: Página em branco
**Causa:** O JavaScript não está executando
**Solução:** Verificar se o arquivo está sendo servido corretamente

### Problema 2: Erro de CORS
**Causa:** Tentando acessar API diretamente sem proxy em produção
**Solução:** Usar proxy ou configurar CORS no servidor

### Problema 3: Token não encontrado
**Causa:** Meta tag não está presente ou token vazio
**Solução:** Verificar se a meta tag existe no HTML

### Problema 4: Nenhum post encontrado
**Causa:** Collection ID errado ou posts não publicados no Webflow
**Solução:** Verificar o ID da collection e se os posts estão publicados

---

## 🛠️ 8. COMO TESTAR

1. **Abra o console do navegador** (F12)
2. **Acesse** `http://localhost:3000/blog.html`
3. **Procure por logs:**
   - `📄 Script do blog.html carregado`
   - `🔍 Buscando dados do Webflow: ...`
   - `✅ Dados recebidos do Webflow: ...`

4. **Se aparecer erro:**
   - Copie a mensagem de erro
   - Verifique se o token está correto
   - Verifique se o proxy está funcionando (em localhost)

---

## 📊 RESUMO VISUAL

```
┌─────────────────────────────────────────┐
│  blog.html (página HTML)                │
│  ┌───────────────────────────────────┐  │
│  │ JavaScript lê token da meta tag   │  │
│  └───────────────────────────────────┘  │
│              ↓                            │
│  ┌───────────────────────────────────┐  │
│  │ Detecta: localhost ou produção?   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↓                    ↓
    ┌─────────────┐      ┌──────────────┐
    │  localhost  │      │  produção    │
    └─────────────┘      └──────────────┘
              ↓                    ↓
    ┌─────────────┐      ┌──────────────┐
    │ /api/webflow│      │ api.webflow  │
    │   (proxy)   │      │  .com/v2     │
    └─────────────┘      └──────────────┘
              ↓                    ↓
    ┌─────────────┐      ┌──────────────┐
    │ Vite Proxy  │      │  Webflow    │
    │ adiciona    │      │  API        │
    │ token do    │      │  (com token)│
    │ .env        │      │             │
    └─────────────┘      └──────────────┘
              ↓                    ↓
    ┌───────────────────────────────────┐
    │  https://api.webflow.com/v2/...   │
    └───────────────────────────────────┘
              ↓
    ┌───────────────────────────────────┐
    │  Retorna posts do blog             │
    └───────────────────────────────────┘
              ↓
    ┌───────────────────────────────────┐
    │  JavaScript renderiza na página   │
    └───────────────────────────────────┘
```

---

## ❓ PERGUNTAS FREQUENTES

**P: Por que usar proxy em desenvolvimento?**
R: Para evitar problemas de CORS e manter o token seguro no servidor.

**P: O token fica exposto no HTML?**
R: Sim, em produção. Mas é a única forma de fazer funcionar sem backend.

**P: Posso usar sem proxy em produção?**
R: Sim, mas pode dar erro de CORS. O ideal é ter um backend que faça as requisições.

**P: Como saber se está funcionando?**
R: Abra o console (F12) e veja os logs. Se aparecer `✅ Dados recebidos`, está funcionando!


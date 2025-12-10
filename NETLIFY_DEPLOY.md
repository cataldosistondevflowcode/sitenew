# Guia de Deploy no Netlify

Este guia explica como fazer deploy deste projeto no Netlify.

## Configuração Automática (Recomendado)

### 1. Conectar o Repositório

1. Acesse [Netlify](https://app.netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Conecte seu repositório GitHub/GitLab/Bitbucket
4. O Netlify detectará automaticamente as configurações do `netlify.toml`

### 2. Configurações de Build

O Netlify usará automaticamente:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Framework**: Vite

### 3. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel do Netlify:

1. Vá em **Site settings** → **Environment variables**
2. Adicione as variáveis necessárias:

```
VITE_BASE_PATH=/          # Base path (já configurado no netlify.toml)
VITE_WEBFLOW_API_TOKEN=   # Token da API do Webflow (se necessário)
VITE_SUPABASE_URL=        # URL do Supabase (se necessário)
VITE_SUPABASE_ANON_KEY=   # Chave anônima do Supabase (se necessário)
```

**Importante**: Variáveis que começam com `VITE_` são expostas ao cliente. Não coloque informações sensíveis nelas.

### 4. Deploy

Após conectar o repositório:
- O Netlify fará deploy automaticamente a cada push na branch principal
- Você pode configurar branches específicas em **Site settings** → **Build & deploy** → **Branch deploys**

## Configuração Manual

Se preferir configurar manualmente:

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Node version**: 20 (configurado no `netlify.toml`)

## Estrutura de Redirecionamento

O `netlify.toml` está configurado para:
- Servir arquivos estáticos (`/assets/*`) diretamente
- Servir arquivos HTML estáticos diretamente
- Redirecionar todas as outras rotas para `/index.html` (SPA routing)

Isso permite que o React Router funcione corretamente com rotas client-side.

## Headers de Segurança

O Netlify está configurado com os seguintes headers de segurança:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Cache

- **Assets** (`/assets/*`): Cache de 1 ano (immutable)
- **Imagens** (`.jpg`, `.png`, `.svg`, `.webp`): Cache de 1 ano
- **HTML**: Sem cache (sempre revalidar)

## Troubleshooting

### Build falha

1. Verifique se todas as dependências estão no `package.json`
2. Verifique se o Node.js versão 20 está disponível
3. Veja os logs de build no painel do Netlify

### Rotas não funcionam

1. Verifique se o `netlify.toml` está na raiz do projeto
2. Verifique se a variável `VITE_BASE_PATH` está configurada como `/`
3. Verifique os logs de deploy no Netlify

### Assets não carregam

1. Verifique se o diretório `dist` contém a pasta `assets`
2. Verifique se os caminhos nos arquivos HTML estão corretos
3. Verifique os logs de build para erros de caminho

## Domínio Personalizado

Para configurar um domínio personalizado:

1. Vá em **Site settings** → **Domain management**
2. Clique em **Add custom domain**
3. Siga as instruções para configurar o DNS

## Deploy Preview

O Netlify cria automaticamente previews para Pull Requests:
- Cada PR recebe uma URL única
- Útil para testar mudanças antes de fazer merge

## Comandos Úteis

```bash
# Build local para testar
npm run build

# Preview do build local
npm run preview

# Verificar configuração do Netlify
netlify status
```

## Notas Importantes

- O projeto está configurado para usar a **raiz do domínio** (`/`) no Netlify
- Se você precisar usar um subdiretório, altere `VITE_BASE_PATH` no `netlify.toml`
- O GitHub Pages ainda usa `/sitenew/` como base path (configurado no `vite.config.ts`)


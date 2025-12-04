# Configuração do GitHub Pages

Este documento explica como configurar o deploy automático no GitHub Pages.

## Configuração Inicial

### 1. Habilitar GitHub Pages no repositório

1. Vá para **Settings** > **Pages** no seu repositório GitHub
2. Em **Source**, selecione **GitHub Actions** (não "Deploy from a branch")
3. Salve as configurações

### 2. Configurar Secrets (se necessário)

Se o projeto usar variáveis de ambiente, configure-as em **Settings** > **Secrets and variables** > **Actions**:

- `VITE_SUPABASE_URL` (se usar Supabase)
- `VITE_SUPABASE_ANON_KEY` (se usar Supabase)
- `VITE_WEBFLOW_API_TOKEN` (se usar Webflow API)

### 3. Deploy Automático

O workflow `.github/workflows/deploy.yml` está configurado para:

- Fazer deploy automaticamente quando houver push na branch `main`
- Fazer build do projeto usando `npm run build`
- Fazer upload dos arquivos do diretório `dist/` para o GitHub Pages

### 4. URL do Site

O site estará disponível em:
- `https://cataldosistondevflowcode.github.io/sitenew/`

**Importante**: O `base` path está configurado como `/sitenew/` no `vite.config.ts` para produção.

## Como Funciona

1. Quando você faz push para a branch `main`, o GitHub Actions:
   - Faz checkout do código
   - Instala as dependências (`npm ci`)
   - Executa o build (`npm run build`)
   - Faz upload dos arquivos do `dist/` para o GitHub Pages

2. O script `copy-html.js`:
   - Copia os arquivos HTML estáticos para o `dist/`
   - Cria o arquivo `.nojekyll` necessário para o GitHub Pages

## Troubleshooting

### Os arquivos não estão sendo atualizados

1. Verifique se o workflow foi executado: vá em **Actions** no GitHub
2. Verifique os logs do workflow para erros
3. Certifique-se de que o diretório `dist/` está sendo gerado corretamente no build

### Erro 404 nas páginas

1. Verifique se o `base` path no `vite.config.ts` corresponde ao nome do repositório
2. Certifique-se de que o arquivo `.nojekyll` está sendo criado no `dist/`
3. Verifique se os arquivos HTML estão sendo copiados corretamente

### Build falha

1. Verifique se todas as dependências estão no `package.json`
2. Verifique se as variáveis de ambiente necessárias estão configuradas como secrets
3. Verifique os logs do workflow para mais detalhes


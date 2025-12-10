# 🔍 Diagnóstico: Site Fora do Ar - GitHub Pages

## Problemas Identificados

### 1. ⚠️ Workflow de Deploy
O workflow `.github/workflows/deploy.yml` está configurado, mas pode estar falhando. Verifique:

- **Ações do GitHub**: Vá em `Actions` no repositório e verifique se o último deploy foi bem-sucedido
- **Logs de erro**: Se houver falhas, verifique os logs para identificar o problema

### 2. ⚠️ Configuração do GitHub Pages
Verifique se o GitHub Pages está configurado corretamente:

1. Vá em **Settings** > **Pages** no repositório
2. Verifique se a **Source** está configurada como **GitHub Actions** (não "Deploy from a branch")
3. Verifique se há alguma mensagem de erro

### 3. ⚠️ Arquivos HTML no Git
O workflow tenta restaurar arquivos HTML do git. Verifique se eles estão commitados:

```bash
# Verificar se os arquivos HTML estão no git
git ls-files dist/*.html
```

Se não estiverem, você precisa commitá-los:
```bash
git add dist/*.html
git commit -m "Adicionar arquivos HTML estáticos"
git push
```

### 4. ⚠️ Base Path
O `vite.config.ts` está configurado com `base: '/sitenew/'` para produção. Verifique se:
- O nome do repositório está correto
- A URL do site corresponde ao base path

### 5. ⚠️ Secrets do GitHub
Verifique se os secrets necessários estão configurados:
- `VITE_WEBFLOW_API_TOKEN`
- `VITE_WEBFLOW_SITE_ID`

## Passos para Resolver

### Passo 1: Verificar Status do Workflow
1. Acesse: `https://github.com/[SEU_USUARIO]/[SEU_REPOSITORIO]/actions`
2. Verifique o último workflow executado
3. Se falhou, clique nele e veja os logs de erro

### Passo 2: Verificar Configuração do GitHub Pages
1. Acesse: `https://github.com/[SEU_USUARIO]/[SEU_REPOSITORIO]/settings/pages`
2. Verifique se está configurado como **GitHub Actions**
3. Se não estiver, altere e salve

### Passo 3: Verificar Arquivos no Git
Execute localmente:
```bash
git ls-files dist/*.html
```

Se não retornar nada, adicione os arquivos:
```bash
git add dist/*.html dist/.nojekyll
git commit -m "Adicionar arquivos estáticos para GitHub Pages"
git push
```

### Passo 4: Forçar Novo Deploy
Se tudo estiver correto, force um novo deploy:
1. Vá em **Actions** no GitHub
2. Selecione o workflow "Deploy to GitHub Pages"
3. Clique em **Run workflow**
4. Selecione a branch `main`
5. Clique em **Run workflow**

### Passo 5: Verificar URL do Site
O site deve estar disponível em:
- `https://[SEU_USUARIO].github.io/sitenew/`

**Importante**: O base path `/sitenew/` está hardcoded no `vite.config.ts`. Se o nome do repositório for diferente, você precisa ajustar.

## Checklist de Verificação

- [ ] Workflow executado com sucesso (verificar em Actions)
- [ ] GitHub Pages configurado como "GitHub Actions"
- [ ] Arquivos HTML estão commitados no git (`dist/*.html`)
- [ ] Arquivo `.nojekyll` está no git (`dist/.nojekyll`)
- [ ] Secrets configurados no GitHub (VITE_WEBFLOW_API_TOKEN, VITE_WEBFLOW_SITE_ID)
- [ ] Base path no `vite.config.ts` corresponde ao nome do repositório
- [ ] URL do site está acessível

## Comandos Úteis

```bash
# Verificar se arquivos estão no git
git ls-files dist/

# Verificar último commit
git log -1 --oneline

# Verificar status do repositório
git status

# Forçar push (se necessário)
git push origin main --force
```

## Próximos Passos

1. Execute os passos acima na ordem
2. Se ainda não funcionar, compartilhe:
   - Screenshot dos logs do workflow
   - Mensagem de erro (se houver)
   - URL do repositório
   - URL esperada do site


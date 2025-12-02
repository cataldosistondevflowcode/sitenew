# Webflow CMS Project

Projeto limpo para integração com Webflow CMS.

## Setup

1. Instalar dependências:
```bash
npm install
```

2. Configurar variáveis de ambiente:
```bash
cp .env.example .env
# Editar .env com suas credenciais
```

3. Gerar tipos TypeScript:
```bash
npm run generate-webflow-types
```

4. Iniciar servidor:
```bash
npm run dev
```

## Estrutura

- `src/lib/webflow/` - Biblioteca Webflow
- `src/hooks/useWebflow.ts` - React Hooks
- `src/pages/` - Páginas Webflow
- `src/components/` - Componentes React

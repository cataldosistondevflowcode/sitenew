# Implementação do Blog com Webflow CMS

## Collection ID: `692c64760de964487f419b16`

## Configuração do Ambiente

As credenciais do Webflow estão configuradas no arquivo `.env`:

```env
VITE_WEBFLOW_API_TOKEN=1a479f9b19f7b02182e1316007b62d4a4aeda6093de25677fb5207a75e226109
VITE_WEBFLOW_SITE_ID=69023853a6b8fa97b90fd72d
VITE_WEBFLOW_PROPERTIES_COLLECTION_ID=69103abe35607f9876aac632
```

**Sugestão**: Adicionar também:
```env
VITE_WEBFLOW_BLOG_COLLECTION_ID=692c64760de964487f419b16
```

## Mapeamento de Campos Proposto

Baseado na análise dos arquivos `blog.html` e `blogpost.html`, aqui está a correspondência proposta:

### Campos Principais

| Uso no HTML | Campo Webflow Sugerido | Tipo Webflow | Exemplo |
|------------|------------------------|--------------|---------|
| **Título (H1)** | `name` (obrigatório) | PlainText | "Imóveis em leilão costumam estar em péssimo estado?" |
| **Slug/URL** | `slug` (obrigatório) | Slug | "imoveis-leilao-estado-conservacao" |
| **Data Publicação** | `published-date` | DateTime | "2025-02-21" |
| **Tempo Leitura** | `reading-time` | Number | 6 |
| **Autor Nome** | `author-name` | PlainText | "Raphael Siston" |
| **Autor Cargo** | `author-role` | PlainText | "Advogado Especialista" |
| **Autor Foto** | `author-image` | Image | URL da imagem |
| **Imagem Destacada** | `featured-image` | Image | URL da imagem |
| **Conteúdo HTML** | `content` | RichText | HTML completo do artigo |
| **Resumo** | `excerpt` | PlainText | Primeiro parágrafo |
| **Categoria** | `category` | Option | "Leilões de Imóveis" |
| **Tags** | `tags` | MultiOption | ["leilão", "imóveis"] |

### Campos Secundários

| Uso no HTML | Campo Webflow Sugerido | Tipo Webflow |
|------------|------------------------|--------------|
| **SEO Title** | `seo-title` | PlainText |
| **SEO Description** | `seo-description` | PlainText |
| **Status** | `is-draft` | Switch |

## Estrutura de Dados Esperada

```javascript
{
  id: "692c64760de964487f419b16",
  cmsLocaleId: "...",
  lastPublished: "2025-02-21T...",
  lastUpdated: "2025-02-21T...",
  createdOn: "2025-02-20T...",
  isArchived: false,
  isDraft: false,
  fieldData: {
    name: "Título do Post",
    slug: "titulo-do-post",
    "published-date": "2025-02-21T00:00:00.000Z",
    "reading-time": 6,
    "author-name": "Raphael Siston",
    "author-role": "Advogado Especialista",
    "author-image": { url: "https://..." },
    "featured-image": { url: "https://..." },
    content: "<p>Conteúdo HTML...</p>",
    excerpt: "Resumo do post...",
    category: "Leilões de Imóveis",
    tags: ["tag1", "tag2"]
  }
}
```

## Próximos Passos

1. **Confirmar campos reais**: Verificar no Webflow Designer quais são os nomes exatos dos campos
2. **Implementar busca**: Criar função para buscar posts da collection
3. **Listar posts**: Popular `blog.html` com lista de posts
4. **Post individual**: Popular `blogpost.html` com dados do post selecionado

## Nota Importante

Os nomes dos campos no Webflow podem ter espaços, hífens ou underscores. É importante verificar os nomes exatos na collection do Webflow antes de implementar.


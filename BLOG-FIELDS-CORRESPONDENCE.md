# 📋 Correspondência de Campos - Blog Webflow CMS

## Collection ID: `692c64760de964487f419b16`

## 🔑 Credenciais (já configuradas no .env)
- **API Token**: `VITE_WEBFLOW_API_TOKEN` ✅
- **Site ID**: `VITE_WEBFLOW_SITE_ID` ✅
- **Blog Collection ID**: `692c64760de964487f419b16`

---

## 📊 Mapeamento de Campos

### Campos Obrigatórios do Webflow
| Campo Webflow | Tipo | Uso no HTML |
|--------------|------|-------------|
| `name` | PlainText | Título principal (H1) |
| `slug` | Slug | URL do post |

### Campos Identificados no Design

| **Uso no HTML** | **Campo Webflow Sugerido** | **Tipo Sugerido** | **Localização no HTML** |
|----------------|---------------------------|-------------------|------------------------|
| **Título do Post** | `name` | PlainText | `<h1>` linha 210-211 |
| **Slug/URL** | `slug` | Slug | URL: `blogpost.html?slug=...` |
| **Data Publicação** | `published-date` ou `date` | DateTime | Linha 226: "21 Fev 2025" |
| **Tempo Leitura** | `reading-time` | Number | Linha 230: "6 min de leitura" |
| **Autor - Nome** | `author-name` | PlainText | Linha 219: "Raphael Siston" |
| **Autor - Cargo** | `author-role` | PlainText | Linha 220: "Advogado Especialista" |
| **Autor - Foto** | `author-image` | Image | Linha 217: `<img>` do autor |
| **Imagem Destacada** | `featured-image` | Image | Linha 235: Imagem principal |
| **Conteúdo HTML** | `content` ou `body` | RichText | Linha 239-285: Todo o conteúdo |
| **Categoria Breadcrumb** | `category` | Option | Linha 207: "Leilões de Imóveis" |
| **Categoria Badge** | `category` | Option | Linha 420: "Direito Imobiliário" |

### Campos Adicionais (Opcionais)

| **Uso no HTML** | **Campo Webflow Sugerido** | **Tipo Sugerido** |
|----------------|---------------------------|-------------------|
| **Resumo/Excerpt** | `excerpt` | PlainText |
| **Tags** | `tags` | MultiOption |
| **SEO Title** | `seo-title` | PlainText |
| **SEO Description** | `seo-description` | PlainText |
| **Posts Relacionados** | `related-posts` | MultiReference |

---

## 📝 Exemplo de Estrutura de Dados

```javascript
// Item retornado pela Webflow API
{
  id: "abc123...",
  cmsLocaleId: "...",
  lastPublished: "2025-02-21T...",
  lastUpdated: "2025-02-21T...",
  createdOn: "2025-02-20T...",
  isArchived: false,
  isDraft: false,
  fieldData: {
    // Campos obrigatórios
    name: "Imóveis em leilão costumam estar em péssimo estado de conservação?",
    slug: "imoveis-leilao-estado-conservacao",
    
    // Campos de data e tempo
    "published-date": "2025-02-21T00:00:00.000Z",
    "reading-time": 6,
    
    // Campos do autor
    "author-name": "Raphael Siston",
    "author-role": "Advogado Especialista",
    "author-image": {
      url: "https://cdn.prod.website-files.com/...",
      alt: "Raphael Siston"
    },
    
    // Imagem e conteúdo
    "featured-image": {
      url: "https://cdn.prod.website-files.com/...",
      alt: "Imóvel antigo"
    },
    content: "<p>Muitos investidores...</p><h2>O mito...</h2>...",
    
    // Categorização
    category: "Leilões de Imóveis",
    tags: ["leilão", "imóveis", "investimento"]
  }
}
```

---

## ⚠️ IMPORTANTE

**Os nomes exatos dos campos podem variar!** 

No Webflow, os campos podem ter:
- Espaços: `"Published Date"`
- Hífens: `"published-date"`
- Underscores: `"published_date"`
- CamelCase: `"publishedDate"`

**Ação necessária**: Verificar no Webflow Designer os nomes exatos dos campos da collection `692c64760de964487f419b16` antes de implementar.

---

## 🚀 Próximos Passos

1. ✅ Verificar nomes exatos dos campos no Webflow Designer
2. ✅ Implementar função `fetchBlogPosts()` em `blog.html`
3. ✅ Implementar função `fetchBlogPostBySlug()` em `blogpost.html`
4. ✅ Popular lista de posts em `blog.html`
5. ✅ Popular post individual em `blogpost.html`
6. ✅ Adicionar paginação se necessário
7. ✅ Implementar busca/filtros por categoria

---

## 📚 Arquivos de Referência

- `blog-webflow-code-example.js` - Exemplo de código completo
- `blog-webflow-implementation.md` - Documentação técnica
- `blog-fields-mapping.md` - Mapeamento detalhado


# Mapeamento de Campos - Blog Webflow CMS

## Collection ID: `692c64760de964487f419b16`

## Correspondência de Campos

### Campos Identificados no HTML vs Campos Webflow CMS

| Campo no HTML | Campo Webflow CMS (sugerido) | Tipo | Descrição |
|--------------|------------------------------|------|-----------|
| **Título do Post** | `name` ou `title` | PlainText | Título principal do artigo (H1) |
| **Slug** | `slug` | Slug | URL amigável do post |
| **Data de Publicação** | `published-date` ou `date` | DateTime | Data de publicação do artigo |
| **Tempo de Leitura** | `reading-time` | Number | Tempo estimado de leitura em minutos |
| **Autor - Nome** | `author-name` | PlainText | Nome do autor |
| **Autor - Cargo** | `author-role` | PlainText | Cargo/função do autor |
| **Autor - Foto** | `author-image` | Image | Foto do autor |
| **Imagem Destacada** | `featured-image` | Image | Imagem principal do artigo |
| **Conteúdo** | `content` ou `body` | RichText | Conteúdo completo do artigo (HTML) |
| **Resumo/Excerpt** | `excerpt` ou `summary` | PlainText | Resumo curto do artigo |
| **Categoria** | `category` | Option | Categoria do post (ex: Leilões, Direito Imobiliário) |
| **Tags** | `tags` | MultiOption | Tags para organização |
| **SEO Title** | `seo-title` | PlainText | Título para SEO |
| **SEO Description** | `seo-description` | PlainText | Meta description |
| **Status** | `is-draft` | Switch | Se está publicado ou em rascunho |

## Campos Adicionais Identificados no Design

- **Breadcrumb Category**: Categoria para breadcrumb (ex: "Leilões de Imóveis")
- **Share Links**: Links para compartilhamento (Facebook, Twitter, LinkedIn, WhatsApp)
- **Related Posts**: Posts relacionados (pode ser Reference ou MultiReference)

## Notas

1. O campo `slug` é obrigatório para URLs amigáveis
2. O campo `name` é obrigatório no Webflow CMS
3. Campos de data devem usar tipo `DateTime`
4. Imagens devem usar tipo `Image`
5. Conteúdo rico deve usar `RichText` para preservar formatação HTML

## Próximos Passos

1. Confirmar os nomes exatos dos campos na collection do Webflow
2. Implementar função de busca usando Webflow API
3. Popular `blog.html` com lista de posts
4. Popular `blogpost.html` com dados do post individual


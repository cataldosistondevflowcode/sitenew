# 📋 Campos Reais da Collection "Blogs" - Webflow CMS

## Collection ID: `69258d404822f7b278633cb8`

## ✅ Campos Identificados

| # | Campo Webflow | Slug | Tipo | Obrigatório | Uso no HTML |
|---|--------------|------|------|-------------|-------------|
| 1 | **Name** | `name` | PlainText | ✅ Sim | Título principal (H1) |
| 2 | **Slug** | `slug` | Slug | - | URL do post |
| 3 | **Conteúdo** | `conteudo` | RichText | - | Conteúdo HTML completo |
| 4 | **Data** | `data` | DateTime | - | Data de publicação (formato DateTime) |
| 5 | **Data de publicação** | `data-de-publicacao` | PlainText | - | Data de publicação (formato texto) |
| 6 | **Imagem de Capa** | `imagem-de-capa` | Image | - | Imagem principal (upload Webflow) |
| 7 | **Imagem Link** | `imagem-link` | PlainText | - | URL da imagem (importada) |
| 8 | **Imagem de Capa Importada** | `imagem-de-capa-importada` | Link | - | Link da imagem importada |
| 9 | **Author first name** | `author-first-name` | PlainText | - | Primeiro nome do autor |
| 10 | **Author last name** | `author-last-name` | PlainText | - | Sobrenome do autor |
| 11 | **Autor Importado** | `autor-importado` | PlainText | - | Nome completo do autor (importado) |
| 12 | **Tag** | `tag` | Reference | - | Referência à collection "Tipos de Conteúdos" |
| 13 | **Slug Antigo** | `slug-antigo` | PlainText | - | Slug antigo (não usado) |

## 📊 Mapeamento HTML → Webflow

| **Uso no HTML** | **Campo Webflow** | **Exemplo de Valor** |
|----------------|------------------|---------------------|
| Título (H1) | `name` | "Imóveis em leilão costumam estar em péssimo estado de conservação?" |
| Slug/URL | `slug` | "imoveis-em-leilao-costumam-estar-em-pessimo-estado-de-conservacao-a3271" |
| Data Publicação | `data-de-publicacao` ou `data` | "2025-02-21" |
| Autor Nome | `author-first-name` + `author-last-name` | "RAPHAEL" + "SISTON" = "Raphael Siston" |
| Imagem Destacada | `imagem-link` ou `imagem-de-capa` | URL da imagem |
| Conteúdo HTML | `conteudo` | HTML completo do artigo |
| Categoria | `tag` (Reference) | Referência à collection de tipos |

## 🔍 Observações Importantes

1. **Autor**: O nome completo é formado por `author-first-name` + `author-last-name`
2. **Data**: Existem dois campos de data:
   - `data` (DateTime) - formato ISO
   - `data-de-publicacao` (PlainText) - formato texto "2025-02-21"
3. **Imagem**: Existem 3 campos de imagem:
   - `imagem-de-capa` (Image) - upload direto no Webflow
   - `imagem-link` (PlainText) - URL da imagem
   - `imagem-de-capa-importada` (Link) - link da imagem importada
4. **Categoria/Tag**: É uma Reference para a collection "Tipos de Conteúdos" (ID: 691f93bba9090a64322a5b57)

## 📝 Estrutura de Dados Real

```javascript
{
  id: "...",
  cmsLocaleId: "...",
  lastPublished: "2025-02-21T...",
  lastUpdated: "2025-02-21T...",
  createdOn: "2025-02-20T...",
  isArchived: false,
  isDraft: false,
  fieldData: {
    name: "Imóveis em leilão costumam estar em péssimo estado de conservação?",
    slug: "imoveis-em-leilao-costumam-estar-em-pessimo-estado-de-conservacao-a3271",
    conteudo: "<p>Muitos investidores...</p><h2>...</h2>",
    data: "2025-02-21T00:00:00.000Z", // DateTime
    "data-de-publicacao": "2025-02-21", // PlainText
    "imagem-link": "https://leilaodeimoveis-cataldosiston.com/wp-content/...",
    "imagem-de-capa": { url: "...", alt: "..." }, // Se houver upload
    "author-first-name": "RAPHAEL",
    "author-last-name": "SISTON",
    "autor-importado": "...", // Se houver
    tag: "..." // ID da referência
  }
}
```


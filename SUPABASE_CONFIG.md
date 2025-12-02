# Configuração do Supabase

Para usar o sistema de filtros, você precisa configurar as credenciais do Supabase.

## Opção 1: Configuração Automática via .env (Recomendado)

1. Adicione as credenciais do Supabase ao arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica-aqui
```

2. Execute o script para injetar as configurações no HTML:

```bash
npm run inject-supabase
```

Isso irá automaticamente atualizar o arquivo `imoveis-rj.html` com as credenciais do `.env`.

## Opção 2: Configuração Manual no HTML

Se preferir configurar manualmente, edite o arquivo `imoveis-rj.html` e configure as variáveis:

```html
<script>
    // Configuração do Supabase
    window.SUPABASE_URL = 'https://seu-projeto.supabase.co';
    window.SUPABASE_ANON_KEY = 'sua-chave-publica-aqui';
</script>
```

## Estrutura da Tabela no Supabase

A tabela deve se chamar `leiloes_imoveis` e ter os seguintes campos:

- `id` (number) - ID único
- `titulo_propriedade` (text) - Título do imóvel
- `endereco` (text) - Endereço completo
- `bairro` (text) - Bairro
- `cidade` (text) - Cidade
- `estado` (text) - Estado (RJ, SP, etc.)
- `data_leilao_1` (date) - Data do 1º leilão
- `data_leilao_2` (date) - Data do 2º leilão
- `leilao_1` (number) - Valor do 1º leilão
- `leilao_2` (number) - Valor do 2º leilão
- `tipo_propriedade` (text) - Tipo (Casa, Apartamento, etc.)
- `tipo_leilao` (text) - Judicial, Extrajudicial, etc.
- `descricao` (text) - Descrição do imóvel
- `imagem` (text) - URL da imagem
- `financiamento` (boolean) - Aceita financiamento
- `fgts` (boolean) - Aceita FGTS
- `parcelamento` (boolean) - Permite parcelamento
- `slug` (text) - Slug para URL (opcional)

## Índices Recomendados

Para melhor performance, crie índices nos seguintes campos:

```sql
CREATE INDEX idx_cidade ON leiloes_imoveis(cidade);
CREATE INDEX idx_bairro ON leiloes_imoveis(bairro);
CREATE INDEX idx_tipo_propriedade ON leiloes_imoveis(tipo_propriedade);
CREATE INDEX idx_leilao_1 ON leiloes_imoveis(leilao_1);
CREATE INDEX idx_data_leilao_1 ON leiloes_imoveis(data_leilao_1);
CREATE INDEX idx_tipo_leilao ON leiloes_imoveis(tipo_leilao);
```


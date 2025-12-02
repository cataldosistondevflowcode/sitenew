# Relatório de Imagens e Recursos Faltantes

## Imagens e Recursos Mencionados no Inventário

### ✅ Imagens Presentes no HTML (mas podem não existir fisicamente)

1. **Success Cases Section:**
   - `/fundo-marmore-1-webp.png` - Imagem de fundo ✅ (referenciada no HTML)

2. **Testimonials Section:**
   - `/assets/bg/fundo-marmore.png` - Imagem de fundo ✅ (referenciada no HTML)

3. **Newsletter Bottom Section:**
   - `/bg-newsletter.jpg.webp` - Imagem de fundo ✅ (referenciada no HTML)
   - `/foto-recortada-cataldo.png` - Foto do advogado ✅ (referenciada no HTML)

### ❌ Imagens Faltantes ou Usando Placeholders

1. **Hero Section:**
   - ❌ `/visao-panoramica-rio-janeiro.jpg` - **FALTANDO**
     - **Atual:** Usando `https://images.unsplash.com/photo-1556761175-5973dc0f32e7...`
     - **Esperado:** `/visao-panoramica-rio-janeiro.jpg`

2. **About Section (Raphael):**
   - ⚠️ Imagem do Raphael - **USANDO PLACEHOLDER**
     - **Atual:** `https://images.unsplash.com/photo-1560250097-0b93528c311a...`
     - **Nota:** Não há referência específica no inventário para esta seção, mas seria bom ter uma imagem real

### 📋 Checklist de Verificação

#### Imagens que Precisam Ser Verificadas/Adicionadas:

- [ ] `/visao-panoramica-rio-janeiro.jpg` - Hero background
- [ ] `/fundo-marmore-1-webp.png` - Success Cases background
- [ ] `/assets/bg/fundo-marmore.png` - Testimonials background
- [ ] `/bg-newsletter.jpg.webp` - Newsletter background
- [ ] `/foto-recortada-cataldo.png` - Foto do advogado (Newsletter)
- [ ] Imagem do Raphael para About Section (se disponível)

#### Logo

- ⚠️ **Logo não mencionado no inventário**
- **Atual:** Apenas texto "CATALDO SISTON" no header
- **Recomendação:** Verificar se existe um arquivo de logo que deveria ser usado

### 🔍 Verificação de Arquivos Físicos

**Arquivos de imagem não encontrados no diretório raiz:**
- Nenhum arquivo `.jpg`, `.png` ou `.webp` encontrado no diretório do projeto
- As imagens podem estar em:
  - Diretório `public/`
  - Servidor/CDN externo
  - Ainda não foram adicionadas ao projeto

### 📝 Recomendações

1. **Verificar se as imagens existem:**
   - Criar diretório `public/` ou `assets/` se necessário
   - Adicionar as imagens mencionadas no inventário

2. **Hero Section:**
   - Substituir placeholder do Unsplash por `/visao-panoramica-rio-janeiro.jpg`

3. **About Section:**
   - Considerar adicionar imagem real do Raphael se disponível

4. **Logo:**
   - Verificar se existe arquivo de logo que deveria ser usado no header

### 🎯 Prioridades

**Alta:**
- `/visao-panoramica-rio-janeiro.jpg` (Hero background - mencionado no inventário)

**Média:**
- Verificar existência de `/fundo-marmore-1-webp.png`
- Verificar existência de `/assets/bg/fundo-marmore.png`
- Verificar existência de `/bg-newsletter.jpg.webp`
- Verificar existência de `/foto-recortada-cataldo.png`

**Baixa:**
- Logo (se existir)
- Imagem do Raphael para About Section


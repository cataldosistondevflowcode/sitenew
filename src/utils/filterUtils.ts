/**
 * Utilitários para filtros - versão vanilla JS para uso em HTML estático
 */

/**
 * Escapa caracteres especiais do SQL para prevenir SQL Injection
 */
export const escapeSqlLike = (str: string): string => {
  return str
    .replace(/\\/g, '\\\\')  // Escapa \
    .replace(/%/g, '\\%')    // Escapa %
    .replace(/_/g, '\\_')    // Escapa _
    .replace(/'/g, "''");    // Escapa '
};

/**
 * Remove caracteres problemáticos antes de buscar
 */
export const sanitizeSearchInput = (str: string): string => {
  return str
    .replace(/[,;]/g, '')  // Remove vírgulas e ponto e vírgula
    .trim();
};

/**
 * Parse filtros da URL
 */
export const parseFiltersFromURL = (): Record<string, any> => {
  const params = new URLSearchParams(window.location.search);
  const filters: Record<string, any> = {};
  
  // Cidade
  const cidade = params.get('cidade');
  if (cidade) filters.city = cidade;
  
  const cidades = params.get('cidades');
  if (cidades) filters.cities = cidades.split(',');
  
  // Tipo de imóvel
  const tipo = params.get('tipo');
  if (tipo) filters.type = tipo;
  
  // Bairro
  const bairro = params.get('bairro');
  if (bairro) filters.neighborhood = bairro;
  
  const bairros = params.get('bairros');
  if (bairros) filters.neighborhoods = bairros.split(',');
  
  // Zona
  const zona = params.get('zona');
  if (zona) filters.zone = zona;
  
  const zonas = params.get('zonas');
  if (zonas) filters.zones = zonas.split(',');
  
  // Localização
  const localizacao = params.get('localizacao');
  if (localizacao) filters.location = localizacao;
  
  // Palavra-chave
  const palavra_chave = params.get('palavra_chave');
  if (palavra_chave) filters.keyword = palavra_chave;
  
  // Preço
  const preco_min = params.get('preco_min');
  const preco_max = params.get('preco_max');
  if (preco_min || preco_max) {
    filters.priceRange = {};
    if (preco_min) {
      const min = parseInt(preco_min);
      if (!isNaN(min)) filters.priceRange.min = min;
    }
    if (preco_max) {
      const max = parseInt(preco_max);
      if (!isNaN(max)) filters.priceRange.max = max;
    }
  }
  
  // Tipo de leilão
  const tipo_leilao = params.get('tipo_leilao');
  if (tipo_leilao) filters.auctionType = tipo_leilao;
  
  // Segundo leilão
  const segundo_leilao = params.get('segundo_leilao');
  if (segundo_leilao === 'true') filters.hasSecondAuction = true;
  
  // Financiamento
  const financiamento = params.get('financiamento');
  if (financiamento === 'true') filters.financiamento = true;
  
  // FGTS
  const fgts = params.get('fgts');
  if (fgts === 'true') filters.fgts = true;
  
  // Parcelamento
  const parcelamento = params.get('parcelamento');
  if (parcelamento === 'true') filters.parcelamento = true;
  
  // Data fim segundo leilão
  const data_fim_segundo_leilao = params.get('data_fim_segundo_leilao');
  if (data_fim_segundo_leilao) filters.dataFimSegundoLeilao = data_fim_segundo_leilao;
  
  return filters;
};

/**
 * Atualiza URL com filtros
 */
export const updateURL = (filters: Record<string, any>) => {
  const params = new URLSearchParams();
  
  if (filters.city) params.set('cidade', filters.city);
  if (filters.cities && filters.cities.length > 0) params.set('cidades', filters.cities.join(','));
  if (filters.type) params.set('tipo', filters.type);
  if (filters.neighborhood) params.set('bairro', filters.neighborhood);
  if (filters.neighborhoods && filters.neighborhoods.length > 0) params.set('bairros', filters.neighborhoods.join(','));
  if (filters.zone) params.set('zona', filters.zone);
  if (filters.zones && filters.zones.length > 0) params.set('zonas', filters.zones.join(','));
  if (filters.location) params.set('localizacao', filters.location);
  if (filters.keyword) params.set('palavra_chave', filters.keyword);
  if (filters.priceRange?.min !== undefined) params.set('preco_min', filters.priceRange.min.toString());
  if (filters.priceRange?.max !== undefined) params.set('preco_max', filters.priceRange.max.toString());
  if (filters.auctionType) params.set('tipo_leilao', filters.auctionType);
  if (filters.hasSecondAuction) params.set('segundo_leilao', 'true');
  if (filters.financiamento) params.set('financiamento', 'true');
  if (filters.fgts) params.set('fgts', 'true');
  if (filters.parcelamento) params.set('parcelamento', 'true');
  if (filters.dataFimSegundoLeilao) params.set('data_fim_segundo_leilao', filters.dataFimSegundoLeilao);
  
  const newUrl = params.toString() 
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;
  
  window.history.replaceState({}, '', newUrl);
};


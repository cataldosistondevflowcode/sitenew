import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export interface FilterParams {
  city?: string;                    // Cidade única ou múltiplas (separadas por vírgula)
  type?: string;                     // Tipo de imóvel único ou múltiplos
  neighborhood?: string;             // Bairro único ou múltiplos
  location?: string;                // Busca livre em endereço/bairro/cidade
  keyword?: string;                  // Busca em título/descrição
  hasSecondAuction?: boolean;        // Apenas com segundo leilão
  priceRange?: { min?: number; max?: number; };
  priceRanges?: string[];           // Labels das faixas selecionadas
  financiamento?: boolean;           // Aceita financiamento
  fgts?: boolean;                   // Aceita FGTS
  parcelamento?: boolean;            // Permite parcelamento
  auctionType?: string;              // Tipo de leilão (Judicial, Extrajudicial, etc.)
  neighborhoods?: string[];          // Array de bairros
  cities?: string[];                 // Array de cidades
  dataFimSegundoLeilao?: string;     // Data final (ISO)
  zone?: string;                     // Zona única
  zones?: string[];                  // Múltiplas zonas
}

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // CONVERTE URL → OBJETO FILTROS
  const parseFiltersFromURL = useCallback((): FilterParams => {
    const filters: FilterParams = {};
    
    // Cidade
    const cidade = searchParams.get('cidade');
    if (cidade) filters.city = cidade;
    
    const cidades = searchParams.get('cidades');
    if (cidades) filters.cities = cidades.split(',');
    
    // Tipo de imóvel
    const tipo = searchParams.get('tipo');
    if (tipo) filters.type = tipo;
    
    // Bairro
    const bairro = searchParams.get('bairro');
    if (bairro) filters.neighborhood = bairro;
    
    const bairros = searchParams.get('bairros');
    if (bairros) filters.neighborhoods = bairros.split(',');
    
    // Zona
    const zona = searchParams.get('zona');
    if (zona) filters.zone = zona;
    
    const zonas = searchParams.get('zonas');
    if (zonas) filters.zones = zonas.split(',');
    
    // Localização (busca livre)
    const localizacao = searchParams.get('localizacao');
    if (localizacao) filters.location = localizacao;
    
    // Palavra-chave
    const palavra_chave = searchParams.get('palavra_chave');
    if (palavra_chave) filters.keyword = palavra_chave;
    
    // Preço
    const preco_min = searchParams.get('preco_min');
    const preco_max = searchParams.get('preco_max');
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
    
    // Faixas de preço
    const faixas_preco = searchParams.get('faixas_preco');
    if (faixas_preco) filters.priceRanges = faixas_preco.split(',');
    
    // Tipo de leilão
    const tipo_leilao = searchParams.get('tipo_leilao');
    if (tipo_leilao) filters.auctionType = tipo_leilao;
    
    // Segundo leilão
    const segundo_leilao = searchParams.get('segundo_leilao');
    if (segundo_leilao === 'true') filters.hasSecondAuction = true;
    
    // Financiamento
    const financiamento = searchParams.get('financiamento');
    if (financiamento === 'true') filters.financiamento = true;
    
    // FGTS
    const fgts = searchParams.get('fgts');
    if (fgts === 'true') filters.fgts = true;
    
    // Parcelamento
    const parcelamento = searchParams.get('parcelamento');
    if (parcelamento === 'true') filters.parcelamento = true;
    
    // Data fim segundo leilão
    const data_fim_segundo_leilao = searchParams.get('data_fim_segundo_leilao');
    if (data_fim_segundo_leilao) filters.dataFimSegundoLeilao = data_fim_segundo_leilao;
    
    return filters;
  }, [searchParams]);

  // CONVERTE OBJETO FILTROS → URL
  const updateURL = useCallback((filters: FilterParams) => {
    const newParams = new URLSearchParams();
    
    if (filters.city) newParams.set('cidade', filters.city);
    if (filters.cities && filters.cities.length > 0) newParams.set('cidades', filters.cities.join(','));
    if (filters.type) newParams.set('tipo', filters.type);
    if (filters.neighborhood) newParams.set('bairro', filters.neighborhood);
    if (filters.neighborhoods && filters.neighborhoods.length > 0) newParams.set('bairros', filters.neighborhoods.join(','));
    if (filters.zone) newParams.set('zona', filters.zone);
    if (filters.zones && filters.zones.length > 0) newParams.set('zonas', filters.zones.join(','));
    if (filters.location) newParams.set('localizacao', filters.location);
    if (filters.keyword) newParams.set('palavra_chave', filters.keyword);
    if (filters.priceRange?.min !== undefined) newParams.set('preco_min', filters.priceRange.min.toString());
    if (filters.priceRange?.max !== undefined) newParams.set('preco_max', filters.priceRange.max.toString());
    if (filters.priceRanges && filters.priceRanges.length > 0) newParams.set('faixas_preco', filters.priceRanges.join(','));
    if (filters.auctionType) newParams.set('tipo_leilao', filters.auctionType);
    if (filters.hasSecondAuction) newParams.set('segundo_leilao', 'true');
    if (filters.financiamento) newParams.set('financiamento', 'true');
    if (filters.fgts) newParams.set('fgts', 'true');
    if (filters.parcelamento) newParams.set('parcelamento', 'true');
    if (filters.dataFimSegundoLeilao) newParams.set('data_fim_segundo_leilao', filters.dataFimSegundoLeilao);
    
    setSearchParams(newParams, { replace: true });
  }, [setSearchParams]);

  // Limpar filtros da URL
  const clearFiltersFromURL = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Obter URL atual compartilhável
  const getShareableURL = useCallback(() => {
    return window.location.href;
  }, []);

  // Criar URL compartilhável com filtros
  const createShareableURL = useCallback((filters: FilterParams) => {
    const baseUrl = window.location.origin + window.location.pathname;
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
    if (filters.priceRanges && filters.priceRanges.length > 0) params.set('faixas_preco', filters.priceRanges.join(','));
    if (filters.auctionType) params.set('tipo_leilao', filters.auctionType);
    if (filters.hasSecondAuction) params.set('segundo_leilao', 'true');
    if (filters.financiamento) params.set('financiamento', 'true');
    if (filters.fgts) params.set('fgts', 'true');
    if (filters.parcelamento) params.set('parcelamento', 'true');
    if (filters.dataFimSegundoLeilao) params.set('data_fim_segundo_leilao', filters.dataFimSegundoLeilao);
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }, []);

  return {
    parseFiltersFromURL,  // URL → Filtros
    updateURL,             // Filtros → URL
    clearFiltersFromURL,   // Limpar URL
    getShareableURL,       // Obter URL atual
    createShareableURL     // Criar URL com filtros
  };
};


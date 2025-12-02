import type { WebflowItem, WebflowImageField, WebflowLinkField, WebflowOptionField, WebflowReferenceField } from './types';

/**
 * Tipos gerados automaticamente baseados nas Collections do Webflow
 * 
 * Para regenerar, execute: npm run generate-webflow-types
 */

export interface ImvelsItemFieldData {
  photo?: WebflowImageField;
  maps?: string;
  streetview?: string;
  catalogoDaSemana?: boolean;
  dataLeilao2?: string;
  valorLeilao2?: string;
  numeroProcesso?: string;
  zona?: string;
  regiao?: string;
  quartos?: string;
  garagem?: string;
  name?: string;
  idLeiloon?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  descric?: string;
  url?: string;
  consorcio?: string;
  parcelamento?: string;
  fgts?: string;
  financiamento?: string;
  dataLeilao1?: string;
  valorLeilao1?: string;
  tipoLeilao?: string;
  tipoPropriedade?: string;
  tituloPropriedade?: string;
  endereco?: string;
  slug?: string;
}

export interface ImvelsItem extends WebflowItem {
  fieldData: ImvelsItemFieldData;
}

export interface TestimonialsItemFieldData {
  nomeDaPessoa?: string;
  cargo?: string;
  testemunho?: string;
  name?: string;
  slug?: string;
}

export interface TestimonialsItem extends WebflowItem {
  fieldData: TestimonialsItemFieldData;
}

export interface ContedosItemFieldData {
  descricao?: string;
  tag?: string;
  name?: string;
  slug?: string;
  destaque?: boolean;
}

export interface ContedosItem extends WebflowItem {
  fieldData: ContedosItemFieldData;
}

export interface TiposdeContedosItemFieldData {
  tiposDeConteudo?: string;
  name?: string;
  slug?: string;
}

export interface TiposdeContedosItem extends WebflowItem {
  fieldData: TiposdeContedosItemFieldData;
}

export interface BlogsItemFieldData {
  data?: string;
  conteudo?: string;
  name?: string;
  slug?: string;
  tag?: string;
  imagemDeCapa?: string;
}

export interface BlogsItem extends WebflowItem {
  fieldData: BlogsItemFieldData;
}

export interface CasosReaisItemFieldData {
  listagemDe100Casos?: boolean;
  valorHistorico?: string;
  processo?: string;
  valorDeArrematacao?: string;
  name?: string;
  localizacao?: string;
  unidade?: string;
  slug?: string;
}

export interface CasosReaisItem extends WebflowItem {
  fieldData: CasosReaisItemFieldData;
}

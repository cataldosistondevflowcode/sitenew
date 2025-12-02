/**
 * Página de detalhes de um imóvel específico
 * Busca dados da Webflow usando o slug
 */

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCollectionItemBySlugLive } from '@/hooks/useWebflow';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { MapPin, Calendar, DollarSign, TrendingUp, Home, ShieldCheck, AlertTriangle, Scale, ArrowRight, Star, ChevronDown, Building2, Ruler, Bed, Car, Gavel, CreditCard } from 'lucide-react';

export default function WebflowPropertyDetail() {
  const { collectionId, slug } = useParams<{ collectionId: string; slug: string }>();
  
  const { data: property, isLoading, error } = useCollectionItemBySlugLive(
    collectionId || '',
    slug || ''
  );

  // Estado para controlar visualização (foto, mapa, street view) - DEVE estar antes de qualquer retorno
  const [activeView, setActiveView] = useState<'photo' | 'map' | 'street'>('photo');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-zinc-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-zinc-900 mb-4">Imóvel não encontrado</h1>
            <p className="text-zinc-600">O imóvel que você está procurando não foi encontrado.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const fieldData = property.fieldData as Record<string, unknown>;
  
  // Campos do CMS
  const title = (fieldData.name as string) || (fieldData['titulo-propriedade'] as string) || 'Imóvel';
  const description = (fieldData.descric as string) || (fieldData.descricao as string) || '';
  const address = (fieldData.endereco as string) || '';
  const city = (fieldData.cidade as string) || '';
  const state = (fieldData.estado as string) || '';
  const bairro = (fieldData.bairro as string) || '';
  
  // URLs do CMS
  const photo = (fieldData.photo as string) || '';
  const maps = (fieldData.maps as string) || '';
  const streetview = (fieldData.streetview as string) || '';
  
  // Informações do leilão
  const tipoLeilao = (fieldData['tipo-leilao'] as string) || '';
  const primeiroLeilao = (fieldData['data-leilao-1'] as string) || '';
  const valorLeilao1 = (fieldData['valor-leilao-1'] as string) || '';
  const segundoLeilao = (fieldData['data-leilao-2'] as string) || '';
  const valorLeilao2 = (fieldData['valor-leilao-2'] as string) || '';
  const tipoPropriedade = (fieldData['tipo-propriedade'] as string) || '';
  const quartos = (fieldData.quartos as string) || '';
  const garagem = (fieldData.garagem as string) || '';

  const tipoLeilaoColor = tipoLeilao === 'EXTRAJUDICIAL' ? 'bg-orange-600' : 'bg-red-600';
  
  // Formatar endereço completo
  const enderecoCompleto = [address, bairro, city, state].filter(Boolean).join(', ');
  
  // Formatar valor monetário
  const formatCurrency = (value: string | undefined) => {
    if (!value) return '-';
    const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) : parseFloat(value);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(num);
  };

  // Formatar data
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Referência
  const refNumber = (fieldData['numero-processo'] as string) || (fieldData['id-leiloon'] as string) || '-';
  
  // Área (zona ou regiao)
  const area = (fieldData.zona as string) || (fieldData.regiao as string) || '';
  
  // Formas de pagamento
  const formasPagamento = [];
  if (fieldData.fgts && fieldData.fgts !== 'false' && fieldData.fgts !== '') formasPagamento.push('FGTS');
  if (fieldData.financiamento && fieldData.financiamento !== 'false' && fieldData.financiamento !== '') formasPagamento.push('Financiamento');
  if (fieldData.consorcio && fieldData.consorcio !== 'false' && fieldData.consorcio !== '') formasPagamento.push('Consórcio');
  const parcelamento = (fieldData.parcelamento as string) || '';

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 mb-4 uppercase tracking-wider">
          <a href="/" className="hover:text-zinc-900 transition-colors">Home</a>
          <span>/</span>
          <a href="/webflow" className="hover:text-zinc-900 transition-colors">Imóveis</a>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{title}</span>
        </div>

        {/* Main Grid: Above the Fold */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10">
          
          {/* Left: Visuals (Photo, Map, Street View) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm group">
              
              {/* View: Photo */}
              {activeView === 'photo' && photo && (
                <div className="w-full h-full">
                  <img src={photo} alt={title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-zinc-900 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded shadow-sm border border-zinc-200">
                      {title.split(' ').pop()?.toUpperCase() || 'LOTE'}
                    </span>
                  </div>
                </div>
              )}

              {/* View: Map */}
              {activeView === 'map' && maps && (
                <div className="w-full h-full bg-zinc-100 relative">
                  <iframe src={maps} width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%)' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              )}

              {/* View: Street View */}
              {activeView === 'street' && streetview && (
                <div className="w-full h-full bg-zinc-800 relative group-hover:bg-zinc-700 transition-colors">
                  <img src={streetview} alt="Street View" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Navigation className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm font-medium">Street View Interativo</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur p-1 rounded-lg shadow-lg border border-zinc-200/50 flex gap-1 z-10">
                <button
                  onClick={() => setActiveView('photo')}
                  className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-semibold tracking-wide transition-all ${
                    activeView === 'photo'
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  Foto
                </button>
                {maps && (
                  <button
                    onClick={() => setActiveView('map')}
                    className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-semibold tracking-wide transition-all ${
                      activeView === 'map'
                        ? 'bg-zinc-900 text-white shadow-sm'
                        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                  >
                    Mapa
                  </button>
                )}
                {streetview && (
                  <button
                    onClick={() => setActiveView('street')}
                    className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-semibold tracking-wide transition-all ${
                      activeView === 'street'
                        ? 'bg-zinc-900 text-white shadow-sm'
                        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                  >
                    Street View
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Data & Auction Info */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* 1. Header & Status */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 text-amber-700 text-[10px] font-semibold uppercase tracking-wider border border-amber-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  {tipoLeilao || 'Em Leilão'}
                </span>
                <span className="text-xs text-zinc-400 font-medium">Ref: {refNumber}</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-serif text-zinc-900 tracking-tight leading-[1.1] mb-3">
                {title}
              </h1>
              
              <div className="flex items-start gap-2 text-sm text-zinc-500 font-light leading-snug">
                <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                <span>{enderecoCompleto || 'Endereço não informado'}</span>
              </div>
            </div>

            {/* 2. Property Specs Grid */}
            <div className="grid grid-cols-4 gap-2 mb-6 border-t border-b border-zinc-100 py-4">
              <div className="flex flex-col items-center justify-center text-center p-2 rounded bg-zinc-50/50">
                <Building2 className="w-4 h-4 text-zinc-400 mb-1.5" />
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Tipo</span>
                <span className="text-xs font-semibold text-zinc-900">{tipoPropriedade || '-'}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded bg-zinc-50/50">
                <Ruler className="w-4 h-4 text-zinc-400 mb-1.5" />
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Área</span>
                <span className="text-xs font-semibold text-zinc-900">{area || '-'}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded bg-zinc-50/50">
                <Bed className="w-4 h-4 text-zinc-400 mb-1.5" />
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Quartos</span>
                <span className="text-xs font-semibold text-zinc-900">{quartos || '-'}</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded bg-zinc-50/50">
                <Car className="w-4 h-4 text-zinc-400 mb-1.5" />
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Vagas</span>
                <span className="text-xs font-semibold text-zinc-900">{garagem || '-'}</span>
              </div>
            </div>

            {/* 3. Auction Values Card */}
            <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden mb-5 shadow-sm">
              {primeiroLeilao || valorLeilao1 ? (
                <>
                  {segundoLeilao || valorLeilao2 ? (
                    // 1º Leilão (encerrado)
                    <div className="flex items-center justify-between p-3 border-b border-zinc-100 bg-zinc-50/50 opacity-60">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">1º Leilão (Encerrado)</span>
                        <span className="text-xs text-zinc-500">{formatDate(primeiroLeilao)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-zinc-400 uppercase tracking-wide">Mínimo:</span>
                        <span className="block text-sm font-medium text-zinc-500 line-through decoration-zinc-400">{formatCurrency(valorLeilao1)}</span>
                      </div>
                    </div>
                  ) : (
                    // 1º Leilão (aberto)
                    <div className="flex items-center justify-between p-3 border-b border-zinc-100 bg-white">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">1º Leilão (Aberto)</span>
                        <span className="text-xs font-medium text-zinc-900">{formatDate(primeiroLeilao)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-zinc-400 uppercase tracking-wide">Lance Mínimo</span>
                        <span className="block text-2xl font-serif font-semibold text-zinc-900 tracking-tight">{formatCurrency(valorLeilao1)}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* 2º Leilão (sempre aberto) */}
                  {(segundoLeilao || valorLeilao2) && (
                    <div className="flex items-center justify-between p-4 bg-white relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider mb-0.5">2º Leilão (Aberto)</span>
                        <span className="text-xs font-medium text-zinc-900">{segundoLeilao ? `Encerra em: ${formatDate(segundoLeilao)}` : 'Em andamento'}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wide">Lance Mínimo</span>
                        <div className="text-2xl font-serif font-semibold text-zinc-900 tracking-tight">{formatCurrency(valorLeilao2)}</div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 text-sm text-zinc-500">Informações de leilão não disponíveis</div>
              )}
            </div>

            {/* 4. Payment Info */}
            {formasPagamento.length > 0 && (
              <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-100 p-3 rounded-lg mb-6">
                <CreditCard className="w-4 h-4 text-blue-800 mt-0.5 shrink-0" />
                <div className="text-xs text-blue-900 font-light leading-relaxed">
                  <strong className="font-medium text-blue-900 block mb-0.5">Forma de Pagamento</strong>
                  <span>
                    Formas de pagamento: {formasPagamento.join(', ')}
                    {parcelamento && `. ${parcelamento}`}
                  </span>
                </div>
              </div>
            )}

            {/* 5. Actions */}
            <div className="mt-auto">
              <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-lg shadow-zinc-200/50 transition-all flex items-center justify-center gap-2">
                Efetuar Lance
                <Gavel className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>

          </div>
          </div>

        {/* Description Section (Right below fold) */}
        {description && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 pt-8 border-t border-zinc-200">
            <div className="lg:col-span-8">
              <h3 className="font-serif text-lg text-zinc-900 mb-4">Descrição do Bem</h3>
              <div
                className="prose prose-zinc prose-sm text-zinc-600 font-light leading-relaxed max-w-none text-justify"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <div className="lg:col-span-4">
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-lg">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 mb-3">Links Rápidos</h4>
                <div className="space-y-2">
                  {fieldData.url && (
                    <>
                      <a href={fieldData.url as string} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-xs text-zinc-600 hover:text-zinc-900 p-2 bg-white rounded border border-zinc-200 hover:border-zinc-300 transition-all">
                        <span>Edital do Leilão</span>
                        <span className="text-zinc-400">→</span>
                      </a>
                      <a href={fieldData.url as string} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-xs text-zinc-600 hover:text-zinc-900 p-2 bg-white rounded border border-zinc-200 hover:border-zinc-300 transition-all">
                        <span>Matrícula (RGI)</span>
                        <span className="text-zinc-400">→</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SEÇÃO: BENEFÍCIOS */}
      <section className="py-16 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-serif text-zinc-900 mb-3 tracking-tight">Benefícios dos leilões imobiliários</h2>
            <p className="text-sm md:text-base text-zinc-500 font-light">
              Imóveis podem ser adquiridos com fortes descontos, tornando a compra vantajosa para investidores e compradores de moradia.
            </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-6 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-2">Alta rentabilidade</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Alta rentabilidade na revenda ou locação do imóvel adquirido.</p>
            </div>
            <div className="group p-6 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Home className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-2">Valor abaixo do mercado</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Compra da moradia por valor muito abaixo do praticado no mercado.</p>
            </div>
            <div className="group p-6 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-2">Segurança Jurídica</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Segurança jurídica do investimento, quando bem assessorado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: RISCOS */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
              <h2 className="text-2xl font-serif text-zinc-900 mb-4 tracking-tight">Quais são os riscos de arrematar imóveis em leilão?</h2>
              <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6">
                Riscos envolvem demora na finalização da arrematação (posse e propriedade) e possível anulação caso haja vício no processo judicial ou extrajudicial. É fundamental uma análise prévia detalhada.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-700">
                <AlertTriangle className="w-4 h-4" />
                <span>Atenção aos detalhes processuais</span>
                  </div>
                  </div>
            <div className="relative h-full min-h-[200px] bg-white rounded-lg border border-zinc-200 p-6 shadow-sm flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 mb-3">
                  <Scale className="w-6 h-6 text-zinc-400" />
                </div>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">"O sucesso do investimento depende diretamente da qualidade da análise jurídica prévia."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: COMO ARREMATAR */}
      <section className="py-16 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-zinc-900 mb-4 tracking-tight">Como arrematar com segurança?</h2>
            <p className="text-sm text-zinc-500 font-light">
              O sucesso do investimento é principalmente jurídico. Um escritório especializado garante segurança desde a due diligence até a entrega da posse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-zinc-200 -z-10"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border border-zinc-200 rounded-full flex items-center justify-center shadow-sm mb-4 z-10">
                <span className="text-2xl font-serif text-zinc-300">01</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">Pré-Leilão</h3>
              <p className="text-xs text-zinc-500 font-light px-4">Estudo de viabilidade jurídica do leilão imobiliário e análise de riscos.</p>
                  </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-zinc-900 border border-zinc-900 rounded-full flex items-center justify-center shadow-lg shadow-zinc-200 mb-4 z-10">
                <span className="text-2xl font-serif text-white">02</span>
                  </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">Dia do Leilão</h3>
              <p className="text-xs text-zinc-500 font-light px-4">Acompanhamento dos lances e assinatura do Auto de Arrematação.</p>
                  </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border border-zinc-200 rounded-full flex items-center justify-center shadow-sm mb-4 z-10">
                <span className="text-2xl font-serif text-zinc-300">03</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-2">Pós-Leilão</h3>
              <p className="text-xs text-zinc-500 font-light px-4">Desocupação do imóvel, regularização e registro da propriedade.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 px-6 py-3 rounded-lg shadow-sm transition-colors">
              <span>Saiba mais sobre a nossa assessoria</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO: FAQ */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl font-serif text-zinc-900 mb-8 tracking-tight text-center">Dúvidas sobre leilões de imóveis</h2>
          
          <div className="space-y-2">
            <details className="group bg-white border border-zinc-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer select-none">
                <span className="text-sm font-medium text-zinc-700">Como posso ter a posse do imóvel arrematado?</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 pt-0 text-xs text-zinc-500 font-light leading-relaxed border-t border-zinc-100 mt-2 pt-3">
                A posse é obtida através de uma ordem judicial de imissão na posse, expedida pelo juiz após a arrematação e pagamento.
              </div>
            </details>

            <details className="group bg-white border border-zinc-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer select-none">
                <span className="text-sm font-medium text-zinc-700">Como é feito o pagamento no leilão judicial?</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 pt-0 text-xs text-zinc-500 font-light leading-relaxed border-t border-zinc-100 mt-2 pt-3">
                Geralmente através de guia de depósito judicial, podendo ser à vista ou parcelado, conforme as regras do edital.
              </div>
            </details>

            <details className="group bg-white border border-zinc-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer select-none">
                <span className="text-sm font-medium text-zinc-700">Quem paga as dívidas de condomínio e IPTU?</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 pt-0 text-xs text-zinc-500 font-light leading-relaxed border-t border-zinc-100 mt-2 pt-3">
                Em regra, os débitos anteriores à arrematação são sub-rogados no preço (pagos com o valor do leilão), mas é crucial ler o edital.
              </div>
            </details>

            <details className="group bg-white border border-zinc-200 rounded-lg overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer select-none">
                <span className="text-sm font-medium text-zinc-700">É seguro arrematar imóveis em leilão?</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 pt-0 text-xs text-zinc-500 font-light leading-relaxed border-t border-zinc-100 mt-2 pt-3">
                Sim, desde que haja uma análise jurídica prévia (due diligence) para identificar possíveis nulidades ou dívidas ocultas.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* SEÇÃO: DEPOIMENTOS */}
      <section className="py-16 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-2xl font-serif text-zinc-900 mb-10 tracking-tight text-center">O que dizem nossos clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-100">
              <div className="flex gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 italic mb-4">"A assessoria foi fundamental para garantir que o imóvel não tinha pendências ocultas. Excelente trabalho."</p>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Carlos Mendes</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-100">
              <div className="flex gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 italic mb-4">"Consegui arrematar minha casa própria por 60% do valor de mercado. Processo transparente e rápido."</p>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Ana Beatriz</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-xl border border-zinc-100">
              <div className="flex gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 italic mb-4">"Profissionais de altíssimo nível. A due diligence pré-leilão me salvou de um mau negócio."</p>
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Roberto Silva</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: NEWSLETTER */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-2xl font-serif mb-4 tracking-tight">Receba oportunidades exclusivas</h2>
          <p className="text-zinc-400 text-sm mb-8 font-light">Cadastre-se para receber alertas de novos leilões e notícias do mercado.</p>
          
          <form className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
            <input type="text" placeholder="Seu nome" className="flex-1 bg-zinc-800 border-zinc-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder-zinc-500" />
            <input type="email" placeholder="Seu e-mail" className="flex-1 bg-zinc-800 border-zinc-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder-zinc-500" />
            <input type="tel" placeholder="Telefone" className="flex-1 bg-zinc-800 border-zinc-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-zinc-500 placeholder-zinc-500" />
            <button type="button" className="bg-white text-zinc-900 font-medium text-sm px-6 py-3 rounded hover:bg-zinc-100 transition-colors uppercase tracking-wide">Enviar</button>
          </form>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}


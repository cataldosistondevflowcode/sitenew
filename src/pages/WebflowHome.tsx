/**
 * Página principal com novo design
 * Integrada com Webflow CMS
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollectionItemsPaginated } from '@/hooks/useWebflow';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { 
  Mail, Phone, MessageCircle, Facebook, Instagram, Youtube, 
  Gavel, ShieldCheck, Scale, Landmark, FileKey2, RefreshCcw,
  CheckCircle2, ArrowUpRight, Calendar, Maximize, Car, Share2,
  ArrowRight, ChevronLeft, ChevronRight, Quote, Play, MapPin,
  ChevronDown, Menu
} from 'lucide-react';
import type { WebflowItem } from '@/lib/webflow/types';

export default function WebflowHome() {
  const collectionId = import.meta.env.VITE_WEBFLOW_PROPERTIES_COLLECTION_ID || '69103abe35607f9876aac632';
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 colunas x 3 linhas
  
  // Paginação para vídeos em destaque
  const [currentVideoPage, setCurrentVideoPage] = useState(1);
  const videosPerPage = 6; // 2 linhas x 3 colunas
  
  const { data: response, isLoading } = useCollectionItemsPaginated(
    collectionId,
    currentPage,
    itemsPerPage
  );
  
  const properties = response?.items || [];
  const totalItems = response?.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Formatar valor monetário
  const formatCurrency = (value: string | undefined) => {
    if (!value) return 'R$ 0,00';
    const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) : parseFloat(value);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(num);
  };

  // Formatar data
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Obter URL da imagem
  const getImageUrl = (property: WebflowItem) => {
    const fieldData = property.fieldData as Record<string, unknown>;
    const photo = fieldData.photo;
    if (typeof photo === 'object' && photo !== null && 'url' in photo) {
      return (photo as { url: string }).url;
    }
    if (typeof photo === 'string') {
      return photo;
    }
    return 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800';
  };


  return (
    <div className="bg-zinc-50 text-zinc-800 antialiased selection:bg-amber-500 selection:text-white flex flex-col min-h-screen scroll-smooth">
        
        {/* Topbar */}
        <div className="bg-[#1a1a1a] text-zinc-400 py-2 text-[11px] border-b border-zinc-800/50 relative z-50">
          <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center max-w-[1400px]">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>contato@cataldosiston-adv.com.br</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+55 (21) 3173-3795</span>
              </div>
              <a href="#" className="hidden md:flex items-center gap-1 bg-[#25D366] hover:bg-[#20bd5a] text-white px-2 py-0.5 rounded transition-colors font-semibold">
                <MessageCircle className="w-3 h-3" /> Fale Conosco
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-3">
                <a href="#" className="hover:text-amber-500 transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
                <a href="#" className="hover:text-amber-500 transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
                <a href="#" className="hover:text-amber-500 transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar - Igual às páginas HTML estáticas */}
        <nav className="sticky top-0 z-40 mx-4 lg:mx-8">
          <div className="bg-white rounded-xl border border-zinc-200/50 backdrop-blur-md bg-white/90 shadow-lg shadow-zinc-900/5 mt-4">
            <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center max-w-[1400px] py-6">
              <Link to="/" className="flex flex-col items-start group">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                  <img src="https://cdn.prod.website-files.com/69023853a6b8fa97b90fd72d/6911dd6a49f6f0dabff0a498_logotipo_cataldo_siston.png" alt="Cataldo Siston Advogados" className="h-8 w-auto" />
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-8">
                <a href="escritorio-imobiliario.html" className="text-xs font-medium text-zinc-700 hover:text-amber-600 transition-colors uppercase tracking-wider">Quem somos</a>

                {/* Dropdown Imóveis em Leilão */}
                <div className="relative group">
                  <button className="text-xs font-medium text-zinc-700 hover:text-amber-600 transition-colors uppercase tracking-wider flex items-center gap-1">
                    Imóveis em Leilão
                    <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white border border-zinc-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[150px] z-50">
                    <a href="imoveis-rj.html" className="block px-4 py-3 text-xs font-medium text-zinc-700 hover:text-amber-600 hover:bg-amber-50 transition-colors uppercase tracking-wider">Imóveis RJ</a>
                    <a href="imoveis-sp.html" className="block px-4 py-3 text-xs font-medium text-zinc-700 hover:text-amber-600 hover:bg-amber-50 transition-colors uppercase tracking-wider">Imóveis SP</a>
                  </div>
                </div>

                <Link to="/assessoria" className="text-xs font-medium text-zinc-700 hover:text-amber-600 transition-colors uppercase tracking-wider">Assessoria</Link>
                
                {/* Dropdown Direito Imobiliário */}
                <div className="relative group">
                  <button className="text-xs font-medium text-zinc-700 hover:text-amber-600 transition-colors uppercase tracking-wider flex items-center gap-1">
                    Direito Imobiliário
                    <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white border border-zinc-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[180px] z-50">
                    <a href="direito-imobiliario.html" className="block px-4 py-3 text-xs font-medium text-zinc-700 hover:text-amber-600 hover:bg-amber-50 transition-colors uppercase tracking-wider">Direito Imobiliário</a>
                    <a href="distrato-imobiliario.html" className="block px-4 py-3 text-xs font-medium text-zinc-700 hover:text-amber-600 hover:bg-amber-50 transition-colors uppercase tracking-wider">Distrato Imobiliário</a>
                  </div>
                </div>

                <a href="casos-reais.html" className="text-xs font-medium text-zinc-700 hover:text-amber-600 transition-colors uppercase tracking-wider">Casos Reais</a>
                <a href="blog.html" className="text-xs font-medium text-zinc-700 hover:text-amber-600 transition-colors uppercase tracking-wider">Blog</a>
                <a href="contato.html" className="text-xs font-medium text-zinc-700 hover:text-amber-600 transition-colors uppercase tracking-wider">Contato</a>
              </div>

              <button className="lg:hidden text-zinc-900 relative z-50">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Header / Hero */}
        <header className="relative w-full h-[650px] sm:h-[750px] lg:h-[850px] bg-zinc-900 flex flex-col -mt-[120px] z-0 overflow-visible">

          {/* Hero Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://cdn.prod.website-files.com/69023853a6b8fa97b90fd72d/69122a90a660f6e2466a9cb5_banner-site-equipe.webp" 
              alt="Advogados Cataldo Siston" 
              className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop';
              }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-black/60"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 flex-grow flex flex-col justify-center items-center text-center max-w-4xl mt-16 sm:mt-20">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 sm:mb-8 tracking-tight leading-tight drop-shadow-lg">
              Leilão de imóveis e<br />Advocacia imobiliária
            </h1>
            <p className="text-zinc-200 text-base md:text-lg max-w-2xl mb-8 font-light leading-relaxed">
              Receba oportunidades de leilões personalizadas, de acordo com o seu perfil.
            </p>
            <button className="group bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all flex items-center gap-2 border border-amber-500 hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] uppercase tracking-wide">
              Entre em contato
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Floating Cards */}
          <div className="relative z-50 container mx-auto px-4 lg:px-12 max-w-[1400px] -mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 relative overflow-hidden shadow-xl rounded-sm border-t-4 border-amber-600 group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center rounded mb-6 shadow-lg shadow-amber-900/10">
                    <Gavel className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-serif text-zinc-900 mb-3 font-medium">Expertise em <br />leilão de imóveis</h3>
                  <div className="w-10 h-0.5 bg-amber-500 mb-4"></div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Mais de <strong className="text-zinc-900">20 anos de experiência</strong> atuando diretamente na arrematação e regularização de mais de <strong className="text-zinc-900">1200 imóveis</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 relative overflow-hidden shadow-xl rounded-sm border-t-4 border-amber-600 group hover:-translate-y-2 transition-transform duration-300 md:-mt-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-amber-600 text-white flex items-center justify-center rounded mb-6 shadow-lg shadow-amber-600/30">
                    <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-serif text-zinc-900 mb-3 font-medium">Segurança Jurídica <br />Comprovada</h3>
                  <div className="w-10 h-0.5 bg-amber-500 mb-4"></div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Corpo jurídico <strong className="text-zinc-900">altamente especializado</strong> que garante a blindagem do seu investimento com análises de risco precisas.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 relative overflow-hidden shadow-xl rounded-sm border-t-4 border-amber-600 group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center rounded mb-6 shadow-lg shadow-amber-900/10">
                    <Scale className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-serif text-zinc-900 mb-3 font-medium">Advocacia de Alta <br />Performance</h3>
                  <div className="w-10 h-0.5 bg-amber-500 mb-4"></div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    <strong className="text-zinc-900">Compromisso total</strong> com o resultado. Transformamos complexidade jurídica em lucro e tranquilidade para o cliente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Specialties Section */}
        <section className="pt-40 pb-24 bg-zinc-50 relative z-10">
          <div className="absolute inset-0 pattern-grid opacity-5 pointer-events-none"></div>
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px] relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-amber-500"></div>
                  <span className="text-amber-600 font-serif italic text-lg font-medium">Áreas de Atuação</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 tracking-tight leading-tight">
                  Soluções Jurídicas <br />
                  <span className="text-zinc-400">Especializadas</span>
                </h2>
              </div>
              <p className="text-zinc-500 max-w-md text-sm leading-relaxed mb-2">
                Atuamos com excelência em nichos específicos do direito imobiliário, oferecendo uma advocacia artesanal e estratégica.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-zinc-200 bg-white shadow-2xl">
              <div className="group relative p-10 border-b lg:border-b-0 lg:border-r border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-0 bg-amber-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Landmark className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif text-zinc-900 mb-6 group-hover:text-amber-600 transition-colors">Leilão de Imóveis</h3>
                <ul className="space-y-4 text-sm text-zinc-600 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Análise de risco (Due Diligence)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Desocupação ágil de imóveis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Regularização e registro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Assessoria completa na arrematação</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider hover:text-amber-600 transition-colors border-b border-transparent hover:border-amber-600 pb-0.5">
                  Saiba mais <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="group relative p-10 border-b lg:border-b-0 lg:border-r border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-0 bg-amber-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <FileKey2 className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif text-zinc-900 mb-6 group-hover:text-amber-600 transition-colors">Direito Imobiliário</h3>
                <ul className="space-y-4 text-sm text-zinc-600 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Compra e venda segura</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Rescisão e Distrato de contratos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Reintegração de posse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Incorporação Imobiliária</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider hover:text-amber-600 transition-colors border-b border-transparent hover:border-amber-600 pb-0.5">
                  Saiba mais <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="group relative p-10 hover:bg-zinc-50/50 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-0 bg-amber-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <RefreshCcw className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif text-zinc-900 mb-6 group-hover:text-amber-600 transition-colors">Recuperação de Crédito</h3>
                <ul className="space-y-4 text-sm text-zinc-600 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Execução de garantia hipotecária</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Cobrança de cotas condominiais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Execução de créditos locatícios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>Avaliação de cessão de crédito</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider hover:text-amber-600 transition-colors border-b border-transparent hover:border-amber-600 pb-0.5">
                  Saiba mais <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Light */}
        <section className="py-16 bg-amber-50/50 border-y border-amber-100">
          <div className="container mx-auto px-4 lg:px-12 max-w-5xl text-center">
            <h2 className="text-3xl font-serif text-zinc-800 mb-2">Inscreva-se para receber</h2>
            <h3 className="text-3xl font-serif text-amber-600 mb-8 italic">oportunidades de leilões de imóveis</h3>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto items-end">
              <div className="flex-1 w-full text-left">
                <label className="block text-xs font-bold text-zinc-600 mb-1 ml-1">Nome*</label>
                <input type="text" className="w-full bg-transparent border-b border-zinc-400 focus:border-amber-600 px-2 py-2 text-sm outline-none transition-colors" placeholder="" />
              </div>
              <div className="flex-1 w-full text-left">
                <label className="block text-xs font-bold text-zinc-600 mb-1 ml-1">Email*</label>
                <input type="email" className="w-full bg-transparent border-b border-zinc-400 focus:border-amber-600 px-2 py-2 text-sm outline-none transition-colors" placeholder="" />
              </div>
              <div className="flex-1 w-full text-left">
                <label className="block text-xs font-bold text-zinc-600 mb-1 ml-1">Telefone*</label>
                <input type="tel" className="w-full bg-transparent border-b border-zinc-400 focus:border-amber-600 px-2 py-2 text-sm outline-none transition-colors" placeholder="" />
              </div>
              <button type="button" className="w-full md:w-auto px-10 py-3 bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-amber-700 transition-colors shadow-lg shadow-amber-200">
                Enviar
              </button>
            </form>
          </div>
        </section>

        {/* Auctions Section - COM CMS */}
        <section className="py-24 bg-zinc-100 relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px] relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-zinc-900 mb-3">Oportunidades em Destaque</h2>
              <p className="text-zinc-500 font-light">Seleção exclusiva de imóveis com até 50% de desconto</p>
            </div>

            {isLoading ? (
              <div className="text-center py-20">
                <p className="text-zinc-500">Carregando imóveis...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-zinc-500">Nenhum imóvel encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {properties.map((property, index) => {
                  const fieldData = property.fieldData as Record<string, unknown>;
                  const slug = fieldData.slug as string || '';
                  const titulo = fieldData['titulo-propriedade'] || fieldData.tituloPropriedade || 'Sem título';
                  const endereco = fieldData.endereco as string || '';
                  const tipoPropriedade = fieldData['tipo-propriedade'] || fieldData.tipoPropriedade || '';
                  const dataLeilao1 = fieldData['data-leilao-1'] || fieldData.dataLeilao1;
                  const valorLeilao1 = fieldData['valor-leilao-1'] || fieldData.valorLeilao1;
                  const dataLeilao2 = fieldData['data-leilao-2'] || fieldData.dataLeilao2;
                  const valorLeilao2 = fieldData['valor-leilao-2'] || fieldData.valorLeilao2;
                  const zona = fieldData.zona as string || '';
                  const regiao = fieldData.regiao as string || '';
                  const garagem = fieldData.garagem as string || '';
                  
                  return (
                    <article
                      key={property.id}
                      className={`bg-white rounded-lg overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border border-zinc-200 flex flex-col h-full ${index === 1 ? 'md:-mt-4 shadow-xl relative z-20' : ''}`}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={getImageUrl(property)}
                          alt={titulo as string}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        <div className="absolute top-3 left-3 right-3 flex justify-between">
                          <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wide">
                            {tipoPropriedade as string || 'Imóvel'}
                          </span>
                          <span className="bg-[#25D366] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wide flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" /> WhatsApp
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-zinc-900 font-serif text-xl leading-tight mb-2 group-hover:text-amber-600 transition-colors">
                          {titulo as string}
                        </h3>
                        <div className="flex items-start gap-2 text-zinc-500 text-xs mb-5">
                          <MapPin className="w-3.5 h-3.5 mt-0.5 text-amber-600 shrink-0" />
                          <span>{endereco}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-zinc-200 rounded-lg overflow-hidden mb-5 border border-zinc-200 shadow-sm mt-auto">
                          <div className="bg-zinc-50 p-3">
                            <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wide">1º Leilão</span>
                            <div className="flex items-center gap-1.5 text-xs text-zinc-900 font-medium mt-1">
                              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                              {dataLeilao1 ? formatDate(dataLeilao1 as string) : 'N/A'}
                            </div>
                          </div>
                          <div className="bg-zinc-50 p-3">
                            <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wide">Valor Mínimo</span>
                            <span className="block text-sm font-bold text-zinc-900 mt-0.5">
                              {valorLeilao1 ? formatCurrency(valorLeilao1 as string) : 'N/A'}
                            </span>
                          </div>
                          {dataLeilao2 && (
                            <>
                              <div className="bg-amber-600 p-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="block text-[10px] text-white/90 uppercase font-bold tracking-wide">2º Leilão</span>
                                <div className="flex items-center gap-1.5 text-xs text-white font-medium mt-1">
                                  <Calendar className="w-3.5 h-3.5 text-white/80" />
                                  {formatDate(dataLeilao2 as string)}
                                </div>
                              </div>
                              <div className="bg-amber-600 p-3 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="block text-[10px] text-white/90 uppercase font-bold tracking-wide">Valor Mínimo</span>
                                <span className="block text-sm font-bold text-white mt-0.5">
                                  {valorLeilao2 ? formatCurrency(valorLeilao2 as string) : 'N/A'}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                          <div className="flex gap-4">
                            {(zona || regiao) && (
                              <span className="flex items-center gap-1.5" title="Área">
                                <Maximize className="w-3.5 h-3.5 text-zinc-400" />
                                {zona || regiao}
                              </span>
                            )}
                            {garagem && (
                              <span className="flex items-center gap-1.5" title="Vagas">
                                <Car className="w-3.5 h-3.5 text-zinc-400" />
                                {garagem} {garagem === '1' ? 'vaga' : 'vagas'}
                              </span>
                            )}
                          </div>
                          <Link
                            to={`/webflow/${collectionId}/${slug}`}
                            className="text-zinc-400 hover:text-amber-600 transition-colors flex items-center gap-1"
                          >
                            <Share2 className="w-4 h-4" /> Ver detalhes
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

      {/* Paginação */}
      {totalPages > 1 && (
              <div className="text-center flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded hover:bg-zinc-200 text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded font-semibold transition-colors ${
                    currentPage === pageNum
                      ? 'bg-amber-600 text-white'
                      : 'hover:bg-zinc-200 text-zinc-600'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded hover:bg-zinc-200 text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                  <ChevronRight className="w-5 h-5" />
            </button>
              </div>
            )}

            <div className="text-center mt-8">
              <Link 
                to="/webflow"
                className="bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs px-10 py-3.5 rounded-full border border-zinc-200 hover:border-amber-500 shadow-lg hover:shadow-xl transition-all uppercase tracking-wider flex items-center gap-2 mx-auto group inline-flex"
              >
                Veja todas as oportunidades
                <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
          
            {/* Mensagem sobre análise jurídica */}
            <div className="text-center mt-8 max-w-4xl mx-auto">
              <p className="text-sm text-zinc-600 leading-relaxed">
                Os imóveis em leilão abaixo não foram objeto de análise jurídica prévia. Entenda como funciona o nosso estudo de viabilidade jurídica <Link to="/assessoria" className="text-amber-600 hover:text-amber-700 underline">clicando aqui</Link> ou entre em contato conosco.
              </p>
            </div>
          </div>
        </section>

        {/* VideoPlayerContainer Section */}
        <section className="py-24 bg-white relative" style={{backgroundImage: "url('/fundo-marmore-1-webp.png')", backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
          <div className="absolute inset-0 bg-white/95"></div>
          <div className="container mx-auto px-4 lg:px-12 max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 mb-6">
                Confira a entrevista do advogado Raphael Cataldo Siston sobre leilões de imóveis
              </h2>
            </div>
            
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src="https://www.youtube.com/embed/G8Wp2ju3CaU"
                title="Como funciona nossa assessoria em leilões de imóveis"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="text-center mt-6">
              <a 
                href="https://www.youtube.com/watch?v=IssSNAzj4ag&t=1s" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
              >
                Assista a entrevista completa no YouTube
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Featured Videos Section */}
        <section className="py-24 bg-zinc-50">
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px]">
            <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 text-center mb-12">Vídeos em destaque</h2>
            
            {(() => {
              const featuredVideos = [
                {
                  title: "Quais as vantagens de comprar imóveis em leilão?",
                  description: "Existem muitas vantagens nos leilões de imóveis em relação a uma compra e venda comum. Veja alguns motivos que têm levado cada vez mais pessoas a optarem por essa modalidade.",
                  videoId: "hbt-4kFMD4Q",
                  videoUrl: "https://www.youtube.com/watch?v=hbt-4kFMD4Q"
                },
                {
                  title: "É possível parcelar o valor da arrematação em leilões de imóveis?",
                  description: "Tem dúvidas sobre como deve ser feito o pagamento do valor da arrematação em leilões de imóveis? Quer saber em quais casos é possível realizar o parcelamento? Veja o vídeo que nós preparamos sobre esse assunto.",
                  videoId: "yvQrGmdXDiU",
                  videoUrl: "https://www.youtube.com/watch?v=yvQrGmdXDiU"
                },
                {
                  title: "Quem deve arcar com as dívidas de um imóvel arrematado em leilão?",
                  description: "Imóveis vão a leilão para saldar alguma dívida do antigo proprietário. No entanto, e se houver mais dívidas registradas no imóvel, que não possam ser quitadas apenas com o valor da arrematação? Quem precisa arcar o restante? O arrematante ou o executado?",
                  videoId: "1keAvaimI5k",
                  videoUrl: "https://www.youtube.com/watch?v=1keAvaimI5k"
                },
                {
                  title: "Arrematar um imóvel ocupado dá mais dor de cabeça?",
                  description: "Muita gente pensa que comprar imóveis em leilão que estejam ocupados dá mais dor de cabeça do que arrematar um imóvel desocupado. No entanto, será que isso faz mesmo diferença? Descubra agora!",
                  videoId: "9ZnMzYQJNck",
                  videoUrl: "https://www.youtube.com/watch?v=9ZnMzYQJNck"
                },
                {
                  title: "Como é calculado o ITBI em leilões de imóveis?",
                  description: "Como é calculado o ITBI em leilões de imóveis e mais baixo?",
                  videoId: "FQAUWbkwjT8",
                  videoUrl: "https://www.youtube.com/watch?v=FQAUWbkwjT8"
                },
                {
                  title: "Tudo que você precisa saber sobre leilões extrajudiciais",
                  description: "Tudo que você deve saber sobre leilões de bancos",
                  videoId: "VVxUQtMC-xg",
                  videoUrl: "https://www.youtube.com/watch?v=VVxUQtMC-xg"
                },
                {
                  title: "Imissão na posse em leilões de imóveis",
                  description: "Basta ler o edital? O arrematante sempre precisa lidar com as dívidas do imóvel? É sempre possível parcelar o valor da arrematação? Neste vídeo, vamos desmentir alguns mitos comuns sobre leilões de imóveis!",
                  videoId: "Bps7pphdE_g",
                  videoUrl: "https://www.youtube.com/watch?v=Bps7pphdE_g"
                },
                {
                  title: "3 mitos sobre leilões de imóveis",
                  description: "Basta ler o edital? O arrematante sempre precisa lidar com as dívidas do imóvel? É sempre possível parcelar o valor da arrematação? Neste vídeo, vamos desmentir alguns mitos comuns sobre leilões de imóveis!",
                  videoId: "a4yQKEDt7hc",
                  videoUrl: "https://www.youtube.com/watch?v=a4yQKEDt7hc"
                },
                {
                  title: "5 fatores que podem levar à anulação da arrematação",
                  description: "Ao participar de leilões de imóveis, é importante estar sempre atento se todos os trâmites legais foram devidamente respeitados.",
                  videoId: "xGUunlbUAx0",
                  videoUrl: "https://www.youtube.com/watch?v=xGUunlbUAx0"
                },
                {
                  title: "Carta de arrematação e auto de arrematação",
                  description: "O auto de arrematação e a carta de arrematação são dois importantes documentos dos leilões de imóveis judiciais, que devem ser obtidos após a arrematação. O que eles são? Qual a importância deles para os processos burocráticos pós-leilão? Qual a diferença entre eles? Descubra agora!",
                  videoId: "xGUunlbUAx0",
                  videoUrl: "https://www.youtube.com/watch?v=xGUunlbUAx0"
                }
              ];
              
              const totalVideoPages = Math.ceil(featuredVideos.length / videosPerPage);
              const startIndex = (currentVideoPage - 1) * videosPerPage;
              const endIndex = startIndex + videosPerPage;
              const currentVideos = featuredVideos.slice(startIndex, endIndex);
              
              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentVideos.map((video, index) => (
                      <div key={startIndex + index} className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 border border-zinc-100">
                        <div className="relative aspect-video cursor-pointer" onClick={() => window.open(video.videoUrl, '_blank')}>
                          <img
                            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow">
                              <Play className="w-5 h-5 text-amber-600 fill-current ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-3 group-hover:text-amber-600 transition-colors">{video.title}</h3>
                          <p className="text-sm text-zinc-500 font-light leading-relaxed mb-4">{video.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {totalVideoPages > 1 && (
                    <div className="text-center flex justify-center items-center gap-2">
                      <button
                        onClick={() => setCurrentVideoPage((p) => Math.max(1, p - 1))}
                        disabled={currentVideoPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded hover:bg-zinc-200 text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalVideoPages) }, (_, i) => {
                        let pageNum;
                        if (totalVideoPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentVideoPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentVideoPage >= totalVideoPages - 2) {
                          pageNum = totalVideoPages - 4 + i;
                        } else {
                          pageNum = currentVideoPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentVideoPage(pageNum)}
                            className={`w-10 h-10 flex items-center justify-center rounded font-semibold transition-colors ${
                              currentVideoPage === pageNum
                                ? 'bg-amber-600 text-white'
                                : 'hover:bg-zinc-200 text-zinc-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentVideoPage((p) => Math.min(totalVideoPages, p + 1))}
                        disabled={currentVideoPage === totalVideoPages}
                        className="w-10 h-10 flex items-center justify-center rounded hover:bg-zinc-200 text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
        </div>
      )}
                </>
              );
            })()}
          </div>
        </section>

        {/* Success Cases Section */}
        <section className="py-24 bg-white border-t border-zinc-200">
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px]">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 mb-3">Casos de Sucesso</h2>
              <p className="text-zinc-500 font-light">Casos reais de imóveis arrematados com nossa assessoria</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Leilão de imóvel | Ipanema/RJ",
                  description: "Caso real de imóvel em leilão em Ipanema, assessorado pela equipe jurídica do escritório Cataldo Siston Advogados.",
                  videoId: "nXMiKXmjEOs",
                  videoUrl: "https://www.youtube.com/embed/nXMiKXmjEOs"
                },
                {
                  title: "Leilão de imóvel | Botafogo/RJ",
                  description: "Caso real de imóvel em leilão em Botafogo, assessorado pela equipe jurídica do escritório Cataldo Siston Advogados.",
                  videoId: "AH_sNBsqIMg",
                  videoUrl: "https://www.youtube.com/embed/AH_sNBsqIMg"
                },
                {
                  title: "Leilão de imóvel | Fonte da Saudade/RJ",
                  description: "Caso real de imóvel em leilão na Fonte da Saudade assessorado pela equipe jurídica do escritório Cataldo Siston Advogados.",
                  videoId: "9vziuX_9kxA",
                  videoUrl: "https://www.youtube.com/embed/9vziuX_9kxA"
                }
              ].map((caseItem, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border border-zinc-200 group hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-video">
                    <iframe
                      src={caseItem.videoUrl}
                      title={caseItem.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-zinc-900 mb-3">{caseItem.title}</h3>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed">{caseItem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-12 max-w-[1200px]">
            <div className="text-center mb-16">
              <span className="text-amber-700 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">ATUALIZAÇÕES</span>
              <h2 className="text-3xl font-serif text-zinc-900">Artigos e Notícias</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  category: "DÚVIDAS COMUNS",
                  title: "Imóveis em leilão costumam estar em péssimo estado de conservação?",
                  description: "Muitos investidores e compradores em potencial se preocupam com o estado de conservação dos imóveis em leilão. A ideia de que essas propriedades estão completamente deterioradas, exigindo reformas onerosas,…",
                  image: "https://leilaodeimoveis-cataldosiston.com/wp-content/uploads/2025/02/imoveis-em-leilao-costumam-estar-em-pessimo-estado-de-conservacao-blog-cataldo-siston-advogados.jpg",
                  link: "https://leilaodeimoveis-cataldosiston.com/imoveis-em-leilao-costumam-estar-em-pessimo-estado-de-conservacao/"
                },
                {
                  category: "JURÍDICO",
                  title: "O que você deve pagar, após arrematar um imóvel em leilão?",
                  description: "Quando você decide adquirir um imóvel em leilão, seja judicial ou extrajudicial, a arrematação é apenas o primeiro passo para garantir a sua propriedade. O valor do lance é…",
                  image: "https://leilaodeimoveis-cataldosiston.com/wp-content/uploads/2024/11/custos-apos-a-arrematacao-blog-cataldo-siston-advogados.jpg",
                  link: "https://leilaodeimoveis-cataldosiston.com/o-que-voce-deve-pagar-apos-arrematar-um-imovel-em-leilao/"
                },
                {
                  category: "PROCEDIMENTOS",
                  title: "Saiba como ocorre a imissão na posse em leilões de imóveis",
                  description: "A imissão na posse em leilões de imóveis, seja extrajudiciais ou judiciais, é algo que suscita muitos questionamentos por parte dos licitantes ou interessados em participar desta modalidade de…",
                  image: "https://leilaodeimoveis-cataldosiston.com/wp-content/uploads/2024/08/como-ocorre-a-imissao-na-posse-leiloes-de-imoveis-blog-escritorio-cataldo-siston.webp",
                  link: "https://leilaodeimoveis-cataldosiston.com/como-ocorre-a-imissao-na-posse-em-leiloes-de-imoveis/"
                }
              ].map((article, index) => (
                <article key={index} className="bg-white group h-full flex flex-col border border-zinc-100 hover:shadow-xl transition-all duration-500">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={article.image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={article.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059ee971?auto=format&fit=crop&q=80&w=600';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-[10px] text-amber-700 uppercase font-bold tracking-wider mb-2">{article.category}</span>
                    <h3 className="font-serif text-lg leading-tight mb-3 text-zinc-800 group-hover:text-amber-700 transition-colors">{article.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-grow line-clamp-3">
                      {article.description}
                    </p>
                    <a 
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-zinc-900 transition-colors"
                    >
                      LER ARTIGO <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-zinc-50">
          <div className="container mx-auto px-4 lg:px-12 max-w-4xl text-center relative">
            <Quote className="w-12 h-12 text-zinc-300 mx-auto mb-8" />
            
            <div className="relative px-0 md:px-12">
              <p className="text-sm text-zinc-600 leading-loose mb-10 text-justify md:text-center italic font-light">
                "Como sou arquiteta, vinha planejando arrematar um imóvel em leilão para reformá-lo e vende-lo... Através da indicação de um amigo, fui apresentada ao escritório Cataldo Siston. Em todas as fases, incluindo emissão da posse até o registro de imóveis, a eficiência e profissionalismo do escritório esteve presente."
              </p>
            </div>

            <div className="flex flex-col items-center mt-8">
              <span className="font-bold text-zinc-900 text-sm uppercase tracking-wide">Denise de Castilho Provenzano</span>
              <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider mt-1">Arquiteta & Investidora</span>
            </div>
          </div>
        </section>

        {/* Newsletter Bottom Section */}
        <section className="py-24 bg-zinc-900 relative overflow-hidden" style={{backgroundImage: "url('/bg-newsletter.jpg.webp')", backgroundSize: 'cover'}}>
          <div className="absolute inset-0 bg-zinc-900/90"></div>
          <div className="container mx-auto px-4 lg:px-12 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Receba nossa newsletter</h2>
                <h3 className="text-2xl font-serif text-amber-500 mb-6">Podemos ajudar a solucionar o seu caso!</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-8">
                  Inscreva-se para receber oportunidades exclusivas de leilões e atualizações jurídicas.
                </p>
                <form className="space-y-4">
                  <input type="text" placeholder="Seu nome" className="w-full bg-zinc-800/50 border border-zinc-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-amber-500 placeholder-zinc-500" />
                  <input type="email" placeholder="Seu e-mail" className="w-full bg-zinc-800/50 border border-zinc-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-amber-500 placeholder-zinc-500" />
                  <input type="tel" placeholder="Telefone" className="w-full bg-zinc-800/50 border border-zinc-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-amber-500 placeholder-zinc-500" />
                  <button type="button" className="w-full bg-amber-600 text-white font-bold text-sm px-6 py-3 rounded hover:bg-amber-700 transition-colors uppercase tracking-wide">
                    Enviar
                  </button>
                </form>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/foto-recortada-cataldo.png" 
                  alt="Raphael Cataldo Siston" 
                  className="max-w-md w-full h-auto rounded-lg shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800';
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

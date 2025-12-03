/**
 * Página de Assessoria em Leilões
 */

import { Link } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import {
  Mail, Phone, MessageCircle, Facebook, Instagram, Youtube,
  Scale, Award, ShieldCheck, Search, FileSearch, Gavel, Key,
  AlertCircle, Percent, Banknote, Quote, MapPin, ArrowRight,
  Plus, ChevronRight, Building2
} from 'lucide-react';

export default function WebflowAssessoria() {
  return (
    <div className="bg-stone-50 text-zinc-700 antialiased selection:bg-amber-700 selection:text-white flex flex-col min-h-screen scroll-smooth">
      
      {/* Topbar */}
      <div className="bg-zinc-900 text-zinc-400 py-2.5 text-[11px] border-b border-white/5 relative z-50">
        <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center max-w-[1400px]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
              <Mail className="w-3.5 h-3.5 text-amber-700 group-hover:text-amber-500 transition-colors" />
              <span>contato@cataldosiston-adv.com.br</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
              <Phone className="w-3.5 h-3.5 text-amber-700 group-hover:text-amber-500 transition-colors" />
              <span>+55 (21) 3173-3795</span>
            </div>
            <a href="#" className="hidden md:flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white px-3 py-0.5 rounded-sm transition-all font-medium ml-2">
              <MessageCircle className="w-3 h-3 text-[#25D366]" /> Fale Conosco
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-600 transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-amber-600 transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-amber-600 transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header / Hero */}
      <header className="relative w-full bg-zinc-800 flex flex-col">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-40 py-6 border-b border-white/5 bg-gradient-to-b from-black/40 to-transparent">
          <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center max-w-[1400px]">
            <Link to="/" className="flex flex-col items-start group">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl tracking-tight text-white font-medium">CATALDO SISTON</span>
              </div>
              <div className="w-full h-px bg-amber-700 mt-1 mb-0.5 scale-x-100 origin-left transition-transform opacity-80"></div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">Advogados</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-xs font-medium text-zinc-300 hover:text-amber-500 transition-colors uppercase tracking-wider">Quem somos</a>
              <Link to="/webflow" className="text-xs font-medium text-zinc-300 hover:text-amber-500 transition-colors uppercase tracking-wider">Imóveis em Leilão</Link>
              <a href="#" className="text-xs font-medium text-white border-b border-amber-600 pb-1 transition-colors uppercase tracking-wider">Assessoria</a>
              <a href="#" className="text-xs font-medium text-zinc-300 hover:text-amber-500 transition-colors uppercase tracking-wider">Direito Imobiliário</a>
              <a href="#" className="text-xs font-medium text-zinc-300 hover:text-amber-500 transition-colors uppercase tracking-wider">Casos Reais</a>
              <a href="#" className="text-xs font-medium text-zinc-300 hover:text-amber-500 transition-colors uppercase tracking-wider">Contato</a>
            </div>
            
            <button className="lg:hidden text-white"><span className="text-2xl">☰</span></button>
          </div>
        </nav>

        {/* Hero Background */}
        <div className="absolute inset-0 z-0 bg-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-zinc-800/80 to-zinc-900/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-12 pt-48 pb-64 flex flex-col justify-center items-center text-center max-w-4xl">
          <span className="text-amber-600 font-serif italic text-xl mb-4">Expertise Jurídica Imobiliária</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-8 tracking-tight drop-shadow-lg leading-tight">
            Leilão de imóveis com<br />segurança e estratégia
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl font-light mb-12 leading-relaxed">
            Assessoria especializada para arrematar imóveis por até <span className="text-amber-500 font-medium">50% abaixo da avaliação</span>, blindando seu patrimônio com profunda segurança jurídica.
          </p>
          <button className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-10 py-4 rounded-sm transition-all flex items-center gap-3 uppercase tracking-widest shadow-lg border border-amber-600/50 hover:shadow-amber-900/20">
            Agendar consultoria
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Info Cards */}
      <section className="relative z-20 -mt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-12 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 p-10 text-center border-t-2 border-amber-700 shadow-2xl flex flex-col items-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="p-3 rounded-full bg-zinc-800 mb-6 group-hover:bg-zinc-700 transition-colors">
                <Scale className="w-8 h-8 text-amber-600 stroke-[1.5]" />
              </div>
              <h3 className="text-white font-serif text-lg mb-2">Segurança Jurídica</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Histórico de 100% de acerto jurídico em todas as operações realizadas.
              </p>
            </div>
            
            <div className="bg-zinc-900 p-10 text-center border-t-2 border-amber-700 shadow-2xl flex flex-col items-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="p-3 rounded-full bg-zinc-800 mb-6 group-hover:bg-zinc-700 transition-colors">
                <Award className="w-8 h-8 text-amber-600 stroke-[1.5]" />
              </div>
              <h3 className="text-white font-serif text-lg mb-2">Expertise Comprovada</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Mais de 900 arrematações imobiliárias em 20 anos de experiência sólida.
              </p>
            </div>
            
            <div className="bg-zinc-900 p-10 text-center border-t-2 border-amber-700 shadow-2xl flex flex-col items-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="p-3 rounded-full bg-zinc-800 mb-6 group-hover:bg-zinc-700 transition-colors">
                <ShieldCheck className="w-8 h-8 text-amber-600 stroke-[1.5]" />
              </div>
              <h3 className="text-white font-serif text-lg mb-2">Gestão Completa</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Do estudo de viabilidade à regularização e desocupação do imóvel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 relative border-b border-zinc-200" style={{backgroundImage: "url('https://img.freepik.com/free-photo/white-marble-texture-background-pattern-with-high-resolution_145211-5.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
        <div className="absolute inset-0 bg-stone-50/95"></div>
        <div className="container mx-auto px-4 lg:px-12 max-w-[1400px] relative z-10">
          <div className="text-center mb-20">
            <span className="text-amber-700 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Oportunidades</span>
            <h2 className="text-3xl md:text-4xl font-serif text-zinc-900">Vantagens de investir em <br />leilões de imóveis</h2>
            <div className="h-0.5 w-24 bg-amber-700 mx-auto mt-6"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <p className="text-zinc-600 text-sm leading-loose text-justify border-l-2 border-zinc-300 pl-6">
                Nos leilões imobiliários é possível comprar imóveis por valor <strong>até 50% abaixo da sua avaliação</strong>. Este é um investimento de alta rentabilidade e baixo risco, desde que assessorado por <strong>advogados especializados</strong>, garantindo a segurança jurídica e financeira da operação.
              </p>
              <p className="text-zinc-600 text-sm leading-loose text-justify border-l-2 border-zinc-300 pl-6">
                A possibilidade de arrematar imóveis <span className="text-amber-700 font-medium">pela metade do valor de mercado</span> proporciona alta rentabilidade para revenda ou locação, além de ser uma excelente estratégia para aquisição de moradia própria com custo reduzido.
              </p>
              <div className="pt-6 pl-6">
                <Link 
                  to="/webflow"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold px-8 py-4 rounded-sm uppercase tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center gap-3 inline-flex"
                >
                  Ver oportunidades atuais
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-zinc-900 p-12 relative shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-700"></div>
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <span className="text-amber-700 font-serif text-5xl leading-none opacity-50 group-hover:opacity-100 transition-opacity">1</span>
                    <div>
                      <h3 className="text-white font-serif text-xl mb-1">Alta Rentabilidade</h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">Lucro expressivo na revenda ou locação do ativo.</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-zinc-800"></div>
                  <div className="flex items-start gap-6 group">
                    <span className="text-amber-700 font-serif text-5xl leading-none opacity-50 group-hover:opacity-100 transition-opacity">2</span>
                    <div>
                      <h3 className="text-white font-serif text-xl mb-1">Aquisição Patrimonial</h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">Compra de moradia por valor muito abaixo do mercado.</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-zinc-800"></div>
                  <div className="flex items-start gap-6 group">
                    <span className="text-amber-700 font-serif text-5xl leading-none opacity-50 group-hover:opacity-100 transition-opacity">3</span>
                    <div>
                      <h3 className="text-white font-serif text-xl mb-1">Investimento Seguro</h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">Segurança jurídica garantida por assessoria especializada.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Info Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-12 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-zinc-800 mb-10 leading-tight">
            Assessoria jurídica especializada<br />
            <span className="text-amber-700 font-medium italic">em leilões de imóveis</span>
          </h2>
          
          <div className="space-y-6 text-sm text-zinc-500 leading-relaxed text-justify md:text-center max-w-3xl mx-auto">
            <p>
              A aquisição de <strong>imóveis em leilão</strong> configura-se como a forma mais lucrativa de investimento imobiliário. Todavia, como <strong>os leilões possuem ritos definidos em lei</strong>, a segurança jurídica e financeira na arrematação depende imprescindivelmente de análise profunda dos processos.
            </p>
            <p>
              Através da <em>due diligence</em> realizada por nosso escritório, avaliamos todas as possibilidades e perspectivas para o futuro do investimento, objetivando a mitigação de riscos e a definição da melhor estratégia econômica.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-zinc-50 relative border-y border-zinc-200">
        <div className="container mx-auto px-4 lg:px-12 max-w-[1400px] relative z-10">
          <div className="text-center mb-20">
            <span className="text-amber-700 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Metodologia</span>
            <h2 className="text-3xl font-serif text-zinc-900 mb-4">Processo de Aquisição</h2>
            <p className="text-zinc-500 font-light max-w-2xl mx-auto text-sm">Cuidamos de todos os procedimentos que envolvem uma arrematação bem-sucedida.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 pt-10 border-b-4 border-zinc-200 hover:border-amber-700 transition-colors shadow-lg group hover:-translate-y-2 duration-300 relative">
              <span className="text-4xl font-serif text-zinc-200 group-hover:text-amber-700/20 transition-colors font-bold absolute top-6 right-6">01</span>
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-6 text-zinc-600 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-zinc-900 font-serif text-lg mb-4 font-bold">Identificação</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                Apresentamos as melhores oportunidades de imóveis a serem leiloados baseadas no seu perfil.
              </p>
            </div>

            <div className="bg-white p-8 pt-10 border-b-4 border-zinc-200 hover:border-amber-700 transition-colors shadow-lg group hover:-translate-y-2 duration-300 relative">
              <span className="text-4xl font-serif text-zinc-200 group-hover:text-amber-700/20 transition-colors font-bold absolute top-6 right-6">02</span>
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-6 text-zinc-600 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <FileSearch className="w-5 h-5" />
              </div>
              <h3 className="text-zinc-900 font-serif text-lg mb-4 font-bold">Viabilidade</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                Auditoria jurídica detalhada (Due Diligence) dos processos que envolvem o devedor e o imóvel.
              </p>
            </div>

            <div className="bg-white p-8 pt-10 border-b-4 border-zinc-200 hover:border-amber-700 transition-colors shadow-lg group hover:-translate-y-2 duration-300 relative">
              <span className="text-4xl font-serif text-zinc-200 group-hover:text-amber-700/20 transition-colors font-bold absolute top-6 right-6">03</span>
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-6 text-zinc-600 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <Gavel className="w-5 h-5" />
              </div>
              <h3 className="text-zinc-900 font-serif text-lg mb-4 font-bold">Arrematação</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                Acompanhamento estratégico no dia do leilão, realização dos lances e formalização do auto.
              </p>
            </div>

            <div className="bg-white p-8 pt-10 border-b-4 border-zinc-200 hover:border-amber-700 transition-colors shadow-lg group hover:-translate-y-2 duration-300 relative">
              <span className="text-4xl font-serif text-zinc-200 group-hover:text-amber-700/20 transition-colors font-bold absolute top-6 right-6">04</span>
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-6 text-zinc-600 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-zinc-900 font-serif text-lg mb-4 font-bold">Regularização</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                Medidas para desocupação célere do imóvel e regularização do registro de propriedade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-24 bg-zinc-800 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 text-zinc-700/20">
          <Quote className="w-96 h-96" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-serif text-zinc-100 font-medium max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            "Somente arrematamos imóveis mediante parecer jurídico <span className="text-amber-500 border-b border-amber-500/50 pb-1">positivo</span> dos nossos advogados especialistas."
          </h2>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-28 bg-white relative">
        <div className="container mx-auto px-4 lg:px-12 max-w-[1200px] relative z-10">
          <div className="text-center mb-20">
            <span className="text-amber-700 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Modalidades</span>
            <h2 className="text-4xl font-serif text-zinc-900 mb-6">Como funcionam os leilões?</h2>
            <p className="text-zinc-500 text-sm max-w-2xl mx-auto leading-relaxed">Entenda as diferenças fundamentais entre as duas principais modalidades de arrematação imobiliária no Brasil.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card Judiciais */}
            <div className="bg-white rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-zinc-200 overflow-hidden group hover:border-amber-700/50 transition-colors">
              <div className="bg-zinc-800 p-8 flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-amber-500 text-[10px] font-bold tracking-wider uppercase mb-1 block">Processo Judicial</span>
                  <h3 className="text-2xl font-serif text-white">Leilões Judiciais</h3>
                </div>
                <Scale className="w-12 h-12 text-zinc-700 group-hover:text-amber-700/50 transition-colors absolute right-6 -bottom-2 transform rotate-12" />
              </div>
              
              <div className="p-8">
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]"><AlertCircle className="w-4 h-4 text-amber-700" /></div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Motivo</span>
                      <p className="text-xs text-zinc-500 leading-relaxed text-justify">Determinação de Juiz para quitar dívidas em processo judicial. O valor da venda reverte aos credores.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]"><Percent className="w-4 h-4 text-amber-700" /></div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Desconto</span>
                      <p className="text-xs text-zinc-500 leading-relaxed">1º Leilão: Valor da avaliação.<br /><strong className="text-amber-700">2º Leilão: Até 50% abaixo da avaliação.</strong></p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]"><Banknote className="w-4 h-4 text-amber-700" /></div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Pagamento</span>
                      <p className="text-xs text-zinc-500 leading-relaxed">Geralmente à vista ou 30% sinal + restante em 15 dias (conforme edital).</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]"><Key className="w-4 h-4 text-amber-700" /></div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Imissão na Posse</span>
                      <p className="text-xs text-zinc-500 leading-relaxed">Determinada pelo próprio juiz da execução. Mais direta e segura.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-zinc-100">
                  <span className="text-[10px] text-zinc-400 font-medium">Custos estimados: Comissão 5% + ITBI + Custas + RGI</span>
                </div>
              </div>
            </div>

            {/* Card Extrajudiciais */}
            <div className="bg-white rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-zinc-200 overflow-hidden group hover:border-amber-700/50 transition-colors">
              <div className="bg-zinc-800 p-8 flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-amber-500 text-[10px] font-bold tracking-wider uppercase mb-1 block">Alienação Fiduciária</span>
                  <h3 className="text-2xl font-serif text-white">Leilões Extrajudiciais</h3>
                </div>
                <Building2 className="w-12 h-12 text-zinc-700 group-hover:text-amber-700/50 transition-colors absolute right-6 -bottom-2 transform rotate-12" />
              </div>
              
              <div className="p-8">
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]"><AlertCircle className="w-4 h-4 text-amber-700" /></div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Motivo</span>
                      <p className="text-xs text-zinc-500 leading-relaxed text-justify">Inadimplência de financiamento bancário (Alienação Fiduciária). Bancos vendem para recuperar crédito.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]"><Percent className="w-4 h-4 text-amber-700" /></div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Desconto</span>
                      <p className="text-xs text-zinc-500 leading-relaxed">1º Leilão: Valor do contrato/ITBI.<br /><strong className="text-amber-700">2º Leilão: Valor da dívida + encargos (alta oportunidade).</strong></p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]"><Banknote className="w-4 h-4 text-amber-700" /></div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Pagamento</span>
                      <p className="text-xs text-zinc-500 leading-relaxed">Maioria à vista. Alguns bancos permitem financiamento do saldo.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]"><Key className="w-4 h-4 text-amber-700" /></div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-900 uppercase tracking-wide mb-1">Imissão na Posse</span>
                      <p className="text-xs text-zinc-500 leading-relaxed">Necessário propor "Ação de Imissão na Posse". Geralmente via liminar.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-zinc-100">
                  <span className="text-[10px] text-zinc-400 font-medium">Custos estimados: Comissão 5% + ITBI + Custas + Escritura + RGI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Banner */}
      <section className="py-20 bg-zinc-100 border-t border-zinc-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm mb-6 leading-relaxed">Confira a entrevista do advogado especialista <br /><span className="italic font-serif text-zinc-900 text-lg">Raphael Cataldo Siston</span></p>
          <button className="bg-transparent border border-amber-700 text-amber-800 text-xs font-bold px-10 py-3 rounded-full hover:bg-amber-700 hover:text-white transition-all uppercase tracking-widest">
            Assista na íntegra
          </button>
        </div>
      </section>

      {/* Real Cases Section */}
      <section className="py-24 bg-zinc-900 relative">
        <div className="container mx-auto px-4 lg:px-12 max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-white drop-shadow-lg mb-2">Casos reais</h2>
            <p className="text-zinc-400 text-sm">Arrematações conduzidas pelo escritório</p>
          </div>

          <div className="relative px-4 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Case 1 */}
              <div className="bg-zinc-800 rounded-sm overflow-hidden shadow-2xl group flex flex-col border border-zinc-700 hover:border-amber-700/50 transition-colors">
                <div className="h-56 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Caso real" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-white">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      Barra da Tijuca/RJ
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-6 flex flex-col gap-4">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Avaliação</div>
                    <div className="text-sm font-medium line-through text-zinc-400">R$ 2.984.000,00</div>
                  </div>
                  <div className="relative pl-3 border-l-2 border-amber-600">
                    <div className="text-[9px] uppercase font-bold tracking-wide text-amber-600">Arrematação</div>
                    <div className="text-xl font-bold font-serif text-white">R$ 1.500.000,00</div>
                  </div>
                  <div className="mt-2 pt-4 border-t border-zinc-700 flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase">Economia Real</span>
                    <span className="text-xs font-bold text-green-500">~ 50% OFF</span>
                  </div>
                </div>
              </div>

              {/* Case 2 */}
              <div className="bg-zinc-800 rounded-sm overflow-hidden shadow-2xl group flex flex-col border border-zinc-700 hover:border-amber-700/50 transition-colors">
                <div className="h-56 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Caso real" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-white">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      Gávea/ RJ
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-6 flex flex-col gap-4">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Avaliação</div>
                    <div className="text-sm font-medium line-through text-zinc-400">R$ 890.000,00</div>
                  </div>
                  <div className="relative pl-3 border-l-2 border-amber-600">
                    <div className="text-[9px] uppercase font-bold tracking-wide text-amber-600">Arrematação</div>
                    <div className="text-xl font-bold font-serif text-white">R$ 445.000,00</div>
                  </div>
                  <div className="mt-2 pt-4 border-t border-zinc-700 flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase">Economia Real</span>
                    <span className="text-xs font-bold text-green-500">~ 50% OFF</span>
                  </div>
                </div>
              </div>

              {/* Case 3 */}
              <div className="bg-zinc-800 rounded-sm overflow-hidden shadow-2xl group flex flex-col border border-zinc-700 hover:border-amber-700/50 transition-colors">
                <div className="h-56 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1600596542815-225efc41c418?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Caso real" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-white">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      Lagoa/RJ
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-6 flex flex-col gap-4">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Avaliação</div>
                    <div className="text-sm font-medium line-through text-zinc-400">R$ 1.275.000,00</div>
                  </div>
                  <div className="relative pl-3 border-l-2 border-amber-600">
                    <div className="text-[9px] uppercase font-bold tracking-wide text-amber-600">Arrematação</div>
                    <div className="text-xl font-bold font-serif text-white">R$ 637.500,00</div>
                  </div>
                  <div className="mt-2 pt-4 border-t border-zinc-700 flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase">Economia Real</span>
                    <span className="text-xs font-bold text-green-500">~ 50% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="bg-transparent border border-zinc-600 text-zinc-400 font-bold text-xs px-10 py-3.5 rounded-sm hover:bg-white hover:text-black hover:border-white transition-all uppercase tracking-widest">
              Ver portfólio completo
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-stone-100">
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

      {/* Newsletter Bar */}
      <section className="py-16 bg-zinc-800 border-y border-zinc-700">
        <div className="container mx-auto px-4 lg:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-white text-center md:text-left">
              <h2 className="text-2xl font-serif leading-tight">Receba oportunidades <br />exclusivas</h2>
              <p className="text-zinc-400 text-xs mt-2">Novos leilões selecionados semanalmente.</p>
            </div>
            
            <form className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-end">
              <div className="w-full">
                <input type="text" placeholder="Nome" className="w-full md:w-40 bg-zinc-700/50 border-b border-zinc-600 focus:border-amber-600 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-zinc-500" />
              </div>
              <div className="w-full">
                <input type="email" placeholder="E-mail" className="w-full md:w-40 bg-zinc-700/50 border-b border-zinc-600 focus:border-amber-600 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-zinc-500" />
              </div>
              <button type="button" className="w-full md:w-auto px-8 py-2 bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-amber-800 transition-colors">
                Inscrever
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-12 max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="text-amber-700 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Atualizações</span>
            <h2 className="text-3xl font-serif text-zinc-900">Artigos e Notícias</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Card 1 */}
            <article className="bg-white group h-full flex flex-col border border-zinc-100 hover:shadow-xl transition-all duration-500">
              <div className="aspect-video overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Blog post" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[10px] text-amber-700 uppercase font-bold tracking-wider mb-2">Dúvidas Comuns</span>
                <h3 className="font-serif text-lg leading-tight mb-3 text-zinc-800 group-hover:text-amber-700 transition-colors">Imóveis em leilão costumam estar em péssimo estado?</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-grow line-clamp-3">
                  A ideia de que essas propriedades estão completamente deterioradas é um mito que afasta muitos investidores...
                </p>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-zinc-900 transition-colors">Ler artigo <ArrowRight className="w-3 h-3" /></span>
              </div>
            </article>

            {/* Blog Card 2 */}
            <article className="bg-white group h-full flex flex-col border border-zinc-100 hover:shadow-xl transition-all duration-500">
              <div className="aspect-video overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Blog post" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[10px] text-amber-700 uppercase font-bold tracking-wider mb-2">Jurídico</span>
                <h3 className="font-serif text-lg leading-tight mb-3 text-zinc-800 group-hover:text-amber-700 transition-colors">O que pagar após arrematar um imóvel?</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-grow line-clamp-3">
                  A arrematação é apenas o primeiro passo. Entenda os custos envolvidos com ITBI, registro e comissão...
                </p>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-zinc-900 transition-colors">Ler artigo <ArrowRight className="w-3 h-3" /></span>
              </div>
            </article>

            {/* Blog Card 3 */}
            <article className="bg-white group h-full flex flex-col border border-zinc-100 hover:shadow-xl transition-all duration-500">
              <div className="aspect-video overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059ee971?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Blog post" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[10px] text-amber-700 uppercase font-bold tracking-wider mb-2">Procedimentos</span>
                <h3 className="font-serif text-lg leading-tight mb-3 text-zinc-800 group-hover:text-amber-700 transition-colors">Como funciona a imissão na posse?</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-grow line-clamp-3">
                  A desocupação do imóvel é o momento mais crítico. Saiba como a lei protege o arrematante...
                </p>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-zinc-900 transition-colors">Ler artigo <ArrowRight className="w-3 h-3" /></span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4 lg:px-12 max-w-4xl">
          <h2 className="text-3xl font-serif text-zinc-900 text-center mb-12">Dúvidas Frequentes</h2>

          <div className="space-y-4">
            <div className="bg-white border border-zinc-200 p-5 flex justify-between items-center cursor-pointer hover:border-amber-600/50 transition-colors shadow-sm">
              <span className="text-zinc-700 font-medium text-sm">Como posso ter a posse do imóvel arrematado?</span>
              <Plus className="w-4 h-4 text-amber-700" />
            </div>
            <div className="bg-white border border-zinc-200 p-5 flex justify-between items-center cursor-pointer hover:border-amber-600/50 transition-colors shadow-sm">
              <span className="text-zinc-700 font-medium text-sm">Como é feito o pagamento no leilão judicial?</span>
              <Plus className="w-4 h-4 text-amber-700" />
            </div>
            <div className="bg-white border border-zinc-200 p-5 flex justify-between items-center cursor-pointer hover:border-amber-600/50 transition-colors shadow-sm">
              <span className="text-zinc-700 font-medium text-sm">Quem paga o condomínio atrasado?</span>
              <Plus className="w-4 h-4 text-amber-700" />
            </div>
            <div className="bg-white border border-zinc-200 p-5 flex justify-between items-center cursor-pointer hover:border-amber-600/50 transition-colors shadow-sm">
              <span className="text-zinc-700 font-medium text-sm">Imóvel com hipoteca: o que fazer?</span>
              <Plus className="w-4 h-4 text-amber-700" />
            </div>
            <div className="bg-white border border-zinc-200 p-5 flex justify-between items-center cursor-pointer hover:border-amber-600/50 transition-colors shadow-sm">
              <span className="text-zinc-700 font-medium text-sm">É seguro arrematar imóveis em leilão?</span>
              <Plus className="w-4 h-4 text-amber-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Help Banner */}
      <section className="bg-zinc-900 border-b border-zinc-800 py-12">
        <div className="container mx-auto px-4 lg:px-12 max-w-4xl flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 className="text-white font-serif text-2xl mb-1">Podemos ajudar a solucionar o seu caso</h3>
            <span className="text-zinc-500 text-xs">Nossa equipe está pronta para atender sua demanda.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 border border-zinc-700 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all"><MessageCircle className="w-5 h-5" /></a>
            <a href="#" className="w-12 h-12 border border-zinc-700 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all"><Mail className="w-5 h-5" /></a>
            <a href="#" className="w-12 h-12 border border-zinc-700 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all"><Phone className="w-5 h-5" /></a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-zinc-50 pt-20 pb-8 text-zinc-500 text-sm border-t border-zinc-200">
        <div className="container mx-auto px-4 lg:px-12 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="col-span-1 pr-8">
              <Link to="/" className="flex flex-col items-start group mb-8">
                <span className="font-serif text-lg tracking-tight text-zinc-900 font-bold">CATALDO SISTON</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-amber-700">Advogados</span>
              </Link>
              <p className="text-[11px] font-medium text-zinc-900 mb-4 uppercase tracking-wider">Leilões de imóveis e advocacia imobiliária</p>
              <div className="text-[11px] leading-relaxed space-y-1">
                <p>Av. Rio Branco, 156, Gr. 3336 a 3339</p>
                <p>Centro - Rio de Janeiro - RJ</p>
                <p className="pt-2 text-zinc-900 font-medium">+55 (21) 3173-3795</p>
                <p className="text-zinc-900 font-medium">+55 (21) 97729-4848</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-xs text-zinc-900 uppercase tracking-widest mb-6">Institucional</h4>
                <ul className="space-y-3 text-[11px]">
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Quem Somos</a></li>
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Assessoria em leilões</a></li>
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Direito Imobiliário</a></li>
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Casos de Sucesso</a></li>
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Blog Jurídico</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-xs text-zinc-900 uppercase tracking-widest mb-6">Áreas de Atuação</h4>
                <ul className="space-y-3 text-[11px]">
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Leilões Judiciais</a></li>
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Leilões Extrajudiciais</a></li>
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Distrato Imobiliário</a></li>
                  <li><a href="#" className="hover:text-amber-700 transition-colors">Direito Civil</a></li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs text-zinc-900 uppercase tracking-widest mb-6">Newsletter</h4>
              <p className="text-[11px] mb-4 leading-relaxed">Inscreva-se para receber atualizações jurídicas e oportunidades.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Seu e-mail" className="bg-white border border-zinc-300 px-3 py-2 text-xs w-full outline-none focus:border-amber-600 transition-colors" />
                <button type="button" className="bg-zinc-900 text-white px-3 py-2 text-xs font-bold hover:bg-amber-700 transition-colors"><ArrowRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-200 pt-8">
          <div className="container mx-auto px-4 lg:px-12 max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[10px] text-zinc-400 mb-1">© 2024 Cataldo Siston Advogados. Todos os direitos reservados.</p>
              <p className="text-[10px] text-zinc-400">CNPJ: 22437441000198 | Razão Social: CATALDO SISTON SOCIEDADE DE ADVOGADOS</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] text-zinc-400 hover:text-zinc-900">Política de Privacidade</a>
              <a href="#" className="text-[10px] text-zinc-400 hover:text-zinc-900">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}


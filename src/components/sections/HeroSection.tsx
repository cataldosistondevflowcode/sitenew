import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title = 'Imóveis em Leilão',
  subtitle = 'no Rio de Janeiro',
  description = 'Receba oportunidades de leilões personalizadas, de acordo com o seu perfil de investimento e com segurança jurídica.',
  ctaText = 'Quero receber oportunidades',
  ctaLink = '/contato',
  backgroundImage = 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2670&auto=format&fit=crop',
}: HeroSectionProps) {
  return (
    <header className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Vista panorâmica do Rio de Janeiro"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-6xl text-white font-serif mb-6 leading-tight tracking-tight">
            {title} <br />
            <span className="italic text-zinc-300 font-light">{subtitle}</span>
          </h1>
          <p className="text-lg text-zinc-200 mb-8 font-light max-w-lg leading-relaxed">
            {description}
          </p>
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-amber-900/20 group"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
}


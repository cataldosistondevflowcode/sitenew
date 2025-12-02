import { Play } from 'lucide-react';

interface VideoIntroSectionProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export function VideoIntroSection({
  videoUrl,
  thumbnailUrl = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000',
  title = 'OPORTUNIDADES EM LEILÃO',
  subtitle = 'Imóveis até 50% abaixo da avaliação',
  description = 'Os imóveis listados abaixo são oportunidades de mercado. Entenda como funciona nosso estudo de viabilidade jurídica antes de arrematar.',
}: VideoIntroSectionProps) {
  const handleVideoClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <section className="bg-zinc-50 py-16 -mt-20 relative z-20">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden aspect-video relative group cursor-pointer border-4 border-white"
          onClick={handleVideoClick}
        >
          <img
            src={thumbnailUrl}
            alt="Vídeo introdutório sobre leilões de imóveis"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
            <div className="bg-white/90 p-6 rounded-2xl mb-4 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <span className="font-serif text-2xl text-zinc-900">CATALDO SISTON</span>
                <span className="text-[10px] tracking-widest uppercase text-zinc-500">Advogados</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
          </div>
        </div>

        <div className="text-center mt-12 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
            <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
          </div>
          <h2 className="text-3xl font-serif text-zinc-900 mb-4 tracking-tight">{title}</h2>
          <h3 className="text-4xl lg:text-5xl font-serif text-zinc-800 mb-6 tracking-tight">{subtitle}</h3>
          <p className="text-zinc-600 max-w-3xl mx-auto font-light leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );
}


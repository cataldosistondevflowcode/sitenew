import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InterviewHighlightSectionProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
}

export function InterviewHighlightSection({
  videoUrl,
  thumbnailUrl = 'https://images.unsplash.com/photo-1557318041-1ce374d55ebf?auto=format&fit=crop&q=80&w=1200',
  title = 'Entrevista com Raphael Cataldo Siston sobre segurança em leilões',
  description = 'Entenda os principais pontos sobre arrematação, segurança jurídica e rentabilidade neste mercado em expansão com nossa equipe especializada.',
  linkUrl = '/videos/entrevista-raphael-cataldo',
  linkText = 'Assista na íntegra',
}: InterviewHighlightSectionProps) {
  const handleVideoClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <section className="bg-white py-24 border-t border-zinc-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 skew-x-12"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video group cursor-pointer"
              onClick={handleVideoClick}
            >
              <img
                src={thumbnailUrl}
                alt="Entrevista com Raphael Cataldo Siston sobre segurança em leilões"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
              EM DESTAQUE
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif text-zinc-900 mb-6 leading-tight">
              {title.includes('Raphael Cataldo Siston') ? (
                <>
                  Entrevista com <span className="text-amber-600">Raphael Cataldo Siston</span> sobre segurança em leilões
                </>
              ) : (
                title
              )}
            </h2>
            <p className="text-zinc-600 text-lg mb-8 leading-relaxed font-light">{description}</p>
            <Link
              to={linkUrl}
              className="inline-flex items-center text-amber-600 font-semibold border-2 border-amber-600 px-8 py-3 rounded-full hover:bg-amber-600 hover:text-white transition-all"
            >
              {linkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


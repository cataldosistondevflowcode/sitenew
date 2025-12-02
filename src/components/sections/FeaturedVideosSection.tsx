import { Play } from 'lucide-react';

interface Video {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

interface FeaturedVideosSectionProps {
  title?: string;
  videos?: Video[];
}

const defaultVideos: Video[] = [
  {
    title: 'Vantagens de comprar em leilão',
    description: 'Existem muitas vantagens nos leilões de imóveis em relação a uma compra comum. Veja os motivos...',
    thumbnailUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600',
    videoUrl: '/videos/vantagens-comprar-leilao',
  },
  {
    title: 'Parcelamento na arrematação?',
    description: 'Tem dúvidas sobre como deve ser feito o pagamento? Saiba em quais casos é possível parcelar...',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600',
    videoUrl: '/videos/parcelamento-arrematacao',
  },
  {
    title: 'Dívidas do antigo proprietário',
    description: 'Quem deve arcar com as dívidas de um imóvel arrematado? Entenda os riscos e deveres...',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
    videoUrl: '/videos/dividas-antigo-proprietario',
  },
];

export function FeaturedVideosSection({
  title = 'Vídeos em destaque',
  videos = defaultVideos,
}: FeaturedVideosSectionProps) {
  const handleVideoClick = (videoUrl?: string) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <section className="py-20 bg-zinc-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center text-zinc-900 mb-12 tracking-tight">{title}</h2>
        <div className="wf-grid-3">
          {videos.map((video, index) => (
            <div
              key={video.id || index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <div
                className="relative aspect-video cursor-pointer"
                onClick={() => handleVideoClick(video.videoUrl)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow">
                    <Play className="w-5 h-5 text-amber-600 fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-3">{video.title}</h3>
                <p className="text-sm text-zinc-500 font-light leading-relaxed mb-4">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


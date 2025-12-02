import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { WebflowItem } from '@/lib/webflow/types';

interface PropertyCardProps {
  property: WebflowItem;
  collectionId: string;
}

export function PropertyCard({ property, collectionId }: PropertyCardProps) {
  const fieldData = property.fieldData as Record<string, unknown>;
  
  // Campos do CMS Webflow
  const title = (fieldData.name as string) || (fieldData['titulo-propriedade'] as string) || 'Imóvel sem título';
  const address = (fieldData.endereco as string) || '';
  const city = (fieldData.cidade as string) || '';
  const state = (fieldData.estado as string) || '';
  
  // URL da foto do CMS
  const photo = (fieldData.photo as string) || '';
  const imageUrl = photo || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=600';
  
  // Tipo de leilão
  const tipoLeilao = (fieldData['tipo-leilao'] as string) || 'JUDICIAL';
  
  // Datas e valores dos leilões (formato do CMS: "05/12/2025" e "R$ 129.617,29")
  const primeiroLeilao = (fieldData['data-leilao-1'] as string) || '';
  const valorLeilao1 = (fieldData['valor-leilao-1'] as string) || '';
  const segundoLeilao = (fieldData['data-leilao-2'] as string) || '';
  const valorLeilao2 = (fieldData['valor-leilao-2'] as string) || '';
  
  const slug = (fieldData.slug as string) || property.id;

  // Formatação de data (já vem formatada do CMS como "05/12/2025")
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    // Se já está no formato dd/mm/yyyy, retorna como está
    if (dateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return dateString;
    }
    // Caso contrário, tenta converter
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };
  
  // Valor já vem formatado do CMS como "R$ 129.617,29"
  const formatValue = (value: string) => {
    return value || 'N/A';
  };

  const tipoLeilaoColor = tipoLeilao === 'EXTRAJUDICIAL' ? 'bg-orange-600' : 'bg-red-600';

  const detailUrl = `/webflow/${collectionId}/${slug}`;

  return (
    <article className="bg-zinc-900 rounded-lg overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300">
      <Link to={detailUrl} className="relative h-48 overflow-hidden block">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
          Saiba Mais
        </span>
        <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1">
          Fale conosco
        </span>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-zinc-900 to-transparent"></div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link to={detailUrl}>
          <h3 className="font-serif text-white text-lg leading-tight mb-2 line-clamp-2 tracking-tight hover:text-amber-400 transition-colors">
            {title}
          </h3>
        </Link>
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-3 h-3 text-zinc-500 mt-1 shrink-0" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            {[address, city, state].filter(Boolean).join(' - ')}
          </p>
        </div>
        <span className={`inline-block ${tipoLeilaoColor} text-white text-[9px] font-bold px-2 py-0.5 rounded w-fit mb-4`}>
          {tipoLeilao}
        </span>
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs border-t border-zinc-800 pt-3 mt-auto">
          <div>
            <span className="block text-zinc-500 text-[10px] uppercase">1º Leilão</span>
            <span className="text-white font-medium">
              {formatDate(primeiroLeilao)}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-zinc-500 text-[10px] uppercase">Valor Mínimo</span>
            <span className="text-white font-medium">
              {formatValue(valorLeilao1)}
            </span>
          </div>
        </div>
      </div>
      {segundoLeilao && valorLeilao2 && (
        <div className="bg-amber-600 p-3 grid grid-cols-2 items-center">
          <div>
            <span className="block text-amber-200 text-[10px] uppercase font-semibold">2º Leilão</span>
            <span className="text-white text-xs font-bold">{formatDate(segundoLeilao)}</span>
          </div>
          <div className="text-right">
            <span className="block text-amber-200 text-[10px] uppercase font-semibold">Valor Mínimo</span>
            <span className="text-white font-bold text-sm">{formatValue(valorLeilao2)}</span>
          </div>
        </div>
      )}
    </article>
  );
}


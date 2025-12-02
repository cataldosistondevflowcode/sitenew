import { PropertyCard } from './PropertyCard';
import type { WebflowItem } from '@/lib/webflow/types';

interface PropertyGridProps {
  properties: WebflowItem[];
  collectionId: string;
  isLoading?: boolean;
}

export function PropertyGrid({ properties, collectionId, isLoading }: PropertyGridProps) {
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 mb-16">
        <div className="wf-grid-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-lg h-96 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center py-12">
          <p className="text-zinc-600">Nenhum imóvel encontrado.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 mb-16">
      <div className="wf-grid-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            collectionId={collectionId}
          />
        ))}
      </div>
    </section>
  );
}


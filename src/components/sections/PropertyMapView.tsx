/**
 * Componente para exibir Foto, Mapa e Street View usando URLs do CMS Webflow
 */

import { useState } from 'react';
import { Camera, Map, Navigation } from 'lucide-react';

interface PropertyMapViewProps {
  photo?: string;
  maps?: string;
  streetview?: string;
  title?: string;
}

export function PropertyMapView({ photo, maps, streetview, title = 'Imóvel' }: PropertyMapViewProps) {
  const [activeTab, setActiveTab] = useState<'foto' | 'mapa' | 'street'>(
    photo ? 'foto' : maps ? 'mapa' : 'street'
  );

  const hasPhoto = !!photo;
  const hasMap = !!maps;
  const hasStreetView = !!streetview;

  return (
    <div className="w-full rounded-lg overflow-hidden border border-zinc-200 bg-white">
      {/* Tabs */}
      <div className="flex border-b border-zinc-200 bg-zinc-50">
        {hasPhoto && (
          <button
            onClick={() => setActiveTab('foto')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'foto'
                ? 'text-amber-600 border-b-2 border-amber-600 bg-white'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            Foto
          </button>
        )}
        {hasMap && (
          <button
            onClick={() => setActiveTab('mapa')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'mapa'
                ? 'text-amber-600 border-b-2 border-amber-600 bg-white'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Map className="w-4 h-4" />
            Mapa
          </button>
        )}
        {hasStreetView && (
          <button
            onClick={() => setActiveTab('street')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'street'
                ? 'text-amber-600 border-b-2 border-amber-600 bg-white'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Navigation className="w-4 h-4" />
            Street View
          </button>
        )}
      </div>

      {/* Content */}
      <div className="relative w-full" style={{ minHeight: '400px' }}>
        {activeTab === 'foto' && photo && (
          <div className="w-full h-full">
            <img
              src={photo}
              alt={title}
              className="w-full h-full object-cover"
              style={{ minHeight: '400px' }}
              onError={(e) => {
                // Se a foto falhar, tenta mostrar o mapa
                if (hasMap) {
                  setActiveTab('mapa');
                } else if (hasStreetView) {
                  setActiveTab('street');
                }
              }}
            />
          </div>
        )}

        {activeTab === 'mapa' && maps && (
          <div className="w-full h-full" style={{ minHeight: '400px' }}>
            <iframe
              src={maps}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="geolocation"
              title="Mapa do imóvel"
            />
          </div>
        )}

        {activeTab === 'street' && streetview && (
          <div className="w-full h-full" style={{ minHeight: '400px' }}>
            <iframe
              src={streetview}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="geolocation"
              title="Street View do imóvel"
            />
          </div>
        )}

        {/* Fallback quando não há conteúdo */}
        {!hasPhoto && !hasMap && !hasStreetView && (
          <div className="flex items-center justify-center bg-zinc-100" style={{ minHeight: '400px' }}>
            <div className="text-center p-4">
              <Camera className="w-12 h-12 text-zinc-400 mx-auto mb-2" />
              <p className="text-zinc-500 text-sm">Nenhuma mídia disponível</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


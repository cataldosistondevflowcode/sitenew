import { Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export function Footer({
  address = 'Av. Rio Branco, 156, Centro\nRio de Janeiro - RJ',
  phone = '+55 (21) 3173-3795',
  email = 'contato@cataldosiston-adv.com.br',
  socialLinks = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
}: FooterProps) {
  return (
    <footer className="bg-zinc-950 text-white relative overflow-hidden">
      {/* Newsletter */}
      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-serif text-white mb-8">Receba nossa newsletter</h2>
            <form className="space-y-4 max-w-md">
              <label htmlFor="newsletter-email" className="sr-only">
                Email para newsletter
              </label>
              <input
                type="email"
                id="newsletter-email"
                placeholder="Seu melhor email"
                className="w-full bg-transparent border border-zinc-700 rounded px-4 py-3 text-sm focus:border-amber-500 outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded text-sm tracking-wide transition-colors"
              >
                INSCREVER-SE
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="absolute top-10 right-10 w-64 h-64 bg-amber-900/20 rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
              alt="Newsletter Cataldo Siston Advogados"
              className="relative z-10 w-2/3 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
        <div className="container mx-auto px-4 wf-grid-4">
          <div>
            <div className="flex flex-col mb-6">
              <span className="font-serif text-xl tracking-tight text-white leading-none">
                CATALDO SISTON
              </span>
              <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase mt-1">
                Advogados
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4 whitespace-pre-line">
              {address}
              <br />
              {phone}
            </p>
          </div>
          <div>
            <h4 className="text-white font-serif mb-4">Mapa do Site</h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>
                <Link to="/quem-somos" className="hover:text-amber-500 transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/imoveis-leilao" className="hover:text-amber-500 transition-colors">
                  Imóveis em Leilão
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-amber-500 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-900 mt-12 pt-8 text-center">
          <p className="text-[10px] text-zinc-600 mb-2">
            © {new Date().getFullYear()} Cataldo Siston Advogados. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-zinc-600">
            CNPJ: 22437441000198 | Razão Social: CATALDO SISTON SOCIEDADE DE ADVOGADOS
          </p>
        </div>
      </div>
    </footer>
  );
}


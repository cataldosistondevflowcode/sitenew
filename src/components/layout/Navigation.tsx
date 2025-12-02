import { ChevronDown, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  links?: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
}

const defaultLinks = [
  { label: 'Quem somos', href: '/quem-somos' },
  { label: 'Imóveis em Leilão', href: '/imoveis-leilao', active: true },
  { label: 'Assessoria', href: '/assessoria' },
  { label: 'Casos Reais', href: '/casos-reais' },
  { label: 'Contato', href: '/contato' },
];

export function Navigation({ links = defaultLinks }: NavigationProps) {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-2xl tracking-tight text-zinc-900 leading-none">
            CATALDO SISTON
          </span>
          <span className="text-xs tracking-[0.3em] text-zinc-400 uppercase mt-1">
            Advogados
          </span>
          <div className="h-0.5 w-12 bg-amber-500 mt-1"></div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-600">
          {links.map((link) => {
            const isActive =
              link.active ||
              location.pathname === link.href ||
              (link.href !== '/' && location.pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-1 transition-colors ${
                  isActive
                    ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-5 pt-5'
                    : 'hover:text-amber-600'
                }`}
              >
                {link.label}
                {link.active && <ChevronDown className="w-4 h-4" />}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 text-zinc-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}


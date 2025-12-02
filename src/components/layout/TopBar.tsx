import { Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-react';

interface TopBarProps {
  email?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export function TopBar({
  email = 'contato@cataldosiston-adv.com.br',
  phone = '+55 (21) 3173-3795',
  socialLinks = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
}: TopBarProps) {
  return (
    <div className="bg-zinc-900 text-zinc-400 py-2 text-xs border-b border-zinc-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 text-amber-500" />
            <span>{email}</span>
          </a>
          <span className="hidden md:inline text-zinc-700">|</span>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-500" />
            <span>{phone}</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.facebook && (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
          )}
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {socialLinks.youtube && (
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


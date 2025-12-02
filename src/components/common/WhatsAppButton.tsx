import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

export function WhatsAppButton({
  phone = '552131733795',
  message = 'Olá, gostaria de saber mais sobre os imóveis em leilão.',
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-2xl z-50 transition-transform hover:scale-110"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
    </a>
  );
}


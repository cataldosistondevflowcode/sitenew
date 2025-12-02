import { TopBar } from './TopBar';
import { Navigation } from './Navigation';

interface HeaderProps {
  topBar?: {
    email?: string;
    phone?: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
    };
  };
  navigation?: {
    links?: Array<{
      label: string;
      href: string;
      active?: boolean;
    }>;
  };
}

export function Header({ topBar, navigation }: HeaderProps) {
  return (
    <div className="w-full relative z-50">
      <TopBar {...topBar} />
      <Navigation {...navigation} />
    </div>
  );
}


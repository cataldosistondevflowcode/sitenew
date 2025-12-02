// Componente Navbar - Reutilizável
function createNavbar(activePage = '', insideHero = false) {
    // Determinar qual link deve estar ativo
    const getActiveClass = (page) => {
        if (insideHero) {
            // Dentro do hero, o navbar tem fundo branco/transparente
            return activePage === page 
                ? 'text-zinc-900 border-b border-amber-500 pb-1' 
                : 'text-zinc-700 hover:text-amber-600';
        } else {
            // Navbar normal
            return activePage === page 
                ? 'text-zinc-900 border-b border-amber-500 pb-1' 
                : 'text-zinc-700 hover:text-amber-600';
        }
    };

    const navbarClasses = insideHero 
        ? 'absolute top-0 left-0 right-0 z-40 py-6 border-b border-white/20 bg-white/80 backdrop-blur-md shadow-sm'
        : 'bg-white sticky top-0 z-40 border-b border-zinc-200/50 backdrop-blur-md bg-white/90 shadow-sm';

    return `
  <!-- Topbar -->
  <div class="bg-[#1a1a1a] text-zinc-400 py-2 text-[11px] border-b border-zinc-800/50 relative z-50">
      <div class="container mx-auto px-4 lg:px-12 flex justify-between items-center max-w-[1400px]">
          <div class="flex items-center gap-6">
              <div class="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <i data-lucide="mail" class="w-3.5 h-3.5 text-amber-500"></i>
                  <span>contato@cataldosiston-adv.com.br</span>
              </div>
              <div class="hidden sm:flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <i data-lucide="phone" class="w-3.5 h-3.5 text-amber-500"></i>
                  <span>+55 (21) 3173-3795</span>
              </div>
              <a href="#" class="hidden md:flex items-center gap-1 bg-[#25D366] hover:bg-[#20bd5a] text-white px-2 py-0.5 rounded transition-colors font-semibold">
                  <i data-lucide="message-circle" class="w-3 h-3"></i> Fale Conosco
              </a>
          </div>
          <div class="flex items-center gap-4">
              <div class="flex gap-3">
                  <a href="#" class="hover:text-amber-500 transition-colors"><i data-lucide="facebook" class="w-3.5 h-3.5"></i></a>
                  <a href="#" class="hover:text-amber-500 transition-colors"><i data-lucide="instagram" class="w-3.5 h-3.5"></i></a>
                  <a href="#" class="hover:text-amber-500 transition-colors"><i data-lucide="youtube" class="w-3.5 h-3.5"></i></a>
              </div>
          </div>
      </div>
  </div>
  
  <!-- Navbar -->
  <nav class="${navbarClasses}">
      <div class="container mx-auto px-4 lg:px-12 flex justify-between items-center max-w-[1400px] ${insideHero ? '' : 'py-6'}">
          <a href="/" class="flex flex-col items-start group">
              <div class="flex items-center gap-2 px-3 py-2 rounded-lg">
                  <img src="https://cdn.prod.website-files.com/69023853a6b8fa97b90fd72d/6911dd6a49f6f0dabff0a498_logotipo_cataldo_siston.png" alt="Cataldo Siston Advogados" class="h-8 w-auto">
              </div>
          </a>
          
          <div class="hidden lg:flex items-center gap-8">
              <a href="/" class="text-xs font-medium ${getActiveClass('home')} transition-colors uppercase tracking-wider">Quem somos</a>
              <a href="/imoveis-rj.html" class="text-xs font-medium ${getActiveClass('imoveis')} transition-colors uppercase tracking-wider">Imóveis em Leilão</a>
              <a href="/assessoria.html" class="text-xs font-medium ${getActiveClass('assessoria')} transition-colors uppercase tracking-wider">Assessoria</a>
              <a href="#" class="text-xs font-medium ${getActiveClass('direito')} transition-colors uppercase tracking-wider">Direito Imobiliário</a>
              <a href="#" class="text-xs font-medium ${getActiveClass('casos')} transition-colors uppercase tracking-wider">Casos Reais</a>
              <a href="#" class="text-xs font-medium ${getActiveClass('blog')} transition-colors uppercase tracking-wider">Blog</a>
              <a href="#" class="text-xs font-medium ${getActiveClass('contato')} transition-colors uppercase tracking-wider">Contato</a>
          </div>
          
          <button class="lg:hidden ${insideHero ? 'text-zinc-900' : 'text-zinc-900'}"><i data-lucide="menu" class="w-6 h-6"></i></button>
      </div>
  </nav>
    `;
}

// Função para injetar o navbar no DOM
function injectNavbar(activePage = '') {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        // Verificar se há um header com hero logo após o navbar-container
        const nextElement = navbarContainer.nextElementSibling;
        const insideHero = nextElement && nextElement.tagName === 'HEADER' && nextElement.classList.contains('relative');
        
        const navbarHTML = createNavbar(activePage, insideHero);
        navbarContainer.innerHTML = navbarHTML;
        
        // Se estiver dentro de um hero, mover o navbar para dentro do header
        if (insideHero && nextElement) {
            const topbar = navbarContainer.querySelector('.bg-\\[\\#1a1a1a\\]');
            const navbar = navbarContainer.querySelector('nav');
            
            if (topbar && navbar) {
                // Manter topbar no container, mover apenas o nav para dentro do header
                navbarContainer.removeChild(navbar);
                nextElement.insertBefore(navbar, nextElement.firstChild);
            }
        }
        
        // Reinicializar ícones Lucide após injetar
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}


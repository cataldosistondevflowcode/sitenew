// Componente Footer - Reutilizável
function createFooter() {
    return `
  <!-- Main Footer -->
  <footer class="bg-zinc-100 pt-16 pb-8 border-t border-zinc-200 text-zinc-600 text-sm">
      <div class="container mx-auto px-4 lg:px-12 max-w-[1400px]">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div class="col-span-1">
                  <a href="#" class="flex flex-col items-start group mb-6">
                      <img src="https://cdn.prod.website-files.com/69023853a6b8fa97b90fd72d/6911dd6a49f6f0dabff0a498_logotipo_cataldo_siston.png" alt="Cataldo Siston Advogados" class="h-8 w-auto mb-2">
                  </a>
                  <p class="text-xs leading-relaxed mb-4">
                      Leilões de imóveis e advocacia imobiliária<br>
                      Av. Rio Branco, 156, Gr. 3336 a 3339 Centro<br>
                      Rio de Janeiro - RJ - Brasil<br>
                      +55 (21) 3173-3795<br>
                      +55 (21) 97729-4848
                  </p>
              </div>
              
              <div>
                  <h4 class="font-bold text-xs text-zinc-900 uppercase tracking-wider mb-6">Mapa do Site</h4>
                  <ul class="space-y-2 text-xs">
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Quem Somos</a></li>
                      <li><a href="imoveis-rj.html" class="hover:text-amber-600 transition-colors">Imóveis em Leilão RJ</a></li>
                      <li><a href="imoveis-sp.html" class="hover:text-amber-600 transition-colors">Imóveis em Leilão SP</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Leilões da Caixa - RJ</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Leilões da Caixa - SP</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Assessoria em leilões</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Direito Imobiliário</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Distrato imobiliário</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Direito civil</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Casos Reais</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Blog</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Contato</a></li>
                      <li><a href="#" class="hover:text-amber-600 transition-colors">Política de Privacidade</a></li>
                  </ul>
              </div>
  
               <div>
                  <h4 class="font-bold text-xs text-zinc-900 uppercase tracking-wider mb-6">Fale em Contato</h4>
                  <p class="text-xs mb-4">Tire suas dúvidas ou siga-nos nas redes sociais</p>
                  <a href="mailto:contato@cataldosiston.adv.com.br" class="text-xs font-bold text-zinc-900 hover:text-amber-600 mb-6 block">contato@cataldosiston-adv.com.br</a>
                  <div class="flex gap-4">
                       <a href="#" class="text-amber-600 hover:text-zinc-900 transition-colors"><i data-lucide="facebook" class="w-5 h-5"></i></a>
                       <a href="#" class="text-amber-600 hover:text-zinc-900 transition-colors"><i data-lucide="instagram" class="w-5 h-5"></i></a>
                       <a href="#" class="text-amber-600 hover:text-zinc-900 transition-colors"><i data-lucide="youtube" class="w-5 h-5"></i></a>
                  </div>
              </div>
          </div>
          
          <div class="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-400">
              <div class="flex flex-col gap-2">
                  <p>O conteúdo do texto desta página é de direito reservado do CATALDO SISTON ADVOGADOS. Sua reprodução, parcial ou total, mesmo citando nossos links, é proibida sem a autorização do autor. Crime de violação de direito autoral – artigo 184 do Código Penal – Lei 9610/98 - Lei de direitos autorais.</p>
                  <p>CNPJ: 22437441000198 | Razão Social: CATALDO SISTON SOCIEDADE DE ADVOGADOS</p>
              </div>
          </div>
          <div class="mt-4 text-[10px] text-zinc-400 text-center">
              <p class="flex items-center justify-center gap-1">Conforme nossa <a href="#" class="underline">política de privacidade</a> este site faz uso de cookies. <button class="bg-amber-600 text-white px-2 py-0.5 rounded ml-2">Entendido</button></p>
          </div>
      </div>
  </footer>
    `;
}

// Função para injetar o footer no DOM
function injectFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
        // Reinicializar ícones Lucide após injetar
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}


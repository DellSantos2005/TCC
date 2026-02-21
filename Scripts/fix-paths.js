// ========================================
// SISTEMA DE CORREÇÃO DE CAMINHOS
// fix-paths.js - Para GitHub Pages
// ========================================

(function() {
  'use strict';
  
  // Obter configuração
  const CONFIG = window.PLATAFORMA_CONFIG || {
    isGitHubPages: window.location.hostname.includes('github.io'),
    repoName: 'TCC---Plataforma-de-Aprendizagem-Gamificada'
  };
  
  const basePath = CONFIG.isGitHubPages ? `/${CONFIG.repoName}` : '';
  
  console.log('[FIX-PATHS] Iniciando correção de caminhos...');
  console.log('[FIX-PATHS] Base path:', basePath);
  
  // ========================================
  // CORRIGIR LINKS (NAVEGAÇÃO)
  // ========================================
  
  const corrigirLinks = () => {
    const links = document.querySelectorAll('a[href]');
    let corrigidos = 0;
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Ignorar links externos e âncoras
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
        return;
      }
      
      // Se já tem o basePath, ignorar
      if (href.startsWith(basePath)) {
        return;
      }
      
      // Corrigir caminhos relativos
      if (href.startsWith('../') || href.startsWith('./') || href.startsWith('/')) {
        const novoHref = href.startsWith('/') ? basePath + href : basePath + '/' + href;
        link.setAttribute('href', novoHref);
        corrigidos++;
      }
    });
    
    if (corrigidos > 0) {
      console.log(`[FIX-PATHS] ✅ ${corrigidos} links corrigidos`);
    }
  };
  
  // ========================================
  // CORRIGIR IMAGENS
  // ========================================
  
  const corrigirImagens = () => {
    const imagens = document.querySelectorAll('img[src]');
    let corrigidas = 0;
    
    imagens.forEach(img => {
      const src = img.getAttribute('src');
      
      // Ignorar URLs absolutas e data URIs
      if (!src || src.startsWith('http') || src.startsWith('data:')) {
        return;
      }
      
      // Se já tem o basePath, ignorar
      if (src.startsWith(basePath)) {
        return;
      }
      
      // Corrigir caminhos relativos
      if (src.startsWith('../') || src.startsWith('./') || src.startsWith('/')) {
        const novoSrc = src.startsWith('/') ? basePath + src : basePath + '/' + src;
        img.setAttribute('src', novoSrc);
        corrigidas++;
      }
    });
    
    if (corrigidas > 0) {
      console.log(`[FIX-PATHS] ✅ ${corrigidas} imagens corrigidas`);
    }
  };
  
  // ========================================
  // CORRIGIR BOTÕES COM ONCLICK
  // ========================================
  
  const corrigirBotoes = () => {
    const botoes = document.querySelectorAll('button[onclick]');
    let corrigidos = 0;
    
    botoes.forEach(botao => {
      const onclick = botao.getAttribute('onclick');
      
      if (onclick && onclick.includes('window.location')) {
        // Extrair o caminho
        const match = onclick.match(/['"]([^'"]+)['"]/);
        if (match && match[1]) {
          let caminho = match[1];
          
          // Ignorar URLs absolutas
          if (caminho.startsWith('http')) {
            return;
          }
          
          // Se já tem basePath, ignorar
          if (caminho.startsWith(basePath)) {
            return;
          }
          
          // Corrigir caminho
          if (caminho.startsWith('../') || caminho.startsWith('./') || caminho.startsWith('/')) {
            const novoCaminho = caminho.startsWith('/') ? basePath + caminho : basePath + '/' + caminho;
            const novoOnclick = onclick.replace(caminho, novoCaminho);
            botao.setAttribute('onclick', novoOnclick);
            corrigidos++;
          }
        }
      }
    });
    
    if (corrigidos > 0) {
      console.log(`[FIX-PATHS] ✅ ${corrigidos} botões corrigidos`);
    }
  };
  
  // ========================================
  // FUNÇÃO AUXILIAR PARA NAVEGAÇÃO
  // ========================================
  
  window.navegarPara = function(caminho) {
    const caminhoCompleto = caminho.startsWith('/') ? basePath + caminho : basePath + '/' + caminho;
    console.log('[FIX-PATHS] Navegando para:', caminhoCompleto);
    window.location.href = caminhoCompleto;
  };
  
  // ========================================
  // EXECUTAR CORREÇÕES
  // ========================================
  
  const executarCorrecoes = () => {
    if (!CONFIG.isGitHubPages) {
      console.log('[FIX-PATHS] Ambiente local detectado, correções não necessárias');
      return;
    }
    
    console.log('[FIX-PATHS] GitHub Pages detectado, aplicando correções...');
    
    corrigirLinks();
    corrigirImagens();
    corrigirBotoes();
    
    console.log('[FIX-PATHS] ✅ Correções concluídas');
  };
  
  // Executar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executarCorrecoes);
  } else {
    executarCorrecoes();
  }
  
  // Observar mudanças no DOM para corrigir conteúdo dinâmico
  const observer = new MutationObserver(() => {
    executarCorrecoes();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
})();

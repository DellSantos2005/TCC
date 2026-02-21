// ========================================
// SISTEMA DE RANKING
// ranking.js - COM INDICAÇÃO DE CURSO
// ========================================

// ========================================
// RENDERIZAR RANKING COM CURSO
// ========================================

const renderizarRanking = (usuarios, containerID, destacarUsuario = true) => {
  const container = document.getElementById(containerID);
  if (!container) return;
  
  const usuarioLogado = obterUsuarioLogado();
  
  // Limpar conteúdo atual
  container.innerHTML = '';
  
  if (usuarios.length === 0) {
    container.innerHTML = `
      <div class="ranking-item" style="text-align: center; padding: 20px; color: #999;">
        Nenhum usuário encontrado neste ranking ainda.
      </div>
    `;
    return;
  }
  
  usuarios.forEach((usuario, index) => {
    const posicao = index + 1;
    const isUsuarioAtual = usuarioLogado && usuario.usuario === usuarioLogado.usuario;
    
    // Criar elemento do ranking
    const item = document.createElement('div');
    item.className = 'ranking-item';
    
    // Destacar usuário atual
    if (isUsuarioAtual && destacarUsuario) {
      item.style.background = '#1e88e5';
      item.style.color = 'white';
      item.style.fontWeight = 'bold';
      item.style.border = '2px solid #ffeb3b';
    }
    
    // Adicionar medalhas para top 3
    let emoji = '';
    if (posicao === 1) emoji = '🥇';
    else if (posicao === 2) emoji = '🥈';
    else if (posicao === 3) emoji = '🥉';
    
    // Badge do curso
    const cursoAbrev = usuario.curso === "Informática" ? "TI" : "ELETRO";
    const cursoCor = usuario.curso === "Informática" ? "#2196F3" : "#FF9800";
    const cursoBadge = `<span class="badge-curso" style="background: ${cursoCor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; margin-left: 8px;">${cursoAbrev}</span>`;
    
    item.innerHTML = `
      <span class="posicao">${emoji} ${posicao}º</span>
      <span class="usuario">${usuario.usuario}${cursoBadge}${isUsuarioAtual ? ' <span style="color: #ffeb3b;">(Você)</span>' : ''}</span>
      <span class="pontuacao">${usuario.xp} XP - Nv.${usuario.nivel}</span>
    `;
    
    container.appendChild(item);
  });
  
  // Adicionar posição do usuário se não estiver no top visível
  if (usuarioLogado && destacarUsuario) {
    const posicaoUsuario = usuarios.findIndex(u => u.usuario === usuarioLogado.usuario) + 1;
    
    if (posicaoUsuario > 10) {
      const separador = document.createElement('div');
      separador.style.cssText = 'text-align: center; padding: 10px; color: #666; font-weight: bold;';
      separador.textContent = '...';
      container.appendChild(separador);
      
      const cursoAbrev = usuarioLogado.curso === "Informática" ? "TI" : "ELETRO";
      const cursoCor = usuarioLogado.curso === "Informática" ? "#2196F3" : "#FF9800";
      const cursoBadge = `<span class="badge-curso" style="background: ${cursoCor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; margin-left: 8px;">${cursoAbrev}</span>`;
      
      const itemUsuario = document.createElement('div');
      itemUsuario.className = 'ranking-item';
      itemUsuario.style.background = '#1e88e5';
      itemUsuario.style.color = 'white';
      itemUsuario.style.fontWeight = 'bold';
      itemUsuario.style.border = '2px solid #ffeb3b';
      
      itemUsuario.innerHTML = `
        <span class="posicao">${posicaoUsuario}º</span>
        <span class="usuario">${usuarioLogado.usuario}${cursoBadge} <span style="color: #ffeb3b;">(Você)</span></span>
        <span class="pontuacao">${usuarioLogado.xp} XP - Nv.${usuarioLogado.nivel}</span>
      `;
      
      container.appendChild(itemUsuario);
    }
  }
};

// ========================================
// CARREGAR RANKING DO CAMPUS
// ========================================

const carregarRankingCampus = () => {
  const usuarios = obterTodosUsuarios();
  renderizarRanking(usuarios, 'ranking-container');
};

// ========================================
// CARREGAR RANKING DO CURSO
// ========================================

const carregarRankingCurso = () => {
  const usuarioLogado = obterUsuarioLogado();
  if (!usuarioLogado) return;
  
  const usuarios = obterUsuariosPorCurso(usuarioLogado.curso);
  renderizarRanking(usuarios, 'ranking-container');
};

// ========================================
// ATUALIZAR ESTATÍSTICAS DO PERFIL
// ========================================

const atualizarEstatisticasRanking = () => {
  const usuarioLogado = obterUsuarioLogado();
  if (!usuarioLogado) return;
  
  // Obter posição no ranking do curso
  const usuariosCurso = obterUsuariosPorCurso(usuarioLogado.curso);
  const posicaoCurso = usuariosCurso.findIndex(u => u.usuario === usuarioLogado.usuario) + 1;
  
  // Atualizar no perfil se o elemento existir
  const elementoPosicao = document.querySelector('.estatistica-bloco:last-child p');
  if (elementoPosicao) {
    let texto = '';
    if (posicaoCurso === 1) texto = '🥇 1º Lugar';
    else if (posicaoCurso === 2) texto = '🥈 2º Lugar';
    else if (posicaoCurso === 3) texto = '🥉 3º Lugar';
    else texto = `${posicaoCurso}º Lugar`;
    
    elementoPosicao.textContent = texto;
  }
};

// ========================================
// SISTEMA DE FILTROS DE RANKING
// ========================================

const configurarFiltrosRanking = () => {
  const btnCampus = document.querySelector('.ranking-curso-campus button:first-child');
  const btnCurso = document.querySelector('.ranking-curso-campus button:last-child');
  
  if (btnCampus && btnCurso) {
    // Verificar qual página está ativa
    const url = window.location.pathname;
    
    if (url.includes('Ranking-campus')) {
      btnCampus.classList.add('ranking-escolhido');
      carregarRankingCampus();
    } else if (url.includes('Ranking-curso')) {
      btnCurso.classList.add('ranking-escolhido');
      carregarRankingCurso();
    }
  }
};

// ========================================
// CRIAR USUÁRIOS FAKE PARA TESTES
// ========================================

const popularRankingTeste = () => {
  // Verificar se já existem usuários
  let totalUsuarios = 0;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith('usuario_')) {
      totalUsuarios++;
    }
  }
  
  // Se já tem mais de 3 usuários, não criar mais
  if (totalUsuarios > 3) return;
  
  const nomes = [
    'joao.silva', 'maria.santos', 'pedro.oliveira', 'ana.costa', 
    'lucas.almeida', 'julia.ferreira', 'carlos.souza', 'beatriz.lima',
    'rafael.martins', 'camila.rocha', 'diego.pereira', 'fernanda.dias',
    'bruno.cardoso', 'patricia.gomes', 'rodrigo.barbosa', 'aline.ribeiro'
  ];
  
  const cursos = ['Informática', 'Eletrotécnica'];
  
  nomes.forEach((nome, index) => {
    if (!usuarioExiste(nome)) {
      const curso = cursos[index % 2];
      const usuario = criarUsuarioPadrao(nome, `IFBA.${String(index).padStart(11, '0')}`, curso);
      
      // XP aleatório entre 50 e 1000
      usuario.xp = Math.floor(Math.random() * 950) + 50;
      usuario.nivel = Math.floor(usuario.xp / 100) + 1;
      
      // Dias seguidos aleatório
      usuario.estatisticas.diasSeguidos = Math.floor(Math.random() * 30) + 1;
      
      salvarUsuario(usuario);
    }
  });
};

// ========================================
// LIMPAR RANKING DE TESTE (USAR COM CUIDADO!)
// ========================================

const limparRankingTeste = () => {
  const usuarioAtual = obterSessao();
  
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const chave = localStorage.key(i);
    if (chave.startsWith('usuario_')) {
      const usuario = chave.replace('usuario_', '');
      // Não deletar o usuário atual
      if (usuario !== usuarioAtual) {
        localStorage.removeItem(chave);
      }
    }
  }
  
  console.log('Ranking de teste limpo! Apenas seu usuário foi mantido.');
};

// ========================================
// ATUALIZAR INFORMAÇÕES DE XP NA INTERFACE
// ========================================

const atualizarXPInterface = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  
  // Atualizar XP total
  const xpElement = document.getElementById('xp-total');
  if (xpElement) {
    xpElement.textContent = `${usuario.xp} XP`;
  }
  
  // Atualizar nível
  const nivelElement = document.getElementById('nivel-usuario');
  if (nivelElement) {
    nivelElement.textContent = `Nível ${usuario.nivel}`;
  }
  
  // Calcular e mostrar barra de progresso (se existir)
  const barraProgresso = document.getElementById('barra-progresso-xp');
  if (barraProgresso) {
    const xpAtual = usuario.xp;
    const xpProximoNivel = xpParaProximoNivel(usuario.nivel);
    const porcentagem = (xpAtual / xpProximoNivel) * 100;
    
    barraProgresso.style.width = `${porcentagem}%`;
    barraProgresso.textContent = `${xpAtual}/${xpProximoNivel} XP`;
  }
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  if (!verificarAutenticacao()) return;
  
  const url = window.location.pathname;
  
  // Popular ranking de teste (apenas na primeira vez)
  if (url.includes('Ranking')) {
    popularRankingTeste();
    configurarFiltrosRanking();
  }
  
  // Atualizar estatísticas do perfil
  if (url.includes('Perfil.html')) {
    atualizarEstatisticasRanking();
    atualizarXPInterface();
  }
  
  // Atualizar XP em todas as páginas (se houver indicador)
  atualizarXPInterface();
});

// Expor função para console (desenvolvimento)
window.limparRankingTeste = limparRankingTeste;
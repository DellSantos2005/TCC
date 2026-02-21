// ========================================
// RANKING.JS
// Depende de: utils.js
// ========================================

const renderizarRanking = (usuarios, containerID) => {
  const container = document.getElementById(containerID);
  if (!container) return;

  const logado = obterUsuarioLogado();
  container.innerHTML = '';

  if (!usuarios.length) {
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#999;">Nenhum usuário encontrado.</div>';
    return;
  }

  // Mostrar top 10
  const top10 = usuarios.slice(0, 10);
  top10.forEach((u, i) => {
    const pos = i + 1;
    const euSou = logado && u.usuario === logado.usuario;
    const emoji = pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : '';
    const corCurso = u.curso === 'Informática' ? '#2196F3' : '#FF9800';
    const abrevCurso = u.curso === 'Informática' ? 'TI' : 'ELETRO';

    const item = document.createElement('div');
    item.className = 'ranking-item';
    if (euSou) {
      item.style.cssText = 'background:#1e88e5;color:white;font-weight:bold;border:2px solid #ffeb3b;';
    }

    item.innerHTML = `
      <span class="posicao">${emoji} ${pos}º</span>
      <span class="usuario">
        ${u.usuario}
        <span style="background:${corCurso};color:white;padding:2px 8px;border-radius:12px;font-size:0.75rem;margin-left:8px;">${abrevCurso}</span>
        ${euSou ? '<span style="color:#ffeb3b;"> (Você)</span>' : ''}
      </span>
      <span class="pontuacao">${u.xp} XP — Nv.${u.nivel}</span>
    `;
    container.appendChild(item);
  });

  // Se o usuário estiver fora do top 10, mostrar abaixo
  if (logado) {
    const posLogado = usuarios.findIndex(u => u.usuario === logado.usuario) + 1;
    if (posLogado > 10) {
      const sep = document.createElement('div');
      sep.style.cssText = 'text-align:center;padding:8px;color:#666;font-weight:bold;';
      sep.textContent = '...';
      container.appendChild(sep);

      const corCurso = logado.curso === 'Informática' ? '#2196F3' : '#FF9800';
      const abrevCurso = logado.curso === 'Informática' ? 'TI' : 'ELETRO';
      const item = document.createElement('div');
      item.className = 'ranking-item';
      item.style.cssText = 'background:#1e88e5;color:white;font-weight:bold;border:2px solid #ffeb3b;';
      item.innerHTML = `
        <span class="posicao">${posLogado}º</span>
        <span class="usuario">
          ${logado.usuario}
          <span style="background:${corCurso};color:white;padding:2px 8px;border-radius:12px;font-size:0.75rem;margin-left:8px;">${abrevCurso}</span>
          <span style="color:#ffeb3b;"> (Você)</span>
        </span>
        <span class="pontuacao">${logado.xp} XP — Nv.${logado.nivel}</span>
      `;
      container.appendChild(item);
    }
  }
};

const atualizarEstatisticasRanking = () => {
  const logado = obterUsuarioLogado();
  if (!logado) return;
  const lista = obterUsuariosPorCurso(logado.curso);
  const pos = lista.findIndex(u => u.usuario === logado.usuario) + 1;
  const posTexto = pos === 1 ? '🥇 1º Lugar' : pos === 2 ? '🥈 2º Lugar' : pos === 3 ? '🥉 3º Lugar' : pos > 0 ? `${pos}º Lugar` : '--';
  // Suporta tanto id="ranking-curso" quanto classe ".estatistica-ranking"
  const el = document.getElementById('ranking-curso') || document.querySelector('.estatistica-ranking');
  if (el) el.textContent = posTexto;
};

document.addEventListener('DOMContentLoaded', () => {
  if (!verificarAutenticacao()) return;
  const url = window.location.pathname;
  if (url.includes('Ranking-campus')) {
    renderizarRanking(obterTodosUsuarios(), 'ranking-container');
  } else if (url.includes('Ranking-curso')) {
    const logado = obterUsuarioLogado();
    if (logado) renderizarRanking(obterUsuariosPorCurso(logado.curso), 'ranking-container');
  }
  if (url.includes('Perfil')) {
    atualizarEstatisticasRanking();
  }
});

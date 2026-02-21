// ========================================
// PERFIL.JS
// Depende de: utils.js, ranking.js
// ========================================

const carregarPerfil = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;

  // Nome formatado: joao.silva → João Silva
  const nomeEl = document.getElementById('nome-usuario');
  if (nomeEl) {
    nomeEl.textContent = usuario.usuario.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }

  const nick = document.getElementById('nickname-usuario');
  if (nick) nick.textContent = '@' + usuario.usuario;

  const pLogin = document.getElementById('primeiro-login');
  if (pLogin) pLogin.textContent = 'Primeiro login: ' + usuario.primeiroLogin;

  const dias = document.getElementById('dias-seguidos');
  if (dias) dias.textContent = usuario.estatisticas.diasSeguidos;

  const xpEl = document.getElementById('xp-total');
  if (xpEl) xpEl.textContent = usuario.xp + ' XP';

  const nvEl = document.getElementById('nivel-usuario');
  if (nvEl) nvEl.textContent = 'Nível ' + usuario.nivel;

  // Badge de curso
  const badge = document.getElementById('curso-badge');
  if (badge) {
    const icon = badge.querySelector('.icon');
    const text = badge.querySelector('.text');
    if (usuario.curso === 'Informática') {
      if (icon) icon.textContent = '💻';
      if (text) text.textContent = 'Informática';
      badge.style.background = 'rgba(30,136,229,0.9)';
    } else {
      if (icon) icon.textContent = '⚡';
      if (text) text.textContent = 'Eletrotécnica';
      badge.style.background = 'rgba(255,152,0,0.9)';
    }
  }
};

const calcularProgressoGeral = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return 0;
  let total = 0, concluidos = 0;
  Object.values(usuario.progresso).forEach(ano => {
    Object.values(ano.disciplinas).forEach(disc => {
      Object.values(disc.assuntos).forEach(ass => {
        total++;
        if (ass.concluido) concluidos++;
      });
    });
  });
  return total === 0 ? 0 : Math.floor((concluidos / total) * 100);
};

const exportarDadosPerfil = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  const blob = new Blob([JSON.stringify(usuario, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `perfil_${usuario.usuario}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const resetarProgresso = () => {
  if (!confirm('⚠️ Isso irá zerar seu XP, nível e progresso. Continuar?')) return;
  if (!confirm('Tem certeza? Esta ação não pode ser desfeita!')) return;
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  const novo = criarUsuarioPadrao(usuario.usuario, usuario.senha, usuario.curso);
  novo.email = usuario.email;
  novo.primeiroLogin = usuario.primeiroLogin;
  salvarUsuario(novo);
  alert('✅ Progresso resetado!');
  location.reload();
};

document.addEventListener('DOMContentLoaded', () => {
  if (!verificarAutenticacao()) return;
  if (!window.location.pathname.includes('Perfil')) return;
  carregarPerfil();
  if (typeof atualizarEstatisticasRanking === 'function') atualizarEstatisticasRanking();
  const barra = document.getElementById('barra-progresso-geral');
  if (barra) barra.style.width = calcularProgressoGeral() + '%';
});

window.exportarPerfil = exportarDadosPerfil;
window.resetarProgresso = resetarProgresso;

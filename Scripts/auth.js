// ========================================
// AUTH.JS - SISTEMA DE AUTENTICAÇÃO
// Depende de: utils.js (carregado antes)
// ========================================

// ========================================
// LOGIN
// ========================================
const realizarLogin = (usuario, senha) => {
  log('🔍 Tentativa de login:', usuario);

  if (!validarUsuario(usuario)) {
    return { sucesso: false, mensagem: 'Formato inválido! Use: nome.sobrenome (só letras minúsculas)' };
  }
  if (!validarSenha(senha)) {
    return { sucesso: false, mensagem: 'Formato inválido! Use: IFBA.XXXXXXXXXXX (11 dígitos)' };
  }

  const dados = buscarUsuario(usuario);
  if (!dados) {
    // Debug: listar usuários existentes
    const existentes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('plataforma_usuario_')) existentes.push(k.replace('plataforma_usuario_', ''));
    }
    log('Usuários disponíveis:', existentes);
    return { sucesso: false, mensagem: 'Usuário não encontrado! Entre em contato com o administrador.' };
  }

  if (dados.senha !== senha) {
    return { sucesso: false, mensagem: 'Senha incorreta!' };
  }

  salvarSessao(usuario);
  atualizarDiasSeguidos();

  log('✅ Login realizado com sucesso!');
  return { sucesso: true, usuario: dados };
};

// ========================================
// LOGOUT
// ========================================
const realizarLogout = () => {
  limparSessao();
  window.location.href = BASE + '/index.html';
};
window.realizarLogout = realizarLogout;

// ========================================
// ADMIN
// ========================================
const cadastrarUsuarioAdmin = (usuario, senha, curso) => {
  if (!validarUsuario(usuario)) { console.error('Usuário inválido'); return false; }
  if (!validarSenha(senha))     { console.error('Senha inválida'); return false; }
  if (usuarioExiste(usuario))   { console.warn('Já existe:', usuario); return false; }
  salvarUsuario(criarUsuarioPadrao(usuario, senha, curso));
  log('✅ Usuário criado:', usuario);
  return true;
};
window.adminCadastrarUsuario = cadastrarUsuarioAdmin;

// ========================================
// INICIALIZAÇÃO DA PÁGINA DE LOGIN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  const ehLogin = url === '/' ||
                  url.endsWith('/index.html') ||
                  url === (BASE + '/') ||
                  url === (BASE + '/index.html');

  if (!ehLogin) return;

  log('🔐 Página de login detectada');

  // Se já está logado, redirecionar
  const sessao = obterSessao();
  if (sessao && buscarUsuario(sessao)) {
    log('✅ Sessão ativa, redirecionando para Home...');
    window.location.href = BASE + '/pages/Principal/Home.html';
    return;
  }

  // Configurar formulário
  const form = document.getElementById('login-form');
  if (!form) { console.error('❌ Formulário não encontrado!'); return; }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuarioInput = document.getElementById('usuario');
    const senhaInput   = document.getElementById('senha');
    if (!usuarioInput || !senhaInput) { alert('Erro: campos não encontrados!'); return; }

    const usuario = usuarioInput.value.trim().toLowerCase();
    const senha   = senhaInput.value.trim();

    if (!usuario || !senha) { alert('Preencha todos os campos!'); return; }

    const resultado = realizarLogin(usuario, senha);

    if (resultado.sucesso) {
      log('✅ Redirecionando para Home...');
      window.location.href = BASE + '/pages/Principal/Home.html';
    } else {
      alert('❌ ' + resultado.mensagem);
    }
  });

  log('✅ Formulário de login configurado');
});

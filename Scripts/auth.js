// ========================================
// SISTEMA DE AUTENTICAÇÃO
// auth.js - VERSÃO CORRIGIDA GITHUB PAGES
// ========================================

// ========================================
// SISTEMA DE LOGIN
// ========================================

const realizarLogin = (usuario, senha) => {
  log('🔍 Tentativa de login:', usuario);
  
  // Validar formato
  if (!validarUsuario(usuario)) {
    log('❌ Formato de usuário inválido');
    return {
      sucesso: false,
      mensagem: "Formato de usuário inválido! Use: nome.sobrenome"
    };
  }
  
  if (!validarSenha(senha)) {
    log('❌ Formato de senha inválido');
    return {
      sucesso: false,
      mensagem: "Formato de senha inválido! Use: IFBA.XXXXXXXXXXX (11 dígitos)"
    };
  }
  
  // Verificar se usuário existe
  const dadosUsuario = buscarUsuario(usuario);
  
  if (!dadosUsuario) {
    log('❌ Usuário não encontrado');
    return {
      sucesso: false,
      mensagem: "Usuário não encontrado! Entre em contato com o administrador."
    };
  }
  
  // Verificar senha
  if (dadosUsuario.senha !== senha) {
    log('❌ Senha incorreta');
    return {
      sucesso: false,
      mensagem: "Senha incorreta!"
    };
  }
  
  // Login bem-sucedido
  salvarSessao(usuario);
  atualizarDiasSeguidos();
  
  log('✅ Login realizado com sucesso!');
  
  return {
    sucesso: true,
    mensagem: "Login realizado com sucesso!",
    usuario: dadosUsuario
  };
};

// ========================================
// SISTEMA DE LOGOUT
// ========================================

const realizarLogout = () => {
  limparSessao();
  const basePath = getBasePath();
  window.location.href = `${basePath}/pages/Login/index.html`;
};

// ========================================
// CADASTRO ADMINISTRATIVO
// ========================================

const cadastrarUsuarioAdmin = (usuario, senha, curso) => {
  if (!validarUsuario(usuario)) {
    console.error("❌ Formato de usuário inválido!");
    return false;
  }
  
  if (!validarSenha(senha)) {
    console.error("❌ Formato de senha inválido!");
    return false;
  }
  
  if (usuarioExiste(usuario)) {
    console.warn("⚠️ Usuário já existe:", usuario);
    return false;
  }
  
  const novoUsuario = criarUsuarioPadrao(usuario, senha, curso);
  
  if (salvarUsuario(novoUsuario)) {
    log("✅ Usuário cadastrado:", usuario);
    return true;
  }
  
  return false;
};

// ========================================
// LISTAR TODOS OS USUÁRIOS
// ========================================

const listarUsuariosCadastrados = () => {
  log("\n👥 USUÁRIOS CADASTRADOS:\n");
  
  const usuarios = [];
  const prefix = `${window.PLATAFORMA_CONFIG.storagePrefix}usuario_`;
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith(prefix)) {
      try {
        const usuario = JSON.parse(localStorage.getItem(chave));
        usuarios.push({
          usuario: usuario.usuario,
          curso: usuario.curso,
          xp: usuario.xp,
          nivel: usuario.nivel
        });
      } catch (e) {
        console.error('Erro ao processar:', chave);
      }
    }
  }
  
  usuarios.sort((a, b) => a.usuario.localeCompare(b.usuario));
  console.table(usuarios);
  
  log(`\n📊 Total: ${usuarios.length} usuário(s)`);
  
  return usuarios;
};

// ========================================
// RESETAR SENHA
// ========================================

const resetarSenhaAluno = (usuario, novaSenha) => {
  if (!usuarioExiste(usuario)) {
    console.error(`❌ Usuário "${usuario}" não encontrado!`);
    return false;
  }
  
  if (!validarSenha(novaSenha)) {
    console.error("❌ Formato de senha inválido!");
    return false;
  }
  
  const dadosUsuario = buscarUsuario(usuario);
  dadosUsuario.senha = novaSenha;
  
  if (salvarUsuario(dadosUsuario)) {
    log(`✅ Senha de "${usuario}" resetada!`);
    return true;
  }
  
  return false;
};

// ========================================
// REMOVER USUÁRIO
// ========================================

const removerUsuario = (usuario) => {
  if (!confirm(`⚠️ Remover "${usuario}"? Esta ação não pode ser desfeita!`)) {
    return false;
  }
  
  if (usuarioExiste(usuario)) {
    const chave = `${window.PLATAFORMA_CONFIG.storagePrefix}usuario_${usuario}`;
    localStorage.removeItem(chave);
    log(`✅ Usuário "${usuario}" removido!`);
    return true;
  }
  
  console.error(`❌ Usuário "${usuario}" não encontrado!`);
  return false;
};

// ========================================
// CONFIGURAÇÃO DO FORMULÁRIO DE LOGIN
// ========================================

const configurarFormularioLogin = () => {
  const formLogin = document.getElementById('login-form');
  
  if (!formLogin) {
    log('⚠️ Formulário de login não encontrado');
    return;
  }
  
  log('✅ Configurando formulário de login');
  
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usuarioInput = document.getElementById('usuario');
    const senhaInput = document.getElementById('senha');
    
    if (!usuarioInput || !senhaInput) {
      alert('Erro: Campos não encontrados!');
      return;
    }
    
    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();
    
    if (!usuario || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    log('🔐 Processando login...');
    
    const resultado = realizarLogin(usuario, senha);
    
    if (resultado.sucesso) {
      log('✅ Redirecionando para Home...');
      const basePath = getBasePath();
      
      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        window.location.href = `${basePath}/pages/Principal/Home.html`;
      }, 500);
    } else {
      log('❌ Falha no login');
      alert(resultado.mensagem);
    }
  });
};

// ========================================
// VERIFICAR SE JÁ ESTÁ LOGADO
// ========================================

const verificarLoginExistente = () => {
  const sessao = obterSessao();
  const url = window.location.pathname;
  
  // Se está na página de login e já tem sessão, redirecionar
  if (sessao && (url.includes('Login') || url.includes('index.html'))) {
    log('✅ Sessão existente, redirecionando...');
    const basePath = getBasePath();
    window.location.href = `${basePath}/pages/Principal/Home.html`;
    return true;
  }
  
  return false;
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  
  log('📄 Página carregada:', url);
  
  // Página de login
  if (url.includes('Login') || url.endsWith('index.html')) {
    log('🔐 Página de login detectada');
    
    // Verificar se já está logado
    if (!verificarLoginExistente()) {
      configurarFormularioLogin();
    }
  }
});

// ========================================
// EXPOR FUNÇÕES ADMINISTRATIVAS
// ========================================

window.adminCadastrarAluno = cadastrarUsuarioAdmin;
window.adminListarAlunos = listarUsuariosCadastrados;
window.adminRemoverAluno = removerUsuario;
window.adminResetarSenha = resetarSenhaAluno;
window.realizarLogout = realizarLogout;
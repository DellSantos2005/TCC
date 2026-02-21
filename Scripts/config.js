// ========================================
// SISTEMA DE CONFIGURAÇÕES
// config.js
// ========================================

// ========================================
// CARREGAR CONFIGURAÇÕES ATUAIS
// ========================================

const carregarConfiguracoes = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  
  // Nome de usuário (readonly)
  const nomeUsuarioInput = document.getElementById('nome-usuario');
  if (nomeUsuarioInput) {
    nomeUsuarioInput.value = usuario.usuario;
    nomeUsuarioInput.readOnly = true;
  }
  
  // Email (se houver)
  const emailInput = document.getElementById('email');
  if (emailInput && usuario.email) {
    emailInput.value = usuario.email;
  }
  
  // Privacidade no ranking
  const privacidadeSelect = document.getElementById('privacidade');
  if (privacidadeSelect && usuario.configuracoes) {
    privacidadeSelect.value = usuario.configuracoes.privacidade || 'publico';
  }
  
  // Notificações
  const notificacoesCheckbox = document.getElementById('notificacoes');
  if (notificacoesCheckbox && usuario.configuracoes) {
    notificacoesCheckbox.checked = usuario.configuracoes.notificacoes !== false;
  }
};

// ========================================
// ALTERAR SENHA
// ========================================

const alterarSenha = (senhaAtual, novaSenha, confirmarSenha) => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return { sucesso: false, mensagem: "Usuário não encontrado" };
  
  // Validar senha atual
  if (usuario.senha !== senhaAtual) {
    return { sucesso: false, mensagem: "Senha atual incorreta!" };
  }
  
  // Validar nova senha
  if (!validarSenha(novaSenha)) {
    return { 
      sucesso: false, 
      mensagem: "Nova senha inválida! Use o formato: IFBA.XXXXXXXXXXX (11 dígitos)" 
    };
  }
  
  // Validar confirmação
  if (novaSenha !== confirmarSenha) {
    return { sucesso: false, mensagem: "As senhas não coincidem!" };
  }
  
  // Verificar se nova senha é diferente da atual
  if (senhaAtual === novaSenha) {
    return { sucesso: false, mensagem: "A nova senha deve ser diferente da atual!" };
  }
  
  // Atualizar senha
  usuario.senha = novaSenha;
  
  if (atualizarUsuarioLogado(usuario)) {
    return { sucesso: true, mensagem: "Senha alterada com sucesso!" };
  } else {
    return { sucesso: false, mensagem: "Erro ao salvar nova senha. Tente novamente." };
  }
};

// ========================================
// SALVAR CONFIGURAÇÕES GERAIS
// ========================================

const salvarConfiguracoesGerais = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return { sucesso: false, mensagem: "Usuário não encontrado" };
  
  // Inicializar objeto de configurações se não existir
  if (!usuario.configuracoes) {
    usuario.configuracoes = {};
  }
  
  // Email
  const emailInput = document.getElementById('email');
  if (emailInput) {
    const email = emailInput.value.trim();
    if (email && !validarEmail(email)) {
      return { sucesso: false, mensagem: "Email inválido!" };
    }
    usuario.email = email;
  }
  
  // Privacidade
  const privacidadeSelect = document.getElementById('privacidade');
  if (privacidadeSelect) {
    usuario.configuracoes.privacidade = privacidadeSelect.value;
  }
  
  // Notificações
  const notificacoesCheckbox = document.getElementById('notificacoes');
  if (notificacoesCheckbox) {
    usuario.configuracoes.notificacoes = notificacoesCheckbox.checked;
  }
  
  if (atualizarUsuarioLogado(usuario)) {
    return { sucesso: true, mensagem: "Configurações salvas com sucesso!" };
  } else {
    return { sucesso: false, mensagem: "Erro ao salvar configurações." };
  }
};

// ========================================
// VALIDAR EMAIL
// ========================================

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ========================================
// EXCLUIR CONTA (COM CONFIRMAÇÃO MÚLTIPLA)
// ========================================

const excluirConta = () => {
  const confirmar1 = confirm(
    '⚠️ ATENÇÃO!\n\n' +
    'Você está prestes a EXCLUIR PERMANENTEMENTE sua conta!\n\n' +
    'Isso irá:\n' +
    '• Apagar todos os seus dados\n' +
    '• Remover seu progresso\n' +
    '• Excluir suas estatísticas\n' +
    '• Remover você dos rankings\n\n' +
    'Esta ação é IRREVERSÍVEL!\n\n' +
    'Deseja continuar?'
  );
  
  if (!confirmar1) return;
  
  const confirmar2 = confirm(
    'Você tem CERTEZA ABSOLUTA?\n\n' +
    'Todos os seus dados serão perdidos permanentemente!\n\n' +
    'Clique OK para CONFIRMAR A EXCLUSÃO'
  );
  
  if (!confirmar2) return;
  
  // Solicitar senha para confirmação final
  const senhaConfirmacao = prompt('Digite sua senha para confirmar a exclusão:');
  
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  
  if (senhaConfirmacao !== usuario.senha) {
    alert('❌ Senha incorreta! Exclusão cancelada.');
    return;
  }
  
  // Excluir conta
  const nomeUsuario = usuario.usuario;
  localStorage.removeItem(`usuario_${nomeUsuario}`);
  limparSessao();
  
  alert('✅ Conta excluída com sucesso. Você será redirecionado para a página de login.');
  window.location.href = '../Login/index.html';
};

// ========================================
// RESETAR PROGRESSO (MANTENDO CONTA)
// ========================================

const resetarProgressoConfig = () => {
  const confirmar1 = confirm(
    '⚠️ Resetar Progresso\n\n' +
    'Isso irá:\n' +
    '• Zerar seu XP e nível\n' +
    '• Resetar todas as disciplinas e assuntos\n' +
    '• Limpar estatísticas de jogos\n' +
    '• Manter seus dados de login e configurações\n\n' +
    'Deseja continuar?'
  );
  
  if (!confirmar1) return;
  
  const confirmar2 = confirm('Tem certeza? Esta ação não pode ser desfeita!');
  
  if (!confirmar2) return;
  
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  
  // Manter dados importantes
  const dadosParaManter = {
    usuario: usuario.usuario,
    senha: usuario.senha,
    curso: usuario.curso,
    campus: usuario.campus,
    primeiroLogin: usuario.primeiroLogin,
    email: usuario.email,
    configuracoes: usuario.configuracoes
  };
  
  // Recriar usuário com progresso zerado
  const novoUsuario = criarUsuarioPadrao(dadosParaManter.usuario, dadosParaManter.senha, dadosParaManter.curso);
  
  // Restaurar dados mantidos
  novoUsuario.email = dadosParaManter.email;
  novoUsuario.configuracoes = dadosParaManter.configuracoes;
  novoUsuario.primeiroLogin = dadosParaManter.primeiroLogin;
  
  salvarUsuario(novoUsuario);
  alert('✅ Progresso resetado com sucesso! A página será recarregada.');
  location.reload();
};

// ========================================
// CONFIGURAR FORMULÁRIO DE CONFIGURAÇÕES
// ========================================

const configurarFormularioConfig = () => {
  // Botão Salvar Alterações
  const btnSalvar = document.querySelector('.salvar');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Verificar se há nova senha para alterar
      const novaSenha = document.getElementById('nova-senha')?.value;
      const confirmarSenha = document.getElementById('confirmar-senha')?.value;
      
      if (novaSenha || confirmarSenha) {
        // Se preencheu algum campo de senha, precisa preencher a senha atual
        const senhaAtual = prompt('Digite sua senha atual para confirmar a alteração:');
        
        if (!senhaAtual) {
          alert('Alteração de senha cancelada.');
          return;
        }
        
        const resultado = alterarSenha(senhaAtual, novaSenha, confirmarSenha);
        
        if (!resultado.sucesso) {
          alert(`❌ ${resultado.mensagem}`);
          return;
        }
        
        // Limpar campos de senha
        document.getElementById('nova-senha').value = '';
        document.getElementById('confirmar-senha').value = '';
        
        alert(`✅ ${resultado.mensagem}`);
      }
      
      // Salvar outras configurações
      const resultadoConfig = salvarConfiguracoesGerais();
      alert(`${resultadoConfig.sucesso ? '✅' : '❌'} ${resultadoConfig.mensagem}`);
    });
  }
  
  // Botão Excluir Conta
  const btnExcluir = document.querySelector('.excluir-conta');
  if (btnExcluir) {
    btnExcluir.addEventListener('click', (e) => {
      e.preventDefault();
      excluirConta();
    });
  }
  
  // Botão Resetar Progresso (se existir)
  const btnResetar = document.querySelector('.redefinir-progresso');
  if (btnResetar) {
    btnResetar.addEventListener('click', (e) => {
      e.preventDefault();
      resetarProgressoConfig();
    });
  }
};

// ========================================
// ADICIONAR DICA VISUAL PARA FORMATO DE SENHA
// ========================================

const adicionarDicasSenha = () => {
  const novaSenhaInput = document.getElementById('nova-senha');
  const confirmarSenhaInput = document.getElementById('confirmar-senha');
  
  if (novaSenhaInput) {
    novaSenhaInput.placeholder = 'IFBA.XXXXXXXXXXX (11 dígitos)';
    novaSenhaInput.title = 'Formato: IFBA.XXXXXXXXXXX onde X são 11 dígitos';
  }
  
  if (confirmarSenhaInput) {
    confirmarSenhaInput.placeholder = 'Confirme a nova senha';
  }
};

// ========================================
// CRIAR BOTÃO DE EXCLUIR CONTA (SE NÃO EXISTIR)
// ========================================

const adicionarBotaoExcluir = () => {
  const btnExcluir = document.querySelector('.excluir-conta');
  
  if (!btnExcluir) {
    const container = document.querySelector('.container');
    if (container) {
      const botaoHTML = `
        <button class="excluir-conta" style="
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border: none;
          border-radius: 5px;
          font-size: 1.2rem;
          cursor: pointer;
          background: #e53935;
          color: white;
        ">Excluir Conta</button>
      `;
      
      container.insertAdjacentHTML('beforeend', botaoHTML);
      configurarFormularioConfig(); // Reconfigurar eventos
    }
  }
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  if (!verificarAutenticacao()) return;
  
  const url = window.location.pathname;
  
  if (url.includes('Configurações.html') || url.includes('Configura%C3%A7%C3%B5es.html')) {
    carregarConfiguracoes();
    configurarFormularioConfig();
    adicionarDicasSenha();
    adicionarBotaoExcluir();
  }
});
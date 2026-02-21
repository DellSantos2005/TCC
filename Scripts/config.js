// ========================================
// CONFIG.JS
// Depende de: utils.js
// ========================================

const carregarConfiguracoes = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  const nomeInput = document.getElementById('nome-usuario');
  if (nomeInput) { nomeInput.value = usuario.usuario; nomeInput.readOnly = true; }
  const emailInput = document.getElementById('email');
  if (emailInput && usuario.email) emailInput.value = usuario.email;
};

const alterarSenha = (senhaAtual, novaSenha, confirmar) => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return { sucesso: false, mensagem: 'Usuário não encontrado' };
  if (usuario.senha !== senhaAtual) return { sucesso: false, mensagem: 'Senha atual incorreta!' };
  if (!validarSenha(novaSenha)) return { sucesso: false, mensagem: 'Nova senha inválida! Use: IFBA.XXXXXXXXXXX' };
  if (novaSenha !== confirmar) return { sucesso: false, mensagem: 'As senhas não coincidem!' };
  if (senhaAtual === novaSenha) return { sucesso: false, mensagem: 'A nova senha deve ser diferente da atual!' };
  usuario.senha = novaSenha;
  return atualizarUsuarioLogado(usuario) ? { sucesso: true, mensagem: 'Senha alterada!' } : { sucesso: false, mensagem: 'Erro ao salvar.' };
};

const excluirConta = () => {
  if (!confirm('⚠️ Excluir PERMANENTEMENTE sua conta?')) return;
  if (!confirm('Tem CERTEZA ABSOLUTA? Todos os dados serão perdidos!')) return;
  const senha = prompt('Digite sua senha para confirmar:');
  const usuario = obterUsuarioLogado();
  if (!usuario || senha !== usuario.senha) { alert('❌ Senha incorreta!'); return; }
  localStorage.removeItem(KEYS.usuario(usuario.usuario));
  limparSessao();
  alert('✅ Conta excluída. Você será redirecionado.');
  window.location.href = BASE + '/index.html';
};

const resetarProgressoConfig = () => {
  if (!confirm('Resetar progresso? XP, nível e assuntos serão zerados.')) return;
  if (!confirm('Confirmar? Esta ação não pode ser desfeita!')) return;
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
  if (!window.location.pathname.includes('Configura')) return;

  carregarConfiguracoes();

  const btnSalvar = document.querySelector('.salvar');
  if (btnSalvar) {
    btnSalvar.addEventListener('click', (e) => {
      e.preventDefault();
      const novaSenha = document.getElementById('nova-senha')?.value;
      const confirmar = document.getElementById('confirmar-senha')?.value;
      if (novaSenha || confirmar) {
        const atual = prompt('Digite sua senha atual:');
        if (!atual) { alert('Cancelado.'); return; }
        const res = alterarSenha(atual, novaSenha, confirmar);
        alert((res.sucesso ? '✅ ' : '❌ ') + res.mensagem);
        if (!res.sucesso) return;
        document.getElementById('nova-senha').value = '';
        document.getElementById('confirmar-senha').value = '';
      }
      const usuario = obterUsuarioLogado();
      if (usuario) {
        const emailInput = document.getElementById('email');
        if (emailInput) usuario.email = emailInput.value.trim();
        atualizarUsuarioLogado(usuario);
        alert('✅ Configurações salvas!');
      }
    });
  }

  const btnExcluir = document.querySelector('.excluir-conta');
  if (btnExcluir) btnExcluir.addEventListener('click', (e) => { e.preventDefault(); excluirConta(); });

  const btnResetar = document.querySelector('.redefinir-progresso');
  if (btnResetar) btnResetar.addEventListener('click', (e) => { e.preventDefault(); resetarProgressoConfig(); });
});

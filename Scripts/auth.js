// ========================================
// SISTEMA DE AUTENTICAÇÃO - CORRIGIDO
// auth.js - VERSÃO SEM CADASTRO PÚBLICO
// ========================================

// ========================================
// VALIDAÇÕES
// ========================================

const validarUsuario = (usuario) => {
  const regex = /^[a-z]+\.[a-z]+$/;
  return regex.test(usuario);
};

const validarSenha = (senha) => {
  const regex = /^IFBA\.\d{11}$/;
  return regex.test(senha);
};

// ========================================
// GARANTIR INICIALIZAÇÃO ANTES DO LOGIN
// ========================================

const garantirInicializacao = () => {
  // Se o sistema não foi inicializado ainda, inicializar agora
  if (!localStorage.getItem('sistema_inicializado')) {
    console.log('[AUTH] Sistema não inicializado, inicializando agora...');
    
    // Chamar a função de utils.js se existir
    if (typeof inicializarUsuariosPadrão === 'function') {
      inicializarUsuariosPadrão();
    } else if (typeof inicializarUsuariosPadrao === 'function') {
      inicializarUsuariosPadrao();
    } else {
      // Fallback: inicializar direto aqui
      _inicializarFallback();
    }
  }
};

const _inicializarFallback = () => {
  console.log('[AUTH] Executando inicialização fallback...');
  
  const usuariosPadrao = [
    { usuario: "prof.avaliador", senha: "IFBA.99999999999", curso: "Informática" },
    { usuario: "banca.um",       senha: "IFBA.11111111111", curso: "Informática" },
    { usuario: "banca.dois",     senha: "IFBA.22222222222", curso: "Eletrotécnica" },
    { usuario: "joao.silva",     senha: "IFBA.12345678901", curso: "Informática" },
    { usuario: "maria.santos",   senha: "IFBA.23456789012", curso: "Informática" },
    { usuario: "pedro.oliveira", senha: "IFBA.34567890123", curso: "Informática" },
    { usuario: "ana.costa",      senha: "IFBA.45678901234", curso: "Informática" },
    { usuario: "lucas.almeida",  senha: "IFBA.56789012345", curso: "Informática" },
    { usuario: "julia.ferreira", senha: "IFBA.67890123456", curso: "Informática" },
    { usuario: "carlos.souza",   senha: "IFBA.78901234567", curso: "Informática" },
    { usuario: "beatriz.lima",   senha: "IFBA.89012345678", curso: "Informática" },
    { usuario: "rafael.martins", senha: "IFBA.90123456789", curso: "Eletrotécnica" },
    { usuario: "camila.rocha",   senha: "IFBA.01234567890", curso: "Eletrotécnica" },
    { usuario: "diego.pereira",  senha: "IFBA.11122233344", curso: "Eletrotécnica" },
    { usuario: "fernanda.dias",  senha: "IFBA.22233344455", curso: "Eletrotécnica" },
    { usuario: "bruno.cardoso",  senha: "IFBA.33344455566", curso: "Eletrotécnica" },
    { usuario: "patricia.gomes", senha: "IFBA.44455566677", curso: "Eletrotécnica" },
  ];

  usuariosPadrao.forEach((dados) => {
    const chave = `usuario_${dados.usuario}`;
    if (!localStorage.getItem(chave)) {
      // Estrutura mínima do usuário
      const novoUsuario = _criarUsuarioMinimo(dados.usuario, dados.senha, dados.curso);
      localStorage.setItem(chave, JSON.stringify(novoUsuario));
      console.log('[AUTH] Usuário criado:', dados.usuario);
    }
  });

  localStorage.setItem('sistema_inicializado', 'true');
  console.log('[AUTH] Inicialização fallback concluída');
};

const _criarUsuarioMinimo = (usuario, senha, curso) => {
  const desafiosTematicos = curso === "Informática"
    ? { "semana-codigo-limpo": false, "seguranca-digital": false }
    : { "seguranca-eletricidade": false, "eficiencia-energetica": false, "instalacoes-residenciais": false, "automacao-industrial": false };

  const disciplinas1Ano = curso === "Informática"
    ? {
        "informatica-basica": {
          liberado: true, concluido: false,
          assuntos: {
            "IntroducaoComputador":   { concluido: false, xp: 0 },
            "sistemas-operacionais":  { concluido: false, xp: 0 },
            "pacote-office":          { concluido: false, xp: 0 },
            "internet-seguranca":     { concluido: false, xp: 0 }
          }
        },
        "LogicaProgramacao": {
          liberado: false, concluido: false,
          assuntos: {
            "VariaveisTiposDados":       { concluido: false, xp: 0 },
            "estruturas-condicionais":   { concluido: false, xp: 0 },
            "lacos-repeticao":           { concluido: false, xp: 0 },
            "funcoes":                   { concluido: false, xp: 0 }
          }
        }
      }
    : {
        "desenho-tecnico": {
          liberado: true, concluido: false,
          assuntos: {
            "Normas-Convencoes":   { concluido: false, xp: 0 },
            "simbologia-eletrica": { concluido: false, xp: 0 },
            "plantas-diagramas":   { concluido: false, xp: 0 },
            "projeto-instalacao":  { concluido: false, xp: 0 }
          }
        },
        "fundamentos-eletricidade": {
          liberado: false, concluido: false,
          assuntos: {
            "Carga-Corrente":     { concluido: false, xp: 0 },
            "tensao-potencial":   { concluido: false, xp: 0 },
            "resistencia-ohm":    { concluido: false, xp: 0 },
            "circuitos-basicos":  { concluido: false, xp: 0 }
          }
        }
      };

  const disciplinas2Ano = curso === "Informática"
    ? {
        "banco-de-dados-1": {
          liberado: true, concluido: false,
          assuntos: {
            "conceitos-banco-dados": { concluido: false, xp: 0 },
            "modelo-relacional":     { concluido: false, xp: 0 },
            "linguagem-sql":         { concluido: false, xp: 0 },
            "normalizacao":          { concluido: false, xp: 0 }
          }
        },
        "linguagem-programacao-1": {
          liberado: false, concluido: false,
          assuntos: {
            "sintaxe-variaveis": { concluido: false, xp: 0 },
            "decisao":           { concluido: false, xp: 0 },
            "repeticao":         { concluido: false, xp: 0 },
            "vetores-matrizes":  { concluido: false, xp: 0 }
          }
        }
      }
    : {
        "instalacoes-eletricas-1": {
          liberado: true, concluido: false,
          assuntos: {
            "circuitos-iluminacao":  { concluido: false, xp: 0 },
            "Tomadas-Disjuntores":   { concluido: false, xp: 0 },
            "Calculo-Carga":         { concluido: false, xp: 0 },
            "Dimensionamento-Cabos": { concluido: false, xp: 0 }
          }
        },
        "maquinas-eletricas": {
          liberado: false, concluido: false,
          assuntos: {
            "motores-eletricos":       { concluido: false, xp: 0 },
            "Transformadores":         { concluido: false, xp: 0 },
            "Equipamentos-Protecao":   { concluido: false, xp: 0 },
            "instalacoes-industriais": { concluido: false, xp: 0 }
          }
        }
      };

  return {
    usuario, senha, curso,
    campus: "Camaçari",
    primeiroLogin: new Date().toLocaleDateString('pt-BR'),
    xp: 0,
    nivel: 1,
    estatisticas: {
      diasSeguidos: 1,
      ultimoLogin: new Date().toDateString(),
      totalJogos: 0,
      totalAcertos: 0,
      totalErros: 0
    },
    progresso: {
      "1ano": { liberado: true,  disciplinas: disciplinas1Ano },
      "2ano": { liberado: false, disciplinas: disciplinas2Ano }
    },
    desafios: {
      diario:      { ultimaData: null, concluido: false },
      tematicos:   desafiosTematicos,
      competitivo: { vitorias: 0, derrotas: 0 }
    }
  };
};

// ========================================
// SISTEMA DE LOGIN
// ========================================

const realizarLogin = (usuario, senha) => {
  console.log('[AUTH] Iniciando login para:', usuario);

  // Garantir que os usuários existem antes de tentar logar
  garantirInicializacao();

  if (!validarUsuario(usuario)) {
    return { sucesso: false, mensagem: "Formato de usuário inválido! Use: nome.sobrenome (letras minúsculas)" };
  }

  if (!validarSenha(senha)) {
    return { sucesso: false, mensagem: "Formato de senha inválido! Use: IFBA.XXXXXXXXXXX (11 dígitos)" };
  }

  const dadosUsuario = buscarUsuario(usuario);
  console.log('[AUTH] Usuário encontrado:', dadosUsuario ? 'SIM' : 'NÃO');

  if (!dadosUsuario) {
    // Debug: listar usuários disponíveis
    const disponiveis = [];
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      if (chave && chave.startsWith('usuario_')) {
        disponiveis.push(chave.replace('usuario_', ''));
      }
    }
    console.log('[AUTH] Usuários disponíveis:', disponiveis);
    return { sucesso: false, mensagem: "Usuário não encontrado! Verifique o login e tente novamente." };
  }

  if (dadosUsuario.senha !== senha) {
    console.log('[AUTH] Senha incorreta');
    return { sucesso: false, mensagem: "Senha incorreta!" };
  }

  // Login bem-sucedido
  salvarSessao(usuario);

  if (typeof atualizarDiasSeguidos === 'function') {
    atualizarDiasSeguidos();
  }

  console.log('[AUTH] Login realizado com sucesso!');
  return { sucesso: true, mensagem: "Login realizado com sucesso!", usuario: dadosUsuario };
};

// ========================================
// LOGOUT
// ========================================

const realizarLogout = () => {
  limparSessao();
  window.location.href = '/Login/index.html';
};

// ========================================
// FUNÇÕES ADMINISTRATIVAS
// ========================================

const cadastrarUsuarioAdmin = (usuario, senha, curso) => {
  if (!validarUsuario(usuario)) {
    console.error("Formato de usuário inválido:", usuario);
    return false;
  }
  if (!validarSenha(senha)) {
    console.error("Formato de senha inválido:", senha);
    return false;
  }
  if (usuarioExiste(usuario)) {
    console.warn("Usuário já existe:", usuario);
    return false;
  }
  const novo = _criarUsuarioMinimo(usuario, senha, curso);
  if (salvarUsuario(novo)) {
    console.log("Usuário cadastrado:", usuario);
    return true;
  }
  return false;
};

const cadastrarAluno = (usuario, senha, curso) => {
  console.log(`Cadastrando: ${usuario}`);
  return cadastrarUsuarioAdmin(usuario, senha, curso);
};

const listarUsuariosCadastrados = () => {
  const usuarios = [];
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave && chave.startsWith('usuario_')) {
      try {
        const u = JSON.parse(localStorage.getItem(chave));
        usuarios.push({ usuario: u.usuario, curso: u.curso, xp: u.xp, nivel: u.nivel });
      } catch(e) {}
    }
  }
  usuarios.sort((a, b) => a.usuario.localeCompare(b.usuario));
  console.table(usuarios);
  return usuarios;
};

const resetarSenhaAluno = (usuario, novaSenha) => {
  if (!usuarioExiste(usuario)) {
    console.error("Usuário não encontrado:", usuario);
    return false;
  }
  if (!validarSenha(novaSenha)) {
    console.error("Formato de senha inválido");
    return false;
  }
  const dados = buscarUsuario(usuario);
  dados.senha = novaSenha;
  return salvarUsuario(dados);
};

// ========================================
// INICIALIZAÇÃO DA PÁGINA DE LOGIN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  console.log('[AUTH] DOMContentLoaded, pathname:', url);

  // Verificar se é a página de login
  const ehPaginaLogin = url.includes('index.html') ||
                        url.endsWith('/Login/') ||
                        url.endsWith('/login/') ||
                        url === '/' ||
                        url.includes('Login');

  if (ehPaginaLogin) {
    console.log('[AUTH] Página de login detectada');

    // Garantir inicialização dos usuários
    garantirInicializacao();

    // Se já está logado, redirecionar
    const sessao = obterSessao();
    if (sessao && buscarUsuario(sessao)) {
      console.log('[AUTH] Sessão ativa encontrada, redirecionando...');
      window.location.href = '../Principal/Home.html';
      return;
    }

    // Configurar formulário
    const formLogin = document.getElementById('login-form');
    if (!formLogin) {
      console.error('[AUTH] Formulário login-form não encontrado!');
      return;
    }

    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const usuarioInput = document.getElementById('usuario');
      const senhaInput   = document.getElementById('senha');

      if (!usuarioInput || !senhaInput) {
        alert('Erro: campos não encontrados!');
        return;
      }

      const usuario = usuarioInput.value.trim().toLowerCase();
      const senha   = senhaInput.value.trim();

      if (!usuario || !senha) {
        alert('Preencha todos os campos!');
        return;
      }

      console.log('[AUTH] Tentando login:', usuario);
      const resultado = realizarLogin(usuario, senha);

      if (resultado.sucesso) {
        console.log('[AUTH] Sucesso! Redirecionando...');
        window.location.href = '../Principal/Home.html';
      } else {
        console.log('[AUTH] Falha:', resultado.mensagem);
        alert('❌ ' + resultado.mensagem);
      }
    });

    console.log('[AUTH] Formulário configurado com sucesso');
  }
});

// Expor funções administrativas no console
window.adminCadastrarAluno      = cadastrarAluno;
window.adminListarAlunos        = listarUsuariosCadastrados;
window.adminResetarSenha        = resetarSenhaAluno;
window.adminCadastrarUsuario    = cadastrarUsuarioAdmin;
window.adminForcarInicializacao = () => {
  localStorage.removeItem('sistema_inicializado');
  _inicializarFallback();
  console.log('[AUTH] Reinicialização forçada concluída!');
};


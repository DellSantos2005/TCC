// ========================================
// UTILS.JS - BASE DO SISTEMA
// Deve ser o PRIMEIRO script carregado
// ========================================

// ========================================
// DETECTAR NOME DO REPOSITÓRIO AUTOMATICAMENTE
// ========================================
const detectarRepoName = () => {
  const path = window.location.pathname;
  // GitHub Pages: /nome-do-repo/...
  if (window.location.hostname.includes('github.io')) {
    const partes = path.split('/').filter(Boolean);
    return partes.length > 0 ? '/' + partes[0] : '';
  }
  // Vercel ou domínio próprio: sem prefixo
  return '';
};

const BASE = detectarRepoName();

// Disponível globalmente
window.BASE = BASE;

// ========================================
// LOG
// ========================================
const log = (...args) => console.log('[PLATAFORMA]', ...args);

// ========================================
// CHAVES DO LOCALSTORAGE
// ========================================
const KEYS = {
  usuario: (u) => `plataforma_usuario_${u}`,
  sessao: 'plataforma_sessao_ativa',
  inicializado: 'plataforma_inicializado'
};

// ========================================
// ESTRUTURA PADRÃO DE USUÁRIO
// ========================================
const criarUsuarioPadrao = (usuario, senha, curso) => {
  const desafiosTematicos = curso === 'Informática'
    ? { 'semana-codigo-limpo': false, 'seguranca-digital': false }
    : { 'seguranca-eletricidade': false, 'eficiencia-energetica': false, 'instalacoes-residenciais': false, 'automacao-industrial': false };

  const disc1TI = {
    'informatica-basica': {
      liberado: true, concluido: false,
      assuntos: {
        'IntroducaoComputador':  { concluido: false, xp: 0 },
        'sistemas-operacionais': { concluido: false, xp: 0 },
        'pacote-office':         { concluido: false, xp: 0 },
        'internet-seguranca':    { concluido: false, xp: 0 }
      }
    },
    'LogicaProgramacao': {
      liberado: false, concluido: false,
      assuntos: {
        'VariaveisTiposDados':     { concluido: false, xp: 0 },
        'estruturas-condicionais': { concluido: false, xp: 0 },
        'lacos-repeticao':         { concluido: false, xp: 0 },
        'funcoes':                 { concluido: false, xp: 0 }
      }
    }
  };

  const disc2TI = {
    'banco-de-dados-1': {
      liberado: true, concluido: false,
      assuntos: {
        'conceitos-banco-dados': { concluido: false, xp: 0 },
        'modelo-relacional':     { concluido: false, xp: 0 },
        'linguagem-sql':         { concluido: false, xp: 0 },
        'normalizacao':          { concluido: false, xp: 0 }
      }
    },
    'linguagem-programacao-1': {
      liberado: false, concluido: false,
      assuntos: {
        'sintaxe-variaveis': { concluido: false, xp: 0 },
        'decisao':           { concluido: false, xp: 0 },
        'repeticao':         { concluido: false, xp: 0 },
        'vetores-matrizes':  { concluido: false, xp: 0 }
      }
    }
  };

  const disc1Eletro = {
    'desenho-tecnico': {
      liberado: true, concluido: false,
      assuntos: {
        'Normas-Convencoes':   { concluido: false, xp: 0 },
        'simbologia-eletrica': { concluido: false, xp: 0 },
        'plantas-diagramas':   { concluido: false, xp: 0 },
        'projeto-instalacao':  { concluido: false, xp: 0 }
      }
    },
    'fundamentos-eletricidade': {
      liberado: false, concluido: false,
      assuntos: {
        'Carga-Corrente':    { concluido: false, xp: 0 },
        'tensao-potencial':  { concluido: false, xp: 0 },
        'resistencia-ohm':   { concluido: false, xp: 0 },
        'circuitos-basicos': { concluido: false, xp: 0 }
      }
    }
  };

  const disc2Eletro = {
    'instalacoes-eletricas-1': {
      liberado: true, concluido: false,
      assuntos: {
        'circuitos-iluminacao':  { concluido: false, xp: 0 },
        'Tomadas-Disjuntores':   { concluido: false, xp: 0 },
        'Calculo-Carga':         { concluido: false, xp: 0 },
        'Dimensionamento-Cabos': { concluido: false, xp: 0 }
      }
    },
    'maquinas-eletricas': {
      liberado: false, concluido: false,
      assuntos: {
        'motores-eletricos':       { concluido: false, xp: 0 },
        'Transformadores':         { concluido: false, xp: 0 },
        'Equipamentos-Protecao':   { concluido: false, xp: 0 },
        'instalacoes-industriais': { concluido: false, xp: 0 }
      }
    }
  };

  const eTI = curso === 'Informática';

  return {
    usuario, senha, curso,
    campus: 'Camaçari',
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
      '1ano': { liberado: true,  disciplinas: eTI ? disc1TI : disc1Eletro },
      '2ano': { liberado: false, disciplinas: eTI ? disc2TI : disc2Eletro }
    },
    desafios: {
      diario:      { ultimaData: null, concluido: false },
      tematicos:   desafiosTematicos,
      competitivo: { vitorias: 0, derrotas: 0 }
    }
  };
};

// ========================================
// LOCALSTORAGE
// ========================================
const salvarUsuario = (dados) => {
  try {
    localStorage.setItem(KEYS.usuario(dados.usuario), JSON.stringify(dados));
    return true;
  } catch(e) {
    console.error('Erro ao salvar usuário:', e);
    return false;
  }
};

const buscarUsuario = (usuario) => {
  try {
    const d = localStorage.getItem(KEYS.usuario(usuario));
    return d ? JSON.parse(d) : null;
  } catch(e) { return null; }
};

const usuarioExiste = (usuario) => {
  return localStorage.getItem(KEYS.usuario(usuario)) !== null;
};

const salvarSessao = (usuario) => {
  localStorage.setItem(KEYS.sessao, usuario);
};

const obterSessao = () => {
  return localStorage.getItem(KEYS.sessao);
};

const limparSessao = () => {
  localStorage.removeItem(KEYS.sessao);
};

const obterUsuarioLogado = () => {
  const sessao = obterSessao();
  return sessao ? buscarUsuario(sessao) : null;
};

const atualizarUsuarioLogado = (dados) => {
  return salvarUsuario(dados);
};

// ========================================
// XP E NÍVEIS
// ========================================
const calcularNivel = (xp) => Math.floor(xp / 100) + 1;

const adicionarXP = (quantidade) => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;
  usuario.xp += quantidade;
  usuario.nivel = calcularNivel(usuario.xp);
  return atualizarUsuarioLogado(usuario);
};

// ========================================
// DIAS SEGUIDOS
// ========================================
const atualizarDiasSeguidos = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;
  const hoje = new Date().toDateString();
  if (usuario.estatisticas.ultimoLogin !== hoje) {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    usuario.estatisticas.diasSeguidos = 
      usuario.estatisticas.ultimoLogin === ontem.toDateString()
        ? usuario.estatisticas.diasSeguidos + 1
        : 1;
    usuario.estatisticas.ultimoLogin = hoje;
    return atualizarUsuarioLogado(usuario);
  }
  return false;
};

// ========================================
// VALIDAÇÕES
// ========================================
const validarUsuario = (u) => /^[a-z]+\.[a-z]+$/.test(u);
const validarSenha   = (s) => /^IFBA\.\d{11}$/.test(s);
const validarEmail   = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// ========================================
// VERIFICAR AUTENTICAÇÃO
// ========================================
const verificarAutenticacao = () => {
  const sessao = obterSessao();
  if (!sessao) {
    window.location.href = BASE + '/index.html';
    return false;
  }
  return true;
};

// ========================================
// RANKING
// ========================================
const obterTodosUsuarios = () => {
  const usuarios = [];
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave && chave.startsWith('plataforma_usuario_')) {
      try { usuarios.push(JSON.parse(localStorage.getItem(chave))); } catch(e) {}
    }
  }
  return usuarios.sort((a, b) => b.xp - a.xp);
};

const obterUsuariosPorCurso = (curso) => {
  return obterTodosUsuarios().filter(u => u.curso === curso);
};

// ========================================
// INICIALIZAR USUÁRIOS PADRÃO
// ========================================
const inicializarUsuariosPadrao = () => {
  if (localStorage.getItem(KEYS.inicializado)) {
    log('✅ Sistema já inicializado');
    return;
  }

  log('🔄 Inicializando sistema pela primeira vez...');

  const padrao = [
    { usuario: 'prof.avaliador', senha: 'IFBA.99999999999', curso: 'Informática' },
    { usuario: 'banca.um',       senha: 'IFBA.11111111111', curso: 'Informática' },
    { usuario: 'banca.dois',     senha: 'IFBA.22222222222', curso: 'Eletrotécnica' },
    { usuario: 'joao.silva',     senha: 'IFBA.12345678901', curso: 'Informática' },
    { usuario: 'maria.santos',   senha: 'IFBA.23456789012', curso: 'Informática' },
    { usuario: 'pedro.oliveira', senha: 'IFBA.34567890123', curso: 'Informática' },
    { usuario: 'ana.costa',      senha: 'IFBA.45678901234', curso: 'Informática' },
    { usuario: 'lucas.almeida',  senha: 'IFBA.56789012345', curso: 'Informática' },
    { usuario: 'julia.ferreira', senha: 'IFBA.67890123456', curso: 'Informática' },
    { usuario: 'rafael.martins', senha: 'IFBA.90123456789', curso: 'Eletrotécnica' },
    { usuario: 'camila.rocha',   senha: 'IFBA.01234567890', curso: 'Eletrotécnica' },
    { usuario: 'diego.pereira',  senha: 'IFBA.11122233344', curso: 'Eletrotécnica' },
    { usuario: 'fernanda.dias',  senha: 'IFBA.22233344455', curso: 'Eletrotécnica' },
    { usuario: 'bruno.cardoso',  senha: 'IFBA.33344455566', curso: 'Eletrotécnica' },
    { usuario: 'patricia.gomes', senha: 'IFBA.44455566677', curso: 'Eletrotécnica' },
  ];

  padrao.forEach(d => {
    if (!usuarioExiste(d.usuario)) {
      const u = criarUsuarioPadrao(d.usuario, d.senha, d.curso);
      // XP aleatório para ranking parecer real
      u.xp = Math.floor(Math.random() * 400) + 50;
      u.nivel = calcularNivel(u.xp);
      salvarUsuario(u);
    }
  });

  localStorage.setItem(KEYS.inicializado, 'true');
  log('✅ Sistema inicializado!');
  log('📧 Credenciais: joao.silva / IFBA.12345678901');
  log('📧 Professor:   prof.avaliador / IFBA.99999999999');
};

// ========================================
// EXECUTAR INICIALIZAÇÃO IMEDIATAMENTE
// ========================================
try {
  inicializarUsuariosPadrao();
} catch(e) {
  console.error('Erro crítico na inicialização:', e);
}

// ========================================
// EXPOR FUNÇÕES ADMIN
// ========================================
window.adminCadastrar = (usuario, senha, curso) => {
  if (!validarUsuario(usuario)) return console.error('Usuário inválido. Use: nome.sobrenome');
  if (!validarSenha(senha))   return console.error('Senha inválida. Use: IFBA.XXXXXXXXXXX');
  if (usuarioExiste(usuario)) return console.error('Usuário já existe:', usuario);
  salvarUsuario(criarUsuarioPadrao(usuario, senha, curso));
  console.log('✅ Usuário criado:', usuario);
};

window.adminListar = () => {
  const lista = obterTodosUsuarios().map(u => ({ usuario: u.usuario, curso: u.curso, xp: u.xp, nivel: u.nivel }));
  console.table(lista);
  return lista;
};

window.adminResetar = () => {
  localStorage.removeItem(KEYS.inicializado);
  // Remover todos os usuários
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (k && k.startsWith('plataforma_usuario_')) localStorage.removeItem(k);
  }
  inicializarUsuariosPadrao();
  console.log('✅ Sistema resetado!');
};

// ========================================
// SISTEMA DE GERENCIAMENTO DE DADOS
// utils.js - VERSÃO OTIMIZADA GITHUB PAGES
// ========================================

// ========================================
// CONFIGURAÇÃO DE AMBIENTE
// ========================================

const CONFIG = {
  // Detectar se está no GitHub Pages ou local
  isGitHubPages: window.location.hostname.includes('github.io'),
  repoName: 'TCC---Plataforma-de-Aprendizagem-Gamificada', // SUBSTITUA PELO NOME DO SEU REPO
  
  // Prefixo do localStorage para evitar conflitos
  storagePrefix: 'plataforma_',
  
  // Configurações de debug
  debug: true
};

// Função para obter o caminho base correto
const getBasePath = () => {
  if (CONFIG.isGitHubPages) {
    return `/${CONFIG.repoName}`;
  }
  return '';
};

// Função de log segura
const log = (...args) => {
  if (CONFIG.debug) {
    console.log('[PLATAFORMA]', ...args);
  }
};

// ========================================
// ESTRUTURA PADRÃO DE USUÁRIO
// ========================================

const criarUsuarioPadrao = (usuario, senha, curso) => {
  const desafiosTematicos = curso === "Informática" ? {
    "semana-codigo-limpo": false,
    "seguranca-digital": false
  } : {
    "seguranca-eletricidade": false,
    "eficiencia-energetica": false,
    "instalacoes-residenciais": false,
    "automacao-industrial": false
  };

  return {
    usuario: usuario,
    senha: senha,
    curso: curso,
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
      "1ano": {
        liberado: true,
        disciplinas: curso === "Informática" ? {
          "informatica-basica": {
            liberado: true,
            concluido: false,
            assuntos: {
              "IntroducaoComputador": { concluido: false, xp: 0 },
              "sistemas-operacionais": { concluido: false, xp: 0 },
              "pacote-office": { concluido: false, xp: 0 },
              "internet-seguranca": { concluido: false, xp: 0 }
            }
          },
          "LogicaProgramacao": {
            liberado: false,
            concluido: false,
            assuntos: {
              "VariaveisTiposDados": { concluido: false, xp: 0 },
              "estruturas-condicionais": { concluido: false, xp: 0 },
              "lacos-repeticao": { concluido: false, xp: 0 },
              "funcoes": { concluido: false, xp: 0 }
            }
          }
        } : {
          "desenho-tecnico": {
            liberado: true,
            concluido: false,
            assuntos: {
              "Normas-Convencoes": { concluido: false, xp: 0 },
              "simbologia-eletrica": { concluido: false, xp: 0 },
              "plantas-diagramas": { concluido: false, xp: 0 },
              "projeto-instalacao": { concluido: false, xp: 0 }
            }
          },
          "fundamentos-eletricidade": {
            liberado: false,
            concluido: false,
            assuntos: {
              "Carga-Corrente": { concluido: false, xp: 0 },
              "tensao-potencial": { concluido: false, xp: 0 },
              "resistencia-ohm": { concluido: false, xp: 0 },
              "circuitos-basicos": { concluido: false, xp: 0 }
            }
          }
        }
      },
      "2ano": {
        liberado: false,
        disciplinas: curso === "Informática" ? {
          "banco-de-dados-1": {
            liberado: true,
            concluido: false,
            assuntos: {
              "conceitos-banco-dados": { concluido: false, xp: 0 },
              "modelo-relacional": { concluido: false, xp: 0 },
              "linguagem-sql": { concluido: false, xp: 0 },
              "normalizacao": { concluido: false, xp: 0 }
            }
          },
          "linguagem-programacao-1": {
            liberado: false,
            concluido: false,
            assuntos: {
              "sintaxe-variaveis": { concluido: false, xp: 0 },
              "decisao": { concluido: false, xp: 0 },
              "repeticao": { concluido: false, xp: 0 },
              "vetores-matrizes": { concluido: false, xp: 0 }
            }
          }
        } : {
          "instalacoes-eletricas-1": {
            liberado: true,
            concluido: false,
            assuntos: {
              "circuitos-iluminacao": { concluido: false, xp: 0 },
              "Tomadas-Disjuntores": { concluido: false, xp: 0 },
              "Calculo-Carga": { concluido: false, xp: 0 },
              "Dimensionamento-Cabos": { concluido: false, xp: 0 }
            }
          },
          "maquinas-eletricas": {
            liberado: false,
            concluido: false,
            assuntos: {
              "motores-eletricos": { concluido: false, xp: 0 },
              "Transformadores": { concluido: false, xp: 0 },
              "Equipamentos-Protecao": { concluido: false, xp: 0 },
              "instalacoes-industriais": { concluido: false, xp: 0 }
            }
          }
        }
      }
    },
    
    desafios: {
      diario: {
        ultimaData: null,
        concluido: false
      },
      tematicos: desafiosTematicos,
      competitivo: {
        vitorias: 0,
        derrotas: 0
      }
    }
  };
};

// ========================================
// FUNÇÕES DE LOCALSTORAGE (CORRIGIDAS)
// ========================================

const salvarUsuario = (dadosUsuario) => {
  try {
    const chave = `${CONFIG.storagePrefix}usuario_${dadosUsuario.usuario}`;
    localStorage.setItem(chave, JSON.stringify(dadosUsuario));
    log('✅ Usuário salvo:', dadosUsuario.usuario);
    return true;
  } catch (e) {
    console.error("❌ Erro ao salvar usuário:", e);
    alert('Erro ao salvar dados. Verifique o armazenamento do navegador.');
    return false;
  }
};

const buscarUsuario = (usuario) => {
  try {
    const chave = `${CONFIG.storagePrefix}usuario_${usuario}`;
    const dados = localStorage.getItem(chave);
    if (dados) {
      log('✅ Usuário encontrado:', usuario);
      return JSON.parse(dados);
    }
    log('⚠️ Usuário não encontrado:', usuario);
    return null;
  } catch (e) {
    console.error("❌ Erro ao buscar usuário:", e);
    return null;
  }
};

const usuarioExiste = (usuario) => {
  const chave = `${CONFIG.storagePrefix}usuario_${usuario}`;
  return localStorage.getItem(chave) !== null;
};

const salvarSessao = (usuario) => {
  try {
    const chave = `${CONFIG.storagePrefix}sessao_ativa`;
    localStorage.setItem(chave, usuario);
    log('✅ Sessão salva:', usuario);
    return true;
  } catch (e) {
    console.error("❌ Erro ao salvar sessão:", e);
    return false;
  }
};

const obterSessao = () => {
  const chave = `${CONFIG.storagePrefix}sessao_ativa`;
  const sessao = localStorage.getItem(chave);
  if (sessao) {
    log('✅ Sessão encontrada:', sessao);
  } else {
    log('⚠️ Nenhuma sessão ativa');
  }
  return sessao;
};

const limparSessao = () => {
  try {
    const chave = `${CONFIG.storagePrefix}sessao_ativa`;
    localStorage.removeItem(chave);
    log('✅ Sessão limpa');
    return true;
  } catch (e) {
    console.error("❌ Erro ao limpar sessão:", e);
    return false;
  }
};

const obterUsuarioLogado = () => {
  const usuario = obterSessao();
  if (usuario) {
    return buscarUsuario(usuario);
  }
  return null;
};

const atualizarUsuarioLogado = (novosDados) => {
  const usuario = obterSessao();
  if (usuario) {
    return salvarUsuario(novosDados);
  }
  log('❌ Nenhuma sessão ativa para atualizar');
  return false;
};

// ========================================
// SISTEMA DE XP E NÍVEIS
// ========================================

const calcularNivel = (xpTotal) => {
  return Math.floor(xpTotal / 100) + 1;
};

const xpParaProximoNivel = (nivelAtual) => {
  return nivelAtual * 100;
};

const adicionarXP = (quantidade) => {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    log('❌ Não foi possível adicionar XP: usuário não logado');
    return false;
  }
  
  log('💰 Adicionando XP:', quantidade);
  log('📊 XP antes:', usuario.xp, '| Nível:', usuario.nivel);
  
  const nivelAntes = usuario.nivel;
  usuario.xp += quantidade;
  usuario.nivel = calcularNivel(usuario.xp);
  
  const levelUp = usuario.nivel > nivelAntes;
  
  log('📊 XP depois:', usuario.xp, '| Nível:', usuario.nivel);
  
  if (levelUp) {
    log(`🎉 LEVEL UP! ${nivelAntes} → ${usuario.nivel}`);
  }
  
  return atualizarUsuarioLogado(usuario);
};

// ========================================
// SISTEMA DE DIAS SEGUIDOS
// ========================================

const atualizarDiasSeguidos = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;
  
  const hoje = new Date().toDateString();
  const ultimoLogin = usuario.estatisticas.ultimoLogin;
  
  if (ultimoLogin !== hoje) {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    
    if (ultimoLogin === ontem.toDateString()) {
      usuario.estatisticas.diasSeguidos++;
      log('🔥 Sequência mantida:', usuario.estatisticas.diasSeguidos, 'dias');
    } else {
      usuario.estatisticas.diasSeguidos = 1;
      log('🔄 Sequência resetada');
    }
    
    usuario.estatisticas.ultimoLogin = hoje;
    return atualizarUsuarioLogado(usuario);
  }
  
  return false;
};

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

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

const verificarAutenticacao = () => {
  const sessao = obterSessao();
  if (!sessao) {
    log('❌ Usuário não autenticado, redirecionando...');
    // Corrigir redirecionamento para GitHub Pages
    const basePath = getBasePath();
    window.location.href = `${basePath}/pages/Login/index.html`;
    return false;
  }
  log('✅ Usuário autenticado:', sessao);
  return true;
};

// ========================================
// SISTEMA DE RANKING
// ========================================

const obterUsuariosPorCurso = (curso) => {
  const usuarios = [];
  const prefix = `${CONFIG.storagePrefix}usuario_`;
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith(prefix)) {
      try {
        const usuario = JSON.parse(localStorage.getItem(chave));
        if (usuario.curso === curso) {
          usuarios.push(usuario);
        }
      } catch (e) {
        console.error('Erro ao processar usuário:', chave, e);
      }
    }
  }
  
  return usuarios.sort((a, b) => b.xp - a.xp);
};

const obterTodosUsuarios = () => {
  const usuarios = [];
  const prefix = `${CONFIG.storagePrefix}usuario_`;
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave.startsWith(prefix)) {
      try {
        const usuario = JSON.parse(localStorage.getItem(chave));
        usuarios.push(usuario);
      } catch (e) {
        console.error('Erro ao processar usuário:', chave, e);
      }
    }
  }
  
  return usuarios.sort((a, b) => b.xp - a.xp);
};

// ========================================
// INICIALIZAÇÃO DE USUÁRIOS PADRÃO
// ========================================

const inicializarUsuariosPadrão = () => {
  const chaveInicializacao = `${CONFIG.storagePrefix}sistema_inicializado`;
  
  if (localStorage.getItem(chaveInicializacao)) {
    log('✅ Sistema já inicializado');
    return;
  }
  
  log('🔄 Inicializando sistema pela primeira vez...');
  
  const usuariosPadrao = [
    { usuario: "prof.avaliador", senha: "IFBA.99999999999", curso: "Informática" },
    { usuario: "banca.um", senha: "IFBA.11111111111", curso: "Informática" },
    { usuario: "banca.dois", senha: "IFBA.22222222222", curso: "Eletrotécnica" },
    { usuario: "joao.silva", senha: "IFBA.12345678901", curso: "Informática" },
    { usuario: "maria.santos", senha: "IFBA.23456789012", curso: "Informática" },
    { usuario: "pedro.oliveira", senha: "IFBA.34567890123", curso: "Informática" },
    { usuario: "ana.costa", senha: "IFBA.45678901234", curso: "Informática" },
    { usuario: "rafael.martins", senha: "IFBA.90123456789", curso: "Eletrotécnica" },
    { usuario: "camila.rocha", senha: "IFBA.01234567890", curso: "Eletrotécnica" }
  ];
  
  let cadastrados = 0;
  
  usuariosPadrao.forEach((dados) => {
    if (usuarioExiste(dados.usuario)) {
      log('⚠️ Usuário já existe:', dados.usuario);
      return;
    }
    
    const usuario = criarUsuarioPadrao(dados.usuario, dados.senha, dados.curso);
    usuario.xp = Math.floor(Math.random() * 300) + 50;
    usuario.nivel = Math.floor(usuario.xp / 100) + 1;
    
    if (salvarUsuario(usuario)) {
      cadastrados++;
    }
  });
  
  localStorage.setItem(chaveInicializacao, 'true');
  
  log(`✅ Sistema inicializado! ${cadastrados} usuários cadastrados.`);
  log('📧 CREDENCIAIS DE TESTE:');
  log('   👨‍🏫 prof.avaliador / IFBA.99999999999');
  log('   👨‍🎓 banca.um / IFBA.11111111111');
  log('   🧑‍💻 joao.silva / IFBA.12345678901');
  log('   ⚡ rafael.martins / IFBA.90123456789');
};

// ========================================
// EXECUTAR INICIALIZAÇÃO
// ========================================

try {
  log('🚀 Iniciando sistema...');
  log('🌐 Ambiente:', CONFIG.isGitHubPages ? 'GitHub Pages' : 'Local');
  log('📁 Caminho base:', getBasePath());
  inicializarUsuariosPadrão();
} catch (erro) {
  console.error('❌ Erro crítico ao inicializar:', erro);
  alert('Erro ao inicializar o sistema. Verifique o console para mais detalhes.');
}

// ========================================
// EXPOR CONFIGURAÇÃO PARA OUTROS SCRIPTS
// ========================================

window.PLATAFORMA_CONFIG = CONFIG;
window.getBasePath = getBasePath;
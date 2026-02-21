// ========================================
// SISTEMA DE INTEGRAÇÃO DOS JOGOS
// jogos.js
// ========================================

// Mapeamento de assuntos para jogos
const jogosDisponiveis = {
  // INFORMÁTICA - 1º ANO
  "IntroducaoComputador": {
    nome: "Monte o PC",
    arquivo: "monte-pc.html",
    descricao: "Monte um computador peça por peça!",
    icone: "💻"
  },
  "sistemas-operacionais": {
    nome: "Gerenciador de Tarefas",
    arquivo: "gerenciador-tarefas.html",
    descricao: "Gerencie processos e memória!",
    icone: "🖥️"
  },
  "pacote-office": {
    nome: "Desafio Office",
    arquivo: "desafio-office.html",
    descricao: "Complete tarefas do Office!",
    icone: "📊"
  },
  "internet-seguranca": {
    nome: "Caça Phishing",
    arquivo: "caca-phishing.html",
    descricao: "Identifique ameaças virtuais!",
    icone: "🔒"
  },
  
  // LÓGICA DE PROGRAMAÇÃO
  "VariaveisTiposDados": {
    nome: "Caixa Certa",
    arquivo: "caixa-certa.html",
    descricao: "Organize variáveis corretamente!",
    icone: "📦"
  },
  "estruturas-condicionais": {
    nome: "Labirinto IF/ELSE",
    arquivo: "labirinto-if.html",
    descricao: "Escape usando lógica!",
    icone: "🔀"
  },
  "lacos-repeticao": {
    nome: "Loop Runner",
    arquivo: "loop-runner.html",
    descricao: "Domine os loops!",
    icone: "🔁"
  },
  "funcoes": {
    nome: "Máquina de Funções",
    arquivo: "maquina-funcoes.html",
    descricao: "Crie e use funções!",
    icone: "⚙️"
  },

  // ELETROTÉCNICA - 1º ANO
  "Normas-Convencoes": {
    nome: "Identificador de Símbolos",
    arquivo: "identificador-simbolos.html",
    descricao: "Aprenda os símbolos técnicos!",
    icone: "📐"
  },
  "simbologia-eletrica": {
    nome: "Monte o Diagrama",
    arquivo: "monte-diagrama.html",
    descricao: "Crie diagramas elétricos!",
    icone: "⚡"
  },
  "plantas-diagramas": {
    nome: "Arquiteto Elétrico",
    arquivo: "arquiteto-eletrico.html",
    descricao: "Projete instalações!",
    icone: "🏗️"
  },
  "projeto-instalacao": {
    nome: "Planejador",
    arquivo: "planejador.html",
    descricao: "Planeje um projeto completo!",
    icone: "📋"
  },
  "Carga-Corrente": {
    nome: "Fluxo de Elétrons",
    arquivo: "fluxo-eletrons.html",
    descricao: "Visualize a corrente elétrica!",
    icone: "⚡"
  },
  "tensao-potencial": {
    nome: "Diferença de Potencial",
    arquivo: "diferenca-potencial.html",
    descricao: "Entenda tensão e DDP!",
    icone: "🔋"
  },
  "resistencia-ohm": {
    nome: "Calculadora de Ohm",
    arquivo: "calculadora-ohm.html",
    descricao: "Domine a Lei de Ohm!",
    icone: "📊"
  },
  "circuitos-basicos": {
    nome: "Acenda a Lâmpada",
    arquivo: "acenda-lampada.html",
    descricao: "Monte circuitos funcionais!",
    icone: "💡"
  }
};

// ========================================
// FUNÇÃO PARA CARREGAR ATIVIDADE
// ========================================

function carregarAtividade() {
  // Identificar qual assunto estamos
  const url = window.location.pathname;
  let assuntoAtual = null;

  // Extrair o nome do assunto da URL
  Object.keys(jogosDisponiveis).forEach(assunto => {
    if (url.includes(assunto)) {
      assuntoAtual = assunto;
    }
  });

  if (!assuntoAtual) {
    alert('❌ Jogo não encontrado para este assunto!');
    console.error('Assunto não identificado na URL:', url);
    return;
  }

  const jogo = jogosDisponiveis[assuntoAtual];
  
  if (!jogo) {
    alert('🚧 Jogo em desenvolvimento! Em breve estará disponível.');
    return;
  }

  // Verificar se usuário está logado
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    alert('⚠️ Faça login para jogar!');
    window.location.href = '../../pages/Login/index.html';
    return;
  }

  // Abrir jogo em nova aba
  const urlJogo = `../../pages/jogos/${jogo.arquivo}`;
  const novaAba = window.open(urlJogo, '_blank', 'width=1200,height=800');
  
  if (!novaAba) {
    alert('⚠️ Habilite pop-ups para jogar!');
  } else {
    console.log('🎮 Abrindo jogo:', jogo.nome);
  }
}

// ========================================
// FUNÇÃO PARA ATUALIZAR BOTÃO DO JOGO
// ========================================

function atualizarBotaoJogo() {
  const url = window.location.pathname;
  let assuntoAtual = null;

  Object.keys(jogosDisponiveis).forEach(assunto => {
    if (url.includes(assunto)) {
      assuntoAtual = assunto;
    }
  });

  if (!assuntoAtual) return;

  const jogo = jogosDisponiveis[assuntoAtual];
  if (!jogo) return;

  // Procurar o botão de atividade
  const botaoJogo = document.querySelector('.atividade-selector button');
  if (botaoJogo) {
    botaoJogo.textContent = `${jogo.icone} Iniciar: ${jogo.nome}`;
    botaoJogo.title = jogo.descricao;
  }

  // Atualizar título da seção se existir
  const tituloAtividade = document.querySelector('.atividade-selector h2');
  if (tituloAtividade) {
    tituloAtividade.innerHTML = `🎮 Atividade Interativa: ${jogo.nome}`;
  }
}

// ========================================
// SALVAR PROGRESSO DO JOGO
// ========================================

function salvarProgressoJogo(assunto, pontuacao, tempo) {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;

  // Inicializar estrutura de jogos se não existir
  if (!usuario.jogos) {
    usuario.jogos = {};
  }

  // Salvar dados do jogo
  if (!usuario.jogos[assunto]) {
    usuario.jogos[assunto] = {
      primeiraVez: true,
      melhorPontuacao: 0,
      melhorTempo: 0,
      vezesJogado: 0,
      xpTotal: 0
    };
  }

  const jogoData = usuario.jogos[assunto];
  jogoData.vezesJogado++;

  // Atualizar melhor pontuação
  if (pontuacao > jogoData.melhorPontuacao) {
    jogoData.melhorPontuacao = pontuacao;
  }

  // Atualizar melhor tempo
  if (tempo && (tempo < jogoData.melhorTempo || jogoData.melhorTempo === 0)) {
    jogoData.melhorTempo = tempo;
  }

  // XP baseado na pontuação
  const xpGanho = Math.floor(pontuacao / 10);
  jogoData.xpTotal += xpGanho;
  
  // Bônus de primeira vez
  if (jogoData.primeiraVez) {
    adicionarXP(xpGanho + 50); // +50 XP bônus
    jogoData.primeiraVez = false;
  } else {
    adicionarXP(xpGanho);
  }

  return atualizarUsuarioLogado(usuario);
}

// ========================================
// OBTER ESTATÍSTICAS DO JOGO
// ========================================

function obterEstatisticasJogo(assunto) {
  const usuario = obterUsuarioLogado();
  if (!usuario || !usuario.jogos || !usuario.jogos[assunto]) {
    return null;
  }

  return usuario.jogos[assunto];
}

// ========================================
// VERIFICAR SE JOGO FOI CONCLUÍDO
// ========================================

function jogoFoiConcluido(assunto) {
  const stats = obterEstatisticasJogo(assunto);
  return stats && stats.vezesJogado > 0;
}

// ========================================
// LISTAR TODOS OS JOGOS DISPONÍVEIS
// ========================================

function listarJogosDisponiveis() {
  const usuario = obterUsuarioLogado();
  if (!usuario) return [];

  const jogos = [];
  
  Object.keys(jogosDisponiveis).forEach(assunto => {
    const jogo = jogosDisponiveis[assunto];
    const stats = obterEstatisticasJogo(assunto);
    
    jogos.push({
      assunto,
      nome: jogo.nome,
      descricao: jogo.descricao,
      icone: jogo.icone,
      estatisticas: stats,
      concluido: stats && stats.vezesJogado > 0
    });
  });

  return jogos;
}

// ========================================
// RENDERIZAR CARD DE JOGO (PARA PÁGINA DE JOGOS)
// ========================================

function renderizarCardJogo(assunto, jogo, stats) {
  const concluido = stats && stats.vezesJogado > 0;
  
  return `
    <div class="jogo-card ${concluido ? 'concluido' : ''}">
      <div class="jogo-icone">${jogo.icone}</div>
      <h3>${jogo.nome}</h3>
      <p>${jogo.descricao}</p>
      ${stats ? `
        <div class="jogo-stats">
          <span>🏆 ${stats.melhorPontuacao}</span>
          <span>🎮 ${stats.vezesJogado}x</span>
          <span>💰 ${stats.xpTotal} XP</span>
        </div>
      ` : ''}
      <button onclick="abrirJogo('${jogo.arquivo}')">
        ${concluido ? 'Jogar Novamente' : 'Iniciar Jogo'}
      </button>
    </div>
  `;
}

// ========================================
// ABRIR JOGO DIRETAMENTE (POR ARQUIVO)
// ========================================

function abrirJogo(arquivo) {
  const urlJogo = `../../pages/jogos/${arquivo}`;
  const novaAba = window.open(urlJogo, '_blank', 'width=1200,height=800');
  
  if (!novaAba) {
    alert('⚠️ Habilite pop-ups para jogar!');
  }
}

// ========================================
// CRIAR PÁGINA DE LISTAGEM DE JOGOS
// ========================================

function criarPaginaJogos() {
  const jogos = listarJogosDisponiveis();
  const container = document.getElementById('jogos-container');
  
  if (!container) return;

  container.innerHTML = jogos.map(j => 
    renderizarCardJogo(j.assunto, jogosDisponiveis[j.assunto], j.estatisticas)
  ).join('');
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.pathname;
  
  // Se estiver em uma página de conteúdo, atualizar botão
  if (url.includes('/conteudo/')) {
    atualizarBotaoJogo();
  }
  
  // Se estiver na página de jogos, criar listagem
  if (url.includes('jogos.html')) {
    criarPaginaJogos();
  }
});

// Expor funções globalmente
window.carregarAtividade = carregarAtividade;
window.abrirJogo = abrirJogo;
window.salvarProgressoJogo = salvarProgressoJogo;

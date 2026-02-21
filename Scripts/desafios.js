// ========================================
// SISTEMA DE DESAFIOS - CORRIGIDO
// desafios.js - VERSÃO COMPLETA
// ========================================

// ========================================
// BANCO DE PERGUNTAS POR CURSO
// ========================================

const perguntasInformatica = [
  {
    pergunta: "Qual estrutura é usada para repetir blocos de código em Python?",
    alternativas: ["if/else", "switch/case", "for/while", "try/except"],
    correta: 2,
    xp: 30
  },
  {
    pergunta: "Qual comando é usado para imprimir na tela em Python?",
    alternativas: ["echo()", "print()", "mostrar()", "System.out.println()"],
    correta: 1,
    xp: 30
  },
  {
    pergunta: "Qual linguagem é usada com HTML para adicionar interatividade?",
    alternativas: ["Python", "JavaScript", "CSS", "SQL"],
    correta: 1,
    xp: 30
  },
  {
    pergunta: "O que significa SQL?",
    alternativas: [
      "Standard Query Language",
      "Structured Query Language",
      "Simple Question Language",
      "System Query Logic"
    ],
    correta: 1,
    xp: 30
  },
  {
    pergunta: "Qual destas práticas representa um código limpo?",
    alternativas: [
      "Variáveis com nomes curtos e genéricos",
      "Comentários para cada linha do código",
      "Funções pequenas e bem nomeadas",
      "Evitar o uso de funções"
    ],
    correta: 2,
    xp: 40
  },
  {
    pergunta: "Qual é a boa prática de segurança digital?",
    alternativas: [
      "Usar a mesma senha em todos os sites",
      "Compartilhar sua senha com pessoas confiáveis",
      "Utilizar autenticação de dois fatores",
      "Anotar sua senha em um papel"
    ],
    correta: 2,
    xp: 40
  }
];

const perguntasEletrotecnica = [
  {
    pergunta: "Qual a unidade de medida da corrente elétrica?",
    alternativas: ["Volt", "Ampere", "Ohm", "Watt"],
    correta: 1,
    xp: 30
  },
  {
    pergunta: "A Lei de Ohm relaciona:",
    alternativas: [
      "Tensão, corrente e resistência",
      "Potência, energia e tempo",
      "Voltagem, potência e corrente",
      "Resistência, capacitância e indutância"
    ],
    correta: 0,
    xp: 30
  },
  {
    pergunta: "Qual dispositivo protege circuitos contra sobrecarga?",
    alternativas: ["Interruptor", "Disjuntor", "Relé", "Capacitor"],
    correta: 1,
    xp: 30
  },
  {
    pergunta: "O transformador funciona baseado em:",
    alternativas: [
      "Efeito Joule",
      "Indução eletromagnética",
      "Efeito fotoelétrico",
      "Condução térmica"
    ],
    correta: 1,
    xp: 30
  },
  {
    pergunta: "Qual a norma que regulamenta segurança em instalações elétricas?",
    alternativas: ["NR-10", "NBR-5410", "NR-35", "ISO-9001"],
    correta: 0,
    xp: 40
  },
  {
    pergunta: "Em um circuito série, a corrente elétrica:",
    alternativas: [
      "É diferente em cada componente",
      "É a mesma em todos os componentes",
      "Só passa no primeiro componente",
      "Aumenta a cada componente"
    ],
    correta: 1,
    xp: 40
  },
  {
    pergunta: "A potência elétrica é medida em:",
    alternativas: ["Ampere", "Volt", "Watt", "Ohm"],
    correta: 2,
    xp: 30
  },
  {
    pergunta: "O que é aterramento elétrico?",
    alternativas: [
      "Conexão de um circuito à terra",
      "Isolamento de condutores",
      "Aumento de tensão",
      "Redução de corrente"
    ],
    correta: 0,
    xp: 35
  }
];

// ========================================
// OBTER PERGUNTAS DO CURSO DO USUÁRIO
// ========================================

const obterPerguntasDoCurso = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return [];
  
  return usuario.curso === "Informática" ? perguntasInformatica : perguntasEletrotecnica;
};

// ========================================
// DESAFIO DIÁRIO
// ========================================

const verificarDesafioDiario = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;
  
  const hoje = new Date().toDateString();
  const ultimaData = usuario.desafios.diario.ultimaData;
  
  if (ultimaData === hoje && usuario.desafios.diario.concluido) {
    return false;
  }
  
  if (ultimaData !== hoje) {
    usuario.desafios.diario.concluido = false;
    usuario.desafios.diario.ultimaData = hoje;
    atualizarUsuarioLogado(usuario);
  }
  
  return true;
};

const concluirDesafioDiario = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;
  
  usuario.desafios.diario.concluido = true;
  usuario.desafios.diario.ultimaData = new Date().toDateString();
  
  adicionarXP(50);
  atualizarDiasSeguidos();
  
  return atualizarUsuarioLogado(usuario);
};

// ========================================
// CONFIGURAR DESAFIO DIÁRIO
// ========================================

const configurarDesafioDiario = () => {
  const container = document.getElementById('conteudo-desafio');
  if (!container) {
    console.error('❌ Container do desafio diário não encontrado');
    return;
  }
  
  if (!verificarDesafioDiario()) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #4caf50;">
        <h2>✅ Desafio Diário Concluído!</h2>
        <p style="font-size: 1.2rem; margin-top: 20px;">
          Você já completou o desafio de hoje!<br>
          Volte amanhã para um novo desafio.
        </p>
        <button onclick="window.location.href='../Principal/Praticar.html'" style="
          margin-top: 20px;
          padding: 12px 24px;
          background: #1e88e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
        ">Voltar</button>
      </div>
    `;
    return;
  }
  
  const perguntas = obterPerguntasDoCurso();
  const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
  
  container.innerHTML = `
    <h2>${pergunta.pergunta}</h2>
    <ul class="alternativas">
      ${pergunta.alternativas.map((alt, index) => `
        <li><button onclick="responderDesafioDiario(${index}, ${pergunta.correta}, ${pergunta.xp})">${alt}</button></li>
      `).join('')}
    </ul>
    <p class="aviso">⚠️ Você tem apenas uma chance! Escolha com cuidado.</p>
  `;
};

window.responderDesafioDiario = (resposta, correta, xp) => {
  const container = document.getElementById('conteudo-desafio');
  const botoes = container.querySelectorAll('button');
  
  botoes.forEach(btn => btn.disabled = true);
  
  if (resposta === correta) {
    botoes[resposta].style.background = '#4caf50';
    
    concluirDesafioDiario();
    
    setTimeout(() => {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #4caf50;">
          <h2>✅ Resposta Correta!</h2>
          <p style="font-size: 1.2rem; margin-top: 20px;">
            Parabéns! Você ganhou ${xp} XP!<br>
            Continue assim e volte amanhã para mais.
          </p>
          <button onclick="window.location.href='../Principal/Praticar.html'" style="
            margin-top: 20px;
            padding: 12px 24px;
            background: #1e88e5;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
          ">Voltar</button>
        </div>
      `;
    }, 1000);
  } else {
    botoes[resposta].style.background = '#e53935';
    botoes[correta].style.background = '#4caf50';
    
    setTimeout(() => {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #e53935;">
          <h2>❌ Resposta Incorreta!</h2>
          <p style="font-size: 1.2rem; margin-top: 20px;">
            Não foi dessa vez!<br>
            Estude mais e tente novamente amanhã.
          </p>
          <button onclick="window.location.href='../Principal/Praticar.html'" style="
            margin-top: 20px;
            padding: 12px 24px;
            background: #1e88e5;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
          ">Voltar</button>
        </div>
      `;
    }, 1500);
  }
};

// ========================================
// MODO COMPETITIVO
// ========================================

let pontos1 = 0;
let pontos2 = 0;
let perguntaAtual = 0;
let perguntasCompetitivo = [];

const iniciarModoCompetitivo = () => {
  pontos1 = 0;
  pontos2 = 0;
  perguntaAtual = 0;
  
  const todasPerguntas = obterPerguntasDoCurso();
  perguntasCompetitivo = [];
  
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * todasPerguntas.length);
    perguntasCompetitivo.push(todasPerguntas[index]);
  }
  
  carregarPerguntaCompetitivo();
};

const carregarPerguntaCompetitivo = () => {
  if (perguntaAtual >= perguntasCompetitivo.length) {
    finalizarModoCompetitivo();
    return;
  }
  
  const pergunta = perguntasCompetitivo[perguntaAtual];
  const quizBox = document.getElementById('quiz-box');
  const btnProxima = document.getElementById('btn-proxima');
  const mensagem = document.getElementById('mensagem');
  
  if (!quizBox) return;
  
  document.getElementById('pontos1').textContent = pontos1;
  document.getElementById('pontos2').textContent = pontos2;
  
  if (mensagem) mensagem.textContent = '';
  if (btnProxima) btnProxima.style.display = 'none';
  
  quizBox.innerHTML = `
    <h2 id="pergunta">${pergunta.pergunta}</h2>
    <ul id="opcoes" class="alternativas">
      ${pergunta.alternativas.map((alt, index) => `
        <li><button onclick="responderCompetitivo(${index})">${alt}</button></li>
      `).join('')}
    </ul>
  `;
};

window.responderCompetitivo = (resposta) => {
  const pergunta = perguntasCompetitivo[perguntaAtual];
  const botoes = document.querySelectorAll('#opcoes button');
  const mensagem = document.getElementById('mensagem');
  const btnProxima = document.getElementById('btn-proxima');
  
  botoes.forEach(btn => btn.disabled = true);
  
  const jogador = Math.random() < 0.5 ? 1 : 2;
  
  if (resposta === pergunta.correta) {
    botoes[resposta].style.background = '#4caf50';
    
    if (jogador === 1) {
      pontos1 += 10;
      mensagem.textContent = '✅ Jogador 1 acertou e ganhou 10 pontos!';
    } else {
      pontos2 += 10;
      mensagem.textContent = '✅ Jogador 2 acertou e ganhou 10 pontos!';
    }
  } else {
    botoes[resposta].style.background = '#e53935';
    botoes[pergunta.correta].style.background = '#4caf50';
    mensagem.textContent = `❌ Jogador ${jogador} errou! A resposta correta estava destacada.`;
  }
  
  document.getElementById('pontos1').textContent = pontos1;
  document.getElementById('pontos2').textContent = pontos2;
  
  perguntaAtual++;
  
  if (btnProxima) {
    btnProxima.style.display = 'inline-block';
    btnProxima.onclick = carregarPerguntaCompetitivo;
  }
};

const finalizarModoCompetitivo = () => {
  const quizBox = document.getElementById('quiz-box');
  const mensagem = document.getElementById('mensagem');
  const btnProxima = document.getElementById('btn-proxima');
  const btnReiniciar = document.getElementById('btn-reiniciar');
  
  let resultado = '';
  
  if (pontos1 > pontos2) {
    resultado = '🥇 Jogador 1 venceu!';
  } else if (pontos2 > pontos1) {
    resultado = '🥇 Jogador 2 venceu!';
  } else {
    resultado = '🤝 Empate!';
  }
  
  if (quizBox) {
    quizBox.innerHTML = `
      <h2 style="text-align: center; color: #1e88e5;">Fim do Jogo!</h2>
      <p style="text-align: center; font-size: 1.5rem; margin: 20px 0;">${resultado}</p>
      <div style="text-align: center; font-size: 1.2rem;">
        <p>Jogador 1: ${pontos1} pontos</p>
        <p>Jogador 2: ${pontos2} pontos</p>
      </div>
    `;
  }
  
  if (mensagem) mensagem.textContent = '';
  if (btnProxima) btnProxima.style.display = 'none';
  
  if (btnReiniciar) {
    btnReiniciar.style.display = 'inline-block';
    btnReiniciar.onclick = iniciarModoCompetitivo;
  }
  
  const usuario = obterUsuarioLogado();
  if (usuario && pontos1 !== pontos2) {
    const vencedor = pontos1 > pontos2 ? 1 : 2;
    
    if (vencedor === 1) {
      usuario.desafios.competitivo.vitorias++;
      adicionarXP(100);
    } else {
      usuario.desafios.competitivo.derrotas++;
    }
    
    atualizarUsuarioLogado(usuario);
  }
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  if (!verificarAutenticacao()) return;
  
  const url = window.location.pathname;
  console.log('🎮 Página de desafios carregada:', url);
  
  // Desafio Diário
  if (url.includes('Diario.html')) {
    console.log('📅 Configurando desafio diário...');
    configurarDesafioDiario();
  }
  
  // Modo Competitivo
  if (url.includes('Competitivo.html')) {
    console.log('⚔️ Iniciando modo competitivo...');
    iniciarModoCompetitivo();
  }
});
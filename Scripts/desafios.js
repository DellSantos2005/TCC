// ========================================
// DESAFIOS.JS
// Depende de: utils.js
// ========================================

const perguntasInformatica = [
  { pergunta: 'Qual estrutura é usada para repetir blocos de código em Python?', alternativas: ['if/else','switch/case','for/while','try/except'], correta: 2, xp: 30 },
  { pergunta: 'Qual comando imprime na tela em Python?', alternativas: ['echo()','print()','mostrar()','System.out.println()'], correta: 1, xp: 30 },
  { pergunta: 'Qual linguagem adiciona interatividade ao HTML?', alternativas: ['Python','JavaScript','CSS','SQL'], correta: 1, xp: 30 },
  { pergunta: 'O que significa SQL?', alternativas: ['Standard Query Language','Structured Query Language','Simple Question Language','System Query Logic'], correta: 1, xp: 30 },
  { pergunta: 'O que representa código limpo?', alternativas: ['Variáveis curtas e genéricas','Comentários em cada linha','Funções pequenas e bem nomeadas','Evitar o uso de funções'], correta: 2, xp: 40 },
  { pergunta: 'Boa prática de segurança digital:', alternativas: ['Usar a mesma senha em tudo','Compartilhar senha com amigos','Usar autenticação de dois fatores','Anotar senha em papel'], correta: 2, xp: 40 },
  { pergunta: 'O que é uma variável em programação?', alternativas: ['Um tipo de loop','Um espaço para armazenar dados','Um operador matemático','Um arquivo de código'], correta: 1, xp: 30 },
  { pergunta: 'Qual componente é o "cérebro" do computador?', alternativas: ['HD','RAM','CPU','GPU'], correta: 2, xp: 30 },
];

const perguntasEletrotecnica = [
  { pergunta: 'Unidade de medida da corrente elétrica:', alternativas: ['Volt','Ampere','Ohm','Watt'], correta: 1, xp: 30 },
  { pergunta: 'A Lei de Ohm relaciona:', alternativas: ['Tensão, corrente e resistência','Potência, energia e tempo','Voltagem, potência e corrente','Resistência, capacitância e indutância'], correta: 0, xp: 30 },
  { pergunta: 'Dispositivo que protege contra sobrecarga:', alternativas: ['Interruptor','Disjuntor','Relé','Capacitor'], correta: 1, xp: 30 },
  { pergunta: 'O transformador funciona baseado em:', alternativas: ['Efeito Joule','Indução eletromagnética','Efeito fotoelétrico','Condução térmica'], correta: 1, xp: 30 },
  { pergunta: 'Norma de segurança em instalações elétricas:', alternativas: ['NR-10','NBR-5410','NR-35','ISO-9001'], correta: 0, xp: 40 },
  { pergunta: 'Em circuito série, a corrente elétrica:', alternativas: ['É diferente em cada componente','É a mesma em todos','Só passa no primeiro','Aumenta a cada componente'], correta: 1, xp: 40 },
  { pergunta: 'Potência elétrica é medida em:', alternativas: ['Ampere','Volt','Watt','Ohm'], correta: 2, xp: 30 },
  { pergunta: 'O que é aterramento elétrico?', alternativas: ['Conexão de um circuito à terra','Isolamento de condutores','Aumento de tensão','Redução de corrente'], correta: 0, xp: 35 },
];

const obterPerguntas = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return [];
  return usuario.curso === 'Informática' ? perguntasInformatica : perguntasEletrotecnica;
};

// ========================================
// DESAFIO DIÁRIO
// ========================================
const verificarDesafioDiario = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;
  const hoje = new Date().toDateString();
  if (usuario.desafios.diario.ultimaData !== hoje) {
    usuario.desafios.diario.concluido = false;
    usuario.desafios.diario.ultimaData = hoje;
    atualizarUsuarioLogado(usuario);
  }
  return !usuario.desafios.diario.concluido;
};

const configurarDesafioDiario = () => {
  const container = document.getElementById('conteudo-desafio');
  if (!container) return;

  if (!verificarDesafioDiario()) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:#4caf50;">
        <h2>✅ Desafio Diário Concluído!</h2>
        <p style="font-size:1.2rem;margin-top:20px;">Você já completou o desafio de hoje!<br>Volte amanhã para um novo desafio.</p>
        <button onclick="window.location.href='${BASE}/pages/Principal/Praticar.html'" style="margin-top:20px;padding:12px 24px;background:#1e88e5;color:white;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;">Voltar</button>
      </div>`;
    return;
  }

  const perguntas = obterPerguntas();
  const p = perguntas[Math.floor(Math.random() * perguntas.length)];

  container.innerHTML = `
    <h2>${p.pergunta}</h2>
    <ul class="alternativas">
      ${p.alternativas.map((alt, i) => `<li><button onclick="responderDiario(${i},${p.correta},${p.xp})">${alt}</button></li>`).join('')}
    </ul>
    <p class="aviso">⚠️ Você tem apenas uma chance!</p>`;
};

window.responderDiario = (resposta, correta, xp) => {
  const container = document.getElementById('conteudo-desafio');
  const botoes = container.querySelectorAll('button');
  botoes.forEach(b => b.disabled = true);

  if (resposta === correta) {
    botoes[resposta].style.background = '#4caf50';
    const usuario = obterUsuarioLogado();
    if (usuario) {
      usuario.desafios.diario.concluido = true;
      atualizarUsuarioLogado(usuario);
      adicionarXP(xp);
      atualizarDiasSeguidos();
    }
    setTimeout(() => {
      container.innerHTML = `<div style="text-align:center;padding:40px;color:#4caf50;"><h2>✅ Resposta Correta!</h2><p>+${xp} XP!</p><button onclick="window.location.href='${BASE}/pages/Principal/Praticar.html'" style="margin-top:20px;padding:12px 24px;background:#1e88e5;color:white;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;">Voltar</button></div>`;
    }, 800);
  } else {
    botoes[resposta].style.background = '#e53935';
    botoes[correta].style.background = '#4caf50';
    setTimeout(() => {
      container.innerHTML = `<div style="text-align:center;padding:40px;color:#e53935;"><h2>❌ Resposta Incorreta!</h2><p>Estude mais e tente amanhã!</p><button onclick="window.location.href='${BASE}/pages/Principal/Praticar.html'" style="margin-top:20px;padding:12px 24px;background:#1e88e5;color:white;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;">Voltar</button></div>`;
    }, 1500);
  }
};

// ========================================
// MODO COMPETITIVO
// ========================================
let _pontos1 = 0, _pontos2 = 0, _pergAtual = 0, _pergsComp = [];

const iniciarModoCompetitivo = () => {
  _pontos1 = 0; _pontos2 = 0; _pergAtual = 0;
  const todas = obterPerguntas();
  _pergsComp = Array.from({length:5}, () => todas[Math.floor(Math.random() * todas.length)]);
  carregarPerguntaComp();
};

const carregarPerguntaComp = () => {
  if (_pergAtual >= _pergsComp.length) { finalizarComp(); return; }
  const p = _pergsComp[_pergAtual];
  const quiz = document.getElementById('quiz-box');
  if (!quiz) return;

  document.getElementById('pontos1').textContent = _pontos1;
  document.getElementById('pontos2').textContent = _pontos2;

  const msg = document.getElementById('mensagem');
  if (msg) msg.textContent = '';
  const btnProx = document.getElementById('btn-proxima');
  if (btnProx) btnProx.style.display = 'none';

  quiz.innerHTML = `
    <h2>${p.pergunta}</h2>
    <ul id="opcoes" class="alternativas">
      ${p.alternativas.map((a,i) => `<li><button onclick="responderComp(${i})">${a}</button></li>`).join('')}
    </ul>`;
};

window.responderComp = (resposta) => {
  const p = _pergsComp[_pergAtual];
  const botoes = document.querySelectorAll('#opcoes button');
  botoes.forEach(b => b.disabled = true);
  const msg = document.getElementById('mensagem');
  const btnProx = document.getElementById('btn-proxima');
  const jogador = Math.random() < 0.5 ? 1 : 2;

  if (resposta === p.correta) {
    botoes[resposta].style.background = '#4caf50';
    if (jogador === 1) { _pontos1 += 10; if (msg) msg.textContent = '✅ Jogador 1 acertou! +10 pontos'; }
    else { _pontos2 += 10; if (msg) msg.textContent = '✅ Jogador 2 acertou! +10 pontos'; }
  } else {
    botoes[resposta].style.background = '#e53935';
    botoes[p.correta].style.background = '#4caf50';
    if (msg) msg.textContent = `❌ Jogador ${jogador} errou!`;
  }

  document.getElementById('pontos1').textContent = _pontos1;
  document.getElementById('pontos2').textContent = _pontos2;
  _pergAtual++;
  if (btnProx) { btnProx.style.display = 'inline-block'; btnProx.onclick = carregarPerguntaComp; }
};

const finalizarComp = () => {
  const quiz = document.getElementById('quiz-box');
  const resultado = _pontos1 > _pontos2 ? '🥇 Jogador 1 venceu!' : _pontos2 > _pontos1 ? '🥇 Jogador 2 venceu!' : '🤝 Empate!';
  if (quiz) quiz.innerHTML = `<h2 style="text-align:center;color:#1e88e5;">Fim do Jogo!</h2><p style="text-align:center;font-size:1.5rem;">${resultado}</p><div style="text-align:center;"><p>Jogador 1: ${_pontos1} pts</p><p>Jogador 2: ${_pontos2} pts</p></div>`;
  const btnProx = document.getElementById('btn-proxima'); if (btnProx) btnProx.style.display = 'none';
  const btnRei = document.getElementById('btn-reiniciar'); if (btnRei) { btnRei.style.display = 'inline-block'; btnRei.onclick = iniciarModoCompetitivo; }
  const usuario = obterUsuarioLogado();
  if (usuario && _pontos1 !== _pontos2) {
    if (_pontos1 > _pontos2) { usuario.desafios.competitivo.vitorias++; adicionarXP(100); }
    else usuario.desafios.competitivo.derrotas++;
    atualizarUsuarioLogado(usuario);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (!verificarAutenticacao()) return;
  const url = window.location.pathname;
  if (url.includes('Diario')) configurarDesafioDiario();
  if (url.includes('Competitivo')) iniciarModoCompetitivo();
});

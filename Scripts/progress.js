// ========================================
// PROGRESS.JS - SISTEMA DE PROGRESSO
// Depende de: utils.js
// ========================================

// ========================================
// MAPA DE URL → {ano, disciplina, assunto}
// ========================================
const MAPA_URL = [
  // TI 1ano - Informática Básica
  { match: 'IntroducaoComputador',  ano: '1ano', disciplina: 'informatica-basica',      assunto: 'IntroducaoComputador' },
  { match: 'sistemas-operacionais', ano: '1ano', disciplina: 'informatica-basica',      assunto: 'sistemas-operacionais' },
  { match: 'pacote-office',         ano: '1ano', disciplina: 'informatica-basica',      assunto: 'pacote-office' },
  { match: 'internet-seguranca',    ano: '1ano', disciplina: 'informatica-basica',      assunto: 'internet-seguranca' },
  // TI 1ano - Lógica
  { match: 'VariaveisTiposDados',     ano: '1ano', disciplina: 'LogicaProgramacao', assunto: 'VariaveisTiposDados' },
  { match: 'estruturas-condicionais', ano: '1ano', disciplina: 'LogicaProgramacao', assunto: 'estruturas-condicionais' },
  { match: 'lacos-repeticao',         ano: '1ano', disciplina: 'LogicaProgramacao', assunto: 'lacos-repeticao' },
  { match: 'funcoes',                 ano: '1ano', disciplina: 'LogicaProgramacao', assunto: 'funcoes' },
  // TI 2ano - BD
  { match: 'conceitos-banco-dados', ano: '2ano', disciplina: 'banco-de-dados-1',        assunto: 'conceitos-banco-dados' },
  { match: 'modelo-relacional',     ano: '2ano', disciplina: 'banco-de-dados-1',        assunto: 'modelo-relacional' },
  { match: 'linguagem-sql',         ano: '2ano', disciplina: 'banco-de-dados-1',        assunto: 'linguagem-sql' },
  { match: 'normalizacao',          ano: '2ano', disciplina: 'banco-de-dados-1',        assunto: 'normalizacao' },
  // TI 2ano - LP
  { match: 'sintaxe-variaveis', ano: '2ano', disciplina: 'linguagem-programacao-1', assunto: 'sintaxe-variaveis' },
  { match: 'decisao',           ano: '2ano', disciplina: 'linguagem-programacao-1', assunto: 'decisao' },
  { match: 'vetores-matrizes',  ano: '2ano', disciplina: 'linguagem-programacao-1', assunto: 'vetores-matrizes' },
  // Eletro 1ano - Desenho
  { match: 'Normas-Convencoes',   ano: '1ano', disciplina: 'desenho-tecnico', assunto: 'Normas-Convencoes' },
  { match: 'simbologia-eletrica', ano: '1ano', disciplina: 'desenho-tecnico', assunto: 'simbologia-eletrica' },
  { match: 'plantas-diagramas',   ano: '1ano', disciplina: 'desenho-tecnico', assunto: 'plantas-diagramas' },
  { match: 'projeto-instalacao',  ano: '1ano', disciplina: 'desenho-tecnico', assunto: 'projeto-instalacao' },
  // Eletro 1ano - Fundamentos
  { match: 'Carga-Corrente',   ano: '1ano', disciplina: 'fundamentos-eletricidade', assunto: 'Carga-Corrente' },
  { match: 'tensao-potencial', ano: '1ano', disciplina: 'fundamentos-eletricidade', assunto: 'tensao-potencial' },
  { match: 'resistencia-ohm',  ano: '1ano', disciplina: 'fundamentos-eletricidade', assunto: 'resistencia-ohm' },
  { match: 'circuitos-basicos',ano: '1ano', disciplina: 'fundamentos-eletricidade', assunto: 'circuitos-basicos' },
  // Eletro 2ano - Instalações
  { match: 'circuitos-iluminacao',  ano: '2ano', disciplina: 'instalacoes-eletricas-1', assunto: 'circuitos-iluminacao' },
  { match: 'Tomadas-Disjuntores',   ano: '2ano', disciplina: 'instalacoes-eletricas-1', assunto: 'Tomadas-Disjuntores' },
  { match: 'Calculo-Carga',         ano: '2ano', disciplina: 'instalacoes-eletricas-1', assunto: 'Calculo-Carga' },
  { match: 'Dimensionamento-Cabos', ano: '2ano', disciplina: 'instalacoes-eletricas-1', assunto: 'Dimensionamento-Cabos' },
  // Eletro 2ano - Máquinas
  { match: 'motores-eletricos',      ano: '2ano', disciplina: 'maquinas-eletricas', assunto: 'motores-eletricos' },
  { match: 'Transformadores',        ano: '2ano', disciplina: 'maquinas-eletricas', assunto: 'Transformadores' },
  { match: 'Equipamentos-Protecao',  ano: '2ano', disciplina: 'maquinas-eletricas', assunto: 'Equipamentos-Protecao' },
  { match: 'instalacoes-industriais',ano: '2ano', disciplina: 'maquinas-eletricas', assunto: 'instalacoes-industriais' },
];

// Detecta o contexto atual pela URL
const detectarContexto = () => {
  const url = decodeURIComponent(window.location.pathname);
  for (const item of MAPA_URL) {
    if (url.includes(item.match)) return item;
  }
  return null;
};

// ========================================
// ATUALIZAR INTERFACE DE ASSUNTOS
// ========================================
const atualizarInterfaceAssuntos = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;

  const ctx = detectarContexto();
  if (!ctx) { console.warn('Contexto não identificado para:', window.location.pathname); return; }

  const { ano, disciplina } = ctx;
  const progDisc = usuario.progresso[ano]?.disciplinas[disciplina];
  if (!progDisc) return;

  const assuntos = progDisc.assuntos;
  const nomes = Object.keys(assuntos);

  nomes.forEach((nome, idx) => {
    const el = document.getElementById(nome);
    if (!el) return;
    const btn = el.querySelector('button');
    if (!btn) return;

    const anterior = idx === 0 ? true : assuntos[nomes[idx - 1]].concluido;

    if (!anterior) {
      el.classList.add('bloqueado');
      btn.disabled = true;
      btn.textContent = '🔒 Bloqueado';
      btn.style.cssText = 'background:#777;color:#aaa;cursor:not-allowed;';
    } else if (assuntos[nome].concluido) {
      el.classList.remove('bloqueado');
      btn.disabled = false;
      btn.textContent = 'Revisar ✅';
      btn.style.cssText = 'background:#4caf50;color:white;cursor:pointer;';
      el.style.borderLeft = '5px solid #4caf50';
    } else {
      el.classList.remove('bloqueado');
      btn.disabled = false;
      btn.textContent = 'Estudar';
      btn.style.cssText = 'background:#1e88e5;color:white;cursor:pointer;';
    }
  });
};

// ========================================
// CONCLUIR ASSUNTO ATUAL
// ========================================
window.concluirAssuntoAtual = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) { alert('Erro: usuário não encontrado!'); return; }

  const ctx = detectarContexto();
  if (!ctx) {
    alert('Erro: não foi possível identificar o assunto.\nURL: ' + window.location.pathname);
    return;
  }

  const { ano, disciplina, assunto } = ctx;
  const progAno  = usuario.progresso[ano];
  const progDisc = progAno?.disciplinas[disciplina];
  const progAss  = progDisc?.assuntos[assunto];

  if (!progAss) {
    alert(`Erro: assunto "${assunto}" não encontrado na estrutura do usuário.`);
    return;
  }

  if (progAss.concluido) {
    alert('ℹ️ Você já concluiu este assunto!');
    window.history.back();
    return;
  }

  // Concluir
  progAss.concluido = true;
  progAss.xp = 50;
  const nivelAntes = usuario.nivel;
  usuario.xp += 50;
  usuario.nivel = calcularNivel(usuario.xp);
  const levelUp = usuario.nivel > nivelAntes;

  // Verificar conclusão de disciplina
  const todosAssuntos = Object.values(progDisc.assuntos);
  const discConcluida = todosAssuntos.every(a => a.concluido);
  let proxDiscDesbloqueada = null;
  let anoConcluido = false;
  let bonus = 0;

  if (discConcluida) {
    progDisc.concluido = true;
    const discs = Object.keys(progAno.disciplinas);
    const idx = discs.indexOf(disciplina);
    if (idx < discs.length - 1) {
      proxDiscDesbloqueada = discs[idx + 1];
      progAno.disciplinas[proxDiscDesbloqueada].liberado = true;
    } else {
      // Última disciplina do ano
      const todasDiscs = Object.values(progAno.disciplinas);
      if (todasDiscs.every(d => d.concluido)) {
        anoConcluido = true;
        if (ano === '1ano' && !usuario.progresso['2ano'].liberado) {
          usuario.progresso['2ano'].liberado = true;
          bonus = 200;
          usuario.xp += bonus;
          usuario.nivel = calcularNivel(usuario.xp);
        }
      }
    }
  }

  atualizarUsuarioLogado(usuario);

  // Mensagem
  let msg = `✅ Assunto concluído!\n\n💰 +50 XP\n⭐ Nível ${usuario.nivel}\n💯 Total: ${usuario.xp} XP`;
  if (levelUp) msg += `\n\n🎉 LEVEL UP! Você chegou ao nível ${usuario.nivel}!`;
  if (discConcluida && proxDiscDesbloqueada) msg += `\n\n🎓 Disciplina concluída!\n🔓 Nova disciplina desbloqueada!`;
  if (anoConcluido && ano === '1ano') msg += `\n\n🏆 PARABÉNS! Você completou o 1º Ano!\n🔓 2º Ano desbloqueado!\n💎 +200 XP bônus!`;
  if (anoConcluido && ano === '2ano') msg += `\n\n🏆 PARABÉNS! Você completou o 2º Ano!`;

  alert(msg);
  window.history.back();
};

// ========================================
// ATUALIZAR HOME
// ========================================
const atualizarInterfaceHome = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;

  // Nome do curso
  const el = document.getElementById('nome-curso');
  if (el) el.textContent = usuario.curso;

  // Botão 1º Ano
  const btn1 = document.getElementById('btn-1ano');
  if (btn1) {
    btn1.disabled = false;
    const disc1 = Object.values(usuario.progresso['1ano'].disciplinas);
    if (disc1.every(d => d.concluido)) {
      btn1.innerHTML = '1º ANO ✅';
      btn1.style.background = '#4caf50';
    }
    btn1.onclick = () => {
      const path = usuario.curso === 'Informática'
        ? BASE + '/pages/conteudo/TI/1ano/1ano.html'
        : BASE + '/pages/conteudo/Eletro/1ano/1ano.html';
      window.location.href = path;
    };
  }

  // Botão 2º Ano
  const btn2 = document.getElementById('btn-2ano');
  if (btn2) {
    if (usuario.progresso['2ano']?.liberado) {
      btn2.classList.remove('bloqueado');
      btn2.disabled = false;
      const disc2 = Object.values(usuario.progresso['2ano'].disciplinas);
      btn2.innerHTML = disc2.every(d => d.concluido) ? '2º ANO ✅' : '2º ANO';
      if (disc2.every(d => d.concluido)) btn2.style.background = '#4caf50';
      btn2.onclick = () => {
        const path = usuario.curso === 'Informática'
          ? BASE + '/pages/conteudo/TI/2ano/2ano.html'
          : BASE + '/pages/conteudo/Eletro/2ano/2ano.html';
        window.location.href = path;
      };
    } else {
      btn2.classList.add('bloqueado');
      btn2.disabled = true;
      btn2.innerHTML = '2º ANO 🔒';
    }
  }
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  if (!verificarAutenticacao()) return;

  const url = window.location.pathname;

  if (url.includes('Home.html')) {
    atualizarInterfaceHome();
  } else if (detectarContexto()) {
    // Página de lista de assuntos (informatica-basica.html, etc)
    const ctx = detectarContexto();
    if (!ctx.assunto) atualizarInterfaceAssuntos();
    // Para páginas de disciplina (lista de assuntos)
    atualizarInterfaceAssuntos();
  }
});

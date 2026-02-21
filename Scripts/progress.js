// ========================================
// SISTEMA DE PROGRESSO E DESBLOQUEIO
// progress.js - VERSÃO CORRIGIDA COM DEBUG AVANÇADO
// ========================================

// ========================================
// ATUALIZAR INTERFACE (PÁGINAS DE CONTEÚDO)
// ========================================

const atualizarInterfaceAssuntos = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    console.error('❌ Usuário não encontrado');
    return;
  }
  
  const url = window.location.pathname;
  let ano, disciplina;
  
  console.log('🔍 URL completa:', url);
  
  // Identificar ano
  if (url.includes('1ano') || url.includes('1%C2%BAano') || url.includes('1%20ano')) {
    ano = "1ano";
  } else if (url.includes('2ano') || url.includes('2%C2%BAano') || url.includes('2%20ano')) {
    ano = "2ano";
  }
  
  // Identificar disciplina
  // TI - 1º Ano
  if (url.includes('informatica-basica') || url.includes('Informatica-basica')) {
    disciplina = "informatica-basica";
  } else if (url.includes('LogicaProgramacao')) {
    disciplina = "LogicaProgramacao";
  }
  // TI - 2º Ano
  else if (url.includes('banco-de-dados-1')) {
    disciplina = "banco-de-dados-1";
  } else if (url.includes('linguagem-programacao-1')) {
    disciplina = "linguagem-programacao-1";
  }
  // Eletro - 1º Ano
  else if (url.includes('desenho-tecnico')) {
    disciplina = "desenho-tecnico";
  } else if (url.includes('fundamentos-eletricidade')) {
    disciplina = "fundamentos-eletricidade";
  }
  // Eletro - 2º Ano
  else if (url.includes('instalacoes-eletricas-1')) {
    disciplina = "instalacoes-eletricas-1";
  } else if (url.includes('maquinas-eletricas')) {
    disciplina = "maquinas-eletricas";
  }
  
  console.log('📍 Contexto:', { ano, disciplina });
  
  if (!ano || !disciplina) {
    console.warn('⚠️ Não foi possível identificar ano/disciplina');
    return;
  }
  
  // Verificar se o 2º ano está desbloqueado
  if (ano === "2ano" && !usuario.progresso["2ano"].liberado) {
    console.warn('⚠️ 2º ano não está desbloqueado ainda');
    alert('⚠️ Complete todas as disciplinas do 1º ano para desbloquear o 2º ano!');
    return;
  }
  
  const assuntos = usuario.progresso[ano]?.disciplinas[disciplina]?.assuntos;
  if (!assuntos) {
    console.error('❌ Assuntos não encontrados');
    console.error('Estrutura do ano:', usuario.progresso[ano]);
    return;
  }
  
  const nomesAssuntos = Object.keys(assuntos);
  
  nomesAssuntos.forEach((nomeAssunto, index) => {
    const assuntoData = assuntos[nomeAssunto];
    const elemento = document.getElementById(nomeAssunto);
    const botao = elemento?.querySelector('button');
    
    if (elemento && botao) {
      const desbloqueado = index === 0 || assuntos[nomesAssuntos[index - 1]].concluido;
      
      elemento.classList.remove('bloqueado');
      
      if (desbloqueado) {
        botao.disabled = false;
        botao.style.cursor = 'pointer';
        
        if (assuntoData.concluido) {
          botao.textContent = "Revisar ✅";
          botao.style.background = '#4caf50';
          botao.style.color = 'white';
          elemento.style.borderLeft = "5px solid #4caf50";
          elemento.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
          
          const h3 = elemento.querySelector('h3');
          if (h3 && !h3.querySelector('.check-icon')) {
            const check = document.createElement('span');
            check.className = 'check-icon';
            check.innerHTML = ' ✅';
            h3.appendChild(check);
          }
        } else {
          botao.textContent = "Estudar";
          botao.style.background = '#1e88e5';
          botao.style.color = 'white';
          elemento.style.borderLeft = "";
          elemento.style.backgroundColor = '';
        }
      } else {
        elemento.classList.add('bloqueado');
        botao.disabled = true;
        botao.textContent = "Bloqueado 🔒";
        botao.style.background = '#999';
        botao.style.color = '#666';
        botao.style.cursor = 'not-allowed';
        elemento.style.borderLeft = "";
        elemento.style.backgroundColor = '';
      }
    }
  });
};

// ========================================
// FUNÇÃO "CONCLUIR E VOLTAR"
// ========================================

window.concluirAssuntoAtual = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    alert("Erro: Usuário não encontrado!");
    return;
  }
  
  const url = window.location.pathname;
  let ano, disciplina, assunto;
  
  console.log('🔍 URL completa:', url);
  console.log('📊 Estrutura do usuário:', usuario.progresso);
  
  // Identificar ano
  if (url.includes('1%20ano') || url.includes('1 ano') || url.includes('1ano')) {
    ano = "1ano";
  } else if (url.includes('2%20ano') || url.includes('2 ano') || url.includes('2ano')) {
    ano = "2ano";
  }
  
  // ========== MAPEAMENTO COMPLETO ==========
  
  // TI - 1º Ano - Informática Básica
  if (url.includes('IntroducaoComputador')) {
    disciplina = "informatica-basica";
    assunto = "IntroducaoComputador";
  } else if (url.includes('sistemas-operacionais')) {
    disciplina = "informatica-basica";
    assunto = "sistemas-operacionais";
  } else if (url.includes('pacote-office')) {
    disciplina = "informatica-basica";
    assunto = "pacote-office";
  } else if (url.includes('internet-seguranca')) {
    disciplina = "informatica-basica";
    assunto = "internet-seguranca";
  }
  
  // TI - 1º Ano - Lógica de Programação
  else if (url.includes('VariaveisTiposDados')) {
    disciplina = "LogicaProgramacao";
    assunto = "VariaveisTiposDados";
  } else if (url.includes('estruturas-condicionais')) {
    disciplina = "LogicaProgramacao";
    assunto = "estruturas-condicionais";
  } else if (url.includes('lacos-repeticao')) {
    disciplina = "LogicaProgramacao";
    assunto = "lacos-repeticao";
  } else if (url.includes('funcoes')) {
    disciplina = "LogicaProgramacao";
    assunto = "funcoes";
  }
  
  // TI - 2º Ano - Banco de Dados
  else if (url.includes('conceitos-banco-dados')) {
    disciplina = "banco-de-dados-1";
    assunto = "conceitos-banco-dados";
  } else if (url.includes('modelo-relacional')) {
    disciplina = "banco-de-dados-1";
    assunto = "modelo-relacional";
  } else if (url.includes('linguagem-sql')) {
    disciplina = "banco-de-dados-1";
    assunto = "linguagem-sql";
  } else if (url.includes('normalizacao')) {
    disciplina = "banco-de-dados-1";
    assunto = "normalizacao";
  }
  
  // TI - 2º Ano - Linguagem de Programação
  else if (url.includes('sintaxe-variaveis')) {
    disciplina = "linguagem-programacao-1";
    assunto = "sintaxe-variaveis";
  } else if (url.includes('decisao')) {
    disciplina = "linguagem-programacao-1";
    assunto = "decisao";
  } else if (url.includes('repeticao') && !url.includes('lacos')) {
    disciplina = "linguagem-programacao-1";
    assunto = "repeticao";
  } else if (url.includes('vetores-matrizes')) {
    disciplina = "linguagem-programacao-1";
    assunto = "vetores-matrizes";
  }
  
  // ELETRO - 1º Ano - Desenho Técnico
  else if (url.includes('Normas-Convencoes')) {
    disciplina = "desenho-tecnico";
    assunto = "Normas-Convencoes";
  } else if (url.includes('simbologia-eletrica')) {
    disciplina = "desenho-tecnico";
    assunto = "simbologia-eletrica";
  } else if (url.includes('plantas-diagramas')) {
    disciplina = "desenho-tecnico";
    assunto = "plantas-diagramas";
  } else if (url.includes('projeto-instalacao')) {
    disciplina = "desenho-tecnico";
    assunto = "projeto-instalacao";
  }
  
  // ELETRO - 1º Ano - Fundamentos de Eletricidade
  else if (url.includes('Carga-Corrente')) {
    disciplina = "fundamentos-eletricidade";
    assunto = "Carga-Corrente";
  } else if (url.includes('tensao-potencial')) {
    disciplina = "fundamentos-eletricidade";
    assunto = "tensao-potencial";
  } else if (url.includes('resistencia-ohm')) {
    disciplina = "fundamentos-eletricidade";
    assunto = "resistencia-ohm";
  } else if (url.includes('circuitos-basicos')) {
    disciplina = "fundamentos-eletricidade";
    assunto = "circuitos-basicos";
  }
  
  // ELETRO - 2º Ano - Instalações Elétricas
  else if (url.includes('circuitos-iluminacao')) {
    disciplina = "instalacoes-eletricas-1";
    assunto = "circuitos-iluminacao";
  } else if (url.includes('Tomadas-Disjuntores')) {
    disciplina = "instalacoes-eletricas-1";
    assunto = "Tomadas-Disjuntores";
  } else if (url.includes('Calculo-Carga')) {
    disciplina = "instalacoes-eletricas-1";
    assunto = "Calculo-Carga";
  } else if (url.includes('Dimensionamento-Cabos')) {
    disciplina = "instalacoes-eletricas-1";
    assunto = "Dimensionamento-Cabos";
  }
  
  // ELETRO - 2º Ano - Máquinas Elétricas
  else if (url.includes('motores-eletricos')) {
    disciplina = "maquinas-eletricas";
    assunto = "motores-eletricos";
  } else if (url.includes('Transformadores')) {
    disciplina = "maquinas-eletricas";
    assunto = "Transformadores";
  } else if (url.includes('Equipamentos-Protecao')) {
    disciplina = "maquinas-eletricas";
    assunto = "Equipamentos-Protecao";
  } else if (url.includes('instalacoes-industriais')) {
    disciplina = "maquinas-eletricas";
    assunto = "instalacoes-industriais";
  }
  
  console.log('📍 Identificado:', { ano, disciplina, assunto });
  
  if (!ano || !disciplina || !assunto) {
    alert(`❌ Erro ao identificar o assunto.\n\nURL: ${url}\nAno: ${ano}\nDisciplina: ${disciplina}\nAssunto: ${assunto}`);
    return;
  }
  
  // Verificar estrutura
  if (!usuario.progresso[ano]) {
    alert(`❌ Ano "${ano}" não encontrado!\n\nAnos disponíveis: ${Object.keys(usuario.progresso).join(', ')}`);
    console.error('Estrutura progresso:', usuario.progresso);
    return;
  }
  
  console.log('✅ Ano encontrado:', ano);
  console.log('📚 Disciplinas do ano:', Object.keys(usuario.progresso[ano].disciplinas));
  
  if (!usuario.progresso[ano].disciplinas[disciplina]) {
    alert(`❌ Disciplina "${disciplina}" não encontrada!\n\nDisciplinas do ${ano}: ${Object.keys(usuario.progresso[ano].disciplinas).join(', ')}`);
    console.error('Disciplinas disponíveis:', usuario.progresso[ano].disciplinas);
    return;
  }
  
  console.log('✅ Disciplina encontrada:', disciplina);
  console.log('📝 Assuntos da disciplina:', Object.keys(usuario.progresso[ano].disciplinas[disciplina].assuntos));
  
  if (!usuario.progresso[ano].disciplinas[disciplina].assuntos[assunto]) {
    alert(`❌ Assunto "${assunto}" não encontrado!\n\nAssuntos disponíveis: ${Object.keys(usuario.progresso[ano].disciplinas[disciplina].assuntos).join(', ')}`);
    console.error('Assuntos disponíveis:', usuario.progresso[ano].disciplinas[disciplina].assuntos);
    return;
  }
  
  const assuntoData = usuario.progresso[ano].disciplinas[disciplina].assuntos[assunto];
  
  if (assuntoData.concluido) {
    alert("ℹ️ Você já concluiu este assunto!");
    window.history.back();
    return;
  }
  
  // CONCLUIR
  assuntoData.concluido = true;
  assuntoData.xp = 50;
  
  const nivelAntes = usuario.nivel;
  usuario.xp += 50;
  usuario.nivel = Math.floor(usuario.xp / 100) + 1;
  
  const levelUp = usuario.nivel > nivelAntes;
  
  console.log('✅ Concluído:', assunto);
  console.log('💰 XP:', usuario.xp, '| Nível:', usuario.nivel);
  
  if (levelUp) {
    console.log(`🎉 LEVEL UP! ${nivelAntes} → ${usuario.nivel}`);
  }
  
  // Verificar se concluiu disciplina
  const todosAssuntos = usuario.progresso[ano].disciplinas[disciplina].assuntos;
  const todosConcluidos = Object.values(todosAssuntos).every(a => a.concluido);
  
  if (todosConcluidos) {
    console.log('🎓 Disciplina concluída:', disciplina);
    usuario.progresso[ano].disciplinas[disciplina].concluido = true;
    
    // Desbloquear próxima disciplina
    const disciplinas = Object.keys(usuario.progresso[ano].disciplinas);
    const indice = disciplinas.indexOf(disciplina);
    
    if (indice < disciplinas.length - 1) {
      const proxima = disciplinas[indice + 1];
      usuario.progresso[ano].disciplinas[proxima].liberado = true;
      console.log('🔓 Próxima disciplina desbloqueada:', proxima);
    } else {
      // ÚLTIMA DISCIPLINA DO ANO
      console.log('🎯 Última disciplina do ano!');
      const todasDisciplinasAno = Object.values(usuario.progresso[ano].disciplinas);
      const anoCompleto = todasDisciplinasAno.every(d => d.concluido);
      
      if (anoCompleto && ano === "1ano") {
        console.log('🎉 1º ANO COMPLETO! Desbloqueando 2º ano...');
        usuario.progresso["2ano"].liberado = true;
        usuario.xp += 200;
        usuario.nivel = Math.floor(usuario.xp / 100) + 1;
        console.log('✅ 2º ano DESBLOQUEADO! +200 XP');
      }
    }
  }
  
  const salvou = atualizarUsuarioLogado(usuario);
  console.log('💾 Salvou:', salvou);
  
  if (salvou) {
    let msg = `✅ Assunto concluído!\n\n💰 +50 XP\n⭐ Nível ${usuario.nivel}\n💯 Total: ${usuario.xp} XP`;
    
    if (levelUp) {
      msg += `\n\n🎉 LEVEL UP! Nível ${usuario.nivel}!`;
    }
    
    if (todosConcluidos) {
      const todasDisciplinasAno = Object.values(usuario.progresso[ano].disciplinas);
      const anoCompleto = todasDisciplinasAno.every(d => d.concluido);
      
      if (anoCompleto) {
        if (ano === "2ano") {
          msg += `\n\n🎓 DISCIPLINA CONCLUÍDA!\n\n🎊 PARABÉNS! Você completou TODO o ${ano}!\n\n📚 O 3º e 4º anos estão em desenvolvimento!`;
        } else {
          msg += `\n\n🎓 DISCIPLINA CONCLUÍDA!\n\n🎊 PARABÉNS! Você completou TODO o ${ano}!\n🔓 2º ANO DESBLOQUEADO!\n💎 +200 XP BÔNUS!`;
        }
      } else {
        msg += `\n\n🎓 DISCIPLINA CONCLUÍDA!\n🔓 Próxima disciplina desbloqueada!`;
      }
    }
    
    alert(msg);
    window.history.back();
  } else {
    alert("❌ Erro ao salvar. Tente novamente.");
  }
};

// ========================================
// ATUALIZAR HOME
// ========================================

const atualizarInterfaceHome = () => {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  
  const nomeCurso = document.getElementById('nome-curso');
  if (nomeCurso) nomeCurso.textContent = usuario.curso;
  
  const btn1Ano = document.getElementById('btn-1ano');
  if (btn1Ano && usuario.progresso["1ano"].liberado) {
    btn1Ano.classList.remove('bloqueado');
    btn1Ano.disabled = false;
    
    const disciplinas = Object.values(usuario.progresso["1ano"].disciplinas);
    if (disciplinas.every(d => d.concluido)) {
      btn1Ano.innerHTML = '1º ANO ✅';
      btn1Ano.style.background = '#4caf50';
    }
    
    btn1Ano.onclick = () => {
      const path = usuario.curso === "Informática" ? 
        '../conteudo/TI/1 ano/1ºano.html' : 
        '../conteudo/Eletro/1 ano/1ºano.html';
      window.location.href = path;
    };
  }
  
  const btn2Ano = document.getElementById('btn-2ano');
  if (btn2Ano) {
    btn2Ano.style.display = 'flex';
    
    if (usuario.progresso["2ano"]?.liberado) {
      btn2Ano.classList.remove('bloqueado');
      btn2Ano.disabled = false;
      btn2Ano.innerHTML = '2º ANO';
      
      const disciplinas2Ano = Object.values(usuario.progresso["2ano"].disciplinas || {});
      if (disciplinas2Ano.length > 0 && disciplinas2Ano.every(d => d.concluido)) {
        btn2Ano.innerHTML = '2º ANO ✅';
        btn2Ano.style.background = '#4caf50';
      }
      
      btn2Ano.onclick = () => {
        const path = usuario.curso === "Informática" ? 
          '../conteudo/TI/2 ano/2ºano.html' : 
          '../conteudo/Eletro/2 ano/2ºano.html';
        window.location.href = path;
      };
    } else {
      btn2Ano.classList.add('bloqueado');
      btn2Ano.disabled = true;
      
      const disciplinas = Object.values(usuario.progresso["1ano"].disciplinas);
      const concluidas = disciplinas.filter(d => d.concluido).length;
      const total = disciplinas.length;
      
      btn2Ano.innerHTML = `2º ANO <img src="https://img.icons8.com/ios-filled/50/lock-2.png" alt="🔒" style="width: 30px; height: 30px; margin-left: 10px;">`;
      
      if (concluidas > 0) {
        const img = btn2Ano.querySelector('img');
        if (img) img.insertAdjacentHTML('afterend', ` <span style="font-size: 0.9rem;">(${concluidas}/${total})</span>`);
      }
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
  } else if (url.includes('informatica-basica') || url.includes('LogicaProgramacao') ||
             url.includes('desenho-tecnico') || url.includes('fundamentos-eletricidade') ||
             url.includes('banco-de-dados-1') || url.includes('linguagem-programacao-1') ||
             url.includes('instalacoes-eletricas-1') || url.includes('maquinas-eletricas')) {
    atualizarInterfaceAssuntos();
  }
});
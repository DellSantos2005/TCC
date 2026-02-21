// ========================================
// SISTEMA DE PERFIL - CORRIGIDO
// perfil.js
// ========================================

// ========================================
// CARREGAR DADOS DO PERFIL
// ========================================

const carregarDadosPerfil = () => {
    console.log('📊 Carregando dados do perfil...');
    
    const usuario = obterUsuarioLogado();
    if (!usuario) {
        console.error('❌ Usuário não encontrado');
        return;
    }
    
    console.log('✅ Usuário encontrado:', usuario);
    
    // Nome do usuário (formatar: joao.silva → João Silva)
    const nomeElement = document.getElementById('nome-usuario');
    if (nomeElement) {
        const nomeFormatado = usuario.usuario
            .split('.')
            .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
            .join(' ');
        nomeElement.textContent = nomeFormatado;
        console.log('✅ Nome atualizado:', nomeFormatado);
    }
    
    // Nickname (usuário)
    const nicknameElement = document.getElementById('nickname-usuario');
    if (nicknameElement) {
        nicknameElement.textContent = `@${usuario.usuario}`;
        console.log('✅ Nickname atualizado:', `@${usuario.usuario}`);
    }
    
    // Primeiro login
    const primeiroLoginElement = document.getElementById('primeiro-login');
    if (primeiroLoginElement) {
        primeiroLoginElement.textContent = `Primeiro login: ${usuario.primeiroLogin}`;
        console.log('✅ Primeiro login atualizado:', usuario.primeiroLogin);
    }
    
    // Dias seguidos
    const diasSeguidosElement = document.getElementById('dias-seguidos');
    if (diasSeguidosElement) {
        diasSeguidosElement.textContent = usuario.estatisticas.diasSeguidos;
        console.log('✅ Dias seguidos atualizado:', usuario.estatisticas.diasSeguidos);
    }
    
    // Total de XP
    const xpTotalElement = document.getElementById('xp-total');
    if (xpTotalElement) {
        xpTotalElement.textContent = `${usuario.xp} XP`;
        console.log('✅ XP atualizado:', usuario.xp);
    }
    
    // Nível da conta
    const nivelElement = document.getElementById('nivel-usuario');
    if (nivelElement) {
        nivelElement.textContent = `Nível ${usuario.nivel}`;
        console.log('✅ Nível atualizado:', usuario.nivel);
    }
    
    // Badge do curso (atualizar com pequeno delay para garantir que o elemento existe)
    setTimeout(() => {
        const badge = document.getElementById('curso-badge');
        if (badge) {
            const icon = badge.querySelector('.icon');
            const text = badge.querySelector('.text');
            
            if (icon && text) {
                if (usuario.curso === 'Informática') {
                    icon.textContent = '💻';
                    text.textContent = 'Informática';
                    badge.style.background = 'rgba(30, 136, 229, 0.9)';
                    console.log('✅ Badge atualizado: Informática 💻');
                } else if (usuario.curso === 'Eletrotécnica') {
                    icon.textContent = '⚡';
                    text.textContent = 'Eletrotécnica';
                    badge.style.background = 'rgba(255, 152, 0, 0.9)';
                    console.log('✅ Badge atualizado: Eletrotécnica ⚡');
                }
            } else {
                console.warn('⚠️ Elementos icon/text do badge não encontrados');
            }
        } else {
            console.warn('⚠️ Badge do curso não encontrado no DOM');
        }
    }, 200);
    
    
    // Curso (se houver elemento para isso)
    const cursoElement = document.getElementById('curso-usuario');
    if (cursoElement) {
        cursoElement.textContent = usuario.curso;
    }
};

// ========================================
// CARREGAR ESTATÍSTICAS DETALHADAS
// ========================================

const carregarEstatisticasDetalhadas = () => {
    const usuario = obterUsuarioLogado();
    if (!usuario) return;
    
    console.log('📊 Carregando estatísticas detalhadas...');
    
    // Total de jogos
    const totalJogosElement = document.getElementById('total-jogos');
    if (totalJogosElement) {
        totalJogosElement.textContent = usuario.estatisticas.totalJogos || 0;
    }
    
    // Taxa de acerto
    const taxaAcertoElement = document.getElementById('taxa-acerto');
    if (taxaAcertoElement && usuario.estatisticas.totalJogos > 0) {
        const total = usuario.estatisticas.totalAcertos + usuario.estatisticas.totalErros;
        const taxa = total > 0 ? ((usuario.estatisticas.totalAcertos / total) * 100).toFixed(1) : 0;
        taxaAcertoElement.textContent = `${taxa}%`;
    }
    
    // Conquistas desbloqueadas
    const conquistasElement = document.getElementById('conquistas-desbloqueadas');
    if (conquistasElement) {
        const totalConquistas = contarConquistas(usuario);
        conquistasElement.textContent = totalConquistas;
    }
};

// ========================================
// SISTEMA DE CONQUISTAS (BADGES)
// ========================================

const contarConquistas = (usuario) => {
    let conquistas = 0;
    
    // Conquistas básicas
    if (usuario.nivel >= 5) conquistas++; // Nível 5
    if (usuario.nivel >= 10) conquistas++; // Nível 10
    if (usuario.nivel >= 20) conquistas++; // Nível 20
    
    if (usuario.estatisticas.diasSeguidos >= 7) conquistas++; // 7 dias seguidos
    if (usuario.estatisticas.diasSeguidos >= 30) conquistas++; // 30 dias seguidos
    
    if (usuario.xp >= 500) conquistas++; // 500 XP
    if (usuario.xp >= 1000) conquistas++; // 1000 XP
    
    // Conquistas de progresso
    if (usuario.progresso["1ano"]) {
        const disciplinas1Ano = Object.values(usuario.progresso["1ano"].disciplinas);
        const disciplinasConcluidas = disciplinas1Ano.filter(d => d.concluido).length;
        
        if (disciplinasConcluidas >= 1) conquistas++; // Primeira disciplina
        if (disciplinasConcluidas === disciplinas1Ano.length) conquistas++; // Todas do 1º ano
    }
    
    // Conquistas de desafios
    if (usuario.desafios.diario.concluido) conquistas++; // Completou desafio diário
    if (usuario.desafios.competitivo.vitorias >= 1) conquistas++; // Primeira vitória
    if (usuario.desafios.competitivo.vitorias >= 10) conquistas++; // 10 vitórias
    
    return conquistas;
};

// ========================================
// EDITOR DE AVATAR (PLACEHOLDER)
// ========================================

const configurarEditorAvatar = () => {
    const btnEditor = document.querySelector('.avatar-editor button');
    
    if (btnEditor) {
        console.log('✅ Botão de avatar configurado');
        // O evento já é configurado pelo avatar-avataaars-complete.js
    }
};

// ========================================
// CALCULAR PROGRESSO GERAL
// ========================================

const calcularProgressoGeral = () => {
    const usuario = obterUsuarioLogado();
    if (!usuario) return 0;
    
    let totalAssuntos = 0;
    let assuntosConcluidos = 0;
    
    // Contar todos os assuntos de todos os anos
    Object.keys(usuario.progresso).forEach(ano => {
        const disciplinas = usuario.progresso[ano].disciplinas;
        
        Object.keys(disciplinas).forEach(disciplina => {
            const assuntos = disciplinas[disciplina].assuntos;
            
            Object.keys(assuntos).forEach(assunto => {
                totalAssuntos++;
                if (assuntos[assunto].concluido) {
                    assuntosConcluidos++;
                }
            });
        });
    });
    
    if (totalAssuntos === 0) return 0;
    
    return Math.floor((assuntosConcluidos / totalAssuntos) * 100);
};

// ========================================
// EXIBIR BARRA DE PROGRESSO (SE EXISTIR)
// ========================================

const exibirBarraProgresso = () => {
    const barraElement = document.getElementById('barra-progresso-geral');
    const textoElement = document.getElementById('texto-progresso');
    
    if (barraElement && textoElement) {
        const progresso = calcularProgressoGeral();
        barraElement.style.width = `${progresso}%`;
        textoElement.textContent = `${progresso}% do curso concluído`;
    }
};

// ========================================
// ATUALIZAR TODOS OS ELEMENTOS DO PERFIL
// ========================================

const atualizarPerfilCompleto = () => {
    console.log('🔄 Atualizando perfil completo...');
    
    carregarDadosPerfil();
    carregarEstatisticasDetalhadas();
    atualizarEstatisticasRanking();
    exibirBarraProgresso();
    configurarEditorAvatar();
    
    console.log('✅ Perfil atualizado com sucesso!');
};

// ========================================
// SISTEMA DE INFORMAÇÕES EM OUTRAS PÁGINAS
// ========================================

const atualizarInfoUsuarioGlobal = () => {
    const usuario = obterUsuarioLogado();
    if (!usuario) return;
    
    // Atualizar nome do usuário em qualquer página
    const nomeElements = document.querySelectorAll('.nome-usuario-global');
    nomeElements.forEach(el => {
        const nomeFormatado = usuario.usuario
            .split('.')
            .map(parte => parte.charAt(0).toUpperCase() + parte.slice(1))
            .join(' ');
        el.textContent = nomeFormatado;
    });
    
    // Atualizar XP em qualquer página
    const xpElements = document.querySelectorAll('.xp-usuario-global');
    xpElements.forEach(el => {
        el.textContent = `${usuario.xp} XP`;
    });
    
    // Atualizar nível em qualquer página
    const nivelElements = document.querySelectorAll('.nivel-usuario-global');
    nivelElements.forEach(el => {
        el.textContent = `Nível ${usuario.nivel}`;
    });
};

// ========================================
// EXPORTAR DADOS DO PERFIL (PARA BACKUP)
// ========================================

const exportarDadosPerfil = () => {
    const usuario = obterUsuarioLogado();
    if (!usuario) return;
    
    const dadosJSON = JSON.stringify(usuario, null, 2);
    const blob = new Blob([dadosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `perfil_${usuario.usuario}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    alert('✅ Dados do perfil exportados com sucesso!');
};

// ========================================
// IMPORTAR DADOS DO PERFIL (RESTAURAR BACKUP)
// ========================================

const importarDadosPerfil = (arquivo) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const dadosImportados = JSON.parse(e.target.result);
            
            // Validar estrutura básica
            if (!dadosImportados.usuario || !dadosImportados.senha) {
                throw new Error('Arquivo inválido');
            }
            
            // Confirmar importação
            const confirmar = confirm(`Deseja importar os dados de ${dadosImportados.usuario}?\n\nIsso substituirá seus dados atuais!`);
            
            if (confirmar) {
                salvarUsuario(dadosImportados);
                salvarSessao(dadosImportados.usuario);
                alert('✅ Dados importados com sucesso! A página será recarregada.');
                location.reload();
            }
        } catch (erro) {
            alert('❌ Erro ao importar arquivo. Verifique se o arquivo é válido.');
            console.error(erro);
        }
    };
    
    reader.readAsText(arquivo);
};

// ========================================
// RESETAR PROGRESSO (COM CONFIRMAÇÃO)
// ========================================

const resetarProgresso = () => {
    const confirmar = confirm(
        '⚠️ ATENÇÃO!\n\n' +
        'Tem certeza que deseja resetar todo o seu progresso?\n\n' +
        'Isso irá:\n' +
        '• Zerar seu XP e nível\n' +
        '• Resetar todas as disciplinas e assuntos\n' +
        '• Limpar suas estatísticas\n\n' +
        'Esta ação NÃO pode ser desfeita!'
    );
    
    if (!confirmar) return;
    
    const confirmar2 = confirm('Você tem ABSOLUTA CERTEZA?\n\nDigite OK para confirmar');
    
    if (!confirmar2) return;
    
    const usuario = obterUsuarioLogado();
    if (!usuario) return;
    
    // Manter apenas dados básicos
    const curso = usuario.curso;
    const usuarioNome = usuario.usuario;
    const senha = usuario.senha;
    
    // Recriar usuário do zero
    const novoUsuario = criarUsuarioPadrao(usuarioNome, senha, curso);
    
    salvarUsuario(novoUsuario);
    alert('✅ Progresso resetado! A página será recarregada.');
    location.reload();
};

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.pathname;
    
    console.log('📄 Página de perfil carregada');
    
    // Carregar perfil completo na página de perfil
    if (url.includes('Perfil.html')) {
        console.log('✅ Iniciando carregamento do perfil...');
        
        // Aguardar um pouco para garantir que outros scripts carregaram
        setTimeout(() => {
            atualizarPerfilCompleto();
            
            // Atualizar badge novamente após tudo carregar (garantia extra)
            setTimeout(() => {
                const usuario = obterUsuarioLogado();
                if (usuario) {
                    const badge = document.getElementById('curso-badge');
                    if (badge) {
                        const icon = badge.querySelector('.icon');
                        const text = badge.querySelector('.text');
                        
                        if (icon && text) {
                            if (usuario.curso === 'Informática') {
                                icon.textContent = '💻';
                                text.textContent = 'Informática';
                                badge.style.background = 'rgba(30, 136, 229, 0.9)';
                            } else if (usuario.curso === 'Eletrotécnica') {
                                icon.textContent = '⚡';
                                text.textContent = 'Eletrotécnica';
                                badge.style.background = 'rgba(255, 152, 0, 0.9)';
                            }
                            console.log('✅ Badge do curso atualizado (verificação final)');
                        }
                    }
                }
            }, 500);
        }, 100);
    }
    
    // Atualizar informações globais em todas as páginas
    atualizarInfoUsuarioGlobal();
});

// Expor funções úteis para console (desenvolvimento)
window.exportarPerfil = exportarDadosPerfil;
window.resetarProgresso = resetarProgresso;
window.atualizarPerfilCompleto = atualizarPerfilCompleto;
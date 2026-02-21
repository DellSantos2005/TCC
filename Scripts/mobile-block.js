// ========================================
// SISTEMA DE BLOQUEIO MOBILE
// mobile-block.js
// ========================================

// Criar e inserir overlay de bloqueio mobile
const criarOverlayMobile = () => {
    // Verificar se já existe
    if (document.getElementById('mobile-block-overlay')) return;
    
    // Criar elemento
    const overlay = document.createElement('div');
    overlay.id = 'mobile-block-overlay';
    overlay.className = 'mobile-block-overlay';
    
    overlay.innerHTML = `
        <div class="mobile-block-content">
            <div class="mobile-block-icon">🖥️</div>
            <h1>Acesso via Desktop</h1>
            <p>
                Esta plataforma foi desenvolvida especialmente para <span class="highlight">computadores desktop</span>.
            </p>
            <p>
                Para uma melhor experiência de aprendizagem, acesse através de um computador com resolução mínima de <span class="highlight">1024x768</span>.
            </p>
            <br>
            <p style="font-size: 0.9rem; color: #999;">
                📱 Versão mobile em desenvolvimento
            </p>
        </div>
    `;
    
    // Inserir no body
    document.body.insertBefore(overlay, document.body.firstChild);
};

// Verificar largura da tela
const verificarDispositivo = () => {
    const largura = window.innerWidth;
    
    if (largura < 1024) {
        criarOverlayMobile();
    } else {
        // Remover overlay se existir e a tela for grande o suficiente
        const overlay = document.getElementById('mobile-block-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
};

// Executar ao carregar
document.addEventListener('DOMContentLoaded', verificarDispositivo);

// Executar ao redimensionar
window.addEventListener('resize', verificarDispositivo);

// Prevenir zoom em mobile
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Detectar orientação (mobile)
window.addEventListener('orientationchange', verificarDispositivo);

console.log('✅ Sistema de bloqueio mobile ativado');
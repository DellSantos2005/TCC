// ========================================
// MOBILE-BLOCK.JS
// Usa as classes CSS do styleLogin.css
// ========================================
(function () {
  const OVERLAY_ID = 'mobile-block-overlay';

  const criarOverlay = () => {
    if (document.getElementById(OVERLAY_ID)) return;

    const overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.className = 'mobile-block-overlay';

    overlay.innerHTML = `
      <div class="mobile-block-content">
        <div class="mobile-block-icon">🖥️</div>
        <h1>Acesso via Desktop</h1>
        <p>Esta plataforma foi desenvolvida para<br>
           <span class="highlight">computadores desktop</span>.</p>
        <p>Acesse com resolução mínima de<br>
           <span class="highlight">1024px</span> de largura.</p>
        <p style="color:#555;font-size:0.85rem;margin-top:25px;">
          📱 Versão mobile em desenvolvimento
        </p>
      </div>
    `;

    document.body.insertBefore(overlay, document.body.firstChild);
  };

  const removerOverlay = () => {
    const el = document.getElementById(OVERLAY_ID);
    if (el) el.remove();
  };

  const verificar = () => {
    if (window.innerWidth < 1024) {
      criarOverlay();
    } else {
      removerOverlay();
    }
  };

  document.addEventListener('DOMContentLoaded', verificar);
  window.addEventListener('resize', verificar);
  window.addEventListener('orientationchange', verificar);
})();

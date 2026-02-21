// ========================================
// MOBILE-BLOCK.JS
// ========================================
(function() {
  const verificar = () => {
    if (window.innerWidth < 1024) {
      if (!document.getElementById('mobile-overlay')) {
        const el = document.createElement('div');
        el.id = 'mobile-overlay';
        el.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#0d0d1a;z-index:99999;display:flex;justify-content:center;align-items:center;text-align:center;padding:20px;';
        el.innerHTML = `<div style="color:white;"><div style="font-size:4rem;margin-bottom:20px;">🖥️</div><h1 style="font-size:1.8rem;color:#1e88e5;margin-bottom:15px;">Acesso via Desktop</h1><p style="color:#aaa;font-size:1rem;line-height:1.6;">Esta plataforma foi desenvolvida para <strong style="color:white;">computadores desktop</strong>.<br><br>Acesse com resolução mínima de <strong style="color:#1e88e5;">1024px</strong>.</p><p style="color:#666;font-size:0.85rem;margin-top:20px;">📱 Versão mobile em desenvolvimento</p></div>`;
        document.body.insertBefore(el, document.body.firstChild);
      }
    } else {
      const el = document.getElementById('mobile-overlay');
      if (el) el.remove();
    }
  };
  document.addEventListener('DOMContentLoaded', verificar);
  window.addEventListener('resize', verificar);
  window.addEventListener('orientationchange', verificar);
})();

(() => {
  'use strict';
  const cfg = window.IMNNT_MERCH;
  if (!cfg) return;

  const activeUrl = value => typeof value === 'string' && /^https?:\/\//i.test(value.trim());

  document.querySelectorAll('.js-store-link').forEach(link => {
    if (activeUrl(cfg.storeUrl)) {
      link.href = cfg.storeUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.classList.remove('is-disabled');
      link.removeAttribute('aria-disabled');
    }
  });

  const grid = document.getElementById('homepage-merch-grid');
  if (!grid || !Array.isArray(cfg.products)) return;

  grid.innerHTML = cfg.products.map((item, index) => `
    <article class="site-merch-card">
      <a class="site-merch-art" href="${activeUrl(item.url) ? item.url : cfg.storeUrl}" target="_blank" rel="noopener" aria-label="View ${item.name}">
        <img src="${item.image}" alt="${item.name}" width="900" height="1125" loading="lazy">
        <span class="site-merch-index">0${index + 1}</span>
      </a>
      <div class="site-merch-info">
        <div>
          <div class="site-merch-type">IMNNT / NEVER STOP / 001</div>
          <h3>${item.name}</h3>
        </div>
        <div class="site-merch-bottom">
          <span>${item.price || 'PRICE TBA'}</span>
          <a href="${activeUrl(item.url) ? item.url : cfg.storeUrl}" target="_blank" rel="noopener">SHOP / VIEW PRODUCT ↗</a>
        </div>
      </div>
    </article>
  `).join('');
})();

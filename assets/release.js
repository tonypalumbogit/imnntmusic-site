(() => {
  'use strict';
  const cfg = window.IMNNT_RELEASE;
  if (!cfg) return;
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const text = (sel, value) => { const el=$(sel); if (el && value) el.textContent=value; };

  const isReleased = cfg.status === 'released';
  const hasUrl = (value) => typeof value === 'string' && /^https?:\/\//i.test(value.trim());
  const hasMediaUrl = (value) => typeof value === 'string' && value.trim().length > 0 && !value.trim().startsWith('#');
  const setLink = (el, url) => {
    if (!el) return;
    if (hasUrl(url)) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener';
      el.classList.remove('is-disabled');
      el.removeAttribute('aria-disabled');
    } else {
      el.href = '#';
      el.classList.add('is-disabled');
      el.setAttribute('aria-disabled','true');
    }
  };

  // Core release fields.
  text('#release-title', cfg.title.toUpperCase().replace(' ', '\n'));
  text('#hero-artist', cfg.artist);
  text('#hero-bpm', cfg.bpm);
  text('#hero-year', cfg.year);
  text('#hero-label', cfg.label);
  text('#fact-title', cfg.title.toUpperCase());
  text('#fact-artist', cfg.artist);
  text('#fact-bpm', cfg.bpm);
  text('#fact-year', cfg.year);
  text('#fact-label', cfg.label);
  text('#release-description', cfg.description);

  const cover = $('#cover-art');
  if (cover) {
    cover.src = cfg.coverArt;
    cover.alt = cfg.coverAlt || `${cfg.title} by ${cfg.artist} cover artwork`;
  }

  // Status-driven campaign copy.
  text('#hero-status', isReleased ? 'NEW SINGLE · OUT NOW' : 'NEW SINGLE · COMING SOON');
  text('#listen-heading', isReleased ? 'OUT NOW' : 'COMING SOON');
  text('#listen-subcopy', isReleased ? 'Listen on your platform.' : 'Pre-save now. Platform links activate here on release.');

  // Primary pre-save button(s).
  $$('.js-presave').forEach(el => {
    if (isReleased) {
      el.textContent = el.dataset.role === 'presave' ? 'LISTEN · SPOTIFY' : 'LISTEN NOW';
      setLink(el, cfg.spotifyUrl || cfg.preSaveUrl);
      if (el.dataset.role === 'presave' && hasUrl(cfg.spotifyUrl)) el.dataset.track = 'spotify_click';
    } else {
      el.textContent = el.dataset.role === 'presave' ? 'PRE-SAVE · SPOTIFY' : 'PRE-SAVE NEVER STOP';
      setLink(el, cfg.preSaveUrl);
    }
  });

  // Platform links.
  const platformMap = {
    apple: cfg.appleMusicUrl,
    beatport: cfg.beatportUrl,
    soundcloud: cfg.soundcloudUrl,
    youtube: cfg.youtubeUrl
  };
  Object.entries(platformMap).forEach(([name,url]) => setLink($(`[data-platform="${name}"]`), url));

  // Spotify player activates only with a real embed URL.
  const spotifySlot = $('#spotify-slot');
  if (spotifySlot && hasUrl(cfg.spotifyEmbedUrl)) {
    spotifySlot.innerHTML = `<iframe title="${cfg.title} by ${cfg.artist} on Spotify" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src="${cfg.spotifyEmbedUrl}"></iframe>`;
  }

  // Video: supports YouTube/Vimeo absolute URLs and local/relative MP4 files.
  const videoShell = $('#video-shell');
  if (videoShell && hasMediaUrl(cfg.videoUrl)) {
    let markup = '';
    const mediaUrl = cfg.videoUrl.trim();

    if (/^https?:\/\//i.test(mediaUrl)) {
      try {
        const u = new URL(mediaUrl);
        if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
          const id = u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.searchParams.get('v');
          if (id) {
            markup = `<iframe title="${cfg.title} teaser" loading="lazy" src="https://www.youtube-nocookie.com/embed/${id}?rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
          }
        } else if (u.hostname.includes('vimeo.com')) {
          const id = u.pathname.split('/').filter(Boolean).pop();
          if (id) {
            markup = `<iframe title="${cfg.title} teaser" loading="lazy" src="https://player.vimeo.com/video/${id}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
          }
        } else {
          markup = `<video controls preload="metadata" playsinline aria-label="${cfg.title} teaser"><source src="${mediaUrl}" type="video/mp4">Your browser does not support HTML5 video.</video>`;
        }
      } catch (_) {}
    } else {
      // Local or relative file such as ../assets/releases/never-stop/never-stop-teaser.mp4
      markup = `<video controls preload="metadata" playsinline aria-label="${cfg.title} teaser"><source src="${mediaUrl}" type="video/mp4">Your browser does not support HTML5 video.</video>`;
    }

    if (markup) videoShell.innerHTML = markup;
  }

  // Merch cards from config.
  const merchGrid = $('#merch-grid');
  if (merchGrid && Array.isArray(cfg.merch)) {
    merchGrid.innerHTML = cfg.merch.map((item,index) => {
      const active = hasUrl(item.url);
      return `<article class="merch-card">
        <div class="merch-image"><img src="${item.image}" alt="${item.name}" width="1200" height="1500" loading="lazy"></div>
        <div class="merch-info">
          <h3>${item.name}</h3><p>${item.price || 'COMING SOON'}</p>
          <a href="${active ? item.url : '#'}" ${active ? 'target="_blank" rel="noopener"' : 'class="is-disabled" aria-disabled="true"'} data-track="merch_click" data-merch-index="${index}">${active ? 'SHOP ↗' : 'VIEW'}</a>
        </div>
      </article>`;
    }).join('');
  }

  // Social links.
  if (cfg.socials) {
    Object.entries(cfg.socials).forEach(([name,url]) => setLink($(`[data-social="${name}"]`), url));
  }

  // Basic analytics abstraction. Works with GA4 gtag if enabled; safe otherwise.
  function trackEvent(name, params={}) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (window.fbq && typeof window.fbq === 'function') window.fbq('trackCustom', name, params);
    if (window.ttq && typeof window.ttq.track === 'function') window.ttq.track(name, params);
  }

  $$('[data-track]').forEach(el => el.addEventListener('click', (e) => {
    if (el.getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }
    trackEvent(el.dataset.track, { release: cfg.title, artist: cfg.artist, destination: el.href || '' });
  }));

  // Track first deliberate video interaction.
  if (videoShell) {
    videoShell.addEventListener('click', () => trackEvent('video_play', { release: cfg.title }), { once:true });
  }

  // Email provider-ready form. Prevent submission while placeholder endpoint remains.
  const form = $('#fan-form');
  const formStatus = $('#fan-form-status');
  if (form) form.addEventListener('submit', (e) => {
    if (form.action.includes('EMAIL_PROVIDER_ENDPOINT_HERE')) {
      e.preventDefault();
      if (formStatus) formStatus.textContent = 'Email signup will activate when your email provider endpoint is connected.';
      return;
    }
    trackEvent('email_signup', { release: cfg.title });
  });
})();

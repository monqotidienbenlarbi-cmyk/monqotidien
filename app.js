// Monquotidien Massira â€” Vanilla JS
// Sources: Eat.ma (Monquotidien Marrakech menu scans), Instagram, Tripadvisor (reviews short labels)

(function(){
  const $ = (sel, ctx=document)=>ctx.querySelector(sel);
  const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

  // Header/nav
  const navToggle = $('.nav-toggle');
  const navMenu = $('#nav-menu');
  navToggle?.addEventListener('click', ()=>{
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('#nav-menu a').forEach(a=>a.addEventListener('click', ()=>{
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded','false');
  }));

  // Year + cookie notice
  const yearEl = $('#year'); if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  const cookie = $('#cookie'); const cookieBtn = $('#cookie-accept');
  try{ if (!localStorage.getItem('cookie-ok')) cookie.style.display='block'; }catch(e){}
  cookieBtn?.addEventListener('click', ()=>{ try{ localStorage.setItem('cookie-ok','1'); }catch(e){} cookie.style.display='none'; });

  // Smooth scrolling with easing + focus restore
  function easeInOutCubic(t){ return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2 }
  function smoothScrollTo(y, dur=600){
    const start = window.scrollY || window.pageYOffset; const diff = y - start; const t0 = performance.now();
    function step(now){ const t = Math.min(1, (now - t0)/dur); const e = easeInOutCubic(t); window.scrollTo(0, start + diff*e); if (t<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const hash = a.getAttribute('href');
      if (!hash || hash==="#") return;
      const id = hash.slice(1);
      const tgt = document.getElementById(id);
      if (!tgt) return;
      e.preventDefault();
      const header = $('.site-header');
      const offset = header ? header.getBoundingClientRect().height + 8 : 0;
      const top = tgt.getBoundingClientRect().top + (window.scrollY||0) - offset;
      smoothScrollTo(top, 650);
      tgt.setAttribute('tabindex','-1');
      setTimeout(()=>tgt.focus({preventScroll:true}), 700);
    });
  });

  // i18n
  const I18N = {
    fr: {
      'nav.about':'À propos','nav.menu':'Menu','nav.gallery':'Galerie','nav.reviews':'Avis','nav.contact':'Contact',
      'hero.sub':'frais • diversifié • accessible',
      'cta.viewMenu':'Voir le menu','cta.call':'Appeler','cta.directions':'Itinéraire',
      'about.title':'À propos',
      'about.p1':'Bienvenue chez Monquotidien Massira à Marrakech. Café de quartier, boulangerie et pâtisserie artisanales, nous proposons également des petits-déjeuners et une cuisine conviviale tout au long de la journée.',
      'about.p2':'Dans l’esprit de la marque Mon Quotidien — sain, frais, accessible et diversifié — nos produits sont préparés avec soin et servis dans une ambiance chaleureuse.',
      'about.p3':'Du croissant du matin aux plats chauds pour le déjeuner, en passant par les desserts gourmands, il y a toujours quelque chose de bon pour chaque moment.',
      'about.lead1':'Bienvenue à Monquotidien, votre destination culinaire préférée au cœur de Marrakech. Notre restaurant est né d’une passion pour la cuisine de qualité et d’un amour pour la communauté locale.',
      'about.lead2':'Chez Monquotidien, nous croyons que chaque repas est une occasion de créer des souvenirs inoubliables. C’est pourquoi nous nous engageons à utiliser les meilleurs ingrédients pour préparer nos plats. Nos chefs talentueux apportent une touche de créativité à chaque plat, garantissant une expérience culinaire unique à chaque visite.',
      'about.lead3':'Notre menu est un mélange de saveurs traditionnelles et modernes, reflétant la richesse et la diversité de la cuisine marocaine. Que vous soyez à la recherche d’un déjeuner décontracté, d’un dîner romantique ou d’une célébration spéciale, Monquotidien est l’endroit idéal pour savourer des moments délicieux.',
      'about.lead4':'Nous sommes impatients de vous accueillir chez Monquotidien. Venez vivre une expérience culinaire exceptionnelle !',
      'about.hours.title':'Horaires','about.hours.note':'Vérifier les horaires par téléphone.',
      'menu.title':'Menu','menu.note':'Certaines références peuvent varier selon disponibilité. Prix affichés uniquement si disponibles publiquement.',
      'menu.cat.all':'Tout','menu.cat.breakfast':'Petit-déjeuner','menu.cat.viennoiseries':'Viennoiseries','menu.cat.salads':'Salades','menu.cat.hot':'Plats chauds','menu.cat.patisserie':'Pâtisserie','menu.cat.sandwiches':'Sandwiches','menu.view.pro':'Vue Pro','menu.view.visual':'Vue Visuelle','footer.directions':'Itinéraire','footer.instagram':'Instagram',
      'menu.download':'Télécharger le menu (PDF)','menu.count':'éléments',
      'menu.cat.all':'Tout','menu.cat.breakfast':'Petit-déjeuner','menu.cat.viennoiseries':'Viennoiseries','menu.cat.salads':'Salades','menu.cat.hot':'Plats chauds','menu.cat.patisserie':'Pâtisserie','menu.cat.sandwiches':'Sandwiches','menu.view.pro':'Vue Pro','menu.view.visual':'Vue Visuelle','footer.directions':'Itinéraire','footer.instagram':'Instagram',
      'contact.title':'Nous trouver',
      'locations.title':'Nos adresses','locations.hours':'Heures d’ouverture','locations.verify':'(verify by phone)','locations.range.fr':'Lundi–Dimanche: 07:00–23:00'
    },
    en: {
      'nav.about':'About','nav.menu':'Menu','nav.gallery':'Gallery','nav.reviews':'Reviews','nav.contact':'Contact',
      'hero.sub':'fresh • diverse • accessible',
      'cta.viewMenu':'View Menu','cta.call':'Call','cta.directions':'Get Directions',
      'about.title':'About',
      'about.p1':'Welcome to Monquotidien Massira in Marrakech. Neighborhood cafÃ©, bakery and pastry shop, we also serve breakfast and comforting meals all day long.',
      'about.p2':'True to the brand spirit â€” healthy, fresh, accessible and diverse â€” our products are prepared with care and served in a warm atmosphere.',
      'about.p3':'From the morning croissant to hot dishes for lunch and delicious desserts, thereâ€™s always something good for every moment.',
      'about.lead1':'Welcome to Monquotidien, your favorite culinary destination in the heart of Marrakech. Our restaurant was born from a passion for quality cuisine and a love for the local community.',
      'about.lead2':'At Monquotidien, we believe every meal is an opportunity to create unforgettable memories. Thatâ€™s why we are committed to using the best ingredients to prepare our dishes. Our talented chefs bring a creative touch to every plate, ensuring a unique culinary experience on each visit.',
      'about.lead3':'Our menu blends traditional and modern flavors, reflecting the richness and diversity of Moroccan cuisine. Whether youâ€™re looking for a casual lunch, a romantic dinner or a special celebration, Monquotidien is the perfect place to savor delicious moments.',
      'about.lead4':'We look forward to welcoming you to Monquotidien. Come and enjoy an exceptional culinary experience!',
      'menu.cat.all':'All','menu.cat.breakfast':'Breakfast','menu.cat.viennoiseries':'Viennoiseries','menu.cat.salads':'Salads','menu.cat.hot':'Hot dishes','menu.cat.patisserie':'Pastry','menu.cat.sandwiches':'Sandwiches','menu.view.pro':'Pro View','menu.view.visual':'Visual View','footer.directions':'Directions','footer.instagram':'Instagram',
      'menu.title':'Menu','menu.note':'Items may vary by availability. Prices shown only if publicly available.',
      'menu.cat.all':'All','menu.cat.breakfast':'Breakfast','menu.cat.viennoiseries':'Viennoiseries','menu.cat.salads':'Salads','menu.cat.hot':'Hot dishes' ,'menu.cat.patisserie':'Pastry','menu.cat.sandwiches':'Sandwiches','menu.view.pro':'Pro View','menu.view.visual':'Visual View','footer.directions':'Directions','footer.instagram':'Instagram',
      'menu.download':'Download Menu (PDF)','menu.count':'items',
      'gallery.title':'Gallery','reviews.title':'Reviews',
      'contact.title':'Find us',
      'locations.title':'Our locations','locations.hours':'Opening hours','locations.verify':'(verify by phone)','locations.range.fr':'Monday–Sunday: 7:00 AM – 11:00 PM'
    }
  };
  function setLang(lang){
    const dict = I18N[lang] || I18N.fr;
    $$('[data-i18n]').forEach(el=>{ const k = el.getAttribute('data-i18n'); if (dict[k]) el.textContent = dict[k]; });
    $('#lang-fr')?.setAttribute('aria-pressed', String(lang==='fr'));
    $('#lang-en')?.setAttribute('aria-pressed', String(lang==='en'));
    document.documentElement.lang = lang;
    const countLabel = $('#menu-count-label'); if (countLabel) countLabel.textContent = (dict['menu.count']||'');
    try{ localStorage.setItem('lang', lang); }catch(e){}
  }
  const savedLang = (()=>{ try{ return localStorage.getItem('lang'); }catch(e){ return null } })();
  setLang(savedLang || 'fr');
  $('#lang-fr')?.addEventListener('click', ()=>setLang('fr'));
  $('#lang-en')?.addEventListener('click', ()=>setLang('en'));

  // Menu rendering
  const menuGrid = $('#menu-grid');
  const chips = $$('.chip');
  const chipsWrap = $('.menu-controls');
  const chipIndicator = $('#chip-indicator');
  const searchInput = $('#menu-search');
  const countEl = $('#menu-count');
  const catCards = $$('.cat-card');
  const viewProBtn = document.getElementById('view-pro');
  const viewScansBtn = document.getElementById('view-scans');
  const proWrap = $('#menu-pro');
  const proSidebar = $('#menu-sidebar');
  const proContent = $('#menu-content');
  let allMenuCards = [];
  let currentFilter = 'all';

  function cardTemplate(item){
    const img = item.image || item.source || '';
    return `
      <div class="media">${img ? `<img src="${img}" alt="${item.name}" loading="lazy" decoding="async">` : ''}</div>
      <div class="body">
        <div>
          <div class="badge">${item.category || 'Menu'}</div>
          <h3>${item.name}</h3>
          ${item.desc ? `<p>${item.desc}</p>`: ''}
          ${item.source ? `<p class="menu-source"><a target="_blank" rel="noopener" href="${item.source}">Voir la page</a></p>`:''}
        </div>
        <div>${item.price ? `<span class="price">${item.price}</span>`: ''}</div>
      </div>`;
  }
  function renderMenu(items){
    if (!menuGrid) return;
    menuGrid.innerHTML = '';
    items.forEach((item,i)=>{
      const card = document.createElement('article');
      card.className = 'menu-card';
      card.setAttribute('data-cat', item.category || 'Other');
      card.innerHTML = cardTemplate(item);
      menuGrid.appendChild(card);
      (function(){ const media = card.querySelector('.media'); if (media && item.image){ const ov = document.createElement('div'); ov.className='overlay'; const zoom = document.createElement('button'); zoom.type='button'; zoom.className='btn btn-small btn-secondary'; zoom.textContent='Zoom'; zoom.addEventListener('click', ()=>openPhoto(item.image, item.name)); ov.appendChild(zoom); if(item.source){ const srcA=document.createElement('a'); srcA.className='btn btn-small btn-outline'; srcA.target='_blank'; srcA.rel='noopener'; srcA.href=item.source; srcA.textContent='Source'; ov.appendChild(srcA);} media.appendChild(ov);} })();
      setTimeout(()=>card.classList.add('appear'), i*40);
    });
    if (countEl) countEl.textContent = String(items.length); if(items.length===0){ const es=document.createElement('div'); es.className='empty-state'; es.innerHTML='<strong>Menu indisponible pour le moment.</strong><br><small>Essayez d\'actualiser ou appelez-nous.</small>'; menuGrid.appendChild(es);}
  }
  function applyFilters(){
    const q = (searchInput?.value || '').trim().toLowerCase();
    let items = allMenuCards;
    if (currentFilter !== 'all') items = items.filter(i=> (i.category||'') === currentFilter);
    if (q) items = items.filter(i=> (i.name||'').toLowerCase().includes(q) || (i.desc||'').toLowerCase().includes(q) || (i.category||'').toLowerCase().includes(q));
    renderMenu(items);
  }
  function filterMenu(cat){ currentFilter = cat; applyFilters(); }
  function moveChipIndicator(){
    if (!chipsWrap || !chipIndicator) return;
    const active = $('.chip.is-active') || chips[0]; if (!active) return;
    const wrapRect = chipsWrap.getBoundingClientRect(); const r = active.getBoundingClientRect();
    chipIndicator.style.width = r.width + 'px';
    chipIndicator.style.transform = `translateX(${r.left - wrapRect.left}px)`;
  }
  window.addEventListener('resize', moveChipIndicator);

  chips.forEach(ch=>{
    ch.addEventListener('click', ()=>{
      chips.forEach(c=>c.classList.remove('is-active'));
      ch.classList.add('is-active');
      chips.forEach(c=>c.setAttribute('aria-selected','false'));
      ch.setAttribute('aria-selected','true');
      filterMenu(ch.getAttribute('data-filter'));
      moveChipIndicator();
    });
  });
  searchInput?.addEventListener('input', applyFilters);
  Array.from(catCards || []).forEach(card=>{
    card.addEventListener('click', ()=>{
      const f = card.getAttribute('data-filter');
      const target = chips.find(c=>c.getAttribute('data-filter')===f);
      if (target) target.click();
    });
  });

  // Menu ingestion from Eat.ma public page (scans)
  async function fetchEatMenu(){
    const url = 'https://r.jina.ai/http://www.eat.ma/marrakech/monquotidien';
    try{
      const res = await fetch(url, {headers:{'Accept':'text/plain'}});
      if (!res.ok) throw new Error('HTTP '+res.status);
      const txt = await res.text();
      const imgRe = /\(https:\/\/www\.eat\.ma\/wp-content\/uploads\/monquotidien-menu[^\)]+\.jpg\)/g;
      const matches = txt.match(imgRe) || [];
      const unique = Array.from(new Set(matches.map(m=>m.slice(1,-1))));
      return unique.map((href,i)=>({ name:`Page de menu ${i+1}`, desc:'Scans du menu â€” Eat.ma', category:'Menu', source:href, image:href }));
    }catch(e){ console.warn('Eat.ma fetch failed', e); return []; }
  }
  (async function initMenu(){
    // Try to load structured JSON first
    let structured = null;
    try{
      const resp = await fetch('menu.json', {cache:'no-store'});
      if (resp.ok) structured = await resp.json();
    }catch(e){ structured = null }

    if (structured && Array.isArray(structured.categories) && structured.categories.length){
      renderProMenu(structured);
      if (proWrap) proWrap.hidden = false;
      if (menuGrid) menuGrid.style.display = 'none';
    } else {
      const visual = await fetchEatMenu();
      allMenuCards = visual;
      applyFilters();
      moveChipIndicator();
    }
  })();

  // Print to PDF for menu only
  

  // Gallery from local images
  const galleryEl = $('#gallery-grid');
  const galleryImages = [
    'img/gallery-1.jpeg','img/gallery-2.jpeg','img/gallery-3.jpeg','img/gallery-4.jpeg','img/gallery-5.jpeg','img/gallery-6.jpeg','img/gallery-7.jpeg','img/gallery-8.jpeg','img/traiteur-img1.jpg','img/traiteur-img2.jpg','img/dashbord.jpg'
  ];
  function buildGallery(){
    if (!galleryEl) return;
    galleryEl.innerHTML = '';
    galleryImages.forEach((src,idx)=>{
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.loading = 'lazy'; img.decoding = 'async';
      img.src = src; img.srcset = `${src} 1x`;
      img.alt = `Monquotidien â€” ${idx+1}`;
      fig.appendChild(img);
      fig.addEventListener('click', ()=>openLightbox(idx));
      fig.style.setProperty('--delay', (idx*50)+'ms');
      galleryEl.appendChild(fig);
    });
  }
  buildGallery();

  // Lightbox
  const lb = $('#lightbox'); const lbImg = $('#lightbox-img');
  const lbClose = $('.lightbox-close'); const lbPrev = $('.lightbox-prev'); const lbNext = $('.lightbox-next');
  let lbIndex = 0;
  function openLightbox(i){ lbIndex = i; lb.setAttribute('aria-hidden','false'); lb.classList.add('open'); lbImg.src = galleryImages[lbIndex]; lbImg.alt = `Image ${lbIndex+1}`; }
  function closeLightbox(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }
  function step(dir){ lbIndex = (lbIndex + dir + galleryImages.length) % galleryImages.length; lbImg.src = galleryImages[lbIndex]; }
  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', ()=>step(-1));
  lbNext?.addEventListener('click', ()=>step(1));
  lb?.addEventListener('click', e=>{ if (e.target===lb) closeLightbox(); });
  window.addEventListener('keydown', e=>{ if (!lb.classList.contains('open')) return; if (e.key==='Escape') closeLightbox(); if (e.key==='ArrowLeft') step(-1); if (e.key==='ArrowRight') step(1); });
  function openPhoto(src, alt){ lb.setAttribute('aria-hidden','false'); lb.classList.add('open'); lbImg.src = src; lbImg.alt = alt||''; }
  const bar = $('#reviews-bar');
  let slide = 0;
  function nextReview(){ const n = $$('.review', slider).length; slide = (slide+1)%n; slider.scrollTo({left: slider.clientWidth*slide, behavior:'smooth'}); }
  setInterval(nextReview, 5000);
  if (bar){ bar.style.width='100%'; setInterval(()=>{ bar.style.width='0%'; void bar.offsetWidth; bar.style.width='100%'; }, 5000); }

  // Reveal on scroll (IntersectionObserver)
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if (e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, {rootMargin:'-10% 0px -10% 0px'}) : null;
  if (io){ $$('[data-animate]').forEach(el=>io.observe(el)); } else { $$('[data-animate]').forEach(el=>el.classList.add('in-view')); }

  // Page ready fade-in
  window.addEventListener('load', ()=>{ document.body.classList.add('ready'); });

  // Button ripple
  $$('.btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const rect = btn.getBoundingClientRect();
      const span = document.createElement('span'); span.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      span.style.width = span.style.height = size+'px';
      span.style.left = (e.clientX - rect.left - size/2) + 'px';
      span.style.top = (e.clientY - rect.top - size/2) + 'px';
      btn.appendChild(span); setTimeout(()=>span.remove(), 650);
    });
  });

  // Parallax hero
  const hero = $('#hero'); let ticking=false;
  function onScroll(){ if(ticking) return; ticking=true; requestAnimationFrame(()=>{ ticking=false; if(!hero) return; const y=window.scrollY||0; hero.style.backgroundPosition = `center ${Math.max(-y*0.1, -60)}px`; }); }
  window.addEventListener('scroll', onScroll, {passive:true});

  // Stagger setup for about intro
  const aboutIntro = $('.about-intro.stagger'); if (aboutIntro) $$('.about-intro.stagger > *').forEach((el,i)=>el.style.setProperty('--delay', (i*80)+'ms'));

  // --- Pro Menu rendering ---
  function getFavs(){ try{ return new Set(JSON.parse(localStorage.getItem('favs')||'[]')); }catch(e){ return new Set() } }
  function setFavs(s){ try{ localStorage.setItem('favs', JSON.stringify(Array.from(s))); }catch(e){} }
  function renderProMenu(data){
    if (!proSidebar || !proContent) return;
    proSidebar.innerHTML = '';
    proContent.innerHTML = '';
    const favs = getFavs();
    data.categories.forEach((cat,ci)=>{
      const b = document.createElement('button'); b.textContent = `${cat.name} (${cat.items?.length||0})`; b.setAttribute('data-target', `cat-${ci}`);
      b.addEventListener('click', ()=>{
        const target = document.getElementById(`cat-${ci}`);
        if (target){ target.scrollIntoView({behavior:'smooth', block:'start'}); sidebarSetActive(b); }
      });
      proSidebar.appendChild(b);

      const section = document.createElement('section'); section.className = 'menu-section reveal'; section.id = `cat-${ci}`; section.setAttribute('data-animate','');
      const h = document.createElement('h3'); h.textContent = cat.name; section.appendChild(h);
      (cat.items||[]).forEach(item=>{
        const row = document.createElement('div'); row.className = 'pro-item';
        const rowTop = document.createElement('div'); rowTop.className='pi-row';
        const name = document.createElement('span'); name.className='pi-name'; name.textContent = item.name;
        const dots = document.createElement('span'); dots.className='pi-dots';
        const price = document.createElement('span'); price.className='pi-price'; price.textContent = item.price||'';
        rowTop.append(name,dots,price);
        const desc = document.createElement('div'); desc.className='pi-desc'; desc.textContent = item.desc||'';
        const meta = document.createElement('div'); meta.className='pi-badges';
        (item.badges||[]).forEach(bd=>{ const s=document.createElement('span'); s.className='pi-badge'; s.textContent=bd; meta.appendChild(s); });
        const actions = document.createElement('div'); actions.className='pi-actions';
        const fav = document.createElement('button'); fav.type='button'; fav.className='fav'; fav.textContent = favs.has(item.id)? 'â™¥' : 'â™¡'; if (favs.has(item.id)) fav.classList.add('active');
        fav.addEventListener('click', ()=>{ if (favs.has(item.id)){ favs.delete(item.id); fav.classList.remove('active'); fav.textContent='â™¡'; } else { favs.add(item.id); fav.classList.add('active'); fav.textContent='â™¥'; } setFavs(favs); });
        actions.appendChild(fav);
        row.append(rowTop, desc, meta, actions);
        section.appendChild(row);
      });
      proContent.appendChild(section);
    });
    // Scrollspy
    const io2 = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{ if(en.isIntersecting){ const id=en.target.id; const btn=[...proSidebar.querySelectorAll('button')].find(x=>x.getAttribute('data-target')===id); sidebarSetActive(btn); } });
    }, {rootMargin:'-40% 0px -50% 0px', threshold:0});
    $$('.menu-section', proContent).forEach(sec=>io2.observe(sec));
    function sidebarSetActive(btn){ if (!btn) return; proSidebar.querySelectorAll('button').forEach(x=>x.setAttribute('aria-current','false')); btn.setAttribute('aria-current','true'); }
  }
})();












  document.getElementById('to-top-footer')?.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));




  (function(){ const pm=document.getElementById('privacy-modal'); const openBtns=document.querySelectorAll('[data-privacy-open]'); const closeBtn=document.getElementById('privacy-close'); openBtns.forEach(b=>b.addEventListener('click',()=>{ pm?.setAttribute('aria-hidden','false'); pm?.classList.add('open'); })); closeBtn?.addEventListener('click',()=>{ pm?.setAttribute('aria-hidden','true'); pm?.classList.remove('open'); }); pm?.addEventListener('click',e=>{ if(e.target===pm){ pm?.setAttribute('aria-hidden','true'); pm?.classList.remove('open'); } }); window.addEventListener('keydown',e=>{ if(e.key==='Escape'){ pm?.setAttribute('aria-hidden','true'); pm?.classList.remove('open'); } }); })();

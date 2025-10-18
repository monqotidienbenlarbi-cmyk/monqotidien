// Clean, robust JS (no external fetch except optional local menu.json)
(function(){
  const $ = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>Array.from(c.querySelectorAll(s));

  // Nav
  const navToggle = $('.nav-toggle');
  const navMenu = $('#nav-menu');
  navToggle?.addEventListener('click', ()=>{
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('#nav-menu a').forEach(a=>a.addEventListener('click', ()=>{ navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }));

  // Year
  const y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());

  // Lang
  const dict = {
    fr:{sub:'frais • diversifié • accessible',count:'éléments',ph:'Rechercher un plat, une catégorie…'},
    en:{sub:'fresh • diverse • accessible',count:'items',ph:'Search a dish, a category…'}
  };
  function setLang(lang){
    document.documentElement.lang = lang;
    $('#lang-fr')?.setAttribute('aria-pressed', String(lang==='fr'));
    $('#lang-en')?.setAttribute('aria-pressed', String(lang==='en'));
    const d=dict[lang]||dict.fr; { const hs = document.getElementById('hero-sub'); if (hs) hs.textContent = d.sub; } { const cl = document.getElementById('menu-count-label'); if (cl) cl.textContent = d.count; }
    const ms=$('#menu-search'); if(ms) ms.placeholder=d.ph;
    try{localStorage.setItem('lang',lang)}catch(e){}
  }
  const saved = (()=>{try{return localStorage.getItem('lang')}catch(e){return null}})();
  setLang(saved||'fr');
  $('#lang-fr')?.addEventListener('click',()=>setLang('fr'));
  $('#lang-en')?.addEventListener('click',()=>setLang('en'));

  // Menu
  const grid = $('#menu-grid');
  const chips = $$('.chip');
  const search = $('#menu-search');
  const countEl = $('#menu-count');
  let items = [];
  let filter = 'all';
  function render(list){
    if(!grid) return; grid.innerHTML='';
    list.forEach(it=>{
      const card=document.createElement('article'); card.className='menu-card';
      card.innerHTML = `<div><div class="badge">${it.category||''}</div><h3>${it.name}</h3>${it.desc?`<p>${it.desc}</p>`:''}</div><div>${it.price?`<span class="price">${it.price}</span>`:''}</div>`;
      grid.appendChild(card);
    });
    if(list.length===0){ const es=document.createElement('div'); es.className='empty-state'; es.innerHTML='<strong>Menu en ligne prochainement.</strong><br><small>Veuillez appeler pour confirmer.</small>'; grid.appendChild(es); }
    if(countEl) countEl.textContent=String(list.length);
  }
  function apply(){
    const q=(search?.value||'').toLowerCase();
    let view=items; if(filter!=='all') view=view.filter(i=> (i.category||'')===filter);
    if(q) view=view.filter(i=> (i.name||'').toLowerCase().includes(q) || (i.desc||'').toLowerCase().includes(q));
    render(view);
  }
  chips.forEach(ch=>ch.addEventListener('click',()=>{ chips.forEach(c=>c.classList.remove('is-active')); ch.classList.add('is-active'); filter=ch.getAttribute('data-filter')||'all'; apply(); }));
  search?.addEventListener('input', apply);

  async function loadMenu(){
    try{
      const r = await fetch('menu.json',{cache:'no-store'});
      if(!r.ok) throw new Error('no json');
      const data = await r.json();
      items = (data.categories||[]).flatMap(c=> (c.items||[]).map(it=>({...it,category:c.name})) );
    }catch(e){ items = []; }
    apply();
  }
  loadMenu();

  // Gallery
  const g = $('#gallery-grid');
  const gallery = ['gallery-1.jpeg','gallery-2.jpeg','gallery-3.jpeg','gallery-4.jpeg','gallery-5.jpeg','gallery-6.jpeg','gallery-7.jpeg','gallery-8.jpeg','traiteur-img1.jpg','traiteur-img2.jpg','dashbord.jpg'].map(n=>`../img/${n}`);
  if(g){ g.innerHTML=''; gallery.forEach((src,i)=>{ const img=new Image(); img.loading='lazy'; img.src=src; img.alt=`Photo ${i+1}`; const a=document.createElement('a'); a.href=src; a.appendChild(img); a.addEventListener('click', e=>{e.preventDefault(); openLightbox(src, img.alt)}); g.appendChild(a); }); }
  const lb = $('#lightbox'); const lbImg = $('#lightbox-img');
  function openLightbox(src, alt){ lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); lbImg.src=src; lbImg.alt=alt||''; }
  $('.lightbox-close')?.addEventListener('click',()=>{ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); });
  lb?.addEventListener('click',e=>{ if(e.target===lb) { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }});
  window.addEventListener('keydown',e=>{ if(!lb?.classList.contains('open')) return; if(e.key==='Escape') { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }});

  // Reviews slider (simple auto-scroll)
  const slider = $('#reviews-slider'); let si=0; setInterval(()=>{ if(!slider) return; const n=$$('.review',slider).length; si=(si+1)%n; slider.scrollTo({left:slider.clientWidth*si,behavior:'smooth'}); }, 5000);
})();







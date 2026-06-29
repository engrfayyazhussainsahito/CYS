(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  function inferRootPath(){
    const path = location.pathname;
    if(/\/weeks\/week-\d+\//.test(path)) return '../../';
    if(/\/content\//.test(path)) return '../../';
    return '';
  }
  const rootPath = inferRootPath() || document.body.dataset.root || '';
  const pageId = document.body.dataset.pageId || location.pathname;

  function abs(url){
    if(!url || url.startsWith('http') || url.startsWith('#')) return url;
    return rootPath + url;
  }

  function initTheme(){
    const saved = localStorage.getItem('theme');
    const preferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = saved || preferred;
    $$('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
    }));
  }

  function initSidebar(){
    const sidebar = $('#sidebar');
    const nav = $('#courseNav');
    const open = $('#openSidebar');
    const close = $('#closeSidebar');
    if(!nav || !window.COURSE_NAV) return;
    const path = location.pathname;
    const matchesUrl = (url) => {
      if(!url || url === '#') return false;
      if(url === 'index.html') return /\/index\.html$/.test(path) && !path.includes('/weeks/');
      return path.endsWith('/' + url);
    };
    nav.innerHTML = window.COURSE_NAV.map(group => `
      <section class="nav-group" aria-labelledby="nav-${slug(group.group)}">
        <div class="nav-group-title" id="nav-${slug(group.group)}">${escapeHtml(group.group)}</div>
        <ul class="nav-list">
          ${group.items.map(item => {
            const isCurrent = matchesUrl(item.url);
            const href = item.url === '#' ? '#' : abs(item.url);
            const disabled = item.url === '#';
            return `<li><a href="${href}" ${isCurrent?'aria-current="page"':''} ${disabled?'aria-disabled="true" tabindex="-1"':''}>${escapeHtml(item.title)} <span class="status">${escapeHtml(item.status)}</span></a></li>`
          }).join('')}
        </ul>
      </section>`).join('');
    if(open && sidebar) open.addEventListener('click',()=>sidebar.classList.add('open'));
    if(close && sidebar) close.addEventListener('click',()=>sidebar.classList.remove('open'));
  }

  function initProgressBar(){
    const bar = $('#readingProgress');
    if(!bar) return;
    const update = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + '%';
    };
    update();
    window.addEventListener('scroll', update, {passive:true});
  }

  function initTOC(){
    const toc = $('#tocList');
    const article = $('.article');
    if(!toc || !article) return;
    const headings = $$('h2, h3', article).filter(h => !h.classList.contains('no-toc'));
    if(!headings.length){ toc.innerHTML = '<li class="small">No headings found.</li>'; return; }
    toc.innerHTML = headings.map(h => {
      if(!h.id) h.id = slug(h.textContent);
      const indent = h.tagName === 'H3' ? ' style="margin-left:1rem"' : '';
      return `<li${indent}><a href="#${h.id}">${escapeHtml(h.textContent)}</a></li>`;
    }).join('');
  }

  function initCopyButtons(){
    $$('pre').forEach(pre => {
      if(pre.classList.contains('mermaid')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        const code = pre.innerText.replace(/^Copy\n/, '');
        try{ await navigator.clipboard.writeText(code); btn.textContent = 'Copied'; setTimeout(()=>btn.textContent='Copy', 1300); }
        catch(e){ btn.textContent = 'Select'; }
      });
      pre.appendChild(btn);
    });
  }

  function initSearch(){
    const inputs = $$('.site-search-input');
    const results = $('#searchResults');
    const run = (query, target=results) => {
      if(!target || !window.SITE_SEARCH) return;
      const q = query.trim().toLowerCase();
      if(q.length < 2){ target.innerHTML = '<p class="small">Type at least 2 characters.</p>'; return; }
      const terms = q.split(/\s+/).filter(Boolean);
      const scored = window.SITE_SEARCH.map(doc => {
        const hay = `${doc.title} ${doc.type} ${doc.text}`.toLowerCase();
        let score = 0;
        terms.forEach(t => {
          if(doc.title.toLowerCase().includes(t)) score += 5;
          if(hay.includes(t)) score += 1;
        });
        return {...doc, score};
      }).filter(d => d.score > 0).sort((a,b)=>b.score-a.score);
      target.innerHTML = scored.length ? scored.map(d => `
        <article class="search-result">
          <span class="badge">${escapeHtml(d.type)}</span>
          <h3><a href="${abs(d.url)}">${escapeHtml(d.title)}</a></h3>
          <p>${escapeHtml(d.text.slice(0,180))}${d.text.length>180?'…':''}</p>
        </article>`).join('') : '<p>No results found.</p>';
    };
    inputs.forEach(input => input.addEventListener('input', e => {
      const mini = input.closest('.nav-search')?.querySelector('.mini-results');
      run(e.target.value, mini || results);
    }));
    if($('#mainSearch')) run($('#mainSearch').value || '', results);
  }

  function initBookmarks(){
    const key = 'cyberBookmarks';
    const get = () => JSON.parse(localStorage.getItem(key) || '[]');
    const set = val => localStorage.setItem(key, JSON.stringify(val.slice(0,50)));
    const title = document.body.dataset.title || document.title;
    const btn = $('#bookmarkBtn') || $('.bookmark-btn');
    if(btn){
      const update = () => {
        const exists = get().some(x => x.id === pageId);
        btn.textContent = exists ? '★ Bookmarked' : '☆ Bookmark lesson';
      };
      btn.addEventListener('click', () => {
        const list = get();
        const idx = list.findIndex(x => x.id === pageId);
        if(idx >= 0) list.splice(idx,1); else list.unshift({id:pageId,title,url:location.pathname.split('/').slice(-3).join('/'),time:Date.now()});
        set(list); update(); renderBookmarkList();
      });
      update();
    }
    renderBookmarkList();
    function renderBookmarkList(){
      const box = $('#bookmarkList');
      if(!box) return;
      const list = get();
      box.innerHTML = list.length ? list.map(x => `<a href="${abs(x.url)}">${escapeHtml(x.title)}</a>`).join('') : '<span class="small">No bookmarks yet.</span>';
    }
  }

  function initRecentlyViewed(){
    const key = 'cyberRecent';
    const title = document.body.dataset.title || document.title;
    const url = location.pathname.split('/').slice(-3).join('/');
    let list = JSON.parse(localStorage.getItem(key) || '[]').filter(x => x.id !== pageId);
    if(document.body.dataset.track !== 'false'){
      list.unshift({id:pageId,title,url,time:Date.now()});
      localStorage.setItem(key, JSON.stringify(list.slice(0,8)));
    }
    const box = $('#recentList');
    if(box){
      const recent = JSON.parse(localStorage.getItem(key) || '[]');
      box.innerHTML = recent.length ? recent.map(x => `<a href="${abs(x.url)}">${escapeHtml(x.title)}</a>`).join('') : '<span class="small">No recent lessons yet.</span>';
    }
  }

  function initCompletion(){
    const key = 'cyberProgress';
    const get = () => JSON.parse(localStorage.getItem(key) || '{}');
    const set = val => localStorage.setItem(key, JSON.stringify(val));
    const btn = $('#completeBtn') || $('.complete-btn');
    if(btn){
      const update = () => { btn.textContent = get()[pageId] ? '✓ Completed' : 'Mark complete'; };
      btn.addEventListener('click', () => { const p = get(); p[pageId] = !p[pageId]; set(p); update(); renderProgress(); });
      update();
    }
    renderProgress();
    function renderProgress(){
      const box = $('#progressList');
      if(!box || !window.COURSE_NAV) return;
      const p = get();
      const lessons = window.COURSE_NAV.flatMap(g=>g.items).filter(i=>i.status==='ready');
      box.innerHTML = lessons.map(i => {
        const id = i.url.split('/').slice(-3).join('/');
        const done = Object.keys(p).some(k => k.endsWith(i.url) || k.endsWith(id));
        return `<div>${done?'✓':'○'} <a href="${abs(i.url)}">${escapeHtml(i.title)}</a></div>`;
      }).join('');
    }
  }

  function initGlossary(){
    const box = $('#glossaryList');
    if(!box || !window.GLOSSARY) return;
    const render = q => {
      const term = (q || '').toLowerCase();
      const rows = window.GLOSSARY.filter(x => !term || x.term.toLowerCase().includes(term) || x.definition.toLowerCase().includes(term));
      box.innerHTML = rows.map(x => `<article class="glossary-item"><strong>${escapeHtml(x.term)}</strong><span>${escapeHtml(x.definition)}</span></article>`).join('') || '<p>No glossary terms found.</p>';
    };
    render('');
    const input = $('#glossarySearch');
    if(input) input.addEventListener('input', e => render(e.target.value));
  }

  function initQuiz(){
    const quizToggle = $('#quizModeBtn') || $('.quiz-toggle');
    if(quizToggle){
      quizToggle.addEventListener('click', () => {
        document.body.classList.toggle('quiz-mode');
        quizToggle.textContent = document.body.classList.contains('quiz-mode') ? 'Exit quiz mode' : 'Start quiz mode';
      });
    }
    $$('.check-quiz').forEach(btn => btn.addEventListener('click', () => {
      const card = btn.closest('.quiz-card');
      const selected = $('input[type="radio"]:checked', card);
      const answer = card.dataset.answer;
      const result = $('.result', card) || document.createElement('div');
      result.className = 'result';
      if(!selected){ result.textContent = 'Choose an answer first.'; }
      else if(selected.value === answer){ result.textContent = 'Correct.'; }
      else{ result.textContent = `Incorrect. Correct answer: ${answer}.`; }
      if(!result.parentNode) card.appendChild(result);
    }));
  }

  function initPrint(){
    $$('.print-page, .pdf-btn').forEach(btn => btn.addEventListener('click', () => window.print()));
  }

  function normalizeMermaid(){
    $$('pre.mermaid').forEach(pre => {
      const code = pre.querySelector('code');
      if(code) pre.textContent = code.textContent.trim();
    });
    if(window.mermaid){
      try{
        mermaid.initialize({startOnLoad:false, theme:document.documentElement.dataset.theme==='dark'?'dark':'default'});
        if(mermaid.run) mermaid.run({querySelector:'.mermaid'});
      }catch(e){ console.warn('Mermaid render skipped:', e); }
    }
  }

  function initLessonVisual(){
    const hero = $('.hero');
    const articleLayout = $('.layout-article');
    if(!hero || !articleLayout || $('.lesson-visual')) return;
    const title = document.body.dataset.title || document.title || 'Cybersecurity lesson';
    const visual = document.createElement('section');
    visual.className = 'lesson-visual card';
    visual.setAttribute('aria-label','Lesson visual overview');
    visual.innerHTML = `
      <div class="visual-graphic" aria-hidden="true">
        <svg viewBox="0 0 520 320" role="img">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".18"/><stop offset="1" stop-color="currentColor" stop-opacity=".04"/></linearGradient>
          </defs>
          <rect x="28" y="36" width="464" height="248" rx="28" fill="url(#g1)" stroke="currentColor" stroke-opacity=".18"/>
          <circle cx="124" cy="108" r="44" fill="none" stroke="currentColor" stroke-width="10" stroke-opacity=".35"/>
          <path d="M97 112l18 18 38-48" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="214" y="76" width="210" height="24" rx="12" fill="currentColor" opacity=".28"/>
          <rect x="214" y="118" width="150" height="18" rx="9" fill="currentColor" opacity=".18"/>
          <circle cx="146" cy="226" r="28" fill="currentColor" opacity=".18"/>
          <circle cx="260" cy="226" r="28" fill="currentColor" opacity=".18"/>
          <circle cx="374" cy="226" r="28" fill="currentColor" opacity=".18"/>
          <path d="M174 226h58M288 226h58" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity=".28"/>
          <text x="260" y="288" text-anchor="middle" font-size="22">Concept → Practice → Defense</text>
        </svg>
      </div>
      <div class="visual-panel">
        <h2>Visual learning path</h2>
        <p>This lesson is organized as a guided path: build the concept, inspect a safe example, then connect it to real defensive work.</p>
        <div class="visual-steps">
          <div class="visual-step"><strong>1. Understand</strong><span>Plain English, vocabulary, analogies.</span></div>
          <div class="visual-step"><strong>2. Model</strong><span>Diagrams, workflows, and mental maps.</span></div>
          <div class="visual-step"><strong>3. Practice</strong><span>Safe labs and defensive examples only.</span></div>
        </div>
        <div class="badge-row"><span class="badge">Beginner-first</span><span class="badge">Mermaid diagrams</span><span class="badge">Safe labs</span><span class="badge">MS-level depth</span></div>
      </div>`;
    hero.insertAdjacentElement('afterend', visual);
  }

  function slug(s){return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,80)}
  function escapeHtml(s){return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

  document.addEventListener('DOMContentLoaded', () => {
    initTheme(); initSidebar(); initProgressBar(); initTOC(); initCopyButtons(); initSearch(); initBookmarks(); initRecentlyViewed(); initCompletion(); initGlossary(); initQuiz(); initPrint(); initLessonVisual(); normalizeMermaid();
    if(window.hljs) hljs.highlightAll();
    const y = $('#year'); if(y) y.textContent = new Date().getFullYear();
  });
})();

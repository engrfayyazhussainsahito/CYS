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

  /* ---- Theme ---- */
  function initTheme(){
    const saved = localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = saved || preferred;
    $$('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '☀ Light mode' : '🌙 Dark mode';
    }));
    // Set initial label
    $$('.theme-toggle').forEach(btn => {
      const cur = document.documentElement.dataset.theme;
      btn.textContent = cur === 'dark' ? '☀ Light mode' : '🌙 Dark mode';
    });
  }

  /* ---- Sidebar with backdrop overlay ---- */
  function initSidebar(){
    const sidebar = $('#sidebar');
    const nav = $('#courseNav');
    const open = $('#openSidebar');
    const close = $('#closeSidebar');

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);

    const openSidebar = () => { sidebar?.classList.add('open'); backdrop.classList.add('visible'); };
    const closeSidebar = () => { sidebar?.classList.remove('open'); backdrop.classList.remove('visible'); };

    if(open) open.addEventListener('click', openSidebar);
    if(close) close.addEventListener('click', closeSidebar);
    backdrop.addEventListener('click', closeSidebar);

    // Close on ESC
    document.addEventListener('keydown', e => { if(e.key === 'Escape') closeSidebar(); });

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
            return `<li><a href="${href}" ${isCurrent?'aria-current="page"':''} ${disabled?'aria-disabled="true" tabindex="-1"':''}>${escapeHtml(item.title)} <span class="status">${escapeHtml(item.status)}</span></a></li>`;
          }).join('')}
        </ul>
      </section>`).join('');
  }

  /* ---- Reading Progress Bar ---- */
  function initProgressBar(){
    const bar = $('#readingProgress');
    if(!bar) return;
    const update = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (height > 0 ? (scrollTop/height)*100 : 0) + '%';
    };
    update();
    window.addEventListener('scroll', update, {passive:true});
  }

  /* ---- Table of Contents with active highlight ---- */
  function initTOC(){
    const toc = $('#tocList');
    const article = $('.article');
    if(!toc || !article) return;
    const headings = $$('h2, h3', article).filter(h => !h.classList.contains('no-toc'));
    if(!headings.length){ toc.innerHTML = '<li class="small">No sections found.</li>'; return; }
    headings.forEach(h => { if(!h.id) h.id = slug(h.textContent); });
    toc.innerHTML = headings.map(h => {
      const indent = h.tagName === 'H3' ? ' style="padding-left:1rem;font-size:.79rem"' : '';
      return `<li${indent}><a href="#${h.id}">${escapeHtml(h.textContent)}</a></li>`;
    }).join('');

    // Active section highlight on scroll
    const links = $$('a', toc);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          links.forEach(a => a.style.fontWeight = '');
          const link = toc.querySelector(`a[href="#${entry.target.id}"]`);
          if(link) link.style.fontWeight = '700';
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    headings.forEach(h => observer.observe(h));
  }

  /* ---- Copy Buttons ---- */
  function initCopyButtons(){
    $$('pre').forEach(pre => {
      if(pre.classList.contains('mermaid')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        const code = pre.innerText.replace(/^Copy\n/, '');
        try{
          await navigator.clipboard.writeText(code);
          btn.textContent = '✓ Copied';
          btn.style.color = 'var(--accent-2)';
          setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = ''; }, 1600);
        }catch(e){ btn.textContent = 'Select all'; }
      });
      pre.appendChild(btn);
    });
  }

  /* ---- Search ---- */
  function initSearch(){
    const inputs = $$('.site-search-input');
    const results = $('#searchResults');
    const run = (query, target=results) => {
      if(!target || !window.SITE_SEARCH) return;
      const q = query.trim().toLowerCase();
      if(q.length < 2){
        target.innerHTML = '<p class="small" style="padding:.5rem">Type at least 2 characters to search.</p>';
        return;
      }
      const terms = q.split(/\s+/).filter(Boolean);
      const scored = window.SITE_SEARCH.map(doc => {
        const hay = `${doc.title} ${doc.type} ${doc.text}`.toLowerCase();
        let score = 0;
        terms.forEach(t => {
          if(doc.title.toLowerCase().includes(t)) score += 5;
          if(hay.includes(t)) score += 1;
        });
        return {...doc, score};
      }).filter(d => d.score > 0).sort((a,b)=>b.score-a.score).slice(0,12);

      target.innerHTML = scored.length
        ? scored.map(d => `
          <article class="search-result">
            <span class="badge">${escapeHtml(d.type)}</span>
            <h3><a href="${abs(d.url)}">${escapeHtml(d.title)}</a></h3>
            <p style="font-size:.88rem;color:var(--muted)">${escapeHtml(d.text.slice(0,160))}${d.text.length>160?'…':''}</p>
          </article>`).join('')
        : '<p class="small" style="padding:.5rem">No results found.</p>';
    };
    inputs.forEach(input => input.addEventListener('input', e => {
      const mini = input.closest('.nav-search')?.querySelector('.mini-results');
      run(e.target.value, mini || results);
    }));
    if($('#mainSearch')) run($('#mainSearch').value || '', results);
  }

  /* ---- Bookmarks ---- */
  function initBookmarks(){
    const key = 'cyberBookmarks';
    const get = () => JSON.parse(localStorage.getItem(key) || '[]');
    const set = val => localStorage.setItem(key, JSON.stringify(val.slice(0,50)));
    const title = document.body.dataset.title || document.title;
    const btn = $('#bookmarkBtn') || $('.bookmark-btn');
    if(btn){
      const update = () => {
        const exists = get().some(x => x.id === pageId);
        btn.textContent = exists ? '★ Bookmarked' : '☆ Bookmark';
        btn.style.color = exists ? 'var(--accent-2)' : '';
      };
      btn.addEventListener('click', () => {
        const list = get();
        const idx = list.findIndex(x => x.id === pageId);
        if(idx >= 0) list.splice(idx,1);
        else list.unshift({id:pageId,title,url:location.pathname.split('/').slice(-3).join('/'),time:Date.now()});
        set(list); update(); renderBookmarkList();
      });
      update();
    }
    renderBookmarkList();
    function renderBookmarkList(){
      const box = $('#bookmarkList');
      if(!box) return;
      const list = get();
      box.innerHTML = list.length
        ? list.map(x => `<div><a href="${abs(x.url)}" style="text-decoration:none;font-size:.88rem">${escapeHtml(x.title)}</a></div>`).join('')
        : '<span class="small">No bookmarks yet.</span>';
    }
  }

  /* ---- Recently Viewed ---- */
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
      box.innerHTML = recent.length
        ? recent.map(x => `<div><a href="${abs(x.url)}" style="text-decoration:none;font-size:.88rem">${escapeHtml(x.title)}</a></div>`).join('')
        : '<span class="small">No recent lessons yet. Start exploring!</span>';
    }
  }

  /* ---- Progress / Completion ---- */
  function initCompletion(){
    const key = 'cyberProgress';
    const get = () => JSON.parse(localStorage.getItem(key) || '{}');
    const set = val => localStorage.setItem(key, JSON.stringify(val));
    const btn = $('#completeBtn') || $('.complete-btn');
    if(btn){
      const update = () => {
        const done = get()[pageId];
        btn.textContent = done ? '✓ Completed' : 'Mark complete';
        btn.style.background = done ? 'var(--accent-2)' : '';
        btn.style.color = done ? '#fff' : '';
        btn.style.borderColor = done ? 'var(--accent-2)' : '';
      };
      btn.addEventListener('click', () => {
        const p = get(); p[pageId] = !p[pageId]; set(p); update(); renderProgress();
      });
      update();
    }
    renderProgress();
    function renderProgress(){
      const box = $('#progressList');
      if(!box || !window.COURSE_NAV) return;
      const p = get();
      const lessons = window.COURSE_NAV.flatMap(g=>g.items).filter(i=>i.status==='ready');
      const done = lessons.filter(i => {
        const id = i.url.split('/').slice(-3).join('/');
        return Object.keys(p).some(k => (k.endsWith(i.url) || k.endsWith(id)) && p[k]);
      }).length;
      box.innerHTML = `
        <div style="font-size:.78rem;color:var(--muted);margin-bottom:.4rem;font-family:var(--sans)">
          ${done} / ${lessons.length} lessons complete
        </div>
        <div style="height:6px;background:var(--panel-2);border-radius:999px;overflow:hidden;margin-bottom:.5rem">
          <div style="height:100%;width:${lessons.length?Math.round(done/lessons.length*100):0}%;background:var(--accent-2);border-radius:999px;transition:width .4s"></div>
        </div>
        ${lessons.slice(0,6).map(i => {
          const id = i.url.split('/').slice(-3).join('/');
          const isDone = Object.keys(p).some(k => (k.endsWith(i.url)||k.endsWith(id)) && p[k]);
          return `<div style="display:flex;align-items:center;gap:.35rem;padding:.18rem .2rem;border-radius:4px">
            <span style="color:${isDone?'var(--accent-2)':'var(--border)'};font-size:.9rem">${isDone?'✓':'○'}</span>
            <a href="${abs(i.url)}" style="font-size:.78rem;text-decoration:none;color:var(--${isDone?'muted':'text'});flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(i.title)}</a>
          </div>`;
        }).join('')}`;
    }
  }

  /* ---- Glossary ---- */
  function initGlossary(){
    const box = $('#glossaryList');
    if(!box || !window.GLOSSARY) return;
    const render = q => {
      const term = (q || '').toLowerCase();
      const rows = window.GLOSSARY.filter(x => !term || x.term.toLowerCase().includes(term) || x.definition.toLowerCase().includes(term));
      box.innerHTML = rows.map(x =>
        `<article class="glossary-item">
          <strong>${escapeHtml(x.term)}</strong>
          <span style="font-size:.93rem;color:var(--muted)">${escapeHtml(x.definition)}</span>
        </article>`
      ).join('') || '<p class="small">No glossary terms found.</p>';
    };
    render('');
    const input = $('#glossarySearch');
    if(input) input.addEventListener('input', e => render(e.target.value));
  }

  /* ---- Quiz Mode ---- */
  function initQuiz(){
    const quizToggle = $('#quizModeBtn') || $('.quiz-toggle');
    if(quizToggle){
      quizToggle.addEventListener('click', () => {
        document.body.classList.toggle('quiz-mode');
        const on = document.body.classList.contains('quiz-mode');
        quizToggle.textContent = on ? '📖 Exit quiz mode' : '🎯 Start quiz mode';
        quizToggle.style.background = on ? 'var(--accent)' : '';
        quizToggle.style.color = on ? '#fff' : '';
        quizToggle.style.borderColor = on ? 'var(--accent)' : '';
      });
    }
    $$('.check-quiz').forEach(btn => btn.addEventListener('click', () => {
      const card = btn.closest('.quiz-card');
      const selected = $('input[type="radio"]:checked', card);
      const answer = card.dataset.answer;
      let result = $('.result', card);
      if(!result){ result = document.createElement('div'); result.className = 'result'; card.appendChild(result); }
      if(!selected){
        result.textContent = 'Please select an answer first.';
        result.style.color = 'var(--warn)';
      } else if(selected.value === answer){
        result.textContent = '✓ Correct!';
        result.style.color = 'var(--accent-2)';
        card.style.borderColor = 'var(--accent-2)';
      } else {
        result.textContent = `✗ Not quite. The correct answer is: ${answer}.`;
        result.style.color = 'var(--danger)';
        card.style.borderColor = 'var(--danger)';
      }
    }));
  }

  /* ---- Print / PDF ---- */
  function initPrint(){
    $$('.print-page, .pdf-btn').forEach(btn => btn.addEventListener('click', () => window.print()));
  }

  /* ---- Mermaid diagrams ---- */
  function normalizeMermaid(){
    $$('pre.mermaid').forEach(pre => {
      const code = pre.querySelector('code');
      if(code) pre.textContent = code.textContent.trim();
    });
    if(window.mermaid){
      try{
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'default',
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        });
        if(mermaid.run) mermaid.run({querySelector:'.mermaid'});
      }catch(e){ console.warn('Mermaid render skipped:', e); }
    }
  }

  /* ---- Smooth scroll for anchor links ---- */
  function initSmoothScroll(){
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---- Animated entrance for cards ---- */
  function initAnimations(){
    const cards = $$('.card, .callout, .quiz-card');
    if(!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.style.animationPlayState = 'running';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach(el => {
      el.style.animationPlayState = 'paused';
      obs.observe(el);
    });
  }

  /* ---- Lesson visual panel ---- */
  function initLessonVisual(){
    const hero = $('.hero');
    const articleLayout = $('.layout-article');
    if(!hero || !articleLayout || $('.lesson-visual')) return;
    const visual = document.createElement('section');
    visual.className = 'lesson-visual card';
    visual.setAttribute('aria-label','Lesson visual overview');
    visual.innerHTML = `
      <div class="visual-graphic" aria-hidden="true">
        <svg viewBox="0 0 480 280" role="img">
          <defs>
            <linearGradient id="gA" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stop-color="var(--accent)" stop-opacity=".22"/>
              <stop offset="1" stop-color="var(--accent-2)" stop-opacity=".1"/>
            </linearGradient>
          </defs>
          <rect x="20" y="20" width="440" height="240" rx="22" fill="url(#gA)" stroke="var(--border)" stroke-width="1.5"/>
          <circle cx="110" cy="100" r="38" fill="none" stroke="var(--accent)" stroke-width="8" stroke-opacity=".5"/>
          <path d="M89 103l16 16 34-42" fill="none" stroke="var(--accent-2)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="192" y="74" width="196" height="20" rx="10" fill="var(--accent)" opacity=".3"/>
          <rect x="192" y="106" width="140" height="16" rx="8" fill="var(--accent)" opacity=".18"/>
          <circle cx="124" cy="208" r="24" fill="var(--accent)" opacity=".2"/>
          <circle cx="240" cy="208" r="24" fill="var(--accent-2)" opacity=".2"/>
          <circle cx="356" cy="208" r="24" fill="var(--accent)" opacity=".2"/>
          <path d="M148 208h64M264 208h64" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" opacity=".35"/>
          <text x="240" y="262" text-anchor="middle" font-size="13" opacity=".6" fill="currentColor">Understand → Model → Apply</text>
        </svg>
      </div>
      <div class="visual-panel">
        <h2>Learning pathway</h2>
        <p>Each lesson builds progressively from foundational concepts to graduate-level analysis, integrating theory with practical application.</p>
        <div class="visual-steps">
          <div class="visual-step"><strong>1. Conceptual</strong><span>Plain-language foundations and precise vocabulary.</span></div>
          <div class="visual-step"><strong>2. Analytical</strong><span>Diagrams, frameworks, and mental models.</span></div>
          <div class="visual-step"><strong>3. Applied</strong><span>Defensive labs and real-world case studies.</span></div>
        </div>
        <div class="badge-row">
          <span class="badge">Graduate level</span>
          <span class="badge">Research-grounded</span>
          <span class="badge">Ethical focus</span>
          <span class="badge">Safe labs only</span>
        </div>
      </div>`;
    hero.insertAdjacentElement('afterend', visual);
  }

  /* ---- Scroll-to-top button ---- */
  function initScrollTop(){
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.textContent = '↑';
    btn.title = 'Back to top';
    btn.style.cssText = `
      position:fixed;bottom:2rem;right:1.5rem;width:42px;height:42px;border-radius:50%;
      background:var(--accent);color:#fff;border:none;box-shadow:var(--shadow-lg);
      font-size:1.1rem;cursor:pointer;opacity:0;transition:opacity .25s;z-index:60;
      display:grid;place-items:center;font-family:var(--sans);
    `;
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
      btn.style.opacity = window.scrollY > 500 ? '1' : '0';
      btn.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
    }, {passive:true});
    btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  /* ---- Helpers ---- */
  function slug(s){ return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,80); }
  function escapeHtml(s){ return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

  /* ---- Boot ---- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initProgressBar();
    initTOC();
    initCopyButtons();
    initSearch();
    initBookmarks();
    initRecentlyViewed();
    initCompletion();
    initGlossary();
    initQuiz();
    initPrint();
    initLessonVisual();
    normalizeMermaid();
    initSmoothScroll();
    initAnimations();
    initScrollTop();
    if(window.hljs) hljs.highlightAll();
    const y = $('#year'); if(y) y.textContent = new Date().getFullYear();
  });
})();

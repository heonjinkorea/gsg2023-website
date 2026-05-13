/* =====================================================================
   ㈜공생계 - main.js
   - 헤더 스크롤 상태 토글
   - 모바일 메뉴 토글
   - 부드러운 스크롤 & 현재 섹션 활성화
   - 프로젝트 카테고리 필터
   - 스크롤 시 요소 등장 애니메이션
   - "맨 위로" 버튼
   ===================================================================== */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 1) 헤더 스크롤 상태 ---------- */
  const header = $('#header');
  const toTop  = $('#toTop');

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 60);
    toTop.classList.toggle('is-show', y > 400);
    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 2) 모바일 메뉴 ---------- */
  const navToggle = $('#navToggle');
  const nav       = $('#nav');

  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // 메뉴 항목 클릭 시 모바일 메뉴 닫기
  $$('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 3) 현재 섹션 nav 활성화 ---------- */
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = sections[0]?.id;
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ---------- 4) 프로젝트 필터 ---------- */
  const filterBtns = $$('.filter__btn');
  const cards      = $$('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      cards.forEach(card => {
        const show = (filter === 'all') || (card.dataset.cat === filter);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- 5) 스크롤 등장 애니메이션 ---------- */
  const targets = $$(
    '.vm-card, .service-card, .project-card, .ceo-letter, .ceo-profile, ' +
    '.timeline__item, .org-chart, .contact-grid, .section-head'
  );
  targets.forEach(t => t.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add('is-in'));
  }

  /* ---------- 6) Hero 슬라이더 ---------- */
  const slides = $$('.hero__slide');
  const dots   = $$('.hero__dot');
  const SLIDE_INTERVAL = 5000;
  let slideIdx = 0;
  let slideTimer = null;

  function goTo(idx) {
    slides[slideIdx]?.classList.remove('is-active');
    dots[slideIdx]?.classList.remove('is-active');
    slideIdx = (idx + slides.length) % slides.length;
    slides[slideIdx]?.classList.add('is-active');
    dots[slideIdx]?.classList.add('is-active');
  }
  function startAuto() {
    stopAuto();
    if (slides.length <= 1) return;
    slideTimer = setInterval(() => goTo(slideIdx + 1), SLIDE_INTERVAL);
  }
  function stopAuto() {
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
  }
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });
  // 탭 비활성/활성 시 자동재생 제어
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAuto() : startAuto();
  });
  startAuto();

  /* ---------- 7) Footer 연도 ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 초기 1회 실행 ---------- */
  onScroll();
})();

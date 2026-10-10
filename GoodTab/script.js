const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

// Give the home headline a mechanical, suit-up arrival without changing its copy.
const assemblyHeadline = document.querySelector('.home-page .hero-copy h1');
if (assemblyHeadline) {
  assemblyHeadline.setAttribute('aria-label', assemblyHeadline.getAttribute('aria-label') || assemblyHeadline.textContent.replace(/\s+/g, ' ').trim());
  const walker = document.createTreeWalker(assemblyHeadline, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  let pieceIndex = 0;
  textNodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    let word = null;
    for (const character of node.textContent) {
      if (/\s/.test(character)) {
        if (word) fragment.append(word);
        word = null;
        fragment.append(document.createTextNode(character));
        continue;
      }
      if (!word) {
        word = document.createElement('span');
        word.className = 'headline-word';
      }
      const piece = document.createElement('span');
      piece.className = 'headline-piece';
      piece.textContent = character;
      const direction = pieceIndex % 4;
      piece.style.setProperty('--flight-x', direction % 2 ? `${(direction === 1 ? 1 : -1) * (105 + (pieceIndex % 5) * 17)}px` : '0px');
      piece.style.setProperty('--flight-y', direction % 2 ? '0px' : `${(direction === 0 ? -1 : 1) * (95 + (pieceIndex % 4) * 22)}px`);
      piece.style.setProperty('--flight-turn', `${pieceIndex % 2 ? '' : '-'}${48 + (pieceIndex % 4) * 17}deg`);
      piece.style.setProperty('--piece-delay', `${480 + pieceIndex * 18}ms`);
      word.append(piece);
      pieceIndex += 1;
    }
    if (word) fragment.append(word);
    node.replaceWith(fragment);
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && document.body.classList.contains('home-page')) {
  document.documentElement.classList.add('js-motion');
  const homeTargets = document.querySelectorAll(
    '.home-page .hero-copy, .home-page .hero-art, .home-page .section-label, .home-page .intro-grid > *, .home-page .value-card, .home-page .work-heading > *, .home-page .project, .home-page .view-all, .home-page .home-cta > *'
  );
  homeTargets.forEach((node, index) => {
    node.classList.add('home-motion');
    node.style.setProperty('--motion-delay', `${(index % 3) * 90}ms`);
  });
  const homeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        homeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -5% 0px' });
  homeTargets.forEach(node => homeObserver.observe(node));

  const heroArt = document.querySelector('.hero-art');
  heroArt?.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroArt.style.setProperty('--front-x', `${(x * 9).toFixed(1)}px`);
    heroArt.style.setProperty('--front-y', `${(y * 8).toFixed(1)}px`);
    heroArt.style.setProperty('--back-x', `${(x * -6).toFixed(1)}px`);
    heroArt.style.setProperty('--back-y', `${(y * -6).toFixed(1)}px`);
    heroArt.style.setProperty('--sticker-x', `${(x * 12).toFixed(1)}px`);
    heroArt.style.setProperty('--sticker-y', `${(y * 10).toFixed(1)}px`);
    heroArt.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
    heroArt.style.setProperty('--back-tilt', `${(x * -3.25).toFixed(2)}deg`);
    heroArt.style.setProperty('--orbit-scale', (1 + x * 0.035).toFixed(3));
  });
  heroArt?.addEventListener('pointerleave', () => {
    ['--front-x','--front-y','--back-x','--back-y','--sticker-x','--sticker-y'].forEach(name => heroArt.style.setProperty(name, '0px'));
    heroArt.style.setProperty('--tilt-y', '0deg');
    heroArt.style.setProperty('--back-tilt', '0deg');
    heroArt.style.setProperty('--orbit-scale', '1');
  });

  const floatingCta = document.querySelector('.floating-cta');
  const homeCta = document.querySelector('#home-cta');
  const homeCtaObserver = homeCta && floatingCta ? new IntersectionObserver(([entry]) => {
    floatingCta.classList.toggle('is-hidden', entry.isIntersecting);
  }, { threshold: 0.18 }) : null;
  if (homeCta) homeCtaObserver?.observe(homeCta);

  let motionFrame = 0;
  const updateHomeMotion = () => {
    motionFrame = 0;
    const viewport = window.innerHeight || 1;
    const scroll = window.scrollY;
    if (heroArt) {
      const heroProgress = Math.min(Math.max(scroll / viewport, 0), 1);
      const drift = heroProgress * 34;
      heroArt.style.setProperty('--scroll-drift', `${drift.toFixed(1)}px`);
      heroArt.style.setProperty('--art-scroll-drift', `${(drift * 0.7).toFixed(1)}px`);
      heroArt.style.setProperty('--front-scroll', `${(drift * 0.35).toFixed(1)}px`);
      heroArt.style.setProperty('--back-scroll', `${(drift * -0.24).toFixed(1)}px`);
      floatingCta?.classList.toggle('is-visible', scroll > viewport * 0.72);
    }
    document.querySelectorAll('.home-page .project-visual').forEach(visual => {
      const rect = visual.getBoundingClientRect();
      const centerDistance = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const drift = Math.max(-15, Math.min(15, centerDistance * -18));
      visual.style.setProperty('--project-drift', `${drift.toFixed(1)}px`);
    });
  };
  window.addEventListener('scroll', () => {
    if (!motionFrame) motionFrame = requestAnimationFrame(updateHomeMotion);
  }, { passive: true });
  updateHomeMotion();
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.value-card, .project, .process-list article, .offer-card, .belief-grid article, .faq-list details, .about-copy, .order-form').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

const updateScrollProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  document.documentElement.style.setProperty('--scroll', `${percent}%`);
};
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const form = document.querySelector('#order-form');
const packageSelect = document.querySelector('#package-select');
if (packageSelect) {
  const requestedPackage = new URLSearchParams(window.location.search).get('package');
  if (requestedPackage) {
    const matchingOption = [...packageSelect.options].find(option => option.text.trim() === requestedPackage);
    if (matchingOption) packageSelect.value = matchingOption.value;
  }
}
form?.addEventListener('submit', async event => {
  event.preventDefault();
  const feedback = document.querySelector('#form-feedback');
  const submit = form.querySelector('button[type="submit"]');
  const order = Object.fromEntries(new FormData(form).entries());
  submit.disabled = true;
  submit.innerHTML = 'Sending… <span>↗</span>';
  feedback.textContent = 'Sending your inquiry…';
  try {
    const response = await fetch('/api/orders', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'The inquiry could not be sent.');
    form.reset();
    feedback.textContent = result.emailSent
      ? 'Thanks — your inquiry was saved and an order notification was sent. We’ll be in touch soon.'
      : 'Thanks — your inquiry was saved. Email notification is not configured yet.';
  } catch (error) {
    feedback.textContent = error.message === 'Failed to fetch' || error.message.includes('404')
      ? 'The form needs its order-saving endpoint connected before it can accept live inquiries.'
      : error.message;
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Send project inquiry <span>↗</span>';
  }
});

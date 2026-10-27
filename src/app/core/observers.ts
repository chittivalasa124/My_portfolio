export function initRevealObserver(): () => void {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  const observeElements = () => {
    const targets = document.querySelectorAll('.rv, .rv-mask');
    targets.forEach((target) => {
      if (!target.classList.contains('is-in')) {
        observer.observe(target);
      }
    });
  };

  observeElements();

  // Re-check after DOM renders completely
  const timer = setTimeout(observeElements, 300);

  return () => {
    clearTimeout(timer);
    observer.disconnect();
  };
}

export function observeScrollProgress(callback: (progress: number) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        callback(Math.min(1, Math.max(0, currentProgress)));
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}


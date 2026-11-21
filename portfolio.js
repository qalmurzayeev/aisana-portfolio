const reelDialog = document.querySelector('.reel-dialog');
const reelPlayer = document.querySelector('.reel-player');

for (const link of document.querySelectorAll('[data-reel]')) {
  link.addEventListener('click', (event) => {
    if (!reelDialog.showModal || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (!reelPlayer.src) reelPlayer.src = reelPlayer.dataset.src;
    reelDialog.showModal();
    reelPlayer.play().catch(() => {});
  });
}

reelDialog.addEventListener('close', () => reelPlayer.pause());

if ('IntersectionObserver' in window && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;
      target.classList.replace('reveal-pending', 'revealed');
      observer.unobserve(target);
    }
  }, { threshold: .08 });

  for (const element of document.querySelectorAll('[data-reveal]')) {
    if (element.getBoundingClientRect().top < window.innerHeight) continue;
    element.classList.add('reveal-pending');
    observer.observe(element);
  }
}

/* ========================================
   UNDANGAN DIGITAL — Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Init AOS (Animate on Scroll) ---
  AOS.init({
    duration: 800,
    once: true,
    offset: 80,
  });

  // --- Cover / Open Button ---
  const cover = document.getElementById('cover');
  const btnOpen = document.getElementById('btn-open');
  const mainContent = document.getElementById('main-content');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const musicIconOn = document.getElementById('music-icon-on');
  const musicIconOff = document.getElementById('music-icon-off');

  btnOpen.addEventListener('click', () => {
    cover.classList.add('opened');
    document.body.classList.remove('no-scroll');
    mainContent.style.opacity = '1';

    // Play background music (user gesture satisfies autoplay policy)
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {});
    musicToggle.style.display = 'flex';

    // Re-trigger AOS after content visible
    setTimeout(() => AOS.refresh(), 300);
  });

  // --- Music Toggle ---
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicIconOn.classList.remove('hidden');
      musicIconOff.classList.add('hidden');
      musicToggle.classList.remove('paused');
    } else {
      bgMusic.pause();
      musicIconOn.classList.add('hidden');
      musicIconOff.classList.remove('hidden');
      musicToggle.classList.add('paused');
    }
  });

  // --- Countdown Timer ---
  const targetDate = new Date('2026-12-21T08:00:00+07:00').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '0';
      document.getElementById('cd-hours').textContent = '0';
      document.getElementById('cd-minutes').textContent = '0';
      document.getElementById('cd-seconds').textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- Gallery Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  document.getElementById('lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  // --- Copy GoPay Number ---
  const copyBtn = document.getElementById('copy-gopay');
  const toast = document.getElementById('toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const number = copyBtn.dataset.number;
      navigator.clipboard.writeText(number).then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
      });
    });
  }

  // --- Floating Particles ---
  createParticles();
});

function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = 8 + Math.random() * 12 + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = particle.style.height = 2 + Math.random() * 4 + 'px';
    container.appendChild(particle);
  }
}

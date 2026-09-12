const navbar = document.getElementById('navbar');

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNavbar);
updateNavbar();

const counters = document.querySelectorAll('.counter-num');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1400;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target;
      }
    }
    requestAnimationFrame(step);
  });
}

const counterSection = document.getElementById('counters');

if (counterSection) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    observer.observe(counterSection);

    const rect = counterSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animateCounters();
    }
  } else {
    animateCounters();
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!countersStarted) animateCounters();
    }, 2500);
  });
}

const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');
let ripples = [];
let animationId;

function resizeCanvas() {
  const hero = document.querySelector('.hero');
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function spawnRipple(x, y) {
  ripples.push({ x, y, radius: 0, alpha: 0.5 });
}

function autoSpawn() {
  const x = Math.random() * canvas.width * 0.7;
  const y = Math.random() * canvas.height;
  spawnRipple(x, y);
}
setInterval(autoSpawn, 1800);

document.querySelector('.hero').addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
});

function drawRipples() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ripples.forEach(r => {
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(123, 224, 240, ${r.alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    r.radius += 0.8;
    r.alpha -= 0.004;
  });
  ripples = ripples.filter(r => r.alpha > 0);
  animationId = requestAnimationFrame(drawRipples);
}
drawRipples();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* AposenPrevi Consultoria — interações */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Preloader */
  var preloader = document.querySelector('.preloader');
  setTimeout(function () {
    if (preloader) preloader.classList.add('is-done');
  }, 1500);

  /* Scroll progress bar */
  var progressBar = document.querySelector('.progress-bar');
  function updateProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* Reveal-on-scroll */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-revealed'); });
  }

  /* Hero "Especialistas em..." word carousel */
  var carouselWords = ['Aposentadoria', 'Revisão de Benefícios', 'Direito Previdenciário', 'Planejamento Previdenciário'];
  var carouselEl = document.querySelector('.hero__specialists-word');
  if (carouselEl && !reduceMotion) {
    var idx = 0;
    setInterval(function () {
      carouselEl.style.opacity = '0';
      carouselEl.style.transform = 'translateY(-8px)';
      setTimeout(function () {
        idx = (idx + 1) % carouselWords.length;
        carouselEl.textContent = carouselWords[idx];
        carouselEl.style.transform = 'translateY(8px)';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            carouselEl.style.opacity = '1';
            carouselEl.style.transform = 'translateY(0)';
          });
        });
      }, 450);
    }, 2600);
  }

  /* Palette — click to copy HEX */
  var swatches = document.querySelectorAll('.palette__circle');
  swatches.forEach(function (circle) {
    circle.addEventListener('click', function () {
      var hex = circle.getAttribute('data-hex');
      var tooltip = circle.querySelector('.palette__tooltip');
      if (navigator.clipboard && navigator.clipboard.writeText && hex) {
        navigator.clipboard.writeText(hex).catch(function () {});
      }
      if (tooltip) {
        var original = tooltip.textContent;
        tooltip.textContent = 'Copiado!';
        tooltip.classList.add('is-copied');
        setTimeout(function () {
          tooltip.textContent = original;
          tooltip.classList.remove('is-copied');
        }, 1600);
      }
    });
  });
})();

/**
 * Reusable theme-aware particles initializer.
 * Exposes window.initParticles(theme) so main.js can re-init on theme toggle.
 */
(function() {
  function getConfig(theme) {
    const isLight = theme === 'light';
    return {
      particles: {
        number: { value: 120, density: { enable: true, value_area: 800 } },
        color: { value: isLight ? '#0ea5e9' : '#ffffff' },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
        opacity: { value: isLight ? 0.7 : 0.5, random: false },
        size: { value: isLight ? 4 : 3, random: true },
        line_linked: {
          enable: true, distance: 150,
          color: isLight ? '#0ea5e9' : '#ffffff',
          opacity: isLight ? 0.4 : 0.3, width: 1
        },
        move: {
          enable: true, speed: 3, direction: 'none',
          random: false, straight: false, out_mode: 'out',
          bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: false, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    };
  }

  function destroyExisting() {
    if (window.pJSDom && Array.isArray(window.pJSDom)) {
      window.pJSDom.forEach(function(p) {
        if (p && p.pJS && p.pJS.fn && p.pJS.fn.vendors && p.pJS.fn.vendors.destroy) {
          try { p.pJS.fn.vendors.destroy(); } catch(e) {}
        }
      });
      window.pJSDom = [];
    }
  }

  window.initParticles = function(theme) {
    if (typeof particlesJS !== 'function') return;
    theme = theme || document.documentElement.getAttribute('data-theme') || 'dark';
    destroyExisting();
    particlesJS('particles-js', getConfig(theme));
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.initParticles();
    });
  } else {
    window.initParticles();
  }
})();
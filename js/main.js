/**
 * main.js - javascript minimo de ViajesMundo
 * dark mode, nav mobile, contador, efecto scroll reveal, modal, formulario
 */

/* dark mode
   guarda la preferencia en localStorage para que persista entre visitas
   tambien respeta la preferencia del sistema operativo la primera vez */
(function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const KEY = 'viajesmundo-dark';

    const saved = localStorage.getItem(KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'true' || (saved === null && prefersDark)) {
        body.classList.add('dark-mode');
    }

    if (!toggle) return;

    // actualiza el icono de material icons segun el tema actual
    function updateIcon() {
        const icon = document.getElementById('toggleIcon');
        if (!icon) return;
        // el texto del span de material icons ES el nombre del icono
        icon.textContent = body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
        toggle.setAttribute('aria-label',
            body.classList.contains('dark-mode') ? 'Activar modo claro' : 'Activar modo oscuro');
    }
    updateIcon();

    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem(KEY, body.classList.contains('dark-mode'));
        updateIcon();
    });
})();


/* header - scroll y nav mobile */
(function initHeader() {
    const header = document.querySelector('.site-header');
    const hamburger = document.getElementById('navToggle');
    const mobileNav = document.querySelector('.main-nav');
    const dropItems = document.querySelectorAll('.nav__item--has-dropdown');

    // agrega clase .scrolled cuando el usuario scrollea un poco
    // esto activa la sombra del header via css
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true }); // passive mejora la performance del scroll
    }

    // abrir y cerrar el nav en mobile
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
        });
    }

    // en mobile los dropdown items se abren/cierran con click
    // en desktop se manejan solo con css :hover (ver header.css)
    dropItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        if (!link) return;
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                // cierra los otros items abiertos antes de abrir este
                dropItems.forEach(other => {
                    if (other !== item) other.classList.remove('open');
                });
                item.classList.toggle('open');
            }
        });
    });

    // marcar el link activo comparando la url actual con el href de cada link
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
})();


/* contador animado
   usa IntersectionObserver para disparar la animacion
   solo cuando el elemento entra en el viewport, no antes */
(function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 2000;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo: arranca rapido y frena suavemente al final
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            el.textContent = Math.floor(eased * target).toLocaleString('es-AR');
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target); // solo anima una vez
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
})();


/* scroll reveal
   agrega .visible a los elementos con clase .reveal cuando entran en pantalla
   los estilos de la animacion estan en global.css */
(function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px' // dispara un poco antes de que el elemento sea visible
    });

    revealEls.forEach(el => observer.observe(el));
})();


/* formulario de contacto - spinner y modal de confirmacion */
(function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('btnSubmit');
    const modalOverlay = document.getElementById('modalConfirmacion');
    const modalClose = document.getElementById('modalClose');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // checkValidity usa la validacion nativa de html5
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // mostrar spinner en el boton mientras "envia"
        if (submitBtn) submitBtn.classList.add('loading');

        // simular envio asincrono (2 segundos)
        setTimeout(() => {
            if (submitBtn) submitBtn.classList.remove('loading');
            form.reset();
            if (modalOverlay) {
                modalOverlay.classList.add('open');
                modalOverlay.focus();
            }
        }, 2000);
    });

    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('open');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', e => {
        // cerrar solo si se hizo click en el fondo, no en el modal en si
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
})();


/* newsletter del footer - mensaje de exito al suscribirse */
(function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = form.nextElementSibling;
            if (msg && msg.classList.contains('newsletter-success')) {
                form.style.display = 'none';
                msg.style.display = 'block';
            }
        });
    });
})();

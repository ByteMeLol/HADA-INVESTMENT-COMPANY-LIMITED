(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const carousel = document.getElementById('project-carousel');
        if (!carousel) return;

        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const indicators = Array.from(carousel.querySelectorAll('.carousel-indicator'));
        const prevBtn = carousel.querySelector('#carousel-prev');
        const nextBtn = carousel.querySelector('#carousel-next');

        let current = 0;
        const slideCount = slides.length;
        const intervalMs = 6000; // slow-motion speed
        let timer = null;
        let isPaused = false;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function setActiveIndicator(index) {
            indicators.forEach((dot, i) => {
                const active = i === index;
                dot.setAttribute('aria-current', active ? 'true' : 'false');
                dot.classList.toggle('bg-white/60', active);
                dot.classList.toggle('bg-white/40', !active);
            });
        }

        function show(index) {
            index = (index + slideCount) % slideCount;
            slides.forEach((s, i) => {
                const visible = i === index;
                s.classList.toggle('opacity-0', !visible);
                s.classList.toggle('opacity-100', visible);
                s.classList.toggle('pointer-events-none', !visible);
                s.classList.toggle('pointer-events-auto', visible);
                s.setAttribute('aria-hidden', visible ? 'false' : 'true');
                const p = s.querySelector('p');
                if (p) p.style.transform = visible ? 'translateY(0)' : 'translateY(8px)';
            });

            setActiveIndicator(index);
            current = index;
        }

        function next() { show(current + 1); }
        function prev() { show(current - 1); }

        // autoplay
        function start() {
            if (prefersReduced) return;
            stop();
            timer = setInterval(() => { if (!isPaused) next(); }, intervalMs);
        }
        function stop() { if (timer) { clearInterval(timer); timer = null; } }

        // events
        if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });

        indicators.forEach(dot => {
            dot.addEventListener('click', () => {
                show(parseInt(dot.dataset.index, 10));
                start();
            });
        });

        carousel.addEventListener('mouseenter', () => { isPaused = true; });
        carousel.addEventListener('mouseleave', () => { isPaused = false; });

        carousel.addEventListener('focusin', () => { isPaused = true; });
        carousel.addEventListener('focusout', () => { isPaused = false; });

        // keyboard
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        });
        // make carousel focusable
        carousel.tabIndex = 0;

        // basic swipe support
        let pointerDown = false;
        let startX = 0;
        let deltaX = 0;
        carousel.addEventListener('pointerdown', (e) => {
            pointerDown = true;
            startX = e.clientX;
        });
        window.addEventListener('pointermove', (e) => {
            if (!pointerDown) return;
            deltaX = e.clientX - startX;
        });
        window.addEventListener('pointerup', () => {
            if (!pointerDown) return;
            pointerDown = false;
            if (Math.abs(deltaX) > 50) {
                if (deltaX < 0) next(); else prev();
            }
            deltaX = 0;
        });

        // init
        show(0);
        start();

        // initialize AOS on this page if available
        if (window.AOS) {
            AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });
        }
    });
})();

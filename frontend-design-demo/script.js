/* ==============================
   NOCTIS — Interactions & Animations
   ============================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth trail follow
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.12;
        trailY += (mouseY - trailY) * 0.12;
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover detection for interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .fragrance-card, .ritual__step');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            cursorTrail.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            cursorTrail.classList.remove('hovering');
        });
    });

    // --- Scroll-Triggered Reveals ---
    const scrollElements = document.querySelectorAll(
        '.section-header, .section-label, .section-title, ' +
        '.fragrance-card, .story__left, .story__right, ' +
        '.story__text, .story__stats, ' +
        '.ritual__step, .ritual__step-divider, ' +
        '.footer__cta, .footer__bottom'
    );

    // Add scroll-reveal class to all elements
    scrollElements.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.style.transitionDelay = `${index % 4 * 0.1}s`;
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => observer.observe(el));

    // --- Parallax on Hero Visual ---
    const heroVisual = document.querySelector('.hero__visual');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = heroSection?.offsetHeight || 0;

        if (scrolled < heroHeight && heroVisual) {
            const parallax = scrolled * 0.3;
            heroVisual.style.transform = `translateY(${parallax}px)`;
        }
    });

    // --- Magnetic Button Effect ---
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // --- Nav Subtle Background on Scroll ---
    const nav = document.querySelector('.nav');
    let navSolid = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && !navSolid) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            navSolid = true;
        } else if (window.scrollY <= 100 && navSolid) {
            nav.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.9), transparent)';
            navSolid = false;
        }
    });

    // --- Fragrance Card Tilt Effect ---
    const cards = document.querySelectorAll('.fragrance-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `
                translateY(-8px) 
                perspective(800px) 
                rotateX(${y * -6}deg) 
                rotateY(${x * 6}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Staggered Stats Counter Animation ---
    const stats = document.querySelectorAll('.stat__number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const finalValue = el.textContent;
                
                if (finalValue === '∞') {
                    // Special animation for infinity
                    el.style.opacity = '0';
                    el.style.transform = 'scale(0.5)';
                    setTimeout(() => {
                        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.opacity = '1';
                        el.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    const target = parseInt(finalValue);
                    if (!isNaN(target)) {
                        let current = 0;
                        const increment = target / 40;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                el.textContent = target;
                                clearInterval(timer);
                            } else {
                                el.textContent = Math.floor(current);
                            }
                        }, 30);
                    }
                }
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
});

// EdNovas Cloud - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initHeroBackground();
    initPricingTabs();
    initAnimateOnScroll();
    initCounterAnimation();
    initBackToTop();
    initSmoothScroll();
    initMobileMenu();
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Hero Background from API =====
function initHeroBackground() {
    const heroBg = document.getElementById('hero-bg');
    const API_URL = 'https://api.ednovas.xyz';

    // Create an image element to test if the API returns an image
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = function () {
        // Image loaded successfully, use it as background
        heroBg.style.backgroundImage = `url(${API_URL})`;
        heroBg.style.opacity = '1';
    };

    img.onerror = function () {
        console.log('API image failed to load, using animated background');
        setAnimatedBackground();
    };

    // Try to load the image
    img.src = API_URL;

    // Set timeout fallback
    setTimeout(() => {
        if (!heroBg.style.backgroundImage || heroBg.style.backgroundImage === 'none') {
            setAnimatedBackground();
        }
    }, 5000);

    function setAnimatedBackground() {
        // Create an animated gradient background
        heroBg.innerHTML = `
            <div class="animated-bg">
                <div class="gradient-layer"></div>
                <div class="particles"></div>
            </div>
        `;

        // Add styles for animated background
        const style = document.createElement('style');
        style.textContent = `
            .animated-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .gradient-layer {
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: 
                    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(244, 63, 94, 0.2) 0%, transparent 50%),
                    linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
                animation: gradientMove 20s ease infinite;
            }
            @keyframes gradientMove {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(-5%, -5%) rotate(1deg); }
                50% { transform: translate(-10%, 0) rotate(0deg); }
                75% { transform: translate(-5%, 5%) rotate(-1deg); }
            }
            .particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.2), transparent),
                    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.15), transparent),
                    radial-gradient(2px 2px at 50px 160px, rgba(255,255,255,0.2), transparent),
                    radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.15), transparent),
                    radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.2), transparent),
                    radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.15), transparent);
                background-size: 200px 200px;
                animation: particleFloat 60s linear infinite;
            }
            @keyframes particleFloat {
                0% { transform: translateY(0); }
                100% { transform: translateY(-200px); }
            }
        `;
        document.head.appendChild(style);
        heroBg.style.opacity = '1';
    }
}

// ===== Pricing Tabs =====
function initPricingTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pricingGrids = document.querySelectorAll('.pricing-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding grid
            pricingGrids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.id === tab) {
                    grid.classList.add('active');
                }
            });
        });
    });
}

// ===== Animate on Scroll =====
function initAnimateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Apply staggered animation delay for grid items
                const parent = entry.target.parentElement;
                if (parent && parent.classList.contains('features-grid')) {
                    const children = parent.querySelectorAll('.feature-card');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .price-card, .testimonial-card, .contact-card, .about-content, .section-header'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== Counter Animation =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

// ===== Back to Top Button =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('active');
            }
        });
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Toggle icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;

    if (hero && scrolled < window.innerHeight) {
        const heroBg = document.getElementById('hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

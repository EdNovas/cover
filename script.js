import createGlobe from 'https://esm.sh/cobe';

// EdNovas Cloud - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initCobeGlobe(); // 3D地球
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
            if (link.getAttribute('href') === `#${current} `) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Cobe 3D Globe =====
function initCobeGlobe() {
    const canvas = document.getElementById('cobe-globe');
    const container = document.getElementById('globe-container');
    if (!canvas || !container) return;

    let phi = 0;
    let globe = null;

    // 节点位置数据 (经度, 纬度)
    const markers = [
        // 亚洲
        { location: [22.3193, 114.1694], size: 0.08 },  // 香港
        { location: [35.6762, 139.6503], size: 0.06 },  // 日本东京
        { location: [25.0330, 121.5654], size: 0.06 },  // 台湾
        { location: [1.3521, 103.8198], size: 0.05 },   // 新加坡
        { location: [37.5665, 126.9780], size: 0.05 },  // 韩国首尔
        { location: [22.3964, 114.1095], size: 0.04 },  // 澳门
        { location: [13.7563, 100.5018], size: 0.04 },  // 泰国曼谷
        { location: [14.5995, 120.9842], size: 0.04 },  // 菲律宾马尼拉
        { location: [3.1390, 101.6869], size: 0.04 },   // 马来西亚
        { location: [-6.2088, 106.8456], size: 0.04 },  // 印度尼西亚
        { location: [28.6139, 77.2090], size: 0.05 },   // 印度
        // 北美
        { location: [34.0522, -118.2437], size: 0.07 }, // 美国洛杉矶
        { location: [40.7128, -74.0060], size: 0.05 },  // 美国纽约
        { location: [43.6532, -79.3832], size: 0.05 },  // 加拿大多伦多
        { location: [45.4215, -75.6972], size: 0.04 },  // 加拿大渥太华
        // 欧洲
        { location: [51.5074, -0.1278], size: 0.06 },   // 英国伦敦
        { location: [52.5200, 13.4050], size: 0.05 },   // 德国柏林
        { location: [48.8566, 2.3522], size: 0.05 },    // 法国巴黎
        { location: [52.3676, 4.9041], size: 0.04 },    // 荷兰阿姆斯特丹
        { location: [55.7558, 37.6173], size: 0.05 },   // 俄罗斯莫斯科
        { location: [41.0082, 28.9784], size: 0.04 },   // 土耳其伊斯坦布尔
        // 大洋洲
        { location: [-33.8688, 151.2093], size: 0.05 }, // 澳大利亚悉尼
        // 南美
        { location: [-23.5505, -46.6333], size: 0.04 }, // 巴西圣保罗
        { location: [-34.6037, -58.3816], size: 0.04 }, // 阿根廷布宜诺斯艾利斯
        // 非洲
        { location: [-26.2041, 28.0473], size: 0.04 },  // 南非约翰内斯堡
        { location: [30.0444, 31.2357], size: 0.04 },   // 埃及开罗
        // 中东
        { location: [25.2048, 55.2708], size: 0.04 },   // 阿联酋迪拜
        { location: [31.7683, 35.2137], size: 0.04 },   // 以色列耶路撒冷
    ];

    const onResize = () => {
        if (globe) globe.destroy();

        // 获取容器宽度，限制最大宽度以防止过大
        let width = container.offsetWidth;

        // 设置 canvas 的 CSS 尺寸，确保它是正方形
        canvas.style.width = width + 'px';
        canvas.style.height = width + 'px';

        // 渲染尺寸（双倍像素比以获得高清效果）
        const size = width * 2;

        globe = createGlobe(canvas, {
            devicePixelRatio: 2,
            width: size,
            height: size,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.4, 0.4, 1],
            glowColor: [0.3, 0.3, 0.8],
            scale: 1, // 默认比例
            markers: markers,
            onRender: (state) => {
                // 自动旋转
                state.phi = phi;
                phi += 0.005;
                state.width = size;
                state.height = size;
            }
        });
    };

    // 初始化和监听窗口调整
    setTimeout(onResize, 100); // 稍微延迟以确保容器已渲染
    window.addEventListener('resize', onResize);
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
                        child.style.transitionDelay = `${index * 0.1} s`;
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .price-card, .testimonial-card, .contact-card, .about-content, .section-header, .region-card'
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
    opacity: 1!important;
    transform: translateY(0)!important;
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
    if (!backToTop) return;

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
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) return;

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

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

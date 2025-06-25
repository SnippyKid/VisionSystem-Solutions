// Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Call once on page load
    handleNavbarScroll();
    
    // Navbar animations
    function animateNavbar() {
        // Logo animation
        gsap.from('.navbar-logo', {
            y: -20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Menu items animation with staggered entry
        gsap.from('.nav-links li', {
            y: -15,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        // Contact button animation with pop effect
        gsap.from('.contact-btn', {
            scale: 0.8,
            y: -20,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.5)',
            delay: 0.3
        });
    }
    
    // Add subtle hover animations to all interactive elements
    function setupHoverEffects() {
        // Navbar links hover effect
        const navLinks = document.querySelectorAll('.nav-links li a');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power1.in'
                });
            });
        });
        
        // Logo hover effect
        const logo = document.querySelector('.navbar-logo');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                gsap.to(logo.querySelector('.logo-text span'), {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
            
            logo.addEventListener('mouseleave', () => {
                gsap.to(logo.querySelector('.logo-text span'), {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power1.in'
                });
            });
        }
    }
    
    // Tech SVG animations
    function setupTechAnimations() {
        if (document.querySelector('.hero')) {
            // Mouse movement parallax effect
            document.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                // Move tech elements based on mouse position
                gsap.to('.tech-circle', {
                    x: (mouseX - 0.5) * 20,
                    y: (mouseY - 0.5) * 20,
                    duration: 1,
                    ease: 'power1.out'
                });
                
                gsap.to('.tech-dot', {
                    x: (mouseX - 0.5) * 40,
                    y: (mouseY - 0.5) * 40,
                    duration: 1.5,
                    ease: 'power1.out',
                    stagger: 0.1
                });
                
                gsap.to('.circuit-node', {
                    x: (mouseX - 0.5) * 10,
                    y: (mouseY - 0.5) * 10,
                    duration: 1,
                    ease: 'power1.out'
                });
            });
            
            // Create dynamic tech dots
            createDynamicDots();
        }
    }
    
    // Create dynamic tech dots that move across the screen
    function createDynamicDots() {
        const svgContainer = document.querySelector('.svg-container');
        if (!svgContainer) return;
        
        for (let i = 0; i < 10; i++) {
            const dot = document.createElement('div');
            dot.className = 'tech-dot';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.width = Math.random() * 3 + 2 + 'px';
            dot.style.height = dot.style.width;
            dot.style.animationDelay = Math.random() * 5 + 's';
            svgContainer.appendChild(dot);
            
            // Animate dot movement
            gsap.to(dot, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                duration: Math.random() * 20 + 10,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    // Mobile menu toggle with improved animation
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('open');
                menuToggle.classList.toggle('active');
                body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
                
                // Just animate the nav items for a nice effect
                if (navLinks.classList.contains('open')) {
                    gsap.fromTo('.nav-links li', 
                        { 
                            x: 50, 
                            opacity: 0 
                        },
                        { 
                            x: 0, 
                            opacity: 1, 
                            stagger: 0.1, 
                            duration: 0.4, 
                            ease: 'power2.out',
                            delay: 0.2
                        }
                    );
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (
                    navLinks.classList.contains('open') && 
                    !navLinks.contains(e.target) && 
                    !menuToggle.contains(e.target)
                ) {
                    navLinks.classList.remove('open');
                    menuToggle.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }
    }
    
    // Fix for contact button active state
    function updateActiveState() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links li a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentPath.includes(href)) {
                link.classList.add('active');
            } else if (currentPath === '/' && href === 'index.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // FAQ Toggle Functionality (event delegation for reliability)
    function setupFaqToggle() {
        const faqContainer = document.querySelector('.faq-container');
        if (!faqContainer) return;

        // Remove any previous event listeners by replacing the container
        const newContainer = faqContainer.cloneNode(true);
        faqContainer.parentNode.replaceChild(newContainer, faqContainer);

        newContainer.addEventListener('click', function(e) {
            const question = e.target.closest('.faq-question');
            if (!question) return;
            const item = question.closest('.faq-item');
            if (!item) return;
            const allItems = newContainer.querySelectorAll('.faq-item');
            allItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    }
    
    // About page specific logic
    function animateAboutContentWrappers() {
        const animateElements = [
            '.content-wrapper'
        ];
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        animateElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                observer.observe(element);
            });
        });
    }
    
    // Set up Barba transitions
    barba.init({
        sync: false,
        preventRunning: true,
        timeout: 7000,
        views: [
            {
                namespace: 'faq',
                beforeEnter() {
                    // Ensure we're showing the correct content
                    document.title = "FAQ - Vision Systems & Solutions";
                }
            },
            {
                namespace: 'services',
                beforeEnter() {
                    // Ensure we're showing the correct content
                    document.title = "Services - Vision Systems & Solutions";
                }
            },
            {
                namespace: 'about',
                beforeEnter() {
                    document.title = "About Us - Vision Systems & Solutions";
                    animateAboutContentWrappers();
                }
            }
        ],
        transitions: [
            {
                name: 'tech-transition',
                to: { namespace: ['faq'] },
                async leave(data) {
                    // Kill any ScrollTriggers
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                    
                    // Page transition animation
                    const done = this.async();
                    await pageTransitionIn();
                    done();
                },
                async enter(data) {
                    // Page transition animation
                    await pageTransitionOut();
                    
                    // Animate navbar after page transition
                    animateNavbar();
                    
                    // Update active states
                    updateActiveState();
                    
                    // Setup tech animations
                    setupTechAnimations();
                    
                    // Force a reflow to ensure styles are applied
                    document.body.offsetHeight;
                    
                    // Ensure FAQ content is visible and properly initialized
                    setupFaqToggle();
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                }
            },
            {
                name: 'tech-transition',
                to: { namespace: ['services'] },
                async leave(data) {
                    // Kill any ScrollTriggers
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                    
                    // Page transition animation
                    const done = this.async();
                    await pageTransitionIn();
                    done();
                },
                async enter(data) {
                    // Page transition animation
                    await pageTransitionOut();
                    
                    // Animate navbar after page transition
                    animateNavbar();
                    
                    // Update active states
                    updateActiveState();
                    
                    // Setup tech animations
                    setupTechAnimations();
                    
                    // Force a reflow to ensure styles are applied
                    document.body.offsetHeight;
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                }
            },
            {
                name: 'default-transition',
                async leave(data) {
                    // Kill any ScrollTriggers
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                    
                    // Page transition animation
                    const done = this.async();
                    await pageTransitionIn();
                    done();
                },
                async enter(data) {
                    // Page transition animation
                    await pageTransitionOut();
                    
                    // Animate navbar after page transition
                    animateNavbar();
                    
                    // Update active states
                    updateActiveState();
                    
                    // Setup tech animations
                    setupTechAnimations();
                    
                    // Force a reflow to ensure styles are applied
                    document.body.offsetHeight;
                    
                    // Scroll to top
                    window.scrollTo(0, 0);
                }
            }
        ]
    });
    
    // Add a global hook to refresh styles after transitions
    barba.hooks.after((data) => {
        // Remove services content if it exists on non-services pages
        if (data.next.namespace !== 'services') {
            const detailedServices = document.querySelector('.detailed-services');
            if (detailedServices) detailedServices.remove();

            const servicesSlider = document.querySelector('.services-slider');
            if (servicesSlider) servicesSlider.remove();
        }
        // Remove trust banner if it exists on non-services pages
        if (data.next.namespace !== 'services') {
            const trustBanner = document.querySelector('.trust-banner');
            if (trustBanner) trustBanner.remove();
        }
        // Force browser to recalculate styles
        document.body.offsetHeight;
        
        // --- CLOSE MOBILE MENU ON PAGE TRANSITION ---
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        document.body.style.overflow = '';
        if (navLinks) navLinks.classList.remove('open');
        if (menuToggle) menuToggle.classList.remove('active');
        // ------------------------------------------------
        
        // Reinitialize components
        setupMobileMenu();
        setupHoverEffects();
        setupTechAnimations();
        updateActiveState();
        
        // Initialize page-specific components
        if (data.next.namespace === 'faq') {
            setupFaqToggle();
        }
        
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();

        // Reinitialize homepage animations if we're on the homepage
        if (document.querySelector('[data-barba-namespace="home"]')) {
            const event = new Event('DOMContentLoaded');
            document.dispatchEvent(event);
        }
        // Re-trigger About page title animation
        if (document.querySelector('[data-barba-namespace="about"]')) {
            const pageTitle = document.querySelector('[data-barba-namespace="about"] .page-title');
            if (pageTitle) {
                pageTitle.style.animation = 'none';
                void pageTitle.offsetWidth;
                pageTitle.style.animation = '';
            }
        }
    });
    
    // Page transition animations
    function pageTransitionIn() {
        const tl = gsap.timeline();
        
        // Create and append RGB overlay if it doesn't exist
        if (!document.querySelector('.rgb-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'rgb-overlay';
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            document.body.appendChild(overlay);
        }
        
        // Tech-inspired transition in
        tl.to('.rgb-overlay', {
            duration: 0.5,
            scaleY: 1,
            transformOrigin: 'bottom',
            ease: 'power4.inOut'
        });
        
        return tl;
    }
    
    function pageTransitionOut() {
        const tl = gsap.timeline();
        
        // Tech-inspired transition out
        tl.to('.rgb-overlay', {
            duration: 0.5,
            scaleY: 0,
            transformOrigin: 'top',
            ease: 'power4.inOut'
        });
        
        return tl;
    }
    
    // Helper function to initialize Swiper on services page
    function initializeServicesSwipers() {
        // Check if Swiper is already initialized
        const existingSwiper = document.querySelector('.swiper-initialized');
        if (existingSwiper) return;
        
        // Initialize any swipers on the page
        const swipers = document.querySelectorAll('.swiper:not(.swiper-initialized)');
        if (swipers.length > 0) {
            swipers.forEach(swiperEl => {
                // Basic initialization - adjust parameters as needed
                new Swiper(swiperEl, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    autoHeight: true
                });
            });
        }
    }
    
    // Services Details Accordion and Animation
    function setupServicesDetails() {
        const container = document.querySelector('[data-barba-namespace="services"]');
        if (!container) return;
        // Animate service cards
        const serviceCards = container.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + (index * 150));
        });
        // Animate and setup accordion for detail cards
        const detailCards = container.querySelectorAll('.detail-card');
        detailCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 600 + (index * 150));
            const header = card.querySelector('.detail-header');
            if (header) {
                header.addEventListener('click', () => {
                    card.classList.toggle('active');
                    detailCards.forEach(otherCard => {
                        if (otherCard !== card && otherCard.classList.contains('active')) {
                            otherCard.classList.remove('active');
                        }
                    });
                });
            }
        });
    }
    
    // Initialize everything on first load
    animateNavbar();
    setupMobileMenu();
    setupHoverEffects();
    setupTechAnimations();
    updateActiveState();
    setupFaqToggle();
    setupServicesDetails();
    
    // Reinitialize after Barba page transitions
    barba.hooks.after(() => {
        setupMobileMenu();
        setupHoverEffects();
        setupTechAnimations();
        updateActiveState();
        setupFaqToggle();
        setupServicesDetails();
        ScrollTrigger.refresh();
    });

    // About page specific logic
    function initAboutPage() {
        // Scroll-triggered animation for .content-wrapper
        function animateContentWrappers() {
            const animateElements = [
                '.content-wrapper'
            ];
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            animateElements.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    observer.observe(element);
                });
            });
        }

        // Barba.js transitions for about page
        if (typeof barba !== 'undefined') {
            barba.init({
                transitions: [{
                    name: 'about-opacity-transition',
                    leave(data) {
                        return gsap.to(data.current.container, {
                            opacity: 0,
                            duration: 0.5
                        });
                    },
                    enter(data) {
                        return gsap.from(data.next.container, {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => animateContentWrappers()
                        });
                    }
                }]
            });
        } else {
            animateContentWrappers();
        }
    }

    // Call about page logic only if on about page
    if (document.querySelector('main[data-barba-namespace="about"]')) {
        initAboutPage();
    }

    var contactContainer = document.querySelector('[data-barba-namespace="contact"]');
    if (contactContainer) {
        // Apply fade-up class to elements
        const pageTitle = document.querySelector('.page-title');
        const introText = document.querySelector('.intro-text');
        const sectionTitle = document.querySelector('.section-title');
        const locationMap = document.querySelector('.location-map');
        const locationInfo = document.querySelector('.location-info');

        [pageTitle, introText, sectionTitle, locationMap, locationInfo].forEach(el => {
            if (el) el.classList.add('fade-up');
        });

        setTimeout(() => {
            [pageTitle, introText, sectionTitle, locationMap, locationInfo].forEach((el, index) => {
                if (el) {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, index * 200);
                }
            });
        }, 100);

        // GSAP ScrollTrigger for scroll animations
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            gsap.from('.location-map iframe', {
                scrollTrigger: {
                    trigger: '.location-map',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out'
            });
        }
    }

    // Homepage-specific JS
    function initHomePage() {
        // Animation for Featured Services Section
        const animateFeaturedServices = () => {
            const subtitle = document.querySelector('.section-subtitle');
            const title = document.querySelector('.section-title');
            const description = document.querySelector('.section-description');
            const serviceItems = document.querySelectorAll('.service-item');
            // Animate header elements
            gsap.to(subtitle, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
            gsap.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out'
            });
            gsap.to(description, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.4,
                ease: 'power2.out'
            });
            // Animate service items with stagger
            gsap.to(serviceItems, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                delay: 0.6,
                ease: 'power2.out'
            });
        };
        // Animation for CTA Section
        const animateCTA = () => {
            const ctaContent = document.querySelector('.cta-content');
            gsap.to(ctaContent, {
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top 80%'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        };
        // Initialize animations
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            setTimeout(() => {
                animateFeaturedServices();
                animateCTA();
                ScrollTrigger.refresh();
            }, 200);
        }
        // Handle button hover effects
        const buttons = document.querySelectorAll('.cta-btn, .service-link');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button.querySelector('i'), {
                    x: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button.querySelector('i'), {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            });
        });
    }
    // Call homepage JS only when on homepage
    if (document.querySelector('[data-barba-namespace="home"]')) {
        initHomePage();
    }
    // Also call after Barba.js transitions
    if (typeof barba !== 'undefined') {
        barba.hooks.after(() => {
            if (document.querySelector('[data-barba-namespace="home"]')) {
                initHomePage();
            }
        });
    }
}); 
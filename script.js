// ================================================
// PREMIUM ANNIVERSARY WEBSITE - JAVASCRIPT
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initParticles();
    initGalleryModal();
    initTypewriter();
    initReplayButton();
    initVideoOptimization();
});

// ================================================
// NAVIGATION
// ================================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        lastScroll = currentScroll;
    });
}

// ================================================
// SCROLL REVEAL ANIMATIONS
// ================================================
function initScrollEffects() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add stagger effect for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const delay = entry.target.dataset.delay || 0;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, revealOptions);

    revealElements.forEach((el, index) => {
        // Add stagger delay for similar elements
        if (el.closest('.timeline')) {
            el.dataset.delay = (index % 12) * 100;
        }
        if (el.closest('.promises-grid')) {
            el.style.transitionDelay = `${(index % 8) * 100}ms`;
        }
        if (el.closest('.gallery-grid')) {
            el.style.transitionDelay = `${(index % 12) * 50}ms`;
        }
        
        revealObserver.observe(el);
    });
}

// ================================================
// FLOATING PARTICLES
// ================================================
function initParticles() {
    const particleContainers = document.querySelectorAll('.particles');
    
    particleContainers.forEach(container => {
        createParticles(container);
    });
}

function createParticles(container) {
    const particleCount = 30;
    const types = ['dot', 'heart'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const type = types[Math.floor(Math.random() * types.length)];
        
        if (type === 'heart') {
            particle.className = 'particle-heart';
            particle.innerHTML = ['💗', '✨', '💫', '❤️', '💕'][Math.floor(Math.random() * 5)];
        } else {
            particle.className = 'particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        }
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// ================================================
// GALLERY MODAL
// ================================================
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    let currentIndex = 0;
    const images = [];
    
    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.dataset.caption;
        images.push({
            src: img.src,
            caption: caption
        });
        
        item.addEventListener('click', () => {
            openModal(index);
        });
    });
    
    function openModal(index) {
        currentIndex = index;
        updateModalContent();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateModalContent() {
        modalImage.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].caption;
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateModalContent();
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModalContent();
    }
    
    // Event listeners
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    modalNext.addEventListener('click', showNext);
    modalPrev.addEventListener('click', showPrev);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
    
    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
    }
}

// ================================================
// TYPEWRITER EFFECT FOR LETTER
// ================================================
function initTypewriter() {
    const letterSection = document.getElementById('letter');
    const letterParagraphs = document.querySelectorAll('#letterText p');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateLetterParagraphs();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(letterSection);
    
    function animateLetterParagraphs() {
        letterParagraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('visible');
            }, index * 800);
        });
    }
}

// ================================================
// REPLAY BUTTON
// ================================================
function initReplayButton() {
    const replayBtn = document.getElementById('replayBtn');
    
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Reset animations after scroll
            setTimeout(() => {
                resetAnimations();
            }, 1000);
        });
    }
}

function resetAnimations() {
    const revealElements = document.querySelectorAll('.revealed');
    const letterParagraphs = document.querySelectorAll('#letterText p');
    
    revealElements.forEach(el => {
        el.classList.remove('revealed');
    });
    
    letterParagraphs.forEach(p => {
        p.classList.remove('visible');
    });
    
    // Re-initialize scroll effects
    setTimeout(() => {
        initScrollEffects();
    }, 500);
}

// ================================================
// VIDEO OPTIMIZATION
// ================================================
function initVideoOptimization() {
    const videos = document.querySelectorAll('.video-bg video');
    
    // Intersection Observer for video playback
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                video.play().catch(() => {
                    // Autoplay failed, likely due to browser policy
                    console.log('Autoplay prevented');
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });
    
    videos.forEach(video => {
        // Set video attributes
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Preload metadata only
        video.preload = 'metadata';
        
        // Observe video
        videoObserver.observe(video);
        
        // Handle video loading
        video.addEventListener('loadeddata', () => {
            video.closest('.video-bg').style.opacity = '1';
        });
        
        // Fallback for video errors
        video.addEventListener('error', () => {
            video.closest('.video-bg').style.background = 
                'linear-gradient(135deg, var(--deep-plum), var(--soft-wine))';
        });
    });
}

// ================================================
// SMOOTH SCROLL POLYFILL CHECK
// ================================================
if (!('scrollBehavior' in document.documentElement.style)) {
    // Fallback for browsers without smooth scroll support
    const scrollToSmooth = (target) => {
        const startPosition = window.pageYOffset;
        const targetPosition = target.offsetTop - 80;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        const easeInOutCubic = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        requestAnimationFrame(animation);
    };
}

// ================================================
// PERFORMANCE: THROTTLE SCROLL EVENTS
// ================================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================================================
// LAZY LOAD IMAGES
// ================================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });
    
    images.forEach(img => imageObserver.observe(img));
}

// ================================================
// PRELOADER (Optional)
// ================================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .reveal-up');
        heroElements.forEach(el => el.classList.add('revealed'));
    }, 300);
});

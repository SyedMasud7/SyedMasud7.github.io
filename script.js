// Smooth scrolling for navigation links
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

// Navbar background on scroll with smooth transition
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Cursor trail effect
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(trail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
};

createCursorTrail();

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    animateOnScroll.observe(element);
});

// Apply split reveal to stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.classList.add('split-reveal');
    card.style.animationDelay = `${index * 0.15}s`;
});

// Apply horizontal reveal to timeline items (alternating directions)
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    if (index % 2 === 0) {
        item.classList.add('horizontal-reveal');
    } else {
        item.classList.add('horizontal-reveal-right');
    }
    item.style.animationDelay = `${index * 0.2}s`;
});

// Apply split reveal to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.classList.add('split-reveal');
    card.style.animationDelay = `${index * 0.15}s`;
});

// Apply horizontal reveal to skill categories (alternating)
document.querySelectorAll('.skill-category').forEach((category, index) => {
    if (index % 2 === 0) {
        category.classList.add('horizontal-reveal');
    } else {
        category.classList.add('horizontal-reveal-right');
    }
    category.style.animationDelay = `${index * 0.1}s`;
});

// Apply vertical reveal to contact cards
document.querySelectorAll('.contact-card').forEach((card, index) => {
    card.classList.add('vertical-reveal');
    card.style.animationDelay = `${index * 0.15}s`;
});

// Apply clip reveal to about text paragraphs
document.querySelectorAll('.about-text p').forEach((p, index) => {
    p.classList.add('clip-reveal');
    p.style.transitionDelay = `${index * 0.2}s`;
});

// Observer for triggering animations on scroll
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

// Apply observer to all animated elements
document.querySelectorAll('.fade-in-up, .slide-in, .fade-in-scale, .slide-in-left, .split-reveal, .horizontal-reveal, .horizontal-reveal-right, .vertical-reveal, .clip-reveal').forEach(element => {
    scrollAnimationObserver.observe(element);
});

// Section title animations with split text effect
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Split text animation
            const text = entry.target.textContent;
            entry.target.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px) rotateX(-90deg)';
                span.style.transition = `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.03}s`;
                entry.target.appendChild(span);
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) rotateX(0)';
                }, 50);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// Wave animation for hero title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.animationDelay = `${index * 0.05}s`;
        span.style.opacity = '1';
        heroTitle.appendChild(span);
    });
}

// Smooth fade-in effect for hero subtitle (removed laggy typing)
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    setTimeout(() => {
        subtitle.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
    }, 600);
}

// Tagline fade in
const tagline = document.querySelector('.tagline');
if (tagline) {
    tagline.style.opacity = '0';
    tagline.style.transform = 'translateY(20px)';
    setTimeout(() => {
        tagline.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';
    }, 1000);
}

// Animate CTA buttons
const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
ctaButtons.forEach((btn, index) => {
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(20px)';
    setTimeout(() => {
        btn.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
    }, 1400 + (index * 150));
});

// Animate social icons
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach((icon, index) => {
    icon.style.opacity = '0';
    icon.style.transform = 'translateY(20px)';
    setTimeout(() => {
        icon.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        icon.style.opacity = '1';
        icon.style.transform = 'translateY(0)';
    }, 1700 + (index * 100));
});

// Skill items hover effect with ripple
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards 3D tilt effect with enhanced animation
document.querySelectorAll('.project-card').forEach(card => {
    card.style.transition = 'transform 0.3s ease';
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn, .social-icon').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Enhanced Parallax effect for multiple elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.15);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    // Parallax for section backgrounds
    document.querySelectorAll('section').forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            const offset = (scrollPercent - 0.5) * 50;
            section.style.backgroundPosition = `center ${offset}px`;
        }
    });
    
    // Parallax for about stats
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        const rect = aboutStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.1;
            aboutStats.style.transform = `translateY(${-offset}px)`;
        }
    }
    
    // Parallax for project images
    document.querySelectorAll('.project-image').forEach(image => {
        const rect = image.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.05;
            image.style.transform = `translateY(${offset}px)`;
        }
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            // You can add counter animations here if needed
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Add pulse animation to featured project tag
const featuredTag = document.querySelector('.project-tag');
if (featuredTag) {
    setInterval(() => {
        featuredTag.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            featuredTag.style.animation = '';
        }, 500);
    }, 3000);
}

// Smooth reveal for about text
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    aboutObserver.observe(aboutText);
}

// Animate skill items on scroll
document.querySelectorAll('.skill-category').forEach(category => {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.skill-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = `fadeInScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
                    }, index * 50);
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillObserver.observe(category);
});

// Animate timeline icons with pop effect
document.querySelectorAll('.timeline-item').forEach(item => {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('.timeline-icon');
                if (icon) {
                    icon.style.animation = 'iconPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                }
            }
        });
    }, { threshold: 0.5 });
    
    timelineObserver.observe(item);
});

// Particle effect for hero section
const createParticles = () => {
    const hero = document.querySelector('.hero');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

createParticles();

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Add reveal animation to nav links on load
document.querySelectorAll('.nav-links li').forEach((li, index) => {
    li.style.opacity = '0';
    li.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        li.style.transition = 'all 0.5s ease';
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
});

// Animate logo on load
const logo = document.querySelector('.logo');
if (logo) {
    logo.style.opacity = '0';
    logo.style.transform = 'translateX(-30px)';
    setTimeout(() => {
        logo.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        logo.style.opacity = '1';
        logo.style.transform = 'translateX(0)';
    }, 50);
}

// Add glitch effect to featured project tag
const featuredTags = document.querySelectorAll('.project-tag');
featuredTags.forEach(tag => {
    tag.classList.add('glitch-effect');
    tag.setAttribute('data-text', tag.textContent);
});

console.log('🚀 Portfolio loaded with enhanced animations!');

// Function to launch Hintify
function launchHintify(event) {
    event.preventDefault();
    
    // Directly open Hintify at localhost:8000
    window.open('http://localhost:8000', '_blank');
}

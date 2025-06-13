// Global variables
let particles = [];
let currentFilter = 'all';
let skillsAnimated = false;
let countersAnimated = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initTypingAnimation();
    initNavigation();
    initProjectFilters();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initContactForm();
    initMobileNav();
});

// Particle Animation System
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 80;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }

    // Animate particles
    animateParticles();
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.8 + 0.2;
    
    container.appendChild(particle);
    particles.push(particle);
}

function animateParticles() {
    particles.forEach(particle => {
        // Add subtle movement
        const moveX = (Math.random() - 0.5) * 2;
        const moveY = (Math.random() - 0.5) * 2;
        
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    requestAnimationFrame(animateParticles);
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const text = "Building the Future: Electronics, Blockchain & Markets—One Innovation at a Time";
    const speed = 50;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Update active nav link
            updateActiveNavLink(this);
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Add navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.9)';
        }
    });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Project filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bars animation when skills section is visible
                if (entry.target.closest('#skills') && !skillsAnimated) {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 500);
                    skillsAnimated = true;
                }
                
                // Trigger counters animation when about section is visible
                if (entry.target.closest('#about') && !countersAnimated) {
                    setTimeout(() => {
                        animateCounters();
                    }, 500);
                    countersAnimated = true;
                }
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll(
        '.glass-card, .project-card, .skill-category, .blog-card, .stat-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bar animations - Fixed implementation
function initSkillBars() {
    // This function now just sets up the elements, actual animation is triggered by scroll
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Animated counters - Fixed implementation
function initCounters() {
    // This function now just sets up, actual animation is triggered by scroll
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach((element, index) => {
        setTimeout(() => {
            animateCounter(element);
        }, index * 200);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        const btn = form.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.classList.add('hidden');
        btnLoading.classList.add('show');
        btn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Reset button state
            btnText.classList.remove('hidden');
            btnLoading.classList.remove('show');
            btn.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    });
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--neon-blue)' : 'var(--neon-pink)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 0 20px ${type === 'success' ? 'rgba(0, 212, 255, 0.4)' : 'rgba(255, 0, 110, 0.4)'};
        z-index: 10000;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Mobile navigation
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Enhanced mouse trail effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
        createMouseTrail(e.clientX, e.clientY);
    }
});

function createMouseTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 3px;
        height: 3px;
        background: var(--neon-blue);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        transform: translate(-50%, -50%);
        animation: trailFade 1.2s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 1200);
}

// Add CSS for trail animation
const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Parallax scrolling effect
window.addEventListener('scroll', throttle(function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.circuit-overlay');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16));

// Add glow effect to buttons on hover
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.6)';
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.4)';
        this.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to clickable elements
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(circle);
    
    setTimeout(() => {
        if (circle.parentNode) {
            circle.parentNode.removeChild(circle);
        }
    }, 600);
}

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 600ms linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple effect to buttons
document.querySelectorAll('.btn, .filter-btn, .project-link, .social-link').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Optimize performance by throttling scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced loading screen animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--dark-bg) 0%, #1a1f3a 50%, #0f1729 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.8s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.style.cssText = `
        text-align: center;
    `;
    
    const loaderText = document.createElement('div');
    loaderText.style.cssText = `
        color: var(--neon-blue);
        font-size: 2rem;
        font-weight: 600;
        text-shadow: var(--text-glow);
        animation: pulse 1.5s ease-in-out infinite;
        margin-bottom: 1rem;
    `;
    loaderText.textContent = 'MOLLI VAMSI KRISHNA';
    
    const loaderSubtext = document.createElement('div');
    loaderSubtext.style.cssText = `
        color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
    `;
    loaderSubtext.textContent = 'Loading Portfolio...';
    
    loaderContent.appendChild(loaderText);
    loaderContent.appendChild(loaderSubtext);
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    // Hide loader after 1.5 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 800);
    }, 1500);
});

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe all sections for reveal animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Add typing effect to section titles when they come into view
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title = entry.target;
            const text = title.textContent;
            title.textContent = '';
            
            let i = 0;
            const typeEffect = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeEffect, 50);
                }
            };
            
            setTimeout(typeEffect, 200);
        }
    });
}, { threshold: 0.8 });

// Apply typing effect to section titles (except hero)
document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});
// JavaScript for Digital Marketing Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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
    
    // Hero scroll indicator click
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                const delay = index * 200;
                setTimeout(() => {
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll([
        '.animate-fade-in',
        '.animate-fade-in-delay',
        '.animate-fade-in-delay-2',
        '.animate-slide-up',
        '.animate-float'
    ].join(','));
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Enhanced counter animation for stats
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isDollar = target.includes('$');
        const isPlus = target.includes('+');
        
        let numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = numericTarget / 60; // Slower animation
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isDollar) {
                displayValue = '$' + displayValue + 'M';
            } else if (isPercentage) {
                displayValue = displayValue + '%';
            } else if (isPlus) {
                displayValue = displayValue + '+';
            }
            
            element.textContent = displayValue;
        }, 50);
    };
    
    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    setTimeout(() => animateCounter(statNumber), 300);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Enhanced CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button, .pricing-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show contact form or redirect
            showContactModal();
        });
        
        // Add magnetic effect
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-3px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Simplified feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Team Carousel Functionality
    const teamCarousel = document.querySelector('.team-carousel');
    const dots = document.querySelectorAll('.dot');
    const teamMembers = document.querySelectorAll('.team-member');
    let currentSlide = 0;
    const totalSlides = teamMembers.length;
    
    // Calculate how many members to show at once
    const getVisibleMembers = () => {
        if (window.innerWidth >= 1200) return 4;
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 480) return 2;
        return 1;
    };
    
    const updateCarousel = () => {
        const visibleMembers = getVisibleMembers();
        const slideWidth = 100 / visibleMembers;
        const maxSlide = Math.max(0, totalSlides - visibleMembers);
        
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        
        const translateX = -(currentSlide * slideWidth);
        teamCarousel.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-advance carousel
    setInterval(() => {
        const visibleMembers = getVisibleMembers();
        const maxSlide = Math.max(0, totalSlides - visibleMembers);
        
        currentSlide = (currentSlide + 1) % (maxSlide + 1);
        updateCarousel();
    }, 5000);
    
    // Update carousel on window resize
    window.addEventListener('resize', updateCarousel);
    
    // Initialize carousel
    updateCarousel();
    
    // Pricing card selection and enhancement
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            pricingCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Add selection effect
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
        
        // Add glow effect on hover
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.4), 0 0 50px rgba(225, 6, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.boxShadow = '';
            }
        });
    });
    
    // Scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #E10600, #D4AF37);
            z-index: 9999;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    createScrollProgress();
    
    // Simple parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroCta = document.querySelector('.hero-cta');
            
            if (heroTitle) heroTitle.classList.add('visible');
            if (heroSubtitle) setTimeout(() => heroSubtitle.classList.add('visible'), 300);
            if (heroCta) setTimeout(() => heroCta.classList.add('visible'), 600);
        }, 500);
    });
    
    // Contact modal (enhanced)
    function showContactModal() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(15px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
            border: 2px solid #D4AF37;
            border-radius: 20px;
            padding: 50px;
            max-width: 600px;
            width: 90%;
            text-align: center;
            transform: scale(0.8) translateY(50px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(212, 175, 55, 0.2);
            position: relative;
            overflow: hidden;
        `;
        
        modalContent.innerHTML = `
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1), transparent); pointer-events: none;"></div>
            <h3 style="color: #D4AF37; margin-bottom: 20px; font-size: 2.5rem; text-transform: uppercase; position: relative;">GET YOUR FREE AUDIT</h3>
            <p style="color: #ccc; margin-bottom: 40px; font-size: 1.2rem; position: relative;">Ready to accelerate your digital growth? Let's connect!</p>
            <form class="contact-form" style="text-align: left; position: relative;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <input type="text" placeholder="Your Name" required style="width: 100%; padding: 18px; background: rgba(26, 26, 26, 0.8); border: 2px solid #333; color: white; border-radius: 10px; font-size: 16px; transition: all 0.3s ease;">
                    <input type="email" placeholder="Your Email" required style="width: 100%; padding: 18px; background: rgba(26, 26, 26, 0.8); border: 2px solid #333; color: white; border-radius: 10px; font-size: 16px; transition: all 0.3s ease;">
                </div>
                <input type="tel" placeholder="Your Phone Number" style="width: 100%; padding: 18px; margin-bottom: 20px; background: rgba(26, 26, 26, 0.8); border: 2px solid #333; color: white; border-radius: 10px; font-size: 16px; transition: all 0.3s ease;">
                <textarea placeholder="Tell us about your project and goals" rows="5" style="width: 100%; padding: 18px; margin-bottom: 30px; background: rgba(26, 26, 26, 0.8); border: 2px solid #333; color: white; border-radius: 10px; resize: vertical; font-size: 16px; transition: all 0.3s ease;"></textarea>
                <button type="submit" style="width: 100%; padding: 18px; background: linear-gradient(135deg, #E10600, #D4AF37); color: white; border: none; border-radius: 50px; font-weight: 700; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; font-size: 16px; box-shadow: 0 10px 30px rgba(225, 6, 0, 0.3);">SEND MESSAGE</button>
            </form>
            <button class="close-modal" style="position: absolute; top: 20px; right: 25px; background: none; border: none; color: #D4AF37; font-size: 30px; cursor: pointer; transition: all 0.3s ease;">&times;</button>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Animate modal in
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modalContent.style.transform = 'scale(1) translateY(0)';
        }, 10);
        
        // Close modal functionality
        const closeModal = () => {
            modalOverlay.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8) translateY(50px)';
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
            }, 400);
        };
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        
        modalContent.querySelector('.close-modal').addEventListener('click', closeModal);
        
        // Enhanced form interactions
        const inputs = modalContent.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#D4AF37';
                this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = '#333';
                this.style.boxShadow = '';
            });
        });
        
        // Handle form submission
        modalContent.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = e.target.querySelector('button[type="submit"]');
            submitButton.innerHTML = 'SENDING...';
            submitButton.disabled = true;
            submitButton.style.background = '#666';
            
            setTimeout(() => {
                submitButton.innerHTML = '✓ MESSAGE SENT!';
                submitButton.style.background = 'linear-gradient(135deg, #4CAF50, #D4AF37)';
                
                setTimeout(() => {
                    closeModal();
                }, 1500);
            }, 2000);
        });
    }
});

// CSS for additional effects
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .pricing-card.selected {
        border-color: #D4AF37 !important;
        transform: scale(1.02) !important;
        box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3) !important;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.98);
        padding: 20px;
        gap: 20px;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    .loaded {
        animation: fadeInBody 0.5s ease-out;
    }
    
    @keyframes fadeInBody {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
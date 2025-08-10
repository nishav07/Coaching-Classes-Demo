// OOPs based animations 

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        this.createRipple();
    }


    
    createRipple() {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: var(--primary-color);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            opacity: 0.3;
        `;
        
        this.themeToggle.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

class addCourse {
    constructor() {
        this.card;
        this.content;
    }
}

class MobileNav {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        

        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}


class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}


class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);
        
        this.init();
    }
    
    init() {
        const elementsToAnimate = document.querySelectorAll('[data-animate]');
        elementsToAnimate.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    animateElement(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
            element.classList.add('animate');
            
            if (animationType === 'counter') {
                this.animateCounter(element);
            }
        }, delay);
    }
    
    animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        const target = parseInt(numberElement.getAttribute('data-target'));
        const duration = 3000; // 3 seconds for fast animation
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                numberElement.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                numberElement.textContent = target;
                numberElement.classList.add('animate-counter');
            }
        };
        
        updateCounter();
    }
}

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateFormField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        if (this.validateForm(data)) {
            this.submitForm(data);
        }
    }
    
    validateFormField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showError(field.name, 'This field is required');
        }
    }

    validateForm(data) {
        let isValid = true;
        
        const requiredFields = ['name', 'email', 'phone', 'course'];
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                this.showError(field, 'This field is required');
                isValid = false;
            }
        });
        
        
        if (data.email && !this.isValidEmail(data.email)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
       
        if (data.phone && !this.isValidPhone(data.phone)) {
            this.showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    showError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const formGroup = field.closest('.form-group');
        
        
        this.clearError(field);
        field.style.borderBottomColor = 'var(--accent-color)';
        

        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--accent-color);
            font-size: 0.9rem;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        `;
        
        formGroup.appendChild(errorElement);
    }
    
    clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            errorMessage.remove();
        }
        
        field.style.borderBottomColor = '';
    }
    
    async submitForm(data) {
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.querySelector('span').textContent;
        
        // Show loading state
        submitButton.querySelector('span').textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showSuccessMessage();
            this.form.reset();
            
        } catch (error) {
            this.showErrorMessage('Failed to send message. Please try again.');
        } finally {
            // Reset button
            submitButton.querySelector('span').textContent = originalText;
            submitButton.disabled = false;
        }
    }
    
    showSuccessMessage() {
        const message = this.createMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.form.parentNode.insertBefore(message, this.form);
        
        setTimeout(() => message.remove(), 5000);
    }
    
    showErrorMessage(text) {
        const message = this.createMessage(text, 'error');
        this.form.parentNode.insertBefore(message, this.form);
        
        setTimeout(() => message.remove(), 5000);
    }
    
    createMessage(text, type) {
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            padding: 15px 20px;
            border-radius: var(--border-radius);
            margin-bottom: 20px;
            font-weight: 500;
            animation: slideInUp 0.3s ease;
            ${type === 'success' 
                ? 'background: var(--success-color); color: white;' 
                : 'background: var(--accent-color); color: white;'
            }
        `;
        
        return message;
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.elements = document.querySelectorAll('.blob, .particles');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateParallax());
        window.addEventListener('mousemove', (e) => this.updateMouseParallax(e));
    }
    
    updateParallax() {
        const scrollY = window.pageYOffset;
        
        this.elements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    updateMouseParallax(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            blob.style.transform += ` translate(${x}px, ${y}px)`;
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadResources();
        
        // Add loading animation
        this.addLoadingAnimation();
    }
    
    lazyLoadImages() {
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
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    preloadResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Orbitron:wght@400;700;900&display=swap'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
    
    addLoadingAnimation() {
        // Remove loading class when page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Animate hero content
            this.animateHeroContent();
        });
    }
    
    animateHeroContent() {
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'slideUp 0.8s ease-out forwards';
            }, index * 200);
        });
    }
}

// Course Card Interactions
class CourseCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.course-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        });
    }
    
    handleMouseEnter(e) {
        const card = e.currentTarget;
        const glow = card.querySelector('.card-glow');
        
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
        if (glow) glow.style.opacity = '0.3';
    }
    
    handleMouseLeave(e) {
        const card = e.currentTarget;
        const glow = card.querySelector('.card-glow');
        
        card.style.transform = '';
        if (glow) glow.style.opacity = '0';
    }
    
    handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new AnimationObserver();
    new ContactForm();
    new ParallaxEffects();
    new PerformanceOptimizer();
    new CourseCardEffects();
    
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .loaded .hero-title .title-line {
            animation: slideUp 0.8s ease-out forwards;
        }
        
        .loaded .hero-title .title-highlight {
            animation: slideUp 0.8s ease-out forwards, glow 2s ease-in-out infinite alternate;
        }
    `;
    document.head.appendChild(style);
});

// Error handling for external resources
window.addEventListener('error', (e) => {
    console.warn('Resource loading error:', e.target.src || e.target.href);
});

// Service Worker Registration (for better performance)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}

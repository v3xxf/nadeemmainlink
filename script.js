// Trading-specific animations and live data simulation
document.addEventListener('DOMContentLoaded', function() {
    // Animate price ticker with live updates
    function updateTickerPrices() {
        const tickerItems = document.querySelectorAll('.ticker-item');
        tickerItems.forEach(item => {
            const priceEl = item.querySelector('.ticker-price');
            const changeEl = item.querySelector('.ticker-change');
            
            if (priceEl && changeEl) {
                const isUp = changeEl.classList.contains('up');
                const currentPrice = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ''));
                
                // Simulate price movement (±0.1% to ±0.5%)
                const changePercent = (Math.random() * 0.004 - 0.002) * (isUp ? 1 : -1);
                const newPrice = currentPrice * (1 + changePercent);
                
                // Format price based on symbol
                if (priceEl.textContent.includes('$')) {
                    priceEl.textContent = '$' + newPrice.toFixed(2);
                } else if (priceEl.textContent.includes(',')) {
                    priceEl.textContent = newPrice.toFixed(2);
                } else {
                    priceEl.textContent = newPrice.toFixed(4);
                }
                
                // Animate price change
                priceEl.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    priceEl.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    // Update prices every 2-3 seconds
    setInterval(updateTickerPrices, 2000 + Math.random() * 1000);

    // Animate trading stats numbers
    function animateStats() {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            if (stat.textContent.includes('%')) {
                const target = parseFloat(stat.textContent);
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target.toFixed(1) + '%';
                        clearInterval(timer);
                    } else {
                        stat.textContent = current.toFixed(1) + '%';
                    }
                }, 30);
            } else if (stat.textContent.includes('$') || stat.textContent.includes('M$')) {
                // Handle format like "13.4M$" or "+$13.4M"
                const isNewFormat = stat.textContent.includes('M$');
                const parsedValue = parseFloat(stat.textContent.replace(/[^0-9.]/g, ''));
                
                // If format is "XM$", the value is already in millions, don't divide by 1000
                // If format is "$X" or "+$X", we need to check if it's already millions
                let target;
                if (isNewFormat) {
                    // Already in millions format (e.g., "13.4M$")
                    target = parsedValue;
                } else {
                    // Check if value is large enough to be in millions
                    if (parsedValue >= 1000) {
                        target = parsedValue / 1000; // Convert to millions
                    } else {
                        target = parsedValue; // Already in millions
                    }
                }
                
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        if (isNewFormat) {
                            stat.textContent = target.toFixed(1) + 'M$';
                        } else {
                            stat.textContent = '$' + target.toFixed(1) + 'M';
                        }
                        clearInterval(timer);
                    } else {
                        if (isNewFormat) {
                            stat.textContent = current.toFixed(1) + 'M$';
                        } else {
                            stat.textContent = '$' + current.toFixed(1) + 'M';
                        }
                    }
                }, 30);
            } else if (stat.textContent.includes(',')) {
                const target = parseFloat(stat.textContent.replace(/,/g, ''));
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }, 30);
            }
        });
    }

    // Start stats animation after a delay
    setTimeout(animateStats, 500);

    // Logo image is now used instead of SVG candlestick patterns

    // Create floating trading indicators (reduced on mobile for performance)
    function createTradingIndicator() {
        // Reduce frequency on mobile devices
        const isMobile = window.innerWidth <= 767;
        if (isMobile && Math.random() > 0.3) return; // 70% chance to skip on mobile
        
        const indicators = ['📈', '💰', '📊', '⚡', '🎯'];
        const indicator = document.createElement('div');
        indicator.className = 'floating-indicator';
        indicator.textContent = indicators[Math.floor(Math.random() * indicators.length)];
        indicator.style.position = 'fixed';
        indicator.style.left = Math.random() * 100 + '%';
        indicator.style.top = '100%';
        indicator.style.fontSize = isMobile ? '1.5rem' : '2rem';
        indicator.style.opacity = '0.3';
        indicator.style.pointerEvents = 'none';
        indicator.style.zIndex = '1';
        indicator.style.animation = 'floatUp 5s ease-out forwards';
        document.body.appendChild(indicator);

        setTimeout(() => {
            indicator.remove();
        }, 5000);
    }

    // Create floating indicators periodically (less frequent on mobile)
    const indicatorInterval = window.innerWidth <= 767 ? 5000 : 3000;
    setInterval(createTradingIndicator, indicatorInterval);

    // Advanced animations and interactions
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate buttons on scroll
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach((button, index) => {
        observer.observe(button);
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });

    // Button click handlers with ripple effect
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);

            const link = this.getAttribute('data-link');
            
            if (link === '#' || !link) {
                e.preventDefault();
                console.log('Button clicked:', this.querySelector('.btn-text').textContent);
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            } else {
                window.location.href = link;
            }
        });
    });

    // Header icon button handlers with animations
    const headerIcons = document.querySelectorAll('.header .icon-btn');
    headerIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const ariaLabel = this.getAttribute('aria-label');
            console.log('Header icon clicked:', ariaLabel);
            
            // Add click animation
            this.style.transform = 'scale(0.9) rotate(180deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });

        // Add hover sound effect simulation (visual feedback)
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Footer platform icon handlers with enhanced animations
    const platformIcons = document.querySelectorAll('.platform-icon');
    platformIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            const ariaLabel = this.getAttribute('aria-label');
            console.log('Platform icon clicked:', ariaLabel);
            
            // Add bounce animation
            this.style.transform = 'translateY(-5px) scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 400);
        });

        // Parallax effect on mouse move
        icon.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Logo hover effects
    const logoCircle = document.querySelector('.logo-circle');
    if (logoCircle) {
        logoCircle.addEventListener('mouseenter', function() {
            this.style.animation = 'logoPulse 1s ease-in-out infinite, logoRotate 10s linear infinite';
        });

        logoCircle.addEventListener('mouseleave', function() {
            this.style.animation = 'logoPulse 3s ease-in-out infinite, logoRotate 20s linear infinite';
        });
    }

    // Add floating animation to profile name
    const profileName = document.querySelector('.profile-name');
    if (profileName) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            
            profileName.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });
    }

    // Add cursor trail effect (disabled on mobile/touch devices for performance)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        let cursorTrail = [];
        const maxTrailLength = 10;

        document.addEventListener('mousemove', (e) => {
            if (cursorTrail.length >= maxTrailLength) {
                const oldTrail = cursorTrail.shift();
                if (oldTrail && oldTrail.parentNode) {
                    oldTrail.parentNode.removeChild(oldTrail);
                }
            }

            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.width = '4px';
            trail.style.height = '4px';
            trail.style.borderRadius = '50%';
            trail.style.background = 'rgba(0, 255, 0, 0.5)';
            trail.style.pointerEvents = 'none';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.zIndex = '9999';
            trail.style.transition = 'opacity 0.5s ease';
            document.body.appendChild(trail);

            cursorTrail.push(trail);

            setTimeout(() => {
                trail.style.opacity = '0';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 500);
            }, 100);
        });
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add parallax effect to main content (reduced on mobile for performance)
    let ticking = false;
    const isMobile = window.innerWidth <= 767;
    const parallaxIntensity = isMobile ? 0.05 : 0.1; // Less parallax on mobile
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const mainContent = document.querySelector('.main-content');
                if (mainContent && !isMobile) { // Disable parallax on mobile for better performance
                    mainContent.style.transform = `translateY(${scrolled * parallaxIntensity}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('action-btn')) {
                focusedElement.click();
            }
        }
    });

    // Add touch feedback for mobile
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Add CSS for ripple effect and trading animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }

    .floating-indicator {
        will-change: transform, opacity;
    }

    /* Trading price flash animation */
    @keyframes priceFlash {
        0%, 100% { background-color: transparent; }
        50% { background-color: rgba(0, 255, 0, 0.2); }
    }

    .ticker-price.up.updating {
        animation: priceFlash 0.3s ease;
    }
`;
document.head.appendChild(style);

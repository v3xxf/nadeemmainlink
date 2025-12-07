// Matrix Money Rain Effect
const moneySymbols = ['💵', '💰', '💸', '$', '€', '£', '¥', '₿', '1', '0', '9', '8', '7', '6', '5', '4', '3', '2'];
const moneyRain = document.getElementById('money-rain');
let dropCount = 0;
let maxDrops = 50; // Default, will be adjusted based on device

function createMoneyDrop() {
    if (dropCount >= maxDrops) return;
    
    const drop = document.createElement('div');
    drop.className = 'money-drop';
    drop.textContent = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
    
    const left = Math.random() * 100;
    const duration = 3 + Math.random() * 4; // 3-7 seconds
    const delay = Math.random() * 2;
    const fontSize = 16 + Math.random() * 12; // 16-28px
    
    drop.style.left = left + '%';
    drop.style.fontSize = fontSize + 'px';
    drop.style.animationDuration = duration + 's';
    drop.style.animationDelay = delay + 's';
    
    // Random starting position
    drop.style.transform = `translateY(${-100 - Math.random() * 200}px)`;
    
    moneyRain.appendChild(drop);
    dropCount++;
    
    // Remove drop after animation
    setTimeout(() => {
        drop.remove();
        dropCount--;
    }, (duration + delay) * 1000);
}

// Create initial drops
function initMoneyRain() {
    const initialDrops = maxDrops < 30 ? 10 : 20;
    for (let i = 0; i < initialDrops; i++) {
        setTimeout(() => {
            createMoneyDrop();
        }, i * 200);
    }
}

// Continuously create new drops
function startMoneyRain() {
    const isMobile = window.innerWidth <= 480;
    maxDrops = isMobile ? 25 : 50; // Fewer drops on mobile for performance
    const interval = isMobile ? 500 : 300; // Slower on mobile
    
    initMoneyRain();
    setInterval(() => {
        if (dropCount < maxDrops) {
            createMoneyDrop();
        }
    }, interval);
}

// Simple landing page script
document.addEventListener('DOMContentLoaded', function() {
    // Start money rain effect
    startMoneyRain();
    
    // Add smooth loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add click animation to button
    const telegramButton = document.querySelector('.telegram-button');
    if (telegramButton) {
        telegramButton.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Touch feedback for mobile
        telegramButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        telegramButton.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Adjust money rain on resize
    window.addEventListener('resize', () => {
        // Reset drop count to allow new drops
        dropCount = Math.min(dropCount, maxDrops / 2);
    });
});

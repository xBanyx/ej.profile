// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a nav item is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Sticky Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));

// Contact Form Simulation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get button to change text
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    
    // Simulate sending delay
    setTimeout(() => {
        alert('Message sent successfully!');
        contactForm.reset();
        btn.innerText = originalText;
    }, 1500);
});
    document.addEventListener('DOMContentLoaded', () => {
        const track = document.querySelector('.carousel-track');
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');

        // Scroll amount equal to one card width
        const scrollAmount = track.offsetWidth;

        nextBtn.addEventListener('click', () => {
            track.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    });
    // ============================================
// PROJECTS CAROUSEL - OPTIMIZED
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.projects-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Exit if carousel elements don't exist
    if (!wrapper || !prevBtn || !nextBtn) return;
    
    // Get card width dynamically
    const getCardWidth = () => {
        const card = wrapper.querySelector('.project-card');
        if (!card) return 0;
        return card.offsetWidth + parseInt(getComputedStyle(wrapper).gap || 0);
    };
    
    // Scroll functions
    const scrollLeft = () => {
        wrapper.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    };
    
    const scrollRight = () => {
        wrapper.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    };
    
    // Event listeners
    prevBtn.addEventListener('click', scrollLeft);
    nextBtn.addEventListener('click', scrollRight);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                scrollRight();
            } else {
                scrollLeft();
            }
        }
    };
    
    // Hide buttons at boundaries (optional)
    const updateButtonVisibility = () => {
        if (prevBtn) prevBtn.style.opacity = wrapper.scrollLeft <= 0 ? '0.5' : '1';
        if (nextBtn) {
            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
            nextBtn.style.opacity = wrapper.scrollLeft >= maxScroll - 1 ? '0.5' : '1';
        }
    };
    
    wrapper.addEventListener('scroll', updateButtonVisibility);
    updateButtonVisibility();
});
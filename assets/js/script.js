// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        navbar.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section (throttled for performance)
const hero = document.querySelector('.hero');
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3; // Reduced intensity
    if (hero) {
        hero.style.transform = `translateY(${parallax}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add animation to cards on scroll
const cards = document.querySelectorAll('.research-card, .timeline-content');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});

// Collapsible publications functionality
function toggleYear(year) {
    const publications = document.getElementById(`publications-${year}`);
    const icon = document.getElementById(`icon-${year}`);
    
    if (publications.style.display === 'none') {
        publications.style.display = 'block';
        icon.textContent = '▲';
        icon.style.transform = 'rotate(0deg)';
    } else {
        publications.style.display = 'none';
        icon.textContent = '▼';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Toggle future startups section
function toggleFutureStartups() {
    const futureStartups = document.getElementById('futureStartups');
    const toggleBtn = document.getElementById('futureToggleBtn');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    const toggleIcon = toggleBtn.querySelector('.toggle-icon svg');
    
    if (futureStartups.hasAttribute('hidden')) {
        futureStartups.removeAttribute('hidden');
        futureStartups.style.opacity = '0';
        futureStartups.style.transform = 'translateY(20px)';
        futureStartups.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        toggleText.textContent = 'Hide Future Ideas';
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleIcon.style.transform = 'rotate(180deg)';
        
        requestAnimationFrame(() => {
            futureStartups.style.opacity = '1';
            futureStartups.style.transform = 'translateY(0)';
        });
        
        setTimeout(() => {
            futureStartups.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 200);
    } else {
        futureStartups.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        futureStartups.style.opacity = '0';
        futureStartups.style.transform = 'translateY(10px)';
        
        toggleText.textContent = 'Explore Future Ideas';
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleIcon.style.transform = 'rotate(0deg)';
        
        setTimeout(() => {
            futureStartups.setAttribute('hidden', '');
            futureStartups.style.opacity = '';
            futureStartups.style.transform = '';
            futureStartups.style.transition = '';
        }, 220);
    }
}

// Initialize all publication lists as collapsed by default
document.addEventListener('DOMContentLoaded', function() {
    const years = ['2025', '2024', '2023'];
    years.forEach(year => {
        const publications = document.getElementById(`publications-${year}`);
        const icon = document.getElementById(`icon-${year}`);
        
        if (publications && icon) {
            publications.style.display = 'none';
            icon.textContent = '▼';
        }
    });

    // Initialize future startups section as hidden
    const futureStartups = document.getElementById('futureStartups');
    const futureToggleBtn = document.getElementById('futureToggleBtn');
    if (futureStartups && futureToggleBtn) {
        futureStartups.setAttribute('hidden', '');
        futureToggleBtn.setAttribute('aria-expanded', 'false');
    }

    // Initialize scroll animations
    initScrollAnimations();
});

// Scroll animation functionality
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

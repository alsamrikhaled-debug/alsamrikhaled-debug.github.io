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

// Throttle function for better performance
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

// Combined scroll handler for better performance
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const hero = document.querySelector('.hero');
let ticking = false;

function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Navbar scroll effect
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

    // Active navigation link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (currentScroll >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Parallax effect for hero section
    if (hero) {
        const parallax = currentScroll * 0.3;
        hero.style.transform = `translateY(${parallax}px)`;
    }

    ticking = false;
}

// Single scroll event listener with requestAnimationFrame throttling
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// Single IntersectionObserver for all animated elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a slight delay for staggered animation
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate');
                // Stop observing after animation to save resources
                observer.unobserve(entry.target);
            }, index * 50);
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.addEventListener('DOMContentLoaded', function () {
    // Observe sections (but not the hero section which is always visible)
    document.querySelectorAll('section:not(.hero)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe cards and other animated elements
    document.querySelectorAll('.research-card, .timeline-content, .scroll-animate').forEach(element => {
        observer.observe(element);
    });

    // Initialize publication lists as collapsed
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

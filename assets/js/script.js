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

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    hero.style.transform = `translateY(${parallax}px)`;
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
    const toggleArrow = toggleBtn.querySelector('.toggle-arrow svg');
    
    if (futureStartups.style.display === 'none' || futureStartups.style.display === '') {
        // Show the section
        futureStartups.style.display = 'block';
        futureStartups.style.opacity = '0';
        futureStartups.style.transform = 'translateY(30px)';
        
        // Update button
        toggleText.textContent = 'Hide Future Ventures';
        toggleArrow.style.transform = 'rotate(180deg)';
        toggleBtn.classList.add('active');
        
        // Animate in
        setTimeout(() => {
            futureStartups.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            futureStartups.style.opacity = '1';
            futureStartups.style.transform = 'translateY(0)';
        }, 50);
        
        // Smooth scroll to the section
        setTimeout(() => {
            futureStartups.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }, 300);
    } else {
        // Hide the section
        futureStartups.style.transition = 'all 0.4s ease';
        futureStartups.style.opacity = '0';
        futureStartups.style.transform = 'translateY(30px)';
        
        // Update button
        toggleText.textContent = 'Explore Future Ventures';
        toggleArrow.style.transform = 'rotate(0deg)';
        toggleBtn.classList.remove('active');
        
        setTimeout(() => {
            futureStartups.style.display = 'none';
        }, 400);
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
    if (futureStartups) {
        futureStartups.style.display = 'none';
    }

    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize progress bar animations
    initProgressBars();
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

// Progress bar animation functionality
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset width to 0 and animate to target width
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}



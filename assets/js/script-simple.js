// Simple, safe JavaScript without potential infinite loops

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

// Simple navbar scroll effect (throttled)
let lastScroll = 0;
let scrollTimeout;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            navbar.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    }, 10);
});

// Collapsible publications functionality
function toggleYear(year) {
    const publications = document.getElementById(`publications-${year}`);
    const icon = document.getElementById(`icon-${year}`);
    
    if (publications && icon) {
        if (publications.style.display === 'none') {
            publications.style.display = 'block';
            icon.textContent = '▲';
        } else {
            publications.style.display = 'none';
            icon.textContent = '▼';
        }
    }
}

// Toggle future startups section
function toggleFutureStartups() {
    const futureStartups = document.getElementById('futureStartups');
    const toggleBtn = document.getElementById('futureToggleBtn');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    const toggleArrow = toggleBtn.querySelector('.toggle-arrow svg');
    
    if (futureStartups && toggleBtn && toggleText && toggleArrow) {
        if (futureStartups.style.display === 'none' || futureStartups.style.display === '') {
            futureStartups.style.display = 'block';
            toggleText.textContent = 'Hide Future Ventures';
            toggleArrow.style.transform = 'rotate(180deg)';
            toggleBtn.classList.add('active');
        } else {
            futureStartups.style.display = 'none';
            toggleText.textContent = 'Explore Future Ventures';
            toggleArrow.style.transform = 'rotate(0deg)';
            toggleBtn.classList.remove('active');
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    try {
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
        if (futureStartups) {
            futureStartups.style.display = 'none';
        }
        
        console.log('Website initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

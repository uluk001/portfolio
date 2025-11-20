// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Add typing effect to the title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Intersection Observer for animations
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

// Observe elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-content, .hero-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Experience switcher
    setupExperienceSwitcher();
});

// Experience Switcher
function setupExperienceSwitcher() {
    const experiences = {
        mdigital: {
            title: 'Backend Python Developer',
            achievements: [
                'Built catalog modules with auto-ingest from API and Excel files; the MMarket catalog offers 70,000+ SKUs.',
                'Created and implemented internal SDKs for the payment gateway, simplifying integration and reducing payment-related errors across projects (including publishing payler-sdk on PyPI).',
                'Introduced a Redis cache layer for catalog and pricing, reducing DB load and keeping product pages fast.',
                'Improved full-text search in Elasticsearch with synonyms, typo tolerance, and text cleaning optimizations.',
                'Consolidated service logs into a single ELK stack, speeding up error detection and analysis.',
                'Set up DevOps infrastructure using Docker/Docker Swarm and GitLab CI/CD, enabling fast and predictable releases.'
            ],
            technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Elasticsearch', 'Docker Swarm', 'GitLab CI/CD', 'Redis', 'Prometheus', 'Grafana', 'RabbitMQ']
        },
        launchist: {
            title: 'Backend Python Developer',
            achievements: [
                'Designed and implemented roles and permissions using Permify, centralizing and simplifying access control.',
                'Implemented the outbox/inbox pattern with Kafka and DLQ, eliminating duplicate and lost events between services.',
                'Split Celery tasks by priority and added locks, preventing delays of fast operations.',
                'Developed asynchronous clients for Airtable, Slack, YouTrack, and WhatsApp APIs, reducing API response time on external calls by 30–40%.',
                'Configured event handling in Kafka with idempotent keys, ensuring exactly-once processing.',
                'Integrated digital document signing via API; approval time reduced from days to ~2–3 hours (median).',
                'Optimized complex queries in Beanie and PostgreSQL (indexes, aggregations, partitioning), significantly accelerating reports and data retrieval.'
            ],
            technologies: ['Python 3.10-3.11', 'FastAPI', 'Django', 'DRF', 'PostgreSQL', 'MongoDB (Beanie)', 'Redis', 'Kafka', 'Celery', 'Docker', 'GCP', 'asyncio', 'Pytest']
        }
    };
    
    const experienceItems = document.querySelectorAll('.experience-item');
    const positionTitle = document.querySelector('.position-title');
    const achievementsContainer = document.querySelector('.experience-achievements');
    const techTags = document.querySelector('.tech-tags');
    
    experienceItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            experienceItems.forEach(exp => exp.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update content based on which company was clicked
            const company = index === 0 ? 'mdigital' : 'launchist';
            const data = experiences[company];
            
            // Update title
            positionTitle.textContent = data.title;
            
            // Update achievements
            achievementsContainer.innerHTML = data.achievements.map(achievement => `
                <div class="achievement-item">
                    <div class="bullet-point"></div>
                    <p>${achievement}</p>
                </div>
            `).join('');
            
            // Update technologies
            techTags.innerHTML = data.technologies.map(tech => `
                <span class="tech-tag">${tech}</span>
            `).join('');
        });
    });
}
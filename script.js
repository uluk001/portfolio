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
        launchist: {
            title: 'Software Engineer',
            meta: 'Launchist LLC, Feb 2022 to Jul 2024, Remote',
            projects: [
                {
                    name: 'Multi-tenant B2B SaaS Platform',
                    context: 'Async FastAPI / Django backend: wallet, billing, integrations, RBAC, webhooks (GCP Cloud Run).',
                    achievements: [
                        'Built a Kafka outbox / inbox pipeline with idempotency and DLQ for reliable exactly-once event processing across services.',
                        'Designed a multi-currency wallet ledger (MongoDB, Beanie) with double-entry logic and optimized schemas and queries across MongoDB and PostgreSQL.',
                        'Implemented fine-grained multi-tenant RBAC (Permify) with permission checks integrated into FastAPI.',
                        'Built async integrations (httpx) with Airtable, Slack, YouTrack and WhatsApp, cutting external API latency by 30 to 40%.',
                        'Shipped a webhook-driven e-signature workflow with a state machine and retries that cut approval time from days to 2 to 3 hours (median).'
                    ]
                }
            ],
            technologies: ['Python', 'FastAPI', 'Django / DRF', 'Kafka', 'Celery', 'MongoDB (Beanie)', 'PostgreSQL', 'Redis', 'Permify', 'httpx', 'GCP Cloud Run', 'Docker', 'PyTest']
        }
    };

    const experienceItems = document.querySelectorAll('.experience-item');
    const positionTitle = document.querySelector('.position-title');
    const positionMeta = document.querySelector('.position-meta');
    const achievementsContainer = document.querySelector('.experience-achievements');
    const techTags = document.querySelector('.tech-tags');

    if (!positionTitle || !positionMeta || !achievementsContainer || !techTags) {
        return;
    }

    const initiallyActiveItem = document.querySelector('.experience-item.active');
    const staticCompany = initiallyActiveItem ? initiallyActiveItem.dataset.company : null;
    const staticExperienceMarkup = {
        title: positionTitle.textContent,
        meta: positionMeta.textContent,
        achievements: achievementsContainer.innerHTML,
        technologies: techTags.innerHTML
    };

    function restoreStaticExperience() {
        positionTitle.textContent = staticExperienceMarkup.title;
        positionMeta.textContent = staticExperienceMarkup.meta;
        achievementsContainer.innerHTML = staticExperienceMarkup.achievements;
        techTags.innerHTML = staticExperienceMarkup.technologies;
    }

    function renderExperience(experience) {
        positionTitle.textContent = experience.title;
        positionMeta.textContent = experience.meta;

        achievementsContainer.innerHTML = experience.projects.map(project => `
            <div class="exp-project">
                <h4 class="project-name">${project.name}</h4>
                <p class="project-context">${project.context}</p>
                ${project.achievements.map(achievement => `
                    <div class="achievement-item">
                        <div class="bullet-point"></div>
                        <p>${achievement}</p>
                    </div>
                `).join('')}
            </div>
        `).join('');

        techTags.innerHTML = experience.technologies.map(technology => `
            <span class="tech-tag">${technology}</span>
        `).join('');
    }

    function selectExperience(selectedItem) {
        const company = selectedItem.dataset.company;
        if (company !== staticCompany && !experiences[company]) {
            return;
        }

        experienceItems.forEach(item => {
            const isSelected = item === selectedItem;
            item.classList.toggle('active', isSelected);
            item.setAttribute('aria-selected', String(isSelected));
        });

        if (company === staticCompany) {
            restoreStaticExperience();
        } else {
            renderExperience(experiences[company]);
        }
    }

    experienceItems.forEach(item => {
        item.addEventListener('click', () => selectExperience(item));
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectExperience(item);
            }
        });
    });
}

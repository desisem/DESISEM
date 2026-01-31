// DOM Elements
const header = document.querySelector('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const newsContainer = document.getElementById('news-container');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .fade-in-up');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(revealCallback, {
    threshold: 0.15,
    rootMargin: "0px"
});

revealElements.forEach(element => {
    observer.observe(element);
});

// Load News from JSON
async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const news = await response.json();

        // Clear loading spinner
        newsContainer.innerHTML = '';

        news.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card', 'reveal-bottom');

            // Random Unsplash image for demo purposes since we don't have images for each news item yet
            // In a real scenario, these would come from the JSON
            const randomImageId = Math.floor(Math.random() * 1000);

            newsCard.innerHTML = `
                <img src="https://picsum.photos/seed/${item.id}/800/600" alt="${item.title}" class="news-img" onerror="this.src='assets/img/hero-bg.png'">
                <div class="news-content">
                    <span class="news-date">${formatDate(item.date)}</span>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="${item.links}" class="news-link">Leer más <i class="fas fa-arrow-right"></i></a>
                </div>
            `;

            newsContainer.appendChild(newsCard);
            observer.observe(newsCard); // Observe new elements
        });

    } catch (error) {
        console.error('Error loading news:', error);
        // Fallback data for local file viewing without server
        const fallbackNews = [
            {
                "id": 1,
                "title": "El Futuro de la IA en los Negocios",
                "date": "2024-03-15",
                "summary": "Descubre cómo la inteligencia artificial está revolucionando la optimización de procesos empresariales.",
                "links": "#"
            },
            {
                "id": 2,
                "title": "Ciberseguridad: Prioridad 2024",
                "date": "2024-03-10",
                "summary": "Nuevas amenazas requieren nuevas soluciones. Analizamos las mejores prácticas.",
                "links": "#"
            },
            {
                "id": 3,
                "title": "Migración a la Nube Eficiente",
                "date": "2024-03-05",
                "summary": "Estrategias clave para migrar sus sistemas legacy a la nube sin interrupciones.",
                "links": "#"
            }
        ];

        newsContainer.innerHTML = '';
        fallbackNews.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card', 'reveal-bottom');
            newsCard.innerHTML = `
                <img src="https://picsum.photos/seed/${item.id}/800/600" alt="${item.title}" class="news-img" onerror="this.src='assets/img/hero-bg.png'">
                <div class="news-content">
                    <span class="news-date">${formatDate(item.date)}</span>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="${item.links}" class="news-link">Leer más <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            newsContainer.appendChild(newsCard);
            observer.observe(newsCard);
        });
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
}

// Custom Cursor Effect (Optional Premium touch)
const cursor = document.querySelector('.cursor-glow');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
});

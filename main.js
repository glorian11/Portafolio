import { translations } from './translations.js';

const projects = [
    {
        title: "Cocktail's Library",
        description: "Aplicación web de búsqueda de cócteles que permite a los usuarios explorar diferentes bebidas, ver ingredientes y recetas. Desarrollada con JavaScript y APIs externas.",
        video: "assets/cocktails.mp4",
        fallbackImage: "assets/development-4536630_1280.webp",
        technologies: ["JavaScript", "HTML", "CSS", "API REST"],
        link: "https://glorian11.github.io/Cocteleria/"
    },
    {
        title: "El Bodorrio de las Cuchis",
        description: "Plataforma web para evento de boda con galería de fotos en tiempo real, permitiendo a los invitados compartir y ver las fotos del evento instantáneamente.",
        video: "assets/wedding.mp4",
        fallbackImage: "assets/development-4536630_1280.webp",
        technologies: ["JavaScript", "HTML", "CSS", "Real-time Updates"],
        link: "http://www.elbodorriodelascuchis.com/"
    },
    {
        title: "Pokédex App",
        description: "Aplicación interactiva que permite buscar y visualizar información detallada sobre Pokémon, incluyendo estadísticas, tipos y sprites. Desarrollada en colaboración con un equipo de desarrolladores.",
        video: "assets/pokemon.mp4",
        fallbackImage: "assets/development-4536630_1280.webp",
        technologies: ["JavaScript", "HTML", "CSS", "PokéAPI"],
        link: "https://vanerezk.github.io/Pokemon/"
    }
];

function loadProjects() {
    const projectsContainer = document.querySelector('.projects-grid');
    const currentLang = localStorage.getItem('language') || 'es';
    
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        
        const translatedProject = translations[currentLang].projects.items[index];
        
        projectElement.innerHTML = `
            <div class="video-container">
                <video autoplay loop muted playsinline class="project-video">
                    <source src="${project.video}" type="video/mp4">
                </video>
                <div class="overlay"></div>
            </div>
            <div class="content">
                <h3>${translatedProject.title}</h3>
                <p>${translatedProject.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn primary" target="_blank">${translations[currentLang].projects.viewProject}</a>
            </div>
        `;
        
        const video = projectElement.querySelector('.project-video');
        
        video.addEventListener('canplay', () => {
            console.log(`Video for ${project.title} is ready to play`);
        });

        video.addEventListener('error', (e) => {
            console.error(`Error loading video for ${project.title}:`, e.target.error);
            console.error('Video source:', video.currentSrc);
        });
        
        projectsContainer.appendChild(projectElement);
    });
}

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function handleExpandableContent() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const expandableContent = document.querySelector('.expandable-content');
    
    if (readMoreBtn && expandableContent) {
        readMoreBtn.addEventListener('click', () => {
            expandableContent.classList.toggle('expanded');
            readMoreBtn.classList.toggle('expanded');
            
            const isExpanded = expandableContent.classList.contains('expanded');
            readMoreBtn.innerHTML = isExpanded ? 
                'Leer menos <i class="fas fa-chevron-up"></i>' : 
                'Leer más <i class="fas fa-chevron-down"></i>';
        });
    }
}

function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });
}

function initLanguageToggle() {
    const languageToggleBtn = document.getElementById('language-toggle');
    let currentLang = localStorage.getItem('language') || 'es';
    
    // Aplicar el idioma inicial
    setLanguage(currentLang);
    
    languageToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang);
        setLanguage(currentLang);
    });
}

function setLanguage(lang) {
    const languageToggleBtn = document.getElementById('language-toggle');
    languageToggleBtn.textContent = `🌐 ${lang.toUpperCase()}`;
    
    // Actualizar textos de navegación
    document.querySelector('a[href="#inicio"]').textContent = translations[lang].nav.home;
    document.querySelector('a[href="#proyectos"]').textContent = translations[lang].nav.projects;
    document.querySelector('a[href="#sobre-mi"]').textContent = translations[lang].nav.about;
    document.querySelector('a[href="#contacto"]').textContent = translations[lang].nav.contact;
    
    // Actualizar hero section
    document.querySelector('.hero h1').textContent = translations[lang].hero.title;
    document.querySelector('.hero-description').textContent = translations[lang].hero.description;
    document.querySelector('.hero .btn.primary').textContent = translations[lang].hero.viewProjects;
    document.querySelector('.hero .btn.secondary').textContent = translations[lang].hero.contact;
    
    // Actualizar skills section
    document.querySelector('#habilidades h2').textContent = translations[lang].skills.title;
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards[0].querySelector('h3').textContent = translations[lang].skills.frontend.title;
    skillCards[0].querySelector('p').textContent = translations[lang].skills.frontend.description;
    skillCards[1].querySelector('h3').textContent = translations[lang].skills.backend.title;
    skillCards[1].querySelector('p').textContent = translations[lang].skills.backend.description;
    skillCards[2].querySelector('h3').textContent = translations[lang].skills.tools.title;
    skillCards[2].querySelector('p').textContent = translations[lang].skills.tools.description;
    
    // Actualizar projects section
    document.querySelector('#proyectos h2').textContent = translations[lang].projects.title;
    document.querySelector('#proyectos .section-description').textContent = translations[lang].projects.description;
    
    // Actualizar los proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const projectData = translations[lang].projects.items[index];
        card.querySelector('h3').textContent = projectData.title;
        card.querySelector('p').textContent = projectData.description;
        card.querySelector('.btn.primary').textContent = translations[lang].projects.viewProject;
    });
    
    // Actualizar about section
    document.querySelector('#sobre-mi h2').textContent = translations[lang].about.title;
    document.querySelector('.about-text .intro').textContent = translations[lang].about.intro;
    
    const readMoreBtn = document.querySelector('.read-more-btn');
    const isExpanded = document.querySelector('.expandable-content').classList.contains('expanded');
    readMoreBtn.innerHTML = isExpanded ? 
        `${translations[lang].about.readLess} <i class="fas fa-chevron-up"></i>` : 
        `${translations[lang].about.readMore} <i class="fas fa-chevron-down"></i>`;
    
    // Actualizar el contenido expandible del about
    document.querySelector('.experience-block h3').textContent = translations[lang].about.experience.title;
    document.querySelector('.experience-block p').textContent = translations[lang].about.experience.description;
    document.querySelector('.projects-block h3').textContent = translations[lang].about.projects.title;
    document.querySelector('.projects-block p').textContent = translations[lang].about.projects.description;
    document.querySelector('.goals-block h3').textContent = translations[lang].about.goals.title;
    document.querySelector('.goals-block p').textContent = translations[lang].about.goals.description;
    
    // Actualizar contact section
    document.querySelector('#contacto h2').textContent = translations[lang].contact.title;
    document.querySelector('.github-profile h3').textContent = translations[lang].contact.github.title;
    document.querySelector('.github-profile p').textContent = translations[lang].contact.github.description;
    document.querySelector('.github-text').textContent = translations[lang].contact.github.viewProfile;
    document.querySelector('.email-profile h3').textContent = translations[lang].contact.email.title;
    document.querySelector('.email-profile p').textContent = translations[lang].contact.email.description;
    document.querySelector('.email-cta').textContent = translations[lang].contact.email.cta;
    
    // Actualizar footer
    document.querySelector('.footer-content p').textContent = translations[lang].footer.copyright;
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    smoothScroll();
    handleExpandableContent();
    initThemeToggle();
    initLanguageToggle();
});

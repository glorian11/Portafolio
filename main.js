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
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        
        projectElement.innerHTML = `
            <div class="video-container">
                <video autoplay loop muted playsinline class="project-video">
                    <source src="${project.video}" type="video/mp4">
                </video>
                <div class="overlay"></div>
            </div>
            <div class="content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn primary" target="_blank">Ver Proyecto</a>
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

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    smoothScroll();
    handleExpandableContent();
    initThemeToggle();
});

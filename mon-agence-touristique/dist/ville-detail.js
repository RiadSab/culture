// Script pour les pages de détail des villes impériales
// Fonction pour gérer l'animation des éléments au scroll
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .zoom-in, .timeline-item');
    // Observer pour l'animation au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.animationPlayState = 'running';
                // Ne plus observer cet élément une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    // Observer tous les éléments à animer
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
// Fonction pour gérer la galerie lightbox
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    if (lightbox && lightboxImg && caption && closeLightbox) {
        // Fermer le lightbox lors du clic sur la croix
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        // Fermer le lightbox lors du clic en dehors de l'image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    // Définir la fonction openLightbox sur l'objet window pour l'utiliser dans les onclick HTML
    window.openLightbox = function (imgSrc, captionText) {
        if (lightbox && lightboxImg && caption) {
            lightboxImg.src = imgSrc;
            caption.innerHTML = captionText || '';
            lightbox.style.display = 'flex';
        }
    };
}
// Fonction pour gérer les popups d'attractions
function setupPopups() {
    const popupTriggers = document.querySelectorAll('.popup-trigger');
    const closeButtons = document.querySelectorAll('.close-popup');
    // Ouvrir les popups
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const popupId = trigger.getAttribute('data-popup');
            if (popupId) {
                const popup = document.getElementById(`popup-${popupId}`);
                if (popup) {
                    popup.style.display = 'block';
                }
            }
        });
    });
    // Fermer les popups
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            if (popup) {
                popup.style.display = 'none';
            }
        });
    });
    // Fermer les popups en cliquant en dehors du contenu
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    });
}
// Fonction d'initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    setupLightbox();
    setupPopups();
    // Ajouter une classe pour indiquer que la page est chargée
    document.body.classList.add('loaded');
});
export {};
//# sourceMappingURL=ville-detail.js.map
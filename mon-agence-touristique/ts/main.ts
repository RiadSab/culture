// Ce fichier contient le code commun à toutes les pages

// Fonction pour définir le lien actif dans la navigation
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Pour chaque lien, vérifier s'il correspond à la page courante
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Fonction pour gérer le formulaire de newsletter
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Récupérer l'email
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const email = emailInput.value;
            
            // Récupérer les intérêts sélectionnés
            const interests: string[] = [];
            const checkboxes = document.querySelectorAll('input[name="interests"]:checked');
            checkboxes.forEach((checkbox: Element) => {
                interests.push((checkbox as HTMLInputElement).value);
            });
            
            // Simuler un envoi à une API
            console.log('Inscription à la newsletter:', { email, interests });
            
            // Réinitialiser le formulaire et afficher un message
            (newsletterForm as HTMLFormElement).reset();
            alert('Merci pour votre inscription à notre newsletter!');
        });
    }
}

// Fonction pour gérer les animations au défilement
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .zoom-in');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    (entry.target as HTMLElement).style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        animatedElements.forEach(element => {
            (element as HTMLElement).style.animationPlayState = 'running';
        });
    }
}

// Ajouter un log pour vérifier que le script est bien chargé
console.log("Main script loaded!");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded!");
    setActiveNavLink();
    setupNewsletterForm();
    setupScrollAnimations();
    
    // Indiquer que la page est chargée pour les animations d'entrée
    document.body.classList.add('loaded');
});

// Exporter les fonctions pour les utiliser dans d'autres modules si nécessaire
export { setActiveNavLink, setupScrollAnimations };

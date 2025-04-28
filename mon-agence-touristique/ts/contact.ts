// Script pour la page de contact

// Fonction pour gérer le formulaire de contact
function setupContactForm(): void {
    const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const nameInput = document.getElementById('name') as HTMLInputElement;
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const subjectInput = document.getElementById('subject') as HTMLInputElement;
            const messageInput = document.getElementById('message') as HTMLTextAreaElement;
            
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            };
            
            // Simuler l'envoi du formulaire (à remplacer par un vrai envoi à une API)
            console.log('Formulaire de contact soumis:', formData);
            
            // Afficher un message de confirmation
            showConfirmationMessage(contactForm);
            
            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }
}

// Fonction pour afficher un message de confirmation
function showConfirmationMessage(form: HTMLFormElement): void {
    // Créer le message de confirmation
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'confirmation-message';
    confirmationMessage.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle"></i>
            <h4>Message envoyé avec succès!</h4>
            <p>Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
        </div>
    `;
    
    // Insérer le message après le formulaire
    form.parentNode?.insertBefore(confirmationMessage, form.nextSibling);
    
    // Masquer le formulaire
    form.style.display = 'none';
    
    // Supprimer le message après 5 secondes et réafficher le formulaire
    setTimeout(() => {
        confirmationMessage.style.opacity = '0';
        setTimeout(() => {
            confirmationMessage.remove();
            form.style.display = 'block';
        }, 500);
    }, 5000);
}

// Fonction pour configurer l'accordéon des FAQ
function setupFaqAccordion(): void {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content') as HTMLElement;
        const icon = item.querySelector('.accordion-icon') as HTMLElement;
        
        if (header && content && icon) {
            header.addEventListener('click', () => {
                // Fermer tous les autres items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector('.accordion-content') as HTMLElement;
                        const otherIcon = otherItem.querySelector('.accordion-icon') as HTMLElement;
                        
                        if (otherContent && otherIcon) {
                            otherContent.style.maxHeight = '0';
                            otherIcon.textContent = '+';
                        }
                    }
                });
                
                // Basculer l'état actuel
                if (content.style.maxHeight) {
                    content.style.maxHeight = '';
                    icon.textContent = '+';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '-';
                }
            });
        }
    });
}

// Fonction d'initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
    setupFaqAccordion();
});

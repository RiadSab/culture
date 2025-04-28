// Interface pour typer les données des partenaires
interface Partenaire {
    id: string;
    nom: string;
    type: 'hotels' | 'restaurants' | 'guides' | 'transport';
    description: string;
    ville: string;
    adresse: string;
    contact: {
        telephone: string;
        email: string;
        site?: string;
    };
    imageUrl: string;
    avantages?: string[];
    tarifSpecial?: string;
}

// Fonction pour charger les données des partenaires depuis le fichier JSON
async function chargerDonneesPartenaires(): Promise<Partenaire[]> {
    try {
        const response = await fetch('data/partenaires.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement des données des partenaires:", error);
        return [];
    }
}

// Fonction pour afficher un partenaire
function afficherPartenaire(partenaire: Partenaire): string {
    const typeIcons = {
        hotels: '🏨',
        restaurants: '🍽️',
        guides: '🧭',
        transport: '🚌'
    };
    
    return `
        <div class="partenaire-card" data-category="${partenaire.type}" data-ville="${partenaire.ville.toLowerCase()}">
            <div class="partenaire-header">
                <span class="type-icon">${typeIcons[partenaire.type]}</span>
                <h3>${partenaire.nom}</h3>
                <span class="ville-badge">${partenaire.ville}</span>
            </div>
            
            <div class="partenaire-content">
                <div class="partenaire-image">
                    <img src="${partenaire.imageUrl}" alt="${partenaire.nom}">
                </div>
                
                <div class="partenaire-info">
                    <p class="description">${partenaire.description}</p>
                    
                    <div class="contact-info">
                        <p><strong>Adresse:</strong> ${partenaire.adresse}</p>
                        <p><strong>Téléphone:</strong> ${partenaire.contact.telephone}</p>
                        <p><strong>Email:</strong> <a href="mailto:${partenaire.contact.email}">${partenaire.contact.email}</a></p>
                        ${partenaire.contact.site ? `<p><strong>Site web:</strong> <a href="${partenaire.contact.site}" target="_blank">${partenaire.contact.site}</a></p>` : ''}
                    </div>
                    
                    ${partenaire.avantages ? `
                        <div class="avantages">
                            <h4>Avantages exclusifs pour nos clients:</h4>
                            <ul>
                                ${partenaire.avantages.map(avantage => `<li>${avantage}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${partenaire.tarifSpecial ? `
                        <div class="tarif-special">
                            <p><strong>Offre spéciale:</strong> ${partenaire.tarifSpecial}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Fonction pour initialiser la page des partenaires
async function initialiserPagePartenaires() {
    const partenairesContainer = document.getElementById('partenaires-container');
    if (!partenairesContainer) return;

    // Charger les données
    const partenaires = await chargerDonneesPartenaires();
    
    // Afficher tous les partenaires
    const partenairesHTML = `
        <div class="container">
            <div class="partenaires-grid">
                ${partenaires.map(partenaire => afficherPartenaire(partenaire)).join('')}
            </div>
        </div>
    `;
    partenairesContainer.innerHTML = partenairesHTML;
    
    // Configurer les filtres par catégorie
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mettre à jour le bouton actif
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Récupérer la catégorie sélectionnée
            const selectedCategory = btn.getAttribute('data-category');
            
            // Filtrer les partenaires
            const partenaireCards = document.querySelectorAll('.partenaire-card');
            partenaireCards.forEach(card => {
                if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                    (card as HTMLElement).style.display = 'block';
                } else {
                    (card as HTMLElement).style.display = 'none';
                }
            });
        });
    });
}

// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiserPagePartenaires);

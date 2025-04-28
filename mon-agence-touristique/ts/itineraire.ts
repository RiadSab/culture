// Interface pour typer les données des itinéraires
interface Itineraire {
    id: string;
    nom: string;
    duree: number;
    typeDuree: 'short' | 'medium' | 'long'; // short: 3-5j, medium: 6-9j, long: 10j+
    description: string;
    villes: string[];
    jours: {
        jour: number;
        titre: string;
        description: string;
        activites: string[];
        villeEtape: string;
        logement?: string;
    }[];
    prix: {
        standard: number;
        premium: number;
    };
    imageUrl: string;
}

// Fonction pour charger les données des itinéraires depuis le fichier JSON
async function chargerDonneesItineraires(): Promise<Itineraire[]> {
    try {
        const response = await fetch('data/itineraire.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement des données des itinéraires:", error);
        return [];
    }
}

// Fonction pour afficher un itinéraire
function afficherItineraire(itineraire: Itineraire): string {
    return `
        <div class="itineraire-card" data-duration="${itineraire.typeDuree}">
            <div class="itineraire-header">
                <img src="${itineraire.imageUrl}" alt="${itineraire.nom}" class="itineraire-image">
                <h3>${itineraire.nom}</h3>
                <div class="itineraire-meta">
                    <span class="duration">${itineraire.duree} jours</span>
                    <span class="cities">${itineraire.villes.join(' - ')}</span>
                </div>
            </div>
            
            <div class="itineraire-content">
                <p class="itineraire-description">${itineraire.description}</p>
                
                <div class="itineraire-jours">
                    <h4>Programme jour par jour</h4>
                    <div class="jours-accordion">
                        ${itineraire.jours.map(jour => `
                            <div class="jour-item">
                                <div class="jour-header">
                                    <h5>Jour ${jour.jour}: ${jour.titre}</h5>
                                    <button class="toggle-jour">+</button>
                                </div>
                                <div class="jour-details">
                                    <p>${jour.description}</p>
                                    <h6>Activités:</h6>
                                    <ul>
                                        ${jour.activites.map(activite => `<li>${activite}</li>`).join('')}
                                    </ul>
                                    <p><strong>Étape:</strong> ${jour.villeEtape}</p>
                                    ${jour.logement ? `<p><strong>Logement suggéré:</strong> ${jour.logement}</p>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="itineraire-prix">
                    <h4>Tarifs</h4>
                    <div class="prix-options">
                        <div class="prix-option">
                            <h5>Standard</h5>
                            <p class="prix">${itineraire.prix.standard} €</p>
                        </div>
                        <div class="prix-option premium">
                            <h5>Premium</h5>
                            <p class="prix">${itineraire.prix.premium} €</p>
                        </div>
                    </div>
                </div>
                
                <a href="#" class="btn reserver-btn" data-itineraire="${itineraire.id}">Réserver maintenant</a>
            </div>
        </div>
    `;
}

// Fonction pour initialiser la page des itinéraires
async function initialiserPageItineraires() {
    const itinerairesContainer = document.getElementById('itineraires-container');
    if (!itinerairesContainer) return;

    // Charger les données
    const itineraires = await chargerDonneesItineraires();
    
    // Afficher tous les itinéraires
    const itinerairesHTML = `
        <div class="container">
            ${itineraires.map(itineraire => afficherItineraire(itineraire)).join('')}
        </div>
    `;
    itinerairesContainer.innerHTML = itinerairesHTML;
    
    // Configurer les filtres
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mettre à jour le bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Récupérer la durée sélectionnée
            const selectedDuration = btn.getAttribute('data-duration');
            
            // Filtrer les itinéraires
            const itineraireCards = document.querySelectorAll('.itineraire-card');
            itineraireCards.forEach(card => {
                if (selectedDuration === 'all' || card.getAttribute('data-duration') === selectedDuration) {
                    (card as HTMLElement).style.display = 'block';
                } else {
                    (card as HTMLElement).style.display = 'none';
                }
            });
        });
    });
    
    // Configurer les accordéons des jours
    const toggleBtns = document.querySelectorAll('.toggle-jour');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const jourHeader = btn.closest('.jour-header');
            const jourItem = btn.closest('.jour-item');
            const jourDetails = jourItem?.querySelector('.jour-details');
            
            if (jourDetails) {
                const isOpen = jourDetails.classList.contains('open');
                
                // Basculer l'état actuel
                jourDetails.classList.toggle('open');
                btn.textContent = isOpen ? '+' : '-';
            }
        });
    });
    
    // Configurer les boutons de réservation
    const reserverBtns = document.querySelectorAll('.reserver-btn');
    reserverBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itineraireId = btn.getAttribute('data-itineraire');
            alert(`Réservation pour l'itinéraire ${itineraireId} - Cette fonctionnalité sera disponible prochainement!`);
        });
    });
}

// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiserPageItineraires);

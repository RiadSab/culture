// Interface pour typer les données de marketing
interface Promotion {
    id: string;
    titre: string;
    description: string;
    dateDebut: string;
    dateFin: string;
    reduction: string;
    conditionsEligibilite: string[];
    imageUrl: string;
    codePromo: string;
}

interface CibleMarketing {
    segment: string;
    description: string;
    caracteristiques: string[];
    besoins: string[];
    offresAdaptees: string[];
    imageUrl: string;
}

// Fonction pour charger les données marketing depuis le fichier JSON
async function chargerDonneesMarketing(): Promise<{ promotions: Promotion[], cibles: CibleMarketing[] }> {
    try {
        const response = await fetch('/data/marketing.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement des données marketing:", error);
        return { promotions: [], cibles: [] };
    }
}

// Fonction pour afficher une promotion
function afficherPromotion(promotion: Promotion): string {
    // Formatage des dates
    const dateDebut = new Date(promotion.dateDebut).toLocaleDateString('fr-FR');
    const dateFin = new Date(promotion.dateFin).toLocaleDateString('fr-FR');
    
    return `
        <div class="promotion-card">
            <div class="promotion-image">
                <img src="${promotion.imageUrl}" alt="${promotion.titre}">
                <div class="promo-badge">${promotion.reduction}</div>
            </div>
            
            <div class="promotion-content">
                <h4>${promotion.titre}</h4>
                <p>${promotion.description}</p>
                
                <div class="promotion-details">
                    <p class="promotion-dates">
                        <strong>Période:</strong> Du ${dateDebut} au ${dateFin}
                    </p>
                    
                    <div class="promotion-conditions">
                        <h5>Conditions d'éligibilité:</h5>
                        <ul>
                            ${promotion.conditionsEligibilite.map(condition => `<li>${condition}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="promotion-code">
                        <p>Utilisez le code: <strong>${promotion.codePromo}</strong></p>
                    </div>
                    
                    <button class="btn appliquer-promo" data-promo="${promotion.id}">
                        Appliquer cette promotion
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour afficher une cible marketing
function afficherCibleMarketing(cible: CibleMarketing): string {
    return `
        <div class="cible-card">
            <div class="cible-image">
                <img src="${cible.imageUrl}" alt="${cible.segment}">
            </div>
            
            <div class="cible-content">
                <h4>${cible.segment}</h4>
                <p>${cible.description}</p>
                
                <div class="cible-details">
                    <div class="caracteristiques">
                        <h5>Caractéristiques:</h5>
                        <ul>
                            ${cible.caracteristiques.map(caracteristique => `<li>${caracteristique}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="besoins">
                        <h5>Besoins recherchés:</h5>
                        <ul>
                            ${cible.besoins.map(besoin => `<li>${besoin}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="offres-adaptees">
                        <h5>Offres adaptées:</h5>
                        <ul>
                            ${cible.offresAdaptees.map(offre => `<li>${offre}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour initialiser la page marketing
async function initialiserPageMarketing() {
    const promotionsContainer = document.getElementById('promotions-container');
    const ciblesContainer = document.getElementById('cibles-container');
    
    if (!promotionsContainer || !ciblesContainer) return;

    // Charger les données
    const { promotions, cibles } = await chargerDonneesMarketing();
    
    // Afficher les promotions
    if (promotions.length > 0) {
        const promotionsHTML = promotions.map(promo => afficherPromotion(promo)).join('');
        promotionsContainer.innerHTML = promotionsHTML;
        
        // Configurer les boutons d'application des promotions
        const appliquerBtns = document.querySelectorAll('.appliquer-promo');
        appliquerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const promoId = btn.getAttribute('data-promo');
                const promotion = promotions.find(p => p.id === promoId);
                if (promotion) {
                    alert(`Code promo "${promotion.codePromo}" copié dans votre presse-papier! Utilisez-le lors de la réservation d'un circuit.`);
                }
            });
        });
    } else {
        promotionsContainer.innerHTML = '<p class="no-data">Aucune promotion disponible actuellement.</p>';
    }
    
    // Afficher les cibles marketing
    if (cibles.length > 0) {
        const ciblesHTML = cibles.map(cible => afficherCibleMarketing(cible)).join('');
        ciblesContainer.innerHTML = ciblesHTML;
    } else {
        ciblesContainer.innerHTML = '<p class="no-data">Informations sur les segments de marché non disponibles.</p>';
    }
}

// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiserPageMarketing);

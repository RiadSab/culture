// Interface pour typer les données des villes
interface Ville {
    id: string;
    nom: string;
    description: string;
    histoire: string;
    sitesTouristiques: {
        nom: string;
        description: string;
        imageUrl: string;
    }[];
    traditions: {
        nom: string;
        description: string;
        periode?: string;
    }[];
}

// Fonction pour charger les données des villes depuis le fichier JSON
async function chargerDonneesVilles(): Promise<Ville[]> {
    try {
        const response = await fetch('data/villes.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement des données des villes:", error);
        return [];
    }
}

// Fonction pour afficher les détails d'une ville
function afficherVille(ville: Ville): string {
    return `
        <div class="ville-details" id="${ville.id}">
            <h2>${ville.nom}</h2>
            <p class="ville-description">${ville.description}</p>
            
            <section class="ville-histoire">
                <h3>Histoire</h3>
                <p>${ville.histoire}</p>
            </section>
            
            <section class="ville-sites">
                <h3>Sites Touristiques</h3>
                <div class="sites-grid">
                    ${ville.sitesTouristiques.map(site => `
                        <div class="site-card">
                            <img src="${site.imageUrl}" alt="${site.nom}" class="site-image">
                            <h4>${site.nom}</h4>
                            <p>${site.description}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
            
            <section class="ville-traditions">
                <h3>Traditions Culturelles</h3>
                <div class="traditions-list">
                    ${ville.traditions.map(tradition => `
                        <div class="tradition-item">
                            <h4>${tradition.nom}</h4>
                            <p>${tradition.description}</p>
                            ${tradition.periode ? `<p class="periode"><strong>Période:</strong> ${tradition.periode}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `;
}

// Fonction pour initialiser la page des villes
async function initialiserPageVilles() {
    const villesContainer = document.getElementById('villes-container');
    if (!villesContainer) return;

    // Charger les données
    const villes = await chargerDonneesVilles();
    
    // Afficher toutes les villes
    const villesHTML = villes.map(ville => afficherVille(ville)).join('');
    villesContainer.innerHTML = villesHTML;
    
    // Configurer les liens de navigation
    const cityLinks = document.querySelectorAll('.city-link');
    cityLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Récupérer l'ID de la ville
            const cityId = link.getAttribute('href')?.substring(1);
            
            // Faire défiler jusqu'à la section de la ville
            const citySection = document.getElementById(cityId || '');
            if (citySection) {
                citySection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Mettre à jour la classe active
            cityLinks.forEach(cl => cl.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiserPageVilles);

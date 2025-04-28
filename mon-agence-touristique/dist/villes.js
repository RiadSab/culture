"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fonction pour charger les données des villes depuis le fichier JSON
function chargerDonneesVilles() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('data/villes.json');
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return yield response.json();
        }
        catch (error) {
            console.error("Erreur lors du chargement des données des villes:", error);
            return [];
        }
    });
}
// Fonction pour afficher les détails d'une ville
function afficherVille(ville) {
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
function initialiserPageVilles() {
    return __awaiter(this, void 0, void 0, function* () {
        const villesContainer = document.getElementById('villes-container');
        if (!villesContainer)
            return;
        // Charger les données
        const villes = yield chargerDonneesVilles();
        // Afficher toutes les villes
        const villesHTML = villes.map(ville => afficherVille(ville)).join('');
        villesContainer.innerHTML = villesHTML;
        // Configurer les liens de navigation
        const cityLinks = document.querySelectorAll('.city-link');
        cityLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                var _a;
                e.preventDefault();
                // Récupérer l'ID de la ville
                const cityId = (_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.substring(1);
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
    });
}
// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiserPageVilles);
//# sourceMappingURL=villes.js.map
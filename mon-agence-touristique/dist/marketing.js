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
// Fonction pour charger les données marketing depuis le fichier JSON
function chargerDonneesMarketing() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('./data/marketing.json');
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return yield response.json();
        }
        catch (error) {
            console.error("Erreur lors du chargement des données marketing:", error);
            return { promotions: [], cibles: [] };
        }
    });
}
// Fonction pour afficher une promotion
function afficherPromotion(promotion) {
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
                <h4 class="promotion-title">${promotion.titre}</h4>
                <p class="promotion-description">${promotion.description}</p>
                
                <div class="promotion-details">
                    <p class="promotion-dates">
                        <i class="far fa-calendar-alt"></i> <strong>Période:</strong> Du ${dateDebut} au ${dateFin}
                    </p>
                    
                    <div class="promotion-conditions">
                        <h5><i class="fas fa-check-circle"></i> Conditions d'éligibilité:</h5>
                        <ul class="conditions-list">
                            ${promotion.conditionsEligibilite.map(condition => `<li><i class="fas fa-angle-right"></i> ${condition}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="promotion-code">
                        <p><i class="fas fa-ticket-alt"></i> Code: <span class="promo-code-highlight">${promotion.codePromo}</span></p>
                    </div>
                    
                    <button class="btn btn-primary appliquer-promo" data-promo="${promotion.id}">
                        <i class="fas fa-tag"></i> Appliquer cette promotion
                    </button>
                </div>
            </div>
        </div>
    `;
}
// Fonction pour afficher une cible marketing
function afficherCibleMarketing(cible) {
    return `
        <div class="cible-card">
            <div class="cible-header">
                <div class="cible-image">
                    <img src="${cible.imageUrl}" alt="${cible.segment}">
                </div>
                <h4 class="cible-title">${cible.segment}</h4>
            </div>
            
            <div class="cible-content">
                <p class="cible-description">${cible.description}</p>
                
                <div class="cible-details">
                    <div class="caracteristiques detail-section">
                        <h5><i class="fas fa-users"></i> Caractéristiques:</h5>
                        <ul class="detail-list">
                            ${cible.caracteristiques.map(caracteristique => `<li><i class="fas fa-check"></i> ${caracteristique}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="besoins detail-section">
                        <h5><i class="fas fa-heart"></i> Besoins recherchés:</h5>
                        <ul class="detail-list">
                            ${cible.besoins.map(besoin => `<li><i class="fas fa-check"></i> ${besoin}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="offres-adaptees detail-section">
                        <h5><i class="fas fa-gift"></i> Offres adaptées:</h5>
                        <ul class="detail-list">
                            ${cible.offresAdaptees.map(offre => `<li><i class="fas fa-star"></i> ${offre}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}
// Fonction pour initialiser la page marketing
function initialiserPageMarketing() {
    return __awaiter(this, void 0, void 0, function* () {
        const promotionsContainer = document.getElementById('promotions-container');
        const ciblesContainer = document.getElementById('cibles-container');
        if (!promotionsContainer || !ciblesContainer)
            return;
        
        // Ajout des styles dynamiques pour la page marketing
        ajouterStylesMarketing();
        
        // Charger les données
        const { promotions, cibles } = yield chargerDonneesMarketing();
        
        // Afficher les promotions
        if (promotions.length > 0) {
            const promotionsHTML = promotions.map(promo => afficherPromotion(promo)).join('');
            promotionsContainer.innerHTML = `
                <div class="section-header">
                    <h3><i class="fas fa-percentage"></i> Nos Offres Promotionnelles</h3>
                    <p>Découvrez nos meilleures offres du moment</p>
                </div>
                <div class="promotions-grid">${promotionsHTML}</div>
            `;
            
            // Configurer les boutons d'application des promotions
            const appliquerBtns = document.querySelectorAll('.appliquer-promo');
            appliquerBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const promoId = btn.getAttribute('data-promo');
                    const promotion = promotions.find(p => p.id === promoId);
                    if (promotion) {
                        // Copier le code promo dans le presse-papier
                        navigator.clipboard.writeText(promotion.codePromo).then(() => {
                            // Afficher un message toast plutôt qu'une alerte
                            afficherToast(`Code promo "${promotion.codePromo}" copié dans votre presse-papier!`);
                        }).catch(err => {
                            alert(`Code promo: ${promotion.codePromo}`);
                        });
                    }
                });
            });
        }
        else {
            promotionsContainer.innerHTML = '<div class="no-data"><i class="fas fa-info-circle"></i> Aucune promotion disponible actuellement.</div>';
        }
        
        // Afficher les cibles marketing
        if (cibles.length > 0) {
            const ciblesHTML = cibles.map(cible => afficherCibleMarketing(cible)).join('');
            ciblesContainer.innerHTML = `
                <div class="section-header">
                    <h3><i class="fas fa-bullseye"></i> Nos Segments de Marché</h3>
                    <p>Des offres adaptées à tous les profils</p>
                </div>
                <div class="cibles-grid">${ciblesHTML}</div>
            `;
        }
        else {
            ciblesContainer.innerHTML = '<div class="no-data"><i class="fas fa-info-circle"></i> Informations sur les segments de marché non disponibles.</div>';
        }
    });
}
// Fonction pour afficher un toast
function afficherToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle toast-icon"></i>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(toast);
    
    // Afficher le toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Supprimer le toast après 3 secondes
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}
// Fonction pour ajouter des styles marketing
function ajouterStylesMarketing() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Styles généraux */
        #promotions-container, #cibles-container {
            margin-bottom: 3rem;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .section-header h3 {
            color: #2c3e50;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        .section-header p {
            color: #7f8c8d;
            font-size: 1.1rem;
        }
        
        /* Grilles */
        .promotions-grid, .cibles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }
        
        /* Styles des cartes de promotion */
        .promotion-card {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background: white;
        }
        
        .promotion-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .promotion-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        
        .promotion-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .promotion-card:hover .promotion-image img {
            transform: scale(1.05);
        }
        
        .promo-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #e74c3c;
            color: white;
            padding: 10px 15px;
            border-radius: 30px;
            font-weight: bold;
            font-size: 1.1rem;
            box-shadow: 0 2px 10px rgba(231, 76, 60, 0.3);
        }
        
        .promotion-content {
            padding: 1.5rem;
        }
        
        .promotion-title {
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            border-bottom: 2px solid #f8f9fa;
            padding-bottom: 0.5rem;
        }
        
        .promotion-description {
            color: #7f8c8d;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .promotion-details {
            background: #f8f9fa;
            padding: 1.2rem;
            border-radius: 8px;
        }
        
        .promotion-dates {
            margin-bottom: 1rem;
            color: #34495e;
            font-size: 0.95rem;
        }
        
        .promotion-conditions h5, .besoins h5, .caracteristiques h5, .offres-adaptees h5 {
            color: #2c3e50;
            margin-bottom: 0.8rem;
            font-size: 1.1rem;
        }
        
        .conditions-list, .detail-list {
            padding-left: 0;
            list-style: none;
        }
        
        .conditions-list li, .detail-list li {
            margin-bottom: 0.5rem;
            color: #555;
            font-size: 0.95rem;
        }
        
        .promotion-code {
            margin: 1.5rem 0;
            padding: 1rem;
            background: #ecf0f1;
            border-radius: 6px;
            text-align: center;
        }
        
        .promo-code-highlight {
            font-size: 1.2rem;
            font-weight: bold;
            color: #e74c3c;
            background: white;
            padding: 0.4rem 0.8rem;
            border-radius: 4px;
            display: inline-block;
            margin-top: 0.5rem;
            letter-spacing: 1px;
            border: 1px dashed #e74c3c;
        }
        
        .appliquer-promo {
            width: 100%;
            padding: 0.8rem;
            border: none;
            border-radius: 6px;
            background: #3498db;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .appliquer-promo:hover {
            background: #2980b9;
        }
        
        /* Styles des cartes de cible */
        .cible-card {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background: white;
        }
        
        .cible-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .cible-header {
            position: relative;
            background: #3498db;
            color: white;
            padding: 1.5rem;
            text-align: center;
        }
        
        .cible-image {
            width: 80px;
            height: 80px;
            margin: 0 auto 1rem;
            background: white;
            border-radius: 50%;
            padding: 0.3rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .cible-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
        
        .cible-title {
            font-size: 1.4rem;
            margin-bottom: 0;
        }
        
        .cible-content {
            padding: 1.5rem;
        }
        
        .cible-description {
            color: #7f8c8d;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .detail-section {
            margin-bottom: 1.5rem;
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
        }
        
        .detail-section:last-child {
            margin-bottom: 0;
        }
        
        /* Toast notification */
        .toast-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 0;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .toast-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            padding: 1rem 1.5rem;
        }
        
        .toast-icon {
            font-size: 1.5rem;
            margin-right: 1rem;
        }
        
        .toast-notification p {
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .promotions-grid, .cibles-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Lancer l'initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiserPageMarketing);
//# sourceMappingURL=marketing.js.map
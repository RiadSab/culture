"use strict";
/**
 * Fichier de test pour vérifier que TypeScript fonctionne
 */
// Fonction simple pour afficher un message
function showWelcomeMessage() {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = '<h1>TypeScript fonctionne correctement!</h1>';
        app.innerHTML += '<p>Le site des villes impériales du Maroc est en cours de chargement...</p>';
    }
    else {
        console.error("Élément avec ID 'app' non trouvé");
    }
}
// Exécuter quand le DOM est chargé
document.addEventListener('DOMContentLoaded', showWelcomeMessage);
// Afficher un message dans la console
console.log('Le script TypeScript a été chargé avec succès!');
//# sourceMappingURL=starter.js.map
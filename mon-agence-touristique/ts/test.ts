// Script de test pour vérifier la compilation TypeScript

console.log("Test script compiled successfully!");

// Fonction simple pour tester
function displayMessage(): void {
    const bodyElement = document.querySelector('body');
    
    if (bodyElement) {
        const messageElement = document.createElement('div');
        messageElement.style.padding = '20px';
        messageElement.style.backgroundColor = '#f0f0f0';
        messageElement.style.margin = '20px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.border = '1px solid #ddd';
        messageElement.textContent = 'Si vous voyez ce message, TypeScript fonctionne correctement!';
        
        bodyElement.appendChild(messageElement);
    }
}

// Exécuter la fonction quand le DOM est chargé
document.addEventListener('DOMContentLoaded', displayMessage);

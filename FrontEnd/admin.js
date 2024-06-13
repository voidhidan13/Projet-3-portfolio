document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si le token est présent dans le stockage local
    const token = localStorage.getItem('token');

    // Sélectionner l'élément <li> contenant le lien de connexion
    const loginText = document.querySelector('.login');

    // Si le token est présent, mettez à jour le texte du lien
    if (token) {
        loginText.innerHTML = '<a href="#">logout</a>';

        // Créer une nouvelle div pour le message de bienvenue avec une icône FontAwesome
        const welcomeMessageDiv = document.createElement('div');
        welcomeMessageDiv.id = 'welcome-message';
        welcomeMessageDiv.innerHTML = '<p><i class="fas fa-pen-to-square"></i> Mode Edition</p>';

        // Insérer la div de bienvenue avant le header
        const body = document.body;
        body.insertBefore(welcomeMessageDiv, body.firstChild);
    }
});
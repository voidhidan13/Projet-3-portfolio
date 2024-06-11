document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si le token est présent dans le stockage local
    const token = localStorage.getItem('token');

    // Sélectionnez l'élément <li> contenant le lien de connexion
    const loginText = document.querySelector('.login');

    // Si le token est présent, mettez à jour le texte du lien
    if (token) {
        loginText.innerHTML = '<a href="#">logout</a>';
    }
});
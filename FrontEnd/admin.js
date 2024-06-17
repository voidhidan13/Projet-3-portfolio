document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si le token est présent dans le stockage local
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    // Sélectionner l'élément <li> contenant le lien de connexion
    const loginText = document.querySelector('.login');
    console.log('Login text element:', loginText);

    // Sélectionner les éléments de la barre de filtres et du conteneur de projets
    const filterBar = document.querySelector('.filter_bar');
    console.log('Filter bar element:', filterBar);

    // Sélectionner le titre "Mes Projets"
    const projectsTitle = document.querySelector('#portfolio h2');
    console.log('Projects title element:', projectsTitle);

    // Sélectionner la modale et son wrapper
    const modal = document.getElementById('modal');
    const modalWrapper = document.querySelector('.modal-wrapper');

    // Si le token est présent, mettre à jour le texte du lien et gérer le mode admin
    if (token) {
        // Mettre à jour le texte du lien de connexion
        loginText.innerHTML = '<a href="#" id="logout-link">logout</a>';
        console.log('Login text updated');

        // Masquer la barre de filtres si elle existe
        if (filterBar) {
            filterBar.style.display = 'none';
            console.log('Filter bar hidden');
        }

        // Créer le lien "Modifier" avec une icône FontAwesome
        const editLink = document.createElement('a');
        editLink.className = 'admin-link';
        editLink.href = '#';
        editLink.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Modifier';
        console.log('Edit link created:', editLink);

        // Insérer le lien à la fin du texte du titre "Mes Projets"
        const textNode = document.createTextNode(' '); // Créer un espace pour la séparation
        projectsTitle.appendChild(textNode);
        projectsTitle.appendChild(editLink);
        console.log('Edit link inserted after title:', projectsTitle);

        // Ajouter une classe pour augmenter la marge inférieure du titre "Mes Projets"
        projectsTitle.classList.add('admin-mode');
        console.log('Admin mode class added to projects title');

        // Écouter les clics sur le lien "Modifier" pour afficher la modale
        editLink.addEventListener('click', function(event) {
            event.preventDefault();
            modal.setAttribute('aria-hidden', 'false');
            console.log('Modal opened');
        });

        // Écouter le clic sur le lien "logout"
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', function(event) {
                event.preventDefault();
                // Supprimer le token du stockage local
                localStorage.removeItem('token');
                // Rediriger vers la page d'accueil
                window.location.href = 'index.html';
            });
        } else {
            console.error('Élément #logout-link non trouvé dans le DOM.');
        }
    }

    // Écouter les clics en dehors de la modale pour la fermer
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
            console.log('Modal closed');
        }
    });
});
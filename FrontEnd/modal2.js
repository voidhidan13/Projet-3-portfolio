document.addEventListener('DOMContentLoaded', function() {
    const addPhotoButton = document.getElementById('addphoto');
    const modalGallery = document.getElementById('modal-gallery');
    const modalAddPhoto = document.getElementById('modal-add-photo');
    const closeModalIcon = document.getElementById('close-modal');
    const modalTitle = document.querySelector('#modal h2');
    const addPhotoBtn = document.querySelector('.addphoto');

    // Fonction pour afficher la modal d'ajout de photo et masquer la modal principale
    function showAddPhotoModal() {
        // Masquer le titre "Galerie"
        modalTitle.style.display = 'none';
        // Masquer le bouton "Ajouter une photo"
        addPhotoBtn.style.display = 'none';
        // Masquer la galerie de photos
        modalGallery.style.display = 'none';

        // Afficher la modal d'ajout de photo
        modalAddPhoto.classList.remove('hidden');
    }

    // Écouter le clic sur le bouton "Ajouter une photo"
    addPhotoButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Appeler la fonction pour afficher la modal d'ajout de photo
        showAddPhotoModal();
    });

    // Écouter le clic sur l'icône de fermeture pour fermer la modal d'ajout de photo
    closeModalIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Empêcher la propagation du clic à la modal principale
        // Réafficher le titre "Galerie"
        modalTitle.style.display = 'block';
        // Réafficher le bouton "Ajouter une photo"
        addPhotoBtn.style.display = 'block';
        // Cacher la modal d'ajout de photo
        modalAddPhoto.classList.add('hidden');
        // Réafficher la galerie de photos
        modalGallery.style.display = 'grid';
    });

    // Écouter les clics en dehors de la modal d'ajout de photo pour la fermer
    window.addEventListener('click', function(event) {
        if (event.target === modalAddPhoto) {
            // Réafficher le titre "Galerie"
            modalTitle.style.display = 'block';
            // Réafficher le bouton "Ajouter une photo"
            addPhotoBtn.style.display = 'block';
            // Cacher la modal d'ajout de photo
            modalAddPhoto.classList.add('hidden');
            // Réafficher la galerie de photos
            modalGallery.style.display = 'grid';
        }
    });

    // Ajouter ici d'autres fonctionnalités liées au formulaire d'ajout de photo si nécessaire
});
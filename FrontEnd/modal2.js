document.addEventListener('DOMContentLoaded', function() {
    const addPhotoButton = document.getElementById('addphoto');
    const modalGallery = document.getElementById('modal-gallery');
    const modalAddPhoto = document.getElementById('modal-add-photo');
    const closeModalIcon = document.getElementById('close-modal');
    const modalTitle = document.querySelector('#modal h2');
    const addPhotoBtn = document.querySelector('.addphoto');
    const modalHr = document.querySelector('#modal hr'); // Sélectionne l'élément <hr>

    // Écouter le clic sur le bouton "Ajouter une photo"
    addPhotoButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Masquer les éléments de la galerie
        modalTitle.style.display = 'none';
        addPhotoBtn.style.display = 'none';
        modalGallery.style.display = 'none';
        modalHr.style.display = 'none'; // Masquer l'élément <hr>
        // Afficher la modal d'ajout de photo
        modalAddPhoto.classList.remove('hidden');
    });

    // Écouter le clic sur l'icône de fermeture pour fermer la modal d'ajout de photo
    closeModalIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        // Réafficher les éléments de la galerie
        modalTitle.style.display = 'block';
        addPhotoBtn.style.display = 'block';
        modalGallery.style.display = 'grid';
        modalHr.style.display = 'block'; // Réafficher l'élément <hr>
        // Cacher la modal d'ajout de photo
        modalAddPhoto.classList.add('hidden');
    });

    // Fermer la modal d'ajout de photo en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        if (event.target === modalAddPhoto) {
            // Réafficher les éléments de la galerie
            modalTitle.style.display = 'block';
            addPhotoBtn.style.display = 'block';
            modalGallery.style.display = 'grid';
            modalHr.style.display = 'block'; // Réafficher l'élément <hr>
            // Cacher la modal d'ajout de photo
            modalAddPhoto.classList.add('hidden');
        }
    });
});
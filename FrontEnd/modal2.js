document.addEventListener('DOMContentLoaded', function() {
    const addPhotoButton = document.getElementById('addphoto');
    const modalGallery = document.getElementById('modal-gallery');
    const modalAddPhoto = document.getElementById('modal-add-photo');
    const closeModalIcon = document.getElementById('close-modal');
    const backButton = document.getElementById('back-modal'); // Nouvelle variable pour l'icône de retour
    const modalTitle = document.querySelector('#modal h2');
    const addPhotoBtn = document.querySelector('.addphoto');
    const modalHr = document.querySelector('#modal hr');

    // Écouteur de clic sur le bouton "Ajouter une photo"
    addPhotoButton.addEventListener('click', function(event) {
        event.preventDefault();
        modalTitle.style.display = 'none';
        addPhotoBtn.style.display = 'none';
        modalGallery.style.display = 'none';
        modalHr.style.display = 'none';
        modalAddPhoto.classList.remove('hidden');
    });

    // Écouteur de clic sur l'icône de fermeture pour fermer la modale d'ajout de photo
    closeModalIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        modalTitle.style.display = 'block';
        addPhotoBtn.style.display = 'block';
        modalGallery.style.display = 'grid';
        modalHr.style.display = 'block';
        modalAddPhoto.classList.add('hidden');
    });

    // Écouteur de clic sur l'icône de retour pour revenir à la modale principale
    backButton.addEventListener('click', function(event) {
        event.preventDefault();
        modalAddPhoto.classList.add('hidden');
        modalTitle.style.display = 'block';
        addPhotoBtn.style.display = 'block';
        modalGallery.style.display = 'grid';
        modalHr.style.display = 'block';
    });

    // Écouteur de clic sur la fenêtre pour fermer la modale d'ajout de photo
    window.addEventListener('click', function(event) {
        if (event.target === modalAddPhoto) {
            modalTitle.style.display = 'block';
            addPhotoBtn.style.display = 'block';
            modalGallery.style.display = 'grid';
            modalHr.style.display = 'block';
            modalAddPhoto.classList.add('hidden');
        }
    });
});
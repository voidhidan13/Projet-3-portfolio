document.addEventListener('DOMContentLoaded', function() {
    const addPhotoButton = document.getElementById('addphoto');
    const modalGallery = document.getElementById('modal-gallery');
    const modalAddPhoto = document.getElementById('modal-add-photo');
    const closeModalIcon = document.getElementById('close-modal');
    const backButton = document.getElementById('back-modal');
    const modalTitle = document.querySelector('#modal h2');
    const addPhotoBtn = document.querySelector('.addphoto');
    const modalHr = document.querySelector('#modal hr');
    const photoForm = document.getElementById('add-photo-form');
    const categoryInput = document.getElementById('photo-categorie');
    const photoTitleInput = document.getElementById('photo-title');
    const photoFileInput = document.getElementById('photo-file');
    const previewImageElement = document.getElementById('preview-image');
    const token = localStorage.getItem('token');

    // Vérifie si le token d'authentification est présent
    if (!token) {
        console.error("Le token d'authentification est manquant.");
        // Gérer l'absence du token, par exemple, rediriger vers la page de connexion
        return;
    }

    // Fonction pour ouvrir la modale d'ajout de photo
    function openAddPhotoModal() {
        modalTitle.style.display = 'none';
        addPhotoBtn.style.display = 'none';
        modalGallery.style.display = 'none';
        modalHr.style.display = 'none';
        modalAddPhoto.classList.remove('hidden');
    }

    // Fonction pour fermer la modale d'ajout de photos
    function closeAddPhotoModal() {
        modalTitle.style.display = 'block';
        addPhotoBtn.style.display = 'block';
        modalGallery.style.display = 'grid';
        modalHr.style.display = 'block';
        modalAddPhoto.classList.add('hidden');
    }

    // Écouteur pour la soumission du formulaire
    photoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Récupérer les valeurs des champs du formulaire
        const title = photoTitleInput.value.trim();
        const categoryName = categoryInput.value.trim(); // Récupère le nom de la catégorie

        // Vérifier que le titre n'est pas vide et que la catégorie est valide
        if (!title) {
            alert('Veuillez saisir un titre pour la photo.');
            return;
        }

        // Récupérer l'ID de la catégorie correspondant au nom sélectionné
        const categoryId = getCategoryIdByName(categoryName);

        // Vérifier que categoryId est un nombre valide
        if (!categoryId) {
            alert('Veuillez sélectionner une catégorie valide.');
            return;
        }

        // Création d'un objet FormData pour encapsuler les données du formulaire
        const formData = new FormData();
        formData.append('image', photoFileInput.files[0]);
        formData.append('title', title);
        formData.append('category', categoryId); // Utilisez 'category' comme nom de champ

        // Envoi de la requête fetch avec FormData et le token d'authentification
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            console.log('Réponse de l\'API :', data);
            alert('Votre travail est en ligne');
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données :', error);
            alert('Une erreur est survenue lors de l\'envoi des données.');
        })
        .finally(() => {
            // Réinitialisation de l'interface après soumission
            closeAddPhotoModal();
            photoForm.reset();
            previewImageElement.src = '';
        });
    });

    // Gestion de l'événement clic sur le bouton "Ajouter une photo"
    addPhotoButton.addEventListener('click', function(event) {
        event.preventDefault();
        openAddPhotoModal();
    });

    // Gestion de l'événement clic sur l'icône de fermeture de la modale
    closeModalIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        closeAddPhotoModal();
    });

    // Gestion de l'événement clic sur le bouton retour dans la modale
    backButton.addEventListener('click', function(event) {
        event.preventDefault();
        closeAddPhotoModal();
    });

    // Fonction pour afficher l'aperçu de l'image sélectionnée
    photoFileInput.addEventListener('change', function() {
        const file = photoFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImageElement.src = event.target.result;
                previewImageElement.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            previewImageElement.src = '';
            previewImageElement.style.display = 'none';
        }
    });

    // Fonction pour récupérer l'ID de la catégorie par son nom
    function getCategoryIdByName(name) {
        const categories = [
            { id: 1, name: 'Objets' },
            { id: 2, name: 'Appartements' },
            { id: 3, name: 'Hotels & restaurants' }
        ];
        const category = categories.find(cat => cat.name === name);
        return category ? category.id : null;
    }
});
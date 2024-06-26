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

    // Cache l'élément img au départ
    previewImageElement.style.display = 'none';

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

    // Fonction pour fermer toutes les modales
    function closeModals() {
        modalTitle.style.display = 'block';
        addPhotoBtn.style.display = 'block';
        modalGallery.style.display = 'grid';
        modalHr.style.display = 'block';
        modalAddPhoto.classList.add('hidden');
    }

    // Fonction pour récupérer et afficher les travaux
    function fetchAndDisplayWorks() {
        fetch('http://localhost:5678/api/works', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            creerArticlesProjets(data);
            updateModalGallery(data); // Mettre à jour la galerie dans la première modale
        })
        .catch(error => console.error('Erreur lors de la récupération des travaux :', error));
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
            // Actualiser la galerie après l'ajout réussi
            fetchAndDisplayWorks();
            closeModals(); // Fermer les modales après l'ajout
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi des données :', error);
            alert('Une erreur est survenue lors de l\'envoi des données.');
        })
        .finally(() => {
            // Réinitialisation de l'interface après soumission
            photoForm.reset();
            previewImageElement.src = '';
            previewImageElement.style.display = 'none'; // Cache l'élément img
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
        closeModals();
    });

    // Gestion de l'événement clic sur le bouton retour dans la modale
    backButton.addEventListener('click', function(event) {
        event.preventDefault();
        closeModals();
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

    // Fonction pour créer les articles des projets
    function creerArticlesProjets(projets) {
        const GalleryPortfolio = document.querySelector(".gallery");
        GalleryPortfolio.innerHTML = '';

        projets.forEach(projet => {
            const articleProjet = document.createElement("article");

            const projetImage = document.createElement("img");
            projetImage.src = projet.imageUrl;
            articleProjet.appendChild(projetImage);

            const projetDesc = document.createElement("p");
            projetDesc.innerText = projet.title;
            articleProjet.appendChild(projetDesc);

            GalleryPortfolio.appendChild(articleProjet);
        });
    }

    // Fonction pour mettre à jour la galerie dans la modale principale
    function updateModalGallery(works) {
        modalGallery.innerHTML = '';

        works.forEach(work => {
            const workItem = document.createElement('div');
            workItem.classList.add('work-item');
            workItem.setAttribute('data-id', work.id); // Ajout d'un attribut data-id

            const imgElement = document.createElement('img');
            imgElement.src = work.imageUrl;
            imgElement.alt = work.title;

            // Création de l'icone de suppression
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
            deleteIcon.setAttribute('data-id', work.id); // Ajout d'un attribut data-id

            // Ajout d'un gestionnaire d'événement pour la suppression
            deleteIcon.addEventListener('click', function(event) {
                event.stopPropagation();
                const workId = event.target.getAttribute('data-id');
                deleteWork(workId);
            });

            workItem.appendChild(imgElement);
            workItem.appendChild(deleteIcon);
            modalGallery.appendChild(workItem);
        });
    }

    // Fonction pour supprimer un travail
    function deleteWork(workId) {
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            console.log('Travail supprimé avec succès :', data);
            fetchAndDisplayWorks(); // Rafraîchir la galerie après la suppression
        })
        .catch(error => {
            console.error('Erreur lors de la suppression du travail :', error);
            alert('Une erreur est survenue lors de la suppression du travail.');
        });
    }

    // Fetch and display initial works
    fetchAndDisplayWorks();

});
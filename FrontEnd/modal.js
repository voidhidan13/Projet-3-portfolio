document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalGallery = document.getElementById('modal-gallery');
    const GalleryPortfolio = document.querySelector('.gallery'); // Sélectionnez la galerie principale
    const addPhotoButton = document.getElementById('addphoto');
    const modalAddPhoto = document.getElementById('modal-add-photo');
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
            updateGalleryAndModal(data); // Mettre à jour la galerie principale et la modale
        })
        .catch(error => console.error('Erreur lors de la récupération des travaux :', error));
    }

    // Fonction pour mettre à jour la galerie principale et la modale
    function updateGalleryAndModal(works) {
        updateGallery(works); 
        updateModal(works); 
    }

    // Fonction pour mettre à jour la galerie principale
    function updateGallery(works) {
        GalleryPortfolio.innerHTML = ''; 

        works.forEach(work => {
            const articleProjet = document.createElement("article");
            articleProjet.setAttribute('data-id', work.id); // Ajout d'un attribut data-id

            const projetImage = document.createElement("img");
            projetImage.src = work.imageUrl;
            articleProjet.appendChild(projetImage);

            const projetDesc = document.createElement("p");
            projetDesc.innerText = work.title;
            articleProjet.appendChild(projetDesc);

            GalleryPortfolio.appendChild(articleProjet);
        });
    }

    // Fonction pour mettre à jour la modale d'édition des travaux
    function updateModal(works) {
        modalGallery.innerHTML = ''; 

        works.forEach(work => {
            const workItem = document.createElement('div');
            workItem.classList.add('work-item');
            workItem.setAttribute('data-id', work.id); 
            const imgElement = document.createElement('img');
            imgElement.src = work.imageUrl;
            imgElement.alt = work.title;

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icon');
            deleteIcon.addEventListener('click', async (event) => {
                event.stopPropagation();
                await deleteWork(work.id, workItem);
            });

            workItem.appendChild(imgElement);
            workItem.appendChild(deleteIcon);
            modalGallery.appendChild(workItem);
        });
    }

    // Fonction pour supprimer un travail
    async function deleteWork(workId, itemToRemove) {
        try {
            const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log(`Travail avec ID ${workId} supprimé avec succès`);
                itemToRemove.remove(); 
                removeWorkFromGallery(workId); 
            } else {
                console.error('Erreur lors de la suppression du travail:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du travail:', error);
        }
    }

    // Fonction pour supprimer un travail de la galerie principale
    function removeWorkFromGallery(workId) {
        const workItemInGallery = GalleryPortfolio.querySelector(`article[data-id="${workId}"]`);
        if (workItemInGallery) {
            workItemInGallery.remove();
        }
    }

    // Écouter le clic sur le lien "Modifier" pour ouvrir la modale et afficher les travaux
    const editLink = document.querySelector('.admin-link');
    if (editLink) {
        editLink.addEventListener('click', function(event) {
            event.preventDefault();
            modal.setAttribute('aria-hidden', 'false');
            fetchAndDisplayWorks();
        });
    } else {
        console.error('Élément .admin-link non trouvé dans le DOM.');
    }

    // Écouter le clic sur l'icône de fermeture pour fermer la modale
    const closeModalIcon = document.getElementById('close-modal');
    if (closeModalIcon) {
        closeModalIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            modal.setAttribute('aria-hidden', 'true');
        });
    } else {
        console.error('Élément #close-modal non trouvé dans le DOM.');
    }

    // Écouter les clics en dehors de la modale pour la fermer
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // Initialiser la galerie avec les travaux existants
    fetchAndDisplayWorks();
});
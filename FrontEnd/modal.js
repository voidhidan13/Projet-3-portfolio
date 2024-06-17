async function fetchAndDisplayWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        displayWorksInModal(works);
    } catch (error) {
        console.error('Erreur lors de la récupération des travaux:', error);
    }
}

function displayWorksInModal(works) {
    const modalGallery = document.getElementById('modal-gallery');

    // Effacer le contenu précédent de la galerie
    modalGallery.innerHTML = '';

    // Parcourir chaque travail et créer un élément work-item dans la galerie
    works.forEach(work => {
        const workItem = document.createElement('div');
        workItem.classList.add('work-item');

        const imgElement = document.createElement('img');
        imgElement.src = work.imageUrl;
        imgElement.alt = work.title; // Utilisez un texte alternatif approprié pour l'accessibilité

        // Créer l'icône de suppression
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icon');
        deleteIcon.addEventListener('click', async (event) => {
            event.stopPropagation(); // Empêche la propagation de l'événement au conteneur modal
            await deleteWork(work.id, workItem);
        });

        // Ajouter l'image et l'icône de suppression au conteneur
        workItem.appendChild(imgElement);
        workItem.appendChild(deleteIcon);

        // Ajouter l'élément work-item à la galerie
        modalGallery.appendChild(workItem);
    });
}

async function deleteWork(workId, workItem) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            workItem.remove();
        } else {
            console.error('Erreur lors de la suppression du travail');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du travail:', error);
    }
}

// Appeler fetchAndDisplayWorks lorsque la modale est ouverte
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');

    // Écouter les clics sur le lien "Modifier" pour afficher la modale
    document.querySelector('.admin-link').addEventListener('click', function(event) {
        event.preventDefault();
        modal.setAttribute('aria-hidden', 'false');
        fetchAndDisplayWorks();
    });

    // Écouter le clic sur l'icône de fermeture pour fermer la modale
    const closeModalIcon = document.getElementById('close-modal');
    closeModalIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Empêcher la propagation de l'événement au conteneur modal
        modal.setAttribute('aria-hidden', 'true');
    });

    // Éviter la fermeture de la modale lors du clic en dehors de celle-ci
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            event.stopPropagation(); // Empêcher la propagation de l'événement au conteneur modal
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalGallery = document.getElementById('modal-gallery');

    // Vérifier la présence du token au chargement de la page
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("Le token d'authentification est manquant.");
        return;
    }

    // Fonction pour récupérer et afficher les travaux dans la modale
    async function fetchAndDisplayWorks() {
        try {
            const response = await fetch("http://localhost:5678/api/works", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des travaux');
            }
            const works = await response.json();
            displayWorksInModal(works);
        } catch (error) {
            console.error('Erreur lors de la récupération des travaux:', error);
        }
    }

    // Fonction pour afficher les travaux dans la modale
    function displayWorksInModal(works) {
        modalGallery.innerHTML = ''; // Efface le contenu précédent

        works.forEach(work => {
            const workItem = document.createElement('div');
            workItem.classList.add('work-item');

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
                itemToRemove.remove(); // Supprimer l'élément de l'interface après suppression
            } else {
                console.error('Erreur lors de la suppression du travail:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du travail:', error);
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
});
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

    // Parcourir chaque travail et créer un élément img dans la galerie
    works.forEach(work => {
        const imgElement = document.createElement('img');
        imgElement.src = work.imageUrl;
        imgElement.alt = work.title; // Utilisez un texte alternatif approprié pour l'accessibilité

        // Ajouter la classe pour le style spécifique des images si nécessaire
        imgElement.classList.add('work-item');

        // Ajouter l'image à la galerie
        modalGallery.appendChild(imgElement);
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

    // Écouter les clics en dehors de la modale pour la fermer
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.setAttribute('aria-hidden', 'true');
        }
    });
});
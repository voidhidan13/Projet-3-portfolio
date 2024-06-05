
// Récupération des données de l'API
fetch("http://localhost:5678/api/works")
    .then(async(response) => {
        if (response.ok) return await response.json();
        throw new Error('Erreur réseau');
    })
    .then((data) => {
        const projets = data;
        console.log(projets);

        // Fonction pour créer les articles des projets
        const creerArticlesProjets = (projets) => {
            const sectionGallery = document.querySelector(".gallery");
            sectionGallery.innerHTML = '';

            projets.forEach(projet => {
                const articleProjet = document.createElement("article");
                
                const projetImage = document.createElement("img");
                projetImage.src = projet.imageUrl;
                articleProjet.appendChild(projetImage);

                const projetDesc = document.createElement("p"); 
                projetDesc.innerText = projet.title;
                articleProjet.appendChild(projetDesc);

                sectionGallery.appendChild(articleProjet); 
            });
        };

        // Créer les articles des projets par défaut
        creerArticlesProjets(projets);

        // Ajout des écouteurs d'événements pour les filtres
        const boutonsFiltrage = document.querySelectorAll(".filter");
        boutonsFiltrage.forEach(button => {
            button.addEventListener("click", () => {
                const categorieFiltre = button.dataset.category;
                
                // Filtrer les projets en fonction de la catégorie
                const projetsFiltres = categorieFiltre === "all" ? projets : projets.filter(projet => projet.category.name === categorieFiltre);

                // Recréer les articles des projets avec les projets filtrés
                creerArticlesProjets(projetsFiltres);
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });


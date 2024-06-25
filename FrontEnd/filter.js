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
            const GalleryPortfolio = document.querySelector(".gallery");
            GalleryPortfolio.innerHTML = '';

            projets.forEach(projet => {
                const articleProjet = document.createElement("article");
                articleProjet.setAttribute('data-id', projet.id); // Ajout d'un attribut data-id

                const projetImage = document.createElement("img");
                projetImage.src = projet.imageUrl;
                articleProjet.appendChild(projetImage);

                const projetDesc = document.createElement("p"); 
                projetDesc.innerText = projet.title;
                articleProjet.appendChild(projetDesc);

                GalleryPortfolio.appendChild(articleProjet); 
            });
        };

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
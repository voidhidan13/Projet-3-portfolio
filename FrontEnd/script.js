
// Récupération des données de l'API
fetch("http://localhost:5678/api/works")
    .then(async(response) => {
        if (response.ok) return await response.json();
        throw new Error('Erreur réseau');
    })
    .then((data) => {
        const projets = data;
        console.log(projets) 



// Création de la fonction pour mettre à jour la galerie
        const mettreAJourGalerie = (projetsFiltres) => {
            const sectionGallery = document.querySelector(".gallery");
            sectionGallery.innerHTML = ''; 
       
//AJOUT TRAVAUX          
            projetsFiltres.forEach(projet => {
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

    
    // "Tous"
    const boutonsFiltrage = document.querySelectorAll(".filter");
        boutonsFiltrage.forEach(button => {
    button.addEventListener("click", () => {
         const categorieFiltre = button.dataset.category;

                
                const projetsFiltres = projets.filter(projet => {
                    return categorieFiltre === "all" || projet.category.name === categorieFiltre;
                });

                mettreAJourGalerie(projetsFiltres);
            });
        });


// "Objets"
const boutonObjets = document.querySelector('[data-category="Objets"]');
boutonObjets.addEventListener("click", () => {

    const projetsFiltres = projets.filter(projet => {
        return projet.category.name === "Objets";
    });


    mettreAJourGalerie(projetsFiltres);
});

// "Appartements"
const boutonAppartement = document.querySelector('[data-category="Appartements"]');
boutonObjets.addEventListener("click", () => {
   
    const projetsFiltres = projets.filter(projet => {
        return projet.category.name === "Appartements";
    });

  
    mettreAJourGalerie(projetsFiltres);
});

// HOTELS
const boutonHotelsRestaurants = document.querySelector('[data-category="Hotels & restaurant"]');
boutonHotelsRestaurants.addEventListener("click", () => {
   
    const projetsFiltres = projets.filter(projet => {
        return projet.category.name === "Hotels & restaurants";
    });

   
    mettreAJourGalerie(projetsFiltres);
});



    })
    .catch((error) => {
        console.error(error);
    });
















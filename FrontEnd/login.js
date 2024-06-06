const pageForm = document.querySelector("main");

// Sélection du bouton de connexion
const loginBtn = document.querySelector(".login");

// Ajout d'un écouteur d'événements au bouton de connexion
loginBtn.addEventListener("click", OuvertureForm);

// Fonction pour vider la page et ajouter le titre "Log in" et le formulaire de connexion
function OuvertureForm() {
// Vider le contenu de la page
    pageForm.innerHTML = '';

    // Création de la div pour le titre
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title-div");

    // Création du titre "Log in"
    const loginTitle = document.createElement("h2");
    loginTitle.textContent = "Log in";
    titleDiv.appendChild(loginTitle); // Ajouter le titre "Log in" à la div du titre

    // Création de la div pour le formulaire
    const formDiv = document.createElement("div");
    formDiv.classList.add("form-div");

    // Création du formulaire de connexion
    const form = document.createElement("form");
    form.setAttribute("action", "#");
    form.setAttribute("method", "post");

    // Création du champ Email
    const labelEmail = document.createElement("label");
    labelEmail.setAttribute("for", "loginemail");
    labelEmail.textContent = "Email";
    const inputEmail = document.createElement("input");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("name", "email");
    inputEmail.setAttribute("id", "loginemail");
    inputEmail.setAttribute("autocomplete", "username");
    inputEmail.setAttribute("required", "");
    form.appendChild(labelEmail);
    form.appendChild(inputEmail);

    // Création du champ Mot de passe
    const labelPassword = document.createElement("label");
    labelPassword.setAttribute("for", "password");
    labelPassword.textContent = "Mot de passe";
    const inputPassword = document.createElement("input");
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("name", "password");
    inputPassword.setAttribute("id", "password");
    inputPassword.setAttribute("required", "");
    inputPassword.setAttribute("autocomplete", "current-password");
    form.appendChild(labelPassword);
    form.appendChild(inputPassword);

    // Création du bouton de soumission
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Se connecter");
    form.appendChild(submitButton);

    // Ajouter le formulaire à la div du formulaire
    formDiv.appendChild(form);

    // Ajouter les div du titre et du formulaire à l'élément main
    pageForm.appendChild(titleDiv);
    pageForm.appendChild(formDiv);
}




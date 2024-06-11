function ajoutListenerLogin() {
    const loginform = document.querySelector(".loginform");
    loginform.addEventListener("submit", function(event) {
        event.preventDefault();

        const balisemail = document.getElementById("loginemail");
        const loginmail = balisemail.value;
        console.log(loginmail);

        const balisepassword = document.getElementById("password");
        const loginpassword = balisepassword.value;
        console.log(loginpassword);

        const errorMessage = document.getElementById("errorMessage");

        // Vérification des informations de connexion
        if (loginmail === "sophie.bluel@test.tld" && loginpassword === "S0phie") {
            // Redirection vers la page d'accueil
            window.location.href = "index.html";

            // Stockage du token d'authentification 
            localStorage.setItem("authToken", "your-auth-token-here");
        } else {
            // Affichage d'un message d'erreur
            errorMessage.textContent = "Mot de passe ou email incorrect";
        }
    });
}


ajoutListenerLogin();





function ajoutListenerLogin() {
    const loginform = document.querySelector(".loginform");
    loginform.addEventListener("submit", async function(event) {
        event.preventDefault();

        const balisemail = document.getElementById("loginemail");
        const loginmail = balisemail.value;
        console.log(loginmail);

        const balisepassword = document.getElementById("password");
        const loginpassword = balisepassword.value;
        console.log(loginpassword);

        const errorMessage = document.getElementById("errorMessage");

        try {
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: loginmail, password: loginpassword })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // Redirection vers la page index et stockage du token
                window.location.href = 'index.html';
                localStorage.setItem('token', data.token);
            } else {
                // Affichage du message d'erreur en cas de problème avec la connexion
                errorMessage.textContent = 'Adresse email ou mot de passe incorrect.';
            }
        } catch (error) {
            console.error('Erreur lors de la tentative de connexion :', error);
            errorMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
        }
    });
}

ajoutListenerLogin();

        // CREER PAGE ADMINISTRATION EN DEMANDANT SI LE TOKEN EST BIEN BON
        // MODIFIER HTML VIA DOM







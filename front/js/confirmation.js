// Affiche de la confirmation de commande si elle existe avec toutes les informations

// Function pour afficher le message de confirmation
function showCommand() {
	let currentCommand = localStorage.getItem("idCommand");
  // Si idCommand existe: (confirmation)
	if (currentCommand) {
		document.getElementById("no_command").style.display = "none";
    // On affiche le texte et les informations
		document.getElementById("confirmation").innerHTML += `
        <div class="container col-10 text-center border shadow bg-white rounded p-4">
          <h3 class="mb-4">Votre commande a bien été enregistrée !</h3>
          <div>Numéro de commande</div>
          <div class="font-weight-bold mb-4">${localStorage.idCommand}</div>
          <div>Montant total de votre commande</div>
          <div class="font-weight-bold mb-4">${localStorage.totalCart} €</div>
          <h3 class="mb-4">Un mail vous sera adressé dès expédition de votre commande </h3>
          <div>Merci de votre confiance et à bientôt !</div>
        </div>
  `;
  // Si idCommand n'existe pas (no_command)
	} else {
		document.getElementById("confirmation").style.display = "none";
		document.getElementById("no_command").innerHTML += `
      <div class="container col-10 text-center border shadow bg-white rounded p-4 ">
        <h3 class="mb-4">Vous n'avez pas de commande en cours</h3>
        <button type="button" class="btn btn-success p-2"><a href="index.html" id="bouton_command" class="text-white">Découvrez notre gamme d'appareils-photo</a></button>
      </div>
      `;
	}
}

// Affichage de la page de la commande 
showCommand();
// On calcule le nouveau nombre de produits dans le panier
cartNumber();

const panier = JSON.parse(localStorage.getItem("panier"));

//Condition pour afficher le panier
if (panier) {
	ligneTableau();
} else {
	tableauVide();
}
//Boucle pour importer données de chaque article panier
function ligneTableau() {
	panier.forEach(function (result, index) {
		infosHTML(result, index);
	});
	totalPanier();
	cartNumber();
}
//Ajout html pour chaque produit importé dans le panier
function infosHTML(result, index) {
	document.getElementById("ajout_panier").innerHTML += `
    <tbody id="products-tablebody">
      <tr id="ligne_tableau">
        <td class="text-center"><img src="${result.image}"  alt="appareil ${result.name}"> <br/> ${
		result.name
	} <br/> Objectif : ${result.lenses}</td>
        <td class="text-center">
          <button disabled="disabled" onclick="quantiteMoins(${index})" id="bouton_moins${index}" class="btn btn-secondary btn-sm">-</button>
          <span id="quantite_nombre${index}" class="quantite_produit">${result.quantite}</span>
          <button onclick="quantitePlus(${index})" id="bouton_plus${index}" class="btn btn-secondary btn-sm">+</button>
        </td>
        <td id="prix_unite${index}" class="text-center">${result.price + " €"}</td>
        <td id="sous_total${index}"class="subtotal text-center">${result.subTotal + " €"}</td>
        <td class="text-center"><i id="supp_produit" onclick="annulerArticle()" type="button" class="fas fa-trash-alt" title="Supprimer le produit du panier"></i></td>
      </tr>
    </tbody>`;
}
//calcul et affichage du prix total panier
function totalPanier() {
	let total = 0;
	panier.forEach(function (result, index) {
		total = total + panier[index].price * panier[index].quantite;
		console.log(total);
	});
	document.getElementById("prix_total").textContent = total + " €";
	localStorage.setItem("totalPanier", total);
}

//pour faire disparaitre le bouton, le panier, le formulaire lorsque le panier est vide
function tableauVide() {
	document.getElementById("panier_vide").innerHTML += `
    <div class="container col-6 text-center border shadow bg-white rounded p-4 ">
      <h3 class="mb-4">Votre panier est vide</h3>
      <i class="fas fa-shopping-cart fa-1x"></i>
    </div>`;
	document.getElementById("tableau_panier").style.display = "none";
	document.getElementById("vider_panier").style.display = "none";
	document.getElementById("formulaire").style.display = "none";
	document.getElementById("valid_commande").style.display = "none";
}
//pour vider le panier et le localStorage
function viderPanier() {
	localStorage.clear();
	location.reload();
}
// pour retirer article du panier
function annulerArticle(i) {
	panier.splice(i, 1); // on supprime un item du panier
	localStorage.clear(); // on le retire du localstorage
	// Mise à jour du nouveau panier après suppression de l'article
	localStorage.setItem("panier", JSON.stringify(panier));
	//Mise à jour de la page pour affichage de la suppression au client
	window.location.reload();
}
//pour ajouter quantite dans le panier
function quantitePlus(index) {
	let quantite = document.getElementById(`quantite_nombre${index}`);
	let ajoutQuantite = ++panier[index].quantite; //on incrémente la quantité dans le localstorage
	quantite.textContent = ajoutQuantite; //on met à jour la quantité dans le tableau
	let sousTotal = document.getElementById(`sous_total${index}`);
	let ajoutTotal = panier[index].price * panier[index].quantite;
	sousTotal.textContent = `${ajoutTotal} €`; //on met à jour le sous-total dans le tableau
	//console.log(ajoutQuantite)
	localStorage.setItem("panier", JSON.stringify(panier)); // on met à jour le localstorage
	totalPanier(); //on met à jour le total panier
	if (ajoutQuantite > 1) {
		document.getElementById(`bouton_moins${index}`).removeAttribute("disabled");
	}
}
//pour retirer quantite dans le panier
function quantiteMoins(index) {
	let quantite = document.getElementById(`quantite_nombre${index}`);
	let retraitQuantite = --panier[index].quantite; //on décrémente la quantité dans le localstorage
	quantite.textContent = retraitQuantite; //on met à jour la quantité dans le tableau
	let sousTotal = document.getElementById(`sous_total${index}`);
	let ajoutTotal = panier[index].price * panier[index].quantite;
	sousTotal.textContent = `${ajoutTotal} €`; //on met à jour le sous-total dans le tableau
	//console.log(retraitQuantite)
	localStorage.setItem("panier", JSON.stringify(panier)); // on met à jour le localstorage
	totalPanier(); //on met à jour le total panier
	if (retraitQuantite <= 1) {
		document.getElementById(`bouton_moins${index}`).setAttribute("disabled", "disabled");
	}
}

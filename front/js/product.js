// Fiche Produits

// Fonction pour appeler les URL + API + fonctions pour afficher le produit + liste objectifs
function addContent() {
	let id = new URL(window.location).searchParams.get("id");
	fetch(`${"http://localhost:3000/api/cameras"}/${id}`)
		.then((response) => response.json())
		.then((data) => {
			item = data;
			addHTML();
			addLenses();
		});
}

// Fonction pour ajouter les objectifs pour chaque produit renseigné dans l'API
function addLenses() {
	for (let i = 0; i < item.lenses.length; i++) {
		document.getElementById(
			"lense_select"
		).innerHTML += `<option value="${item.lenses[i]}">${item.lenses[i]}</option>`;
	}
}

// Fonction pour afficher le produit (HTML)
function addHTML() {
	document.getElementById("focus_product").innerHTML += `
	  <div class="display_product">
		<img class=”picture_product” src="${item.imageUrl}"  alt="device ${item.name}">
		<h3 class="ml-4 mt-4">${item.name}</h3>
		<p class="description_product ml-4">${item.description}</p>
		<p class="price_product mt-4 ml-4"><span>${item.price / 100}€</span></p>
	  </div>
	`;
}

// Fonction pour ajouter le produit au panier
function addCart() {
	// Récupère le type d'objectif choisi
	let lenses = document.querySelector("select").value;
	// Variable exist pour indiquer que appareil photo+objectif est choisi 
	let exist = false;
	// On teste si l'utilsateur a choisi un objectif
	if (lenses == "") {
		// Si aucun objectif n'est choisi on affiche un message d'erreur
		swal({
			title: "Attention!",
			text: "Vous devez choisir un objectif",
			type: "warning",
			confirmButtonColor: "btn-secondary"
		});
	} else {
		// Si un objectif est choisi, on extrait  json ou on crée un tableau si le panier est vide
		const cart = JSON.parse(localStorage.getItem("cart")) || [];
		// On boucle sur appareils photo+objectif déjà dans le panier (cart) 
		cart.forEach(element => {
			// Si le nouvel appareil photo+objectif est dans le panier on icrémente la qté et le sous total
			if (element.id == item._id && element.lenses == lense_select.value) {
				element.quantity ++;
				element.subTotal = item.price / 100 * element.quantity;
				exist = true;
			}
		});
		// Si le nouvel appareil photo+objectif n'est pas dans le panier, on le crée
		if (!exist) {	
			cart.push({
				// Pour chaque article, on place les infos suivantes dans le panier
				image: item.imageUrl,
				name: item.name,
				id: item._id,
				lenses: lense_select.value,
				description: item.description,
				price: item.price / 100,
				quantity: 1,
				subTotal: (item.price / 100) * 1,
			});
		}
		// On stocke les infos
		window.localStorage.setItem("cart", JSON.stringify(cart));
		// On affiche le message de confirmation d'ajout dans le panier
		showModal();
	}
}

// Fonction pour afficher le message de confirmation d'ajout dans le panier et les redirections vers panier ou page produits
function showModal() {
	document.getElementById(
		"pop_up"
	).innerHTML +=
	`<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
		  	<div class="modal-content">
				<button type="button" class="close text-right pr-2" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
				<div id="bg_modal" class="modal-body text-left pt-2">
			  		<h3 class="mb-4">Vous avez ajouté<br/>un produit au panier</h3>
				</div>
				<div class="modal-footer justify-content-center">
			  		<button id="bouton_modal1" type="button" class="btn btn-secondary"><a href="index.html">Continuer vos achats</a></button>
			  		<button id="bouton_modal2" type="button" class="btn btn-secondary"><a href="cart.html">Voir votre panier</a></button>
				</div>
		  	</div>
		</div>
	</div>`;
}

// On affiche les produits différents
addContent();
// On évalue le nombre de produits différents
cartNumber();

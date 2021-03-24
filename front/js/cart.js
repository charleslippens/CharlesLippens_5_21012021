const cart = JSON.parse(localStorage.getItem("cart"));

// On affiche le panier ou un message si le panier est vide
if (cart) {
	rowTable();
} else {
	tableEmpty();
}

// On utilise une boucle pour afficher le panier: données de chaque article, calcul prix total et nombre de produits différents
function rowTable() {
	cart.forEach(function (result, index) {
		infosHTML(result, index);
	});
	buttonOnclick ();
	totalCart();
	cartNumber();
}

// Ajout html pour afficher chaque produit importé dans le panier
function infosHTML(result, index) {
	document.getElementById("add_cart").innerHTML += `
	<tbody id="products-tablebody">
      <tr id="row_table">
        <td class="text-center"><img src="${result.image}"  alt="appareil ${result.name}"> <br/> ${
		result.name
	} <br/> Objectif : ${result.lenses}</td>
        <td class="text-center">
			<button id="button_minus${index}" class="btn btn-secondary btn-sm">-</button>
			<span id="quantity_number${index}" class="quantity_product">${result.quantity}</span>
			<button id="button_plus${index}" class="btn btn-secondary btn-sm">+</button>
         </td>
        <td id="price_unitary${index}" class="text-center">${result.price + " €"}</td>
        <td id="subtotal${index}"class="subtotal text-center">${result.subTotal + " €"}</td>
		<td class="text-center"><i id="button_remove${index}" type="button" class="fas fa-trash-alt" title="Supprimer le produit du panier"></i></td>

		</tr>
    </tbody>`;
}

// On utilise addEventListener pour les actions des boutons 
// On boucle sur les articles du panier pour des actions sur tous les boutons +/-/poubelle
function buttonOnclick () {
cart.forEach(function (result,i) {
	// On définit les variables button_minus/plus0, 1, 2...
	let button_minusi='button_minus'+i; 
	let button_plusi='button_plus'+i;
	let button_removei="button_remove"+i;
	// Appel de la fonction qui décrémente la quantité (minus) sur click
	document.getElementById(button_minusi).addEventListener("click",quantityCham);
	function quantityCham() {
		quantityChange(i,'minus');
	}
	// Appel de la fonction qui incrémente la quantité (plus) sur click
	document.getElementById(button_plusi).addEventListener("click",quantityChap);
	function quantityChap() {
		quantityChange(i,'plus');
	}
	// Appel de la fonction qui supprime le produit sur click
	document.getElementById(button_removei).addEventListener("click",removeIte);
	function removeIte() {
		removeItem(i);
	}
});}
 
// Calcul et affichage du prix total panier
function totalCart() {
	let total = 0;
	cart.forEach(function (product) {
		total = total + product.price * product.quantity;
	});
	document.getElementById("price_total").textContent = total + " €";
	localStorage.setItem("totalCart", total);
}

// Pour faire disparaitre le bouton, le panier, le formulaire lorsque le panier est vide
function tableEmpty() {
	document.getElementById("cart_empty").innerHTML += `
    <div class="container col-6 text-center border shadow bg-white rounded p-4 ">
      <h3 class="mb-4">Votre panier est vide</h3>
      <i class="fas fa-shopping-cart fa-1x"></i>
    </div>`;
	document.getElementById("table_empty").style.display = "none";
	document.getElementById("clear_Cart").style.display = "none";
	document.getElementById("form").style.display = "none";
	document.getElementById("validate_command").style.display = "none";
}

// Pour vider le panier, localStorage
function clearCart() {
	localStorage.clear();
	location.reload();
}

// Pour retirer un article du panier
function removeItem(i) {
	cart.splice(i, 1); // on supprime le ième item du panier  
	localStorage.clear(); // on le retire du localstorage
	// On met à jour le nouveau panier après suppression de l'article
	localStorage.setItem("cart", JSON.stringify(cart));
	// Panier vide si le nbre d'items est nul 
	cartNumber();
	let cartnum = document.getElementById("cart_number").textContent;
	if (cartnum == 0) {
		clearCart();
	}
	// On met à jour de la page pour affichage de la suppression Sau client
	window.location.reload();
}

// Pour modifier les quantités dans le panier avec +/-
function quantityChange(index,i) {
	let quantity = document.getElementById(`quantity_number${index}`);
	let changeQuantity = 0;
	// On incrémente la quantité dans le localstorage si bouton +
	if (i == 'plus') {
		changeQuantity = ++cart[index].quantity;
	}
	// On décrémente la quantité dans le localstorage si bouton - avec limite à 1
	if (i == 'minus') {
		if (cart[index].quantity == 1) {
			changeQuantity = 1;
		} else {
			changeQuantity = --cart[index].quantity;
		}
	}
	// On met à jour la quantité dans le tableau
	quantity.textContent = changeQuantity;
	// On met à jour le sous-total dans le tableau
	let subTotal = document.getElementById(`subtotal${index}`);
	let addTotal = cart[index].price * cart[index].quantity;
	cart[index].subTotal = addTotal;
	subTotal.textContent = `${addTotal} €`; 
	// On met à jour le localstorage
	localStorage.setItem("cart", JSON.stringify(cart));
	// On met à jour le total du panier 
	totalCart();
	// On active le bouton - si qté > 1 
	if (changeQuantity > 1) {
		document.getElementById(`button_minus${index}`).removeAttribute("disabled");
	}
	// On désactive le bouton - si qté <= 1
	if (changeQuantity <= 1) {
		document.getElementById(`button_minus${index}`).setAttribute("disabled", "disabled");
	}
	// Décommenter our limiter la quantité
	// On active le bouton + si qté < 10
	//if (changeQuantity < 10) {
	//	document.getElementById(`button_plus${index}`).removeAttribute("disabled");
	//}
	// On désactive le bouton + si qté >= 10
	//if (changeQuantity >= 10) {
	//	document.getElementById(`button_plus${index}`).setAttribute("disabled", "disabled");
	//}
}

// FORMULAIRE + REQUETE POST

// Vérification de 2 champs du formulaire et envoi commande 
if (cart) {
	checkMailAddress();
	checkPostalCode();
	submitForm();
}

// On crée un évènement pour vérifier le champ mail en supprimant le focus
function checkMailAddress() {
document.querySelector("#mail").addEventListener("blur", function () {
	const mail = document.querySelector("#mail").value;
	// Utilisation de regex pour format adresse mail
	const regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
	if (!regexEmail.test(mail)) {
		document.querySelector("#error_mail").textContent = "Adresse email non valide";
	} else {
		document.querySelector("#error_mail").textContent = "";
	}
});
}

// On crée un évènement pour vérifier le champ code postal en enlevant le focus
function checkPostalCode () {
document.querySelector("#postalcode").addEventListener("blur", function () {
	const postalCode = document.querySelector("#postalcode").value;
	// Utilisation de regex pour 5 chiffres
	const regexEmail = /^[0-9]{5}$/;
	if (!regexEmail.test(postalCode)) {
		document.querySelector("#error_code").textContent =
			"Code postal non valide. 5 chiffres obligatoires";
	} else {
		document.querySelector("#error_code").textContent = "";
	}
});
}

// On crée un évènement pour effacer le formulaire
//document.querySelector("#refresh").addEventListener("click", function () {
//	document.querySelector("#error_mail").textContent = "";
//	document.querySelector("#error_code").textContent = "";
//});

// On crée un évènement pour valider le formulaire et envoyer la requête POST
function submitForm() {
document.querySelector("#form").addEventListener("submit", function (event) {
	event.preventDefault();
	// Bloque la commande si les champs du formulaire sont vides
	let input = document.getElementsByTagName("input");
	// On fait une boucle pour vérifier si chaque champ a été renseigné
	for (let i = 0; i < input.length; i++) {
		// Si un des champs est vide, on envoie d'un message d'erreur
		if (input[i].value == "") {
			swal(
				"Formulaire non valide !", "Merci de renseigner correctement le formulaire"
			);
			return false;
		}
	}
	// Bloque la commande si les champs code postal ou mail sont mal renseignés 
	if ((document.querySelector("#error_code").textContent != "") || (document.querySelector("#error_mail").textContent != "")) {
		swal(
			"Formulaire non valide !", "Merci de renseigner correctement le formulaire"
		);
		return false;
	}
	requestPost();
	confirmCommand();
	localStorage.clear();
	totalCart();
});
}

// Pour créer la requete POST avec numéro commande et infos contact
function requestPost() {
	const idTable = cart.map(function (product) {
		return product.id;
	});
	let order = {
		contact: {
			firstName: document.querySelector("#firstname").value.trim(),
			lastName: document.querySelector("#name").value.trim(),
			address: document.querySelector("#adress").value.trim(),
			city: document.querySelector("#city").value.trim(),
			email: document.querySelector("#mail").value.trim(),
		},
		products: idTable,
	};
	//console.log(order);
	const request = new Request("http://localhost:3000/api/cameras/order", {
		// On crée la requête POST vers API
		method: "POST",
		body: JSON.stringify(order),
		headers: new Headers({
			Accept: "application/json",
			"Content-Type": "application/json",
		}),
	});

	fetch(request)
		.then((response) => response.json())
		.then((json) => {
			//on récupère la réponse de l'API pour obtenir numéro de commande
			let numCommand = json.orderId;
			//console.log(numCommand)
			localStorage.setItem("idCommand", JSON.stringify(numCommand)); // mis à jour du localstorage avec numero de commande
			localStorage.setItem("infosOrder", JSON.stringify(order)); // mis à jour du localstorage avec infos de commande
		});
}

// On confirme la commande
function confirmCommand() {
	swal("Votre commande a bien été validée, vous allez être redirigé", "", "success");
	setTimeout(function () {
		window.location = "confirmation.html";
	}, 3000);
}



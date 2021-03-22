// Page d'accueil du site Orinoco

// On intialise la constante "products"
const products = document.getElementById("products");

// On appelle l'API
fetch("http://localhost:3000/api/cameras")
	// Récupération une réponse au format json
	.then(function (response) {
		return response.json();
	})
	// Récupération de la liste des produits et affichage
	.then(function (items) {
		getRequest(items);
	});

// On évalue le nombre de produits dans le panier pour affichage dans la navigation
cartNumber();

// Fonction pour afficher les cartes produits dans le code HTMl
function getRequest(products) {
	// Boucle sur les produits
	products.forEach( (product) => {

		// On crée une div (container) pour l'affichage du produit
		const productCard = document.createElement("div");
		productCard.setAttribute("id", product._id);
		productCard.setAttribute("class", "card p-6 m-4");
		productCard.setAttribute("style", "justify-content:space-between");

		// On affiche l'image du produit
		const productImg = document.createElement("img");
		productImg.setAttribute("src", product.imageUrl);
		productImg.setAttribute("class", "img-fluid");
		productImg.setAttribute("style", "max-width: 300px");
		productCard.appendChild(productImg);

		// On affiche le nom du produit
		const productName = document.createElement("h3");
		productName.setAttribute("class", "name card-title pt-2 pl-2");
		productName.innerHTML = product.name;
		productCard.appendChild(productName);

		// On affiche le prix du produit
		const productPrice = document.createElement("p");
		productPrice.setAttribute("class", "price pl-2");
		productPrice.innerHTML = product.price.toFixed(2) / 100 + ",00 €";
		productCard.appendChild(productPrice);

		// On crée le bouton "Voir plus" sur chaque carte produit
		const productLink = document.createElement("a");
		productLink.setAttribute("href", "product.html?id=" + product._id);
		productLink.setAttribute("class", "link btn bg-pink btn-outline-dark");
		productLink.innerHTML = "Voir plus ➔ ";
		productCard.appendChild(productLink);

		// On ajoute la carte produit (productCard, enfant) à la liste des produits (products, parent)
		document.getElementById("products").appendChild(productCard);
	});
}

//getRequest();


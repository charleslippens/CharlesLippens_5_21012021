// Initialise la constante - Positionne dans la div nommée "products"
const products = document.getElementById("produits");

// Appelle l'API
fetch("http://localhost:3000/api/cameras")
	// Récupère une réponse au format json
	.then(function (response) {
		return response.json();
	})

	// Récupère la liste des produits
	.then(function (items) {
		getRequest(items);
	});

// Affiche le contenu de chaque carte produit dans le code HTMl
function getRequest(products) {
	products.forEach((product) => {
		// Crée une div pour l'affichage des produits
		const productCard = document.createElement("div");
		productCard.setAttribute("id", product._id);
		productCard.setAttribute("class", "card p-6 m-4");

		// Affiche l'image des produits
		const productImg = document.createElement("img");
		productImg.setAttribute("src", product.imageUrl);
		productImg.setAttribute("class", "img-fluid");
		productImg.setAttribute("style", "max-width: 400px");
		productCard.appendChild(productImg);

		// Affiche le nom des produits
		const productName = document.createElement("h3");
		productName.setAttribute("class", "name card-title pt-2");
		productName.innerHTML = product.name;
		productCard.appendChild(productName);

		// Affiche le prix des produits
		const productPrice = document.createElement("p");
		productPrice.setAttribute("class", "price");
		productPrice.innerHTML = product.price.toFixed(2) / 100 + ",00 €";
		productCard.appendChild(productPrice);

		// Crée le bouton "Voir plus" sur chaque carte produit
		const productLink = document.createElement("a");
		productLink.setAttribute("href", "produit.html?id=" + product._id);
		productLink.setAttribute("class", "link btn bg-pink btn-outline-dark");
		productLink.innerHTML = "Voir plus ➔ ";
		productCard.appendChild(productLink);

		// Insère la div "productCard" dans la div nommée "products"
		document.getElementById("produits").appendChild(productCard);
	});
}
getRequest();
cartNumber();

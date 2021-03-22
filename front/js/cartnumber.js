// Fonction pour évaluer le nombre de produits différents du panier(cart_number)
function cartNumber() {
	const cart = JSON.parse(localStorage.getItem("cart"));
	// incrémente inCart tant qu'il y a des éléménts dans le panier
	if (cart) {
		let inCart = 0;
		// incrémente inCart tant qu'il y a des éléménts dans le panier
		cart.forEach(() => {
			inCart = inCart + 1;
		});
		localStorage.setItem("inCart", inCart);
		document.getElementById("cart_number").textContent = inCart;
	}
}

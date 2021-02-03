//Appel URL + API + fonctions pour afficher le produit
function ajoutContent () {
  let id = new URL(window.location).searchParams.get('id')
fetch(`${"http://localhost:3000/api/cameras"}/${id}`)
    .then(response => response.json()).then (data => {
      
        article = data
        ajoutHTML()
        ajoutLenses()
        console.log(article);        
    })
}
//Ajout lentilles pour chaque item renseignée dans l'API
function ajoutLenses() {
  for (let i = 0; i < article.lenses.length; i++) {
  document.getElementById("lense_select").innerHTML += `<option value="${article.lenses[i]}">${article.lenses[i]}</option>`
  }
}
// Présentation produit HTML
function ajoutHTML() {
  document.getElementById('focus_produit').innerHTML += 
  `
    <div class="affichage_produit">
      <img class="img-thumbnail" src="${article.imageUrl}"  alt="appareil ${article.name}">
      <h3 class="ml-4 mt-4">${article.name}</h3>
      <p class="description_produit ml-4">${article.description}</p>
      <p class="prix_produit mt-4 ml-4"><span>${article.price/100}€</span></p>
    </div>
  `
}

ajoutContent();


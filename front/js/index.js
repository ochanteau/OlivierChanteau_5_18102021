
/*  
*   fonction qui effectue une requete fetch vers API 
*   pour obtenir le tableau de produit et 
*   appelle la fonction displayResult avec le resulat
*/

 function displayProducts  () {
  fetch("http://localhost:3000/api/products")
    .then (async response => {
        try{
          const products = await response.json();
          displayResult(products);
        }
        catch (e){
          console.log(e);
        }
    })
}


/*  
*  fonction pour inserer chaque produit du tableau dans le DOM et 
*  creer un lien vers sa page produit respective
*  @param : {array} tableau d'objets pour récupérer les cles suivantes:
* (_id,imageUrl,altTxt,name,description)
*/

function displayResult(array) {
   array.forEach(data => {
      const a = document.createElement("a");
      a.setAttribute("href", `./product.html?id=${data._id}`)
      a.innerHTML =
      `
      <article>
      <img src="${data.imageUrl}" alt ="${data.altTxt}" >
      <h3 class="productName">${data.name}</h3>
      <p class="productDescription">${data.description}</p>
      </article>
      `;
      document.querySelector("#items").append(a);   
  });
}




displayProducts () ;






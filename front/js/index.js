

// fonction pour afficher le tableau de poduits sur la page d'accueil 
 function displayProducts  () {
  fetch("http://localhost:3000/api/products")
  .then (async response => {
    try{
      const produits = await response.json();
      console.log(produits);
      displayResult(produits);
    } catch (e){
      console.log(e);
    }
  })
}

// fonction pour afficher chaque produits du tableau de produits , prend en parametre un tableau sur lequel nous allons itérer

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



// 





displayProducts () ;






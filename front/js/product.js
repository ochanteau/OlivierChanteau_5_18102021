const currentPage = window.location.href;
console.log(location);
var url = new URL (currentPage);
console.log(url);
const id = url.searchParams.get("id");
console.log(id);

// fonction pour afficher les caractéristiques du produit sur la page produit
function displayProduct  () {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then (async response => {
      try{
        const product = await response.json();
        console.log(product);
        displayResult(product);
      } catch (e){
        console.log(e);
      }
    })
  }
  
// fonction pour inserer les caractéristiques du produit du tableau de produits , prend en parametre un objet

function displayResult(product) {
    const img = document.createElement("img");
    img.setAttribute("src", `${product.imageUrl}`)
    img.setAttribute("alt", `${product.altTxt}`);
    document.querySelector(".item__img").append(img);
   
    const h1 = document.getElementById("title");
    h1.innerText = `${product.name}` ;
      
    const price = document.getElementById("price");
    price.innerText = `${product.price}` ;
      
    const description = document.getElementById("description");
    description.innerText = `${product.description}` ;

    const colorsArray = product.colors;
   

    colorsArray.forEach(index=> {
        const option = document.createElement("option");
        option.setAttribute("value", `${index}`);
        option.textContent = `${index}`
        document.getElementById("colors").append(option);
      
      
        
      });



    //   a.setAttribute("href", `./product.html?id=${data._id}`)
    //   a.innerHTML =
    //   `
    //   <article>
    //   <img src="${data.imageUrl}" alt ="${data.altTxt}" >
    //   <h3 class="productName">${data.name}</h3>
    //   <p class="productDescription">${data.description}</p>
    //   </article>
    //   `;
    //   document.querySelector("#items").append(a);
    
    
      
  
    
  }
  
  displayProduct  ()
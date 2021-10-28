// recupération de l'URL de la page courante
const currentPage = window.location.href;

// creation objet URL avec la page courante
var url = new URL (currentPage);

// recupération de l'id produit de la page courante
const id = url.searchParams.get("id");


// fonction pour afficher les caractéristiques du produit sur la page produit
function displayProduct  () {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then (async response => {
      try{
        const product = await response.json();
     
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

    product.colors.forEach(color=> {
        const option = document.createElement("option");
        option.setAttribute("value", `${color}`);
        option.textContent = `${color}`
        document.getElementById("colors").append(option);
      });    
  }


// 

// const cart = [{id: '107fb5b75607497b96722bda5b504926', color: 'Blue', quantity: 3},
// {id: '107fb5b75607497b96722bda5b504926', color: 'White', quantity: 3}];
// let cart = [];
// let cart = [JSON.parse(localStorage.getItem("panier"))];
// console.log(cart);

class cartItem {
    constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
    }
    }


 const addToCart= document.getElementById("addToCart");
 const cart = [JSON.parse(localStorage.getItem("panier"))];
 console.log(cart);


 addToCart.addEventListener("click", ()=> {
    const itemQuantity=  Number(document.getElementById("quantity").value);
    const selectColor = document.getElementById("colors").value;
    const  product = new cartItem (id,selectColor,itemQuantity);
    console.log(product);
    
    
    


    // if ( itemQuantity !== 0 && selectColor !=="") {
    //   verification (cart,product);
    //   localStorage.setItem("panier", JSON.stringify(cart));
    // } ;
  

    if (cart[0] == null) { cart[0] = product}
    else {verification (cart,product) }

    console.log(cart);
    localStorage.clear();
   
    localStorage.setItem("panier", JSON.stringify(cart));
    
      
})


function verification (array,object) {
  const verification = array.findIndex(x=> x.id === object.id && x.color === object.color );
    console.log(verification);
    if (verification !== -1) { array[verification].quantity += object.quantity}
    else {
      array.push(object);
    }
}




// localStorage.setItem("panier", JSON.stringify(cart));
console.log(localStorage);
console.log(JSON.parse(localStorage.getItem("panier")));
// localStorage.clear();

// console.log(JSON.parse(localStorage.getItem("panier")));
 displayProduct  ();



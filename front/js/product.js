// recupération de l'URL de la page courante
const currentPage = window.location.href;

// creation objet URL avec la page courante
var url = new URL (currentPage);

// recupération de l'id produit de la page courante
const id = url.searchParams.get("id");



/*  
*   fonction displayProduct () qui effectue une requete fetch vers API 
*   pour obtenir un produit spécifique en utilisant la variable id et 
*   appelle la fonction displayResult avec le resulat
*/
function displayProduct  () {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then (async response => {
      try{
        const product = await response.json();
        displayResult(product);
      }
      catch (e){
        console.log(e);
      }
    })
  }
  
/*  
*  fonction displayResult(product) pour inserer les différents éléments du produit dans le DOM
*  @param : {object} poduct , un objet pour récupérer les cles suivantes:
* (poduct.imageUrl,poduct.altTxt,poduct.name,poduct.price,poduct.description, poduct.colors (array of colors))
*/
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
        option.textContent = `${color}`;
        document.getElementById("colors").append(option);
    });    
  }


    
/*  
*  Classe CartItem , creation d'un élément standart du panier 
*  constructeur : { (id: string), (color: string), (quantity: number)}
* 
*/


class cartItem {
    constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
    }
}



// ciblage du boutton ajouter au panier
 const addToCart= document.getElementById("addToCart");


 /*  
*  
*  creation d'une variable 
*  qui recupére l'array associé à la  clé "panier" du local storage
*  au format objet javascript
*/

 let cart = JSON.parse(localStorage.getItem("panier"));

/*
* addToCart.addEventListener
* Mise en place d'un EventListner sur le boutton ajouter au panier
* verifie que l'utilisateur a bien saisi une quantité et une couleur et
* Recupere la quantité et la couleur choisie par l'utilisateur
* créé une instance de CartItem avec les valeurs recupérées et l'id du produit
* Si la varibale cart est null on assigne l'objet crée à cart sinon on appelle
* la fonction verification
* on termine par effacer le localstorage et lui assigner la clé "panier" avec 
* pour valeur la variable cart au format JSON 
*/

 addToCart.addEventListener("click", ()=> {
    const itemQuantity=  Number(document.getElementById("quantity").value);
    const selectColor = document.getElementById("colors").value;
    const  product = new cartItem (id,selectColor,itemQuantity);
    
    if ( itemQuantity !== 0 && selectColor !=="") {
        if (cart == null) { cart = [product]}
        else {verification (cart,product) }
        localStorage.clear();
        localStorage.setItem("panier", JSON.stringify(cart));
    } 
})


/*  
*  function verification (array,object)
*  fonction qui verifie si la clé id d'un objet produit et sa clé couleur sont deja presents
*  dans un array 
   Si ces clés sont déja présentes on modifie la clé "quantity" avec l'index retourné par la 
   méthode findIndex
   Si elles ne sont pas présentes on ajoute  l'objet au tableau avec la methode push.
*  @param : {array} tableau sur lequel on va itérer  
*  @param : {object} objet sur lequel on va recuperer {object.id} et {object.color}
*  pour vérifier leur presence dans le tableau
*/

function verification (array,object) {
  const verification = array.findIndex(x=> x.id === object.id && x.color === object.color );
  if (verification !== -1) { array[verification].quantity += object.quantity}
  else {
      array.push(object);
  }
}



 displayProduct  ();



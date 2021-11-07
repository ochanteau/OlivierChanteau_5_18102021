
/*  
*  creation d'une variable 
*  qui recupére l'array associé à la  clé "panier" du local storage
*  au format objet javascript
*/
let cart = JSON.parse(localStorage.getItem("panier"));

// ciblage prix total et quantité total

const  selectTotalQuantity = document.getElementById("totalQuantity");
const  selectTotalPrice = document.getElementById("totalPrice");


/*
* fonction updateCartPage()
* Elle verifie que le panier n 'est pas vide ou nulle 
* Si il est vide ou nulle, affiche 0 pour la quantité total et le prix total
* si il n'est pas vide , appel la fonction displayCart
*/
function updateCartPage() {
    if ( !cart || cart.length == 0) {
        selectTotalQuantity.textContent = "0";
        selectTotalPrice.textContent = "0";
    }
    else { displayCart(cart)}

  }



/*
* fonction displayCart(array)
* Fonction  qui effectue une requete à l'API pour chaque élément du tableau passé en argument
* avec la réponse, appelle la fonction display product
* affiche et mets à jour la quantité total et le prix total
* @param {array} tableau d'objets {object.id, object.quantity,object.color}
*/
function displayCart(array) {
    let totalQuantity = 0;
    let totalPrice = 0;
    array.forEach((data,index,array) => {
        fetch(`http://localhost:3000/api/products/${data.id}`)
        .then (async response => {
          try{
            const product = await response.json();
            displayProduct(product,index,array);

            totalQuantity += array[index].quantity;
            totalPrice += (product.price * array[index].quantity);
            selectTotalQuantity .textContent =  `${totalQuantity}`;
            selectTotalPrice.textContent = `${totalPrice}`;
           
          } catch (e){
            console.log(e);
          }
        })
      
    });

  }


//  fonction qui affiche sur la page les différents caractéristiques du produit en parametre 

  function displayProduct(data,index,array){
    const article = document.createElement("article");
    article.setAttribute("data-id", `${data._id}`);
    article.setAttribute("data-color", `${array[index].color}`);
    article.className = "cart__item";
    article.innerHTML =
    `
    <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
            <h2>${data.name}<br/>${array[index].color}</h2>
            
            <p>${data.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : ${array[index].quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${array[index].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
    `;
    document.querySelector("#cart__items").append(article);
    
  
  }

  // localStorage.clear();


// ciblage de la liste d'article du panier
const cartList =document.getElementById("cart__items");

/*  fonction qui écoute les modifications de quantité sur les produits
*   et appel la fonction quantityModification si la quantité est toujours positive 
*   ou removeItem si la quantité est négative 
*/


cartList.addEventListener("change", event => {

  const cartItem = event.target.closest(".cart__item");
  if (event.target.value == 0) { removeItem(cart,cartItem)}
  else {quantityModification (cart,cartItem,event)}
  document.querySelector("#cart__items").innerHTML =""; 
  updateCartPage();
  localStorage.clear();
  localStorage.setItem("panier", JSON.stringify(cart));
});


/*  fonction qui cherche l'index du produit concerné par la modification
*   et modifie sa quantité par l'élément saisie en input
*/
function quantityModification (array,element,event) {
    const findIndex = array.findIndex(x=> x.id === element.dataset.id && x.color === element.dataset.color );
    console.log(findIndex);
    array[findIndex].quantity = Number(event.target.value);
    console.log(event.target.value);
   
   
  }
  

  /*  fonction qui écoute la demande de suppression des produits
*   et appel la fonction removeItem 
* 
*/


  cartList.addEventListener("click", event => {
      if (event.target.className != "deleteItem") {
        return null;
      }
      else {
      const cartItem = event.target.closest(".cart__item");
      removeItem(cart,cartItem);
      document.querySelector("#cart__items").innerHTML ="";
      updateCartPage() ; 
      localStorage.clear();
      localStorage.setItem("panier", JSON.stringify(cart));
      }
    });

/*  fonction qui cherche l'index du produit concerné par la suppression 
*   et le supprime
*/
  function removeItem (array,element) {
    const findIndex = array.findIndex(x=> x.id === element.dataset.id && x.color === element.dataset.color );
    array.splice(findIndex,1);    
  }



// ciblage des différents input du formulaire


const selectForm = document.querySelector(".cart__order__form");
const selectFirstName = document.getElementById("firstName");
const selectLastName = document.getElementById("lastName");
const selectAddress = document.getElementById("address");
const selectCity = document.getElementById("city");
const selectEmail = document.getElementById("email");

// création d'une classe Contact qui prend en parametre les valeurs saisies en input
class Contact {
  constructor(firstname, lastname,address,city,email) {
  this.firstName = firstname;
  this.lastName = lastname;
  this.address = address;
  this.city = city;
  this.email = email;
  }
  }


  /*  fonction qui verifie les différents champs du formulaire avec Regexp
*  renvoie true si tous les champs son correctement remplient
* 
*/
function checkForm () {
  let counter = 0;

  if (/\d/.test(selectFirstName.value)) {
    document.getElementById("firstNameErrorMsg").textContent = "Merci d'inscrire votre prénom en lettres" ;
  }  else { 
    counter += 1;
    document.getElementById("firstNameErrorMsg").textContent =""}

  if (/\d/.test(selectLastName.value)) {document.getElementById("lastNameErrorMsg").textContent = "Merci d'inscrire votre nom en lettres" 
  }  else { 
    counter += 1;
    document.getElementById("lastNameErrorMsg").textContent = ""}

  if (/[0-9A-Za-z]/.test(selectAddress.value)) {
     counter += 1
     document.getElementById("addressErrorMsg").textContent = ""} 
  else {document.getElementById("addressErrorMsg").textContent = "Merci d'inscrire votre adresse" }

  if (/\d/.test(selectCity.value)) {document.getElementById("cityErrorMsg").textContent = "Merci d'inscrire votre ville en lettres" ;
  } else {
    counter += 1
    document.getElementById("cityErrorMsg").textContent = ""}

  if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(selectEmail.value)) {
    counter += 1
    document.getElementById("emailErrorMsg").textContent = ""  }
  else { document.getElementById("emailErrorMsg").textContent = "Merci de renseigner un email valide" }

  if (counter === 5){ return true}
  else return false


}


  /*  fonction pour ecouter la soumission du formulaire 
  * et appeler les fonctions suivantes : 
  * checkForm () 
  * créer l'objet contact
*   setIdArray () pour récupérer id des produits du panier
*   getId () pour requet post et recupérer id commande
*/

selectForm.addEventListener ("submit", (event) => {
  event.preventDefault();
  const check = checkForm();
  if (check){ 
    const contact = new Contact (selectFirstName.value,selectLastName.value,selectAddress.value,selectCity.value,selectEmail.value);
    console.log (contact);
    const products = setIdArray (cart);
    console.log (products);
    getId (contact,products) ;
    localStorage.clear();

  }
  else{ return null}
})

// fonction de recupération de la clé id d'un array d'objet
function setIdArray (array) {
 
  // array.map(item=>item.id);
  return array.map(item=>item.id);
}

// requete POST 

 function getId (contact,products) {
  fetch("http://localhost:3000/api/products/order", {
	method: "POST",
	headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  body : JSON.stringify({contact,products})
  }
  )
  .then (async response => {
        try{
    const getId = await response.json();
    console.log(getId);
    console.log(getId.orderId);
    location.assign(`./confirmation.html?id=${getId.orderId}`);
  
   
   
  } catch (e){
    console.log(e);
  }
})
}


/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

 updateCartPage();
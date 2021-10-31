
// recupération du panier dans le localStorage
let cart = JSON.parse(localStorage.getItem("panier"));
console.log(cart);

// ciblage prix total et quantité total

const  selectTotalQuantity = document.getElementById("totalQuantity");
const  selectTotalPrice = document.getElementById("totalPrice");

// vérification que le panier n 'est pas vide ou Null

function updateCart() {
    if (cart == null || cart.length == 0) {
        selectTotalQuantity.textContent = "0";
        selectTotalPrice.textContent = "0";
    }
    else { displayCart(cart)}

  }

// Fonction qui lance l'affichage des différents éléménts du panier sur la page ainsi que la quantité et le prix total

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

//   localStorage.clear();


// 
const cartList =document.getElementById("cart__items");




cartList.addEventListener("change", event => {

  const cartItem = event.target.closest(".cart__item");
  if (event.target.value == 0) { removeItem(cart,cartItem)}
  else {quantityModification (cart,cartItem,event)}
  document.querySelector("#cart__items").innerHTML =""; 
  updateCart();
  localStorage.clear();
  localStorage.setItem("panier", JSON.stringify(cart));
});

function quantityModification (array,element,event) {
    const findIndex = array.findIndex(x=> x.id === element.dataset.id && x.color === element.dataset.color );
    console.log(findIndex);
    array[findIndex].quantity = Number(event.target.value);
    console.log(event.target.value);
   
   
  }
  

  cartList.addEventListener("click", event => {
      if (event.target.className != "deleteItem") {
        return null;
      }
      else {
      const cartItem = event.target.closest(".cart__item");
      removeItem(cart,cartItem);
      document.querySelector("#cart__items").innerHTML ="";
      updateCart() ; 
      localStorage.clear();
      localStorage.setItem("panier", JSON.stringify(cart));
      }
    });
 
  function removeItem (array,element) {
    const findIndex = array.findIndex(x=> x.id === element.dataset.id && x.color === element.dataset.color );
    array.splice(findIndex,1);    
  }

  updateCart();
    // localStorage.clear();





// valdiation commande

const selectForm = document.querySelector(".cart__order__form");
const selectFirstName = document.getElementById("firstName");
const selectLastName = document.getElementById("lastName");
const selectAddress = document.getElementById("address");
const selectCity = document.getElementById("city");
const selectEmail = document.getElementById("email");

class Contact {
  constructor(firstname, lastname,address,city,email) {
  this.firstName = firstname;
  this.lastName = lastname;
  this.address = address;
  this.city = city;
  this.email = email;
  }
  }


function checkForm () {
  let counter = 0;
  if (/\d/.test(selectFirstName.value)) {
    document.getElementById("firstNameErrorMsg").textContent = "Merci d'inscrire votre prénom en lettre" ;
  } else { counter += 1}
  if (/\d/.test(selectLastName.value)) {
    document.getElementById("lastNameErrorMsg").textContent = "Merci d'inscrire votre nom en lettre" ;
  } else { counter += 1}
  if (/\d/.test(selectAddress.value)) {
    document.getElementById("addressErrorMsg").textContent = "Merci d'inscrire votre adresse" ;
  } else { counter += 1}
  if (/\d/.test(selectCity.value)) {
    document.getElementById("cityErrorMsg").textContent = "Merci d'inscrire votre ville en lettre" ;
  } else { counter += 1}
  if (/\d/.test(selectEmail.value)) {
    document.getElementById("emailErrorMsg").textContent = "Merci de renseigner un email valide" ;
  } else { counter += 1}
  return counter

}

selectForm.addEventListener ("submit", (event) => {
  const check = checkForm();
  if (check != 5 ){ event.preventDefault}
  else{
    const contact = new Contact (selectFirstName.value,selectLastName.value,selectAddress.value,selectCity.value,selectEmail.value);
    console.log (contact);
    // const idArray =[];
    const idArray = setIdArray (cart);
    // setIdArray (cart,idArray);
    console.log (idArray);

  }
})


function setIdArray (array) {
 
  array.map(item=>item.id);
  return array.map(item=>item.id);
}


const contact = new Contact ("dzdzd","dzdzd","dzdzd","23 adededede dedede", "deded@dezdz.fr");

const products = ["415b7cacb65d43b2b5c1ff70f3393ad1" ]

fetch("http://localhost:3000/api/products/order", {
	method: "POST",
	headers: { 
'Accept': 'application/json', 
'Content-Type': 'application/json' 
},
	// body: JSON.stringify({contact:test,products: testid})
  // body :  JSON.stringify({"contact" : test, "products": testid})
  // body : { "contact" : test, "products": testid}
  body : JSON.stringify({contact,products})
})
.then (async response => {
  try{
    const id = await response.json();
    console.log(id)
   
  } catch (e){
    console.log(e);
  }
})


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


// console.log(/[a-zA-Z]/.test("Piere-eZE"));
// console.log(/\d/.test("PiereeZE23"))
// console.log((/[a-zA-Z]/.test("Piere-eZE"))& (/\D/.test("23")))
// if (/[a-zA-Z]/.test("Piere-eZE")& /\D/.test("PiereeZE23")) {
//   console.log("ok")
// }
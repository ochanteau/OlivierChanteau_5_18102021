
// recupération du panier dans le localStorage
let cart = JSON.parse(localStorage.getItem("panier"));
console.log(cart);

// ciblage prix total et quantité total

let  selectTotalQuantity = document.getElementById("totalQuantity");
let  selectTotalPrice = document.getElementById("totalPrice");

// vérification que le panier n 'est pas vide

function updateCart() {
    if (cart == null || cart.length == 0) {
        selectTotalQuantity.textContent = "0";
        selectTotalPrice.textContent = "0";
    }
    else { displayCart(cart)}

  }

// Fonction qui affiche les différents éléménts du panier sur la page

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
  // displayCart(cart);  
  updateCart();
  localStorage.clear();
  localStorage.setItem("panier", JSON.stringify(cart));
});

function quantityModification (array,element,event) {
    const findIndex = array.findIndex(x=> x.id === element.dataset.id && x.color === element.dataset.color );
    console.log(findIndex);
    array[findIndex].quantity = Number(event.target.value);
    console.log(event.target.value);
    // document.querySelector("#cart__items").innerHTML ="";
   
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
let cart = JSON.parse(localStorage.getItem("panier"));
console.log(cart);

function displayCart (array) {
    if (cart == null) {
        document.getElementById("totalQuantity").textContent = "0";
        document.getElementById("totalPrice").textContent = "0";
    }
    else {

    }
}







function displayResult(array) {
 
    array.forEach((data,index,array) => {

        fetch(`http://localhost:3000/api/products/${data.id}`)
        .then (async response => {
          try{
            const product = await response.json();
         
            displayProduct(product,index,array);
          } catch (e){
            console.log(e);
          }
        })
      
    });
    
  }




  function displayProduct(data,index,array){
    const article = document.createElement("article");
    article.setAttribute("data-id", `${data._id}`);
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

  displayResult(cart);
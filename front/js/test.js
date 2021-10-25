




// console.log(fetch("http://localhost:3000/api/products"));


// // const p1 = Promise.reject("Aïe !");
// async function f() {
//   const valeur = await (await (fetch("http://localhost:3000/api/products"))).json();
//   // const valeur2= await valeur.json();
//   console.log(valeur); 
//   return valeur

// }

// console.log(f());
// f().catch(e => console.error(e)); // "Aïe !"

// const tableau2 = fetch("http://localhost:3000/api/products")
//   .then (async response => {
//     try{
//       const produits = await response.json();
//       console.log(produits);
//       console.log( typeof (produits));
//     } catch (e){
//       console.log(e);
//     }
//   })





// console.log(GET("http://localhost:3000/api/products"));

// const tableau = fetch("http://localhost:3000/api/products")
//   .then( (resultat)=> { return resultat.json()})
//   .then(value => { console.log(value)});

// console.log( typeof (tableau));



// let x = tableau.map( (e)=> { console.log(e)});
// const produits = fetch("http://localhost:3000/api/products")
//   .then(function(res) {
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then(function(value) {
   
    

//    return value
   
//   })
//   .catch(function(err) {
//     // Une erreur est survenue
//   });

//   console.log(produits);
//   function result () {produits.map( x=> console.log(x))};
//   result();

  // fetch("http://localhost:3000/api/products/415b7cacb65d43b2b5c1ff70f3393ad1")
  // .then(function(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  // })
  // .then(function(value) {
  //   console.log(value);
  // })
  // .catch(function(err) {
  //   // Une erreur est survenue
  // });
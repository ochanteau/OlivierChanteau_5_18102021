// recupération de l'URL de la page courante
const currentPage = window.location.href;

// creation objet URL avec la page courante
var url = new URL (currentPage);

// affichage de N° de commande.
document.getElementById("orderId").textContent = url.searchParams.get("id");

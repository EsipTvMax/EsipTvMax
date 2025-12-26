let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;

// Sauvegarde
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Ajouter au panier
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  alert("Produit ajouté au panier");
}

// Supprimer un produit
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

// Code promo
function applyPromo() {
  const code = document.getElementById("promo").value.toUpperCase();

  if (code === "ESIP10") {
    discount = 0.10;
    alert("Code promo appliqué : -10%");
  } else {
    discount = 0;
    alert("Code promo invalide");
  }
  displayCart();
}

// Calcul total
function getTotal() {
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  total = total - total * discount;
  return total.toFixed(2);
}

// Affichage panier
function displayCart() {
  const cartDiv = document.getElementById("cart");
  const totalSpan = document.getElementById("total");

  if (!cartDiv) return;

  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Votre panier est vide</p>";
    totalSpan.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    cartDiv.innerHTML += `
      <p>
        ${item.name} - ${item.price} €
        <button onclick="removeItem(${index})">❌</button>
      </p>
    `;
  });

  totalSpan.innerText = getTotal();
}

displayCart();

// PAYPAL
if (document.getElementById("paypal-button-container")) {
  paypal.Buttons({
    createOrder: function (data, actions) {
      if (cart.length === 0) {
        alert("Votre panier est vide");
        return;
      }
      return actions.order.create({
        purchase_units: [{
          amount: { value: getTotal() }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function () {
        alert("Paiement confirmé. Merci !");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
      });
    }
  }).render("#paypal-button-container");
}

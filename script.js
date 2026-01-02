/***********************
  PANIER GLOBAL
************************/

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let appliedPromo = null;

/***********************
  SAUVEGARDE
************************/
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/***********************
  AJOUT AU PANIER
************************/
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  alert("Produit ajouté au panier");
}

/***********************
  SUPPRIMER UN ARTICLE
************************/
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

/***********************
  VIDER PANIER
************************/
function clearCart() {
  cart = [];
  appliedPromo = null;
  saveCart();
  displayCart();
}

/***********************
  CALCUL TOTAL
************************/
function calculateTotal() {
  let total = 0;

  cart.forEach(item => {
    let itemPrice = item.price;

    if (appliedPromo === "BANO15") {
      itemPrice *= 0.85;
    }

    if (
      appliedPromo === "TATINETTE" &&
      (
        item.name === "Abonnement 1 an – Android" ||
        item.name === "Abonnement 1 an – Tous supports"
      )
    ) {
      itemPrice *= 0.40;
    }

    total += itemPrice;
  });

  return total.toFixed(2);
}

/***********************
  CODE PROMO
************************/
function applyPromo() {
  const input = document.getElementById("promo-code");
  const code = input.value.trim().toUpperCase();

  if (code === "BANO15" || code === "TATINETTE") {
    appliedPromo = code;
    alert("Code promo appliqué");
  } else {
    appliedPromo = null;
    alert("Code promo invalide");
  }

  displayCart();
}

/***********************
  AFFICHAGE PANIER
************************/
function displayCart() {
  const container = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");

  if (!container || !totalDiv) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Votre panier est vide.</p>";
    totalDiv.innerHTML = "";
    return;
  }

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <strong>${item.price.toFixed(2)} €</strong>
        <button onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  totalDiv.innerHTML = "Total : " + calculateTotal() + " €";
}

/***********************
  AUTO LOAD PANIER
************************/
document.addEventListener("DOMContentLoaded", displayCart);

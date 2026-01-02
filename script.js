/************************
  PANIER + PROMOS
************************/

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let appliedPromo = localStorage.getItem("promo") || null;

/************************
  SAUVEGARDE
************************/
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  if (appliedPromo) {
    localStorage.setItem("promo", appliedPromo);
  } else {
    localStorage.removeItem("promo");
  }
}

/************************
  AJOUT AU PANIER
************************/
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  alert("Produit ajouté au panier");
}

/************************
  SUPPRIMER ARTICLE
************************/
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

/************************
  VIDER PANIER
************************/
function clearCart() {
  cart = [];
  appliedPromo = null;
  saveCart();
  displayCart();
}

/************************
  CALCUL PRIX AVEC PROMO
************************/
function getDiscountedPrice(item) {
  let price = item.price;

  if (appliedPromo === "BANO15") {
    price *= 0.85;
  }

  if (
    appliedPromo === "TATINETTE" &&
    (
      item.name === "Abonnement 1 an – Android" ||
      item.name === "Abonnement 1 an – Tous supports"
    )
  ) {
    price *= 0.40;
  }

  return price;
}

/************************
  TOTAL PANIER
************************/
function calculateTotal() {
  let total = 0;
  cart.forEach(item => {
    total += getDiscountedPrice(item);
  });
  return total.toFixed(2);
}

/************************
  CODE PROMO
************************/
function applyPromo() {
  const input = document.getElementById("promo-code");
  const code = input.value.trim().toUpperCase();

  if (code === "BANO15" || code === "TATINETTE") {
    appliedPromo = code;
    saveCart();
    alert("Code promo appliqué");
  } else {
    appliedPromo = null;
    saveCart();
    alert("Code promo invalide");
  }

  displayCart();
}

/************************
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
    const discounted = getDiscountedPrice(item);

    container.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <div>
          ${
            discounted < item.price
              ? `<del>${item.price.toFixed(2)} €</del> <strong>${discounted.toFixed(2)} €</strong>`
              : `<strong>${item.price.toFixed(2)} €</strong>`
          }
        </div>
        <button onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  totalDiv.innerHTML = `
    Total : <strong>${calculateTotal()} €</strong>
    ${appliedPromo ? `<div class="promo-applied">Code appliqué : ${appliedPromo}</div>` : ""}
  `;
}

/************************
  AUTO LOAD
************************/
document.addEventListener("DOMContentLoaded", displayCart);

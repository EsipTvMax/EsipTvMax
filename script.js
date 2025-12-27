let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  alert("Ajouté au panier");
}

function applyPromo() {
  const code = document.getElementById("promo").value.toUpperCase();

  if (code === "BANO10") discount = 0.10;
  else if (code === "BANO15") discount = 0.15;
  else {
    discount = 0;
    alert("Code invalide");
  }

  displayCart();
}

function getTotal() {
  let total = cart.reduce((s, i) => s + i.price, 0);
  return (total - total * discount).toFixed(2);
}

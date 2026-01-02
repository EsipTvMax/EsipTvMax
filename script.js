function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  const cart = getCart();

  cart.push({
    name: name,
    price: price
  });

  saveCart(cart);

  alert("Produit ajouté au panier 🛒");
}

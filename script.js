let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach((item, index) => {
    cartDiv.innerHTML += `
      <p>${item.name} - ${item.price} €
      <button onclick="removeItem(${index})">✖</button></p>
    `;
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

paypal.Buttons({
  style: {
    layout: 'vertical',
    color: 'gold',
    shape: 'rect',
    label: 'paypal'
  },
  createOrder: function (data, actions) {
    if (total === 0) {
      alert("Votre panier est vide");
      return;
    }
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toString()
        }
      }]
    });
  },
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (details) {
      alert("Paiement confirmé. Merci " + details.payer.name.given_name);
    });
  }
}).render('#paypal-button-container');

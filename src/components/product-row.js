import createStore from "../state.js";
import { Button } from "./button.js";

export const ProductRow = (product) => {
  const row = document.createElement("div");
  let loginMessage = null;

  const info = document.createElement("div");
  info.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <p>In stock: ${product.stock}</p>
    `;

  const addButton = Button("Add to Cart", () => {
    const state = createStore.getState();

    if (loginMessage) {
      loginMessage.remove();
      loginMessage = null;
    }

    if (!state.currentUser) {
      loginMessage = document.createElement("p");
      loginMessage.textContent = "Please login first";
      row.appendChild(loginMessage);
      return;
    }

    const currentCart = state.cart;
    createStore.setState({
      cart: [...currentCart, { productId: product.id, quantity: 1 }],
    });
  });

  row.append(info, addButton);
  return row;
};

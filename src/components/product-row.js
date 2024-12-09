import createStore from "../state.js";
import { Button } from "./button.js";

export const ProductRow = (product) => {
  const row = document.createElement("div");
  row.className = "border-b pb-6";

  const info = document.createElement("div");
  info.className = "space-y-2";
  info.innerHTML = `
        <h2 class="text-xl font-bold">${product.name}</h2>
        <p class="text-gray-600">${product.description}</p>
        <p class="text-lg font-semibold">$${product.price}</p>
        <p class="text-sm text-gray-500">In stock: ${product.stock}</p>
    `;

  const addButton = Button("Add to Cart", () => {
    const state = createStore.getState();
    const currentCart = state.cart;
    const existingItem = currentCart.find(
      (item) => item.productId === product.id,
    );

    if (existingItem) {
      createStore.setState({
        cart: currentCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      createStore.setState({
        cart: [...currentCart, { productId: product.id, quantity: 1 }],
      });
    }
  });
  addButton.className =
    "mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600";

  row.append(info, addButton);
  return row;
};

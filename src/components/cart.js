import createStore from "../state.js";

export const Cart = () => {
  const cart = document.createElement("div");
  cart.className = "bg-white rounded-lg shadow-md p-6 sticky top-6";

  const renderCart = ({ cart: cartItems, products }) => {
    const total = cartItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + product.price * item.quantity;
    }, 0);

    cart.innerHTML = `
            <h2 class="text-2xl font-bold mb-6">Shopping Cart</h2>
            ${
              cartItems.length === 0
                ? '<p class="text-gray-500">Your cart is empty</p>'
                : `
                    <div class="space-y-4">
                        ${cartItems
                          .map((item) => {
                            const product = products.find(
                              (p) => p.id === item.productId,
                            );
                            return `
                                <div class="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <h3 class="font-medium">${product.name}</h3>
                                        <p class="text-gray-600">Quantity: ${item.quantity}</p>
                                        <p class="text-sm text-blue-600">$${(product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <button 
                                        onclick="window.removeFromCart(${item.productId})"
                                        class="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            `;
                          })
                          .join("")}
                        <div class="pt-4 border-t mt-4">
                            <p class="text-xl font-bold">Total: $${total.toFixed(2)}</p>
                        </div>
                    </div>
                `
            }
        `;
  };

  createStore.subscribe(renderCart);
  renderCart(createStore.getState());

  return cart;
};

// Add global handler for remove button
window.removeFromCart = (productId) => {
  const state = createStore.getState();
  createStore.setState({
    cart: state.cart.filter((item) => item.productId !== productId),
  });
};
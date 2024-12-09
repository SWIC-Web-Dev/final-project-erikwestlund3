import createStore from "../state.js";

export const Cart = () => {
  const cart = document.createElement("div");
  cart.className = "bg-white p-6 rounded-lg shadow-sm border border-gray-200";

  const renderCart = ({ cart: cartItems, products }) => {
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
                                <div class="flex justify-between items-center pb-4 border-b border-gray-200">
                                    <div>
                                        <h3 class="font-medium text-gray-800">${product.name}</h3>
                                        <p class="text-sm text-gray-600">Quantity: ${item.quantity}</p>
                                        <p class="text-sm font-semibold text-blue-600">$${(product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <button 
                                        onclick="window.removeFromCart(${item.productId})"
                                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            `;
                          })
                          .join("")}
                        <div class="pt-4 mt-4 border-t border-gray-200">
                            <p class="text-xl font-bold text-gray-800">Total: $${cartItems
                              .reduce((sum, item) => {
                                const product = products.find(
                                  (p) => p.id === item.productId,
                                );
                                return sum + product.price * item.quantity;
                              }, 0)
                              .toFixed(2)}</p>
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

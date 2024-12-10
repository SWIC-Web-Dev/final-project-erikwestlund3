export const Cart = (cartItems, products) => `
    <div class="bg-white p-6 rounded-lg shadow">
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
                        <p class="text-xl font-bold">Total: $${cartItems
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
    </div>
`;

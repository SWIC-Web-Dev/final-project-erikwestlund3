import createStore from "./state.js";
import catalog from "./db/catalog.js";
import { ProductRow } from "./components/product-row.js";
import { Cart } from "./components/cart.js";

const app = document.querySelector("#app");

// Initialize state
createStore.setState({
  products: catalog,
  cart: [],
});

// Add global handler for remove from cart
window.removeFromCart = (productId) => {
  const state = createStore.getState();
  createStore.setState({
    cart: state.cart.filter((item) => item.productId !== productId),
  });
};

// Add global handler for add to cart
window.addToCart = (productId) => {
  const state = createStore.getState();
  const currentCart = state.cart;
  const existingItem = currentCart.find((item) => item.productId === productId);

  if (existingItem) {
    createStore.setState({
      cart: currentCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    });
  } else {
    createStore.setState({
      cart: [...currentCart, { productId, quantity: 1 }],
    });
  }
};

function render() {
  const state = createStore.getState();

  app.innerHTML = `
        <div class="container mx-auto px-4">
            <header class="py-6 mb-8">
                <h1 class="text-3xl font-bold">Tech Store</h1>
            </header>
            
            <div class="flex flex-row gap-8">
                <div class="w-2/3">
                    <div class="space-y-8">
                        ${state.products.map((product) => ProductRow(product)).join("")}
                    </div>
                </div>
                
                <div class="w-1/3">
                    ${Cart(state.cart, state.products)}
                </div>
            </div>
        </div>
    `;
}

createStore.subscribe(render);
render();

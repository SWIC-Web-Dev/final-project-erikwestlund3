import createStore from "./state.js";
import catalog from "./db/catalog.js";
import { ProductRow } from "./components/product-row.js";
import { Cart } from "./components/cart.js";

const App = () => {
  const app = document.createElement("div");
  app.className = "container mx-auto px-4";

  // Header
  const header = document.createElement("header");
  header.className = "py-6 mb-8";

  const title = document.createElement("h1");
  title.className = "text-3xl font-bold";
  title.textContent = "Tech Store";
  header.appendChild(title);

  const mainContent = document.createElement("div");
  mainContent.className = "flex flex-row gap-8";

  const productsSection = document.createElement("div");
  productsSection.className = "w-2/3";

  const productsGrid = document.createElement("div");
  productsGrid.className = "space-y-8";

  const render = (state) => {
    productsGrid.innerHTML = "";
    state.products.forEach((product) => {
      productsGrid.appendChild(ProductRow(product));
    });
  };

  productsSection.appendChild(productsGrid);

  const cartSection = Cart();
  cartSection.className = "w-1/3";

  createStore.subscribe(render);
  render(createStore.getState());

  mainContent.append(productsSection, cartSection);
  app.append(header, mainContent);
  return app;
};

// Initialize
createStore.setState({
  products: catalog,
  cart: [],
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").appendChild(App());
});

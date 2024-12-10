export const ProductRow = (product) => `
    <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold">${product.name}</h2>
        <p class="text-gray-600">${product.description}</p>
        <p class="text-blue-600 font-bold">$${product.price}</p>
        <p class="text-sm text-gray-500">In stock: ${product.stock}</p>
        <button 
            onclick="window.addToCart(${product.id})" 
            class="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Add to Cart
        </button>
    </div>
`;

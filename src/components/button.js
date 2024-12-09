export const Button = (text, onClick, className = "") => {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = `px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`;
  button.addEventListener("click", onClick);
  return button;
};

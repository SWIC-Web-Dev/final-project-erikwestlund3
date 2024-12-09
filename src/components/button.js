export const Button = (text, onClick, className = "") => {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
};

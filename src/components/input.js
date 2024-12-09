export const Input = (placeholder, type = "text", className = "") => {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.className = className;
  return input;
};

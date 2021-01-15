import "./app.css";

let counter = 0;
var button = document.getElementById("button") as HTMLButtonElement;

button.addEventListener("click", () => {
  counter += 1;
  button.textContent = counter + "";
});

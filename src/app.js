import  "./app.css";

let counter = 0;
var button = document.getElementById("button");

button.addEventListener("click", () => {
  counter += 2;
  button.textContent = counter;
});

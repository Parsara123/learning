const input = document.getElementById("taskInput");
const button = document.getElementById("addbtn");
const list = document.getElementById("taskList");

button.addEventListener("click", function() {
    
let text = input.value;

if (text === "") {
    return;
}

let newItem = document.createElement("li");

newItem.textContent = text;

list.appendChild(newItem);

input.value = "";
});
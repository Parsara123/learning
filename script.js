const input = document.getElementById("taskInput");
const button = document.getElementById("addbtn");
const list = document.getElementById("taskList");


function addTask(text) {
    let newItem = document.createElement("li");
    newItem.textContent = text;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌ حذف";
    deleteBtn.style.marginRight = "10px";

    deleteBtn.addEventListener("click", function() {
        newItem.remove();
        saveTasks(); 
    });

    newItem.appendChild(deleteBtn);
    list.appendChild(newItem);
}


function saveTasks() {

    let allTasks = document.querySelectorAll("#taskList li");
    let tasksArray = [];
    

    allTasks.forEach(function(li) {
  
        tasksArray.push(li.firstChild.textContent);
    });

   
    localStorage.setItem("myTasks", JSON.stringify(tasksArray));
}


button.addEventListener("click", function() {
    let text = input.value;

    if (text === "") {
        return; 
    }

    addTask(text); 
    saveTasks();   
    input.value = ""; 
});

window.addEventListener("load", function() {
    let savedTasks = JSON.parse(localStorage.getItem("myTasks"));

    if (savedTasks) {
        savedTasks.forEach(function(text) {
            addTask(text);
        });
    }
});
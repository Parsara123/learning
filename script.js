const input = document.getElementById("taskInput");
const button = document.getElementById("addbtn");
const list = document.getElementById("taskList");

function addTask(text, isCompleted = false) {
    let newItem = document.createElement("li");
    
    // ساخت متن کار
    let textSpan = document.createElement("span");
    textSpan.textContent = text;
    textSpan.style.cursor = "pointer"; 

    // ساخت دکمه حذف
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌ حذف";
    
    // 👇 این خط جدید: دکمه حذف رو از اول قایم می‌کنیم (مثل خاموش بودن لامپ)
    deleteBtn.style.display = "none"; 

    // اگر از قبل خط خورده بود، کلاسش رو بده و دکمه رو نشون بده
    if (isCompleted) {
        newItem.classList.add("completed");
        deleteBtn.style.display = "block"; // 👈 نشون دادن دکمه
    }

    // 👇 این بخش کلیک روی متن رو کنترل می‌کنه (خط زدن و نشون دادن دکمه)
    textSpan.addEventListener("click", function() {
        // کلاس completed رو اضافه یا حذف می‌کنه (خط می‌زنه یا برمی‌داره)
        newItem.classList.toggle("completed");
        
        // 👇 حالا چک می‌کنیم: آیا الان خط خورده؟
        if (newItem.classList.contains("completed")) {
            // اگر خط خورده بود، دکمه حذف رو نشون بده (روشن کن)
            deleteBtn.style.display = "block"; 
        } else {
            // اگر خط برداشته شد، دکمه حذف رو دوباره قایم کن (خاموش کن)
            deleteBtn.style.display = "none"; 
        }

        saveTasks(); 
    });

    // کلیک روی دکمه حذف
    deleteBtn.addEventListener("click", function() {
        newItem.remove();
        saveTasks(); 
    });

    newItem.appendChild(textSpan); 
    newItem.appendChild(deleteBtn); 
    list.appendChild(newItem);
}

function saveTasks() {
    let allTasks = document.querySelectorAll("#taskList li");
    let tasksArray = [];
    
    allTasks.forEach(function(li) {
        let text = li.querySelector("span").textContent;
        let isCompleted = li.classList.contains("completed");
        tasksArray.push({ text: text, completed: isCompleted });
    });

    localStorage.setItem("myTasks", JSON.stringify(tasksArray));
}

button.addEventListener("click", function() {
    let text = input.value;
    if (text === "") return; 
    
    addTask(text); 
    saveTasks();   
    input.value = ""; 
});

window.addEventListener("load", function() {
    let savedTasks = JSON.parse(localStorage.getItem("myTasks"));
    if (savedTasks) {
        savedTasks.forEach(function(task) {
            if (typeof task === 'string') {
                addTask(task, false);
            } else {
                addTask(task.text, task.completed);
            }
        });
    }
});
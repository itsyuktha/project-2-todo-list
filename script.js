const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    taskList.innerHTML = "";

    const remainingTasks = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCount.textContent = remainingTasks + " tasks left";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(function (task) {
            return !task.completed;
        });
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function (task) {
            return task.completed;
        });
    }

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    if (filteredTasks.length === 0) {

        if (currentFilter === "completed") {
            emptyMessage.textContent = "No completed tasks yet ✨";
        } 
        else if (currentFilter === "active") {
            emptyMessage.textContent = "No active tasks! 🎉";
        } 
        else {
            emptyMessage.textContent =
                "No tasks yet! Add something to get started ✨";
        }
    }

    filteredTasks.forEach(function (task) {

        const originalIndex = tasks.indexOf(task);

        const listItem = document.createElement("li");

        const taskSpan = document.createElement("span");

        taskSpan.textContent = task.text;

        if (task.completed) {
            taskSpan.classList.add("completed");
        }

        taskSpan.addEventListener("click", function () {

            tasks[originalIndex].completed =
                !tasks[originalIndex].completed;

            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑️";

        deleteButton.addEventListener("click", function () {

            tasks.splice(originalIndex, 1);

            saveTasks();
            displayTasks();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    displayTasks();

    taskInput.value = "";
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();
    });

});

displayTasks();

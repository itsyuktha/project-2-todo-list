const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    const remainingTasks = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCount.textContent = remainingTasks + " tasks left";

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";

    tasks.forEach(function (task, index) {

        const listItem = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        if (task.completed) {
            taskSpan.classList.add("completed");
        }

        taskSpan.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);

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

displayTasks();

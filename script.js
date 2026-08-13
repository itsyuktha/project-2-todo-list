
   const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const percentage =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        completedTasks + " of " + totalTasks +
        " tasks completed (" + percentage + "%)";
}

function displayTasks() {
    taskList.innerHTML = "";

    const remainingTasks = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCount.textContent = remainingTasks + " tasks left";

    updateProgress();

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
            emptyMessage.textContent =
                "No completed tasks yet ✨";
        } else if (currentFilter === "active") {
            emptyMessage.textContent =
                "No active tasks! 🎉";
        } else {
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

        // COMPLETE TASK
        taskSpan.addEventListener("click", function () {

            tasks[originalIndex].completed =
                !tasks[originalIndex].completed;

            saveTasks();
            displayTasks();
        });

        // EDIT BUTTON
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {

            const newText = prompt(
                "Edit your task:",
                tasks[originalIndex].text
            );

            if (newText !== null && newText.trim() !== "") {

                tasks[originalIndex].text = newText.trim();

                saveTasks();
                displayTasks();
            }
        });

        // DELETE BUTTON
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {

            tasks.splice(originalIndex, 1);

            saveTasks();
            displayTasks();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

// ADD TASK
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

// ENTER KEY
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }
});

// FILTER BUTTONS
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

// CLEAR COMPLETED TASKS
clearCompleted.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    saveTasks();
    displayTasks();
});

// DISPLAY TASKS WHEN PAGE LOADS
displayTasks();

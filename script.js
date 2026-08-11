const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const listItem = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";

    taskSpan.addEventListener("click", function () {
        taskSpan.classList.toggle("completed");
    });

    deleteButton.addEventListener("click", function () {
        listItem.remove();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value = "";
}

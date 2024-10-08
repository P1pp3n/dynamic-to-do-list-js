// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function() {
    // Select DOM Elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from Local Storage
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.forEach(function(taskText) {
        addTask(taskText, false); // 'false' indicates not to save again to Local Storage
      });
    }
  
    // Create the addTask Function
    function addTask(taskText, save = true) {
      // Retrieve and trim the value from the task input field
      const task = taskText.trim();
  
      // Check if task is not empty
      if (task === "") {
        alert("Please enter a task");
        return;
      }
  
      // Task Creation and Removal
      const taskElement = document.createElement("li");
      taskElement.textContent = task;
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
  
      // Assign an onclick event to the remove button
      removeButton.onclick = function() {
        taskList.removeChild(taskElement);
        removeTaskFromLocalStorage(task);
      };
  
      // Append the remove button to the task element
      taskElement.appendChild(removeButton);
  
      // Append the task element to the task list
      taskList.appendChild(taskElement);
  
      // Save task to Local Storage
      if (save) {
        saveTaskToLocalStorage(task);
      }
    }
  
    // Save task to Local Storage
    function saveTaskToLocalStorage(task) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  
    // Remove task from Local Storage
    function removeTaskFromLocalStorage(task) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const index = storedTasks.indexOf(task);
      if (index !== -1) {
        storedTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      }
    }
  
    // Attach Event Listeners
    addButton.addEventListener("click", function() {
      const taskText = taskInput.value.trim();
      addTask(taskText);
      taskInput.value = "";
    });
  
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = "";
      }
    });
  
    // Load tasks from Local Storage
    loadTasks();
  });
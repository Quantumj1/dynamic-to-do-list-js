document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
}

// Adjust `addTask` to optionally save tasks to avoid duplication when loading from Local Storage
function addTask(taskText, save = true) {
    // Task creation logic remains the same

    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => removeTask(index));
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Function to add task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            // Create list item
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            // Remove the li from the taskList when clicked
            removeBtn.onclick = function() {
                taskList.removeChild(li);
            };

            // Append button and li to the list
            li.appendChild(removeBtn);
            taskList.appendChild(li);

            // Clear input
            taskInput.value = '';
        }
    }

    // Function to remove task
    function removeTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Also invoke addTask on DOMContentLoaded (outside the addTask function)
    addTask();

    // Initial render
    renderTasks();
});

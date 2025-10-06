document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    // In-memory tasks array
    let tasks = [];

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        renderTasks();
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';
            removeBtn.addEventListener('click', () => removeTask(index));
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }
    // Function to add task (accepts optional taskText when loading from storage)
    function addTask(taskText) {
        // If called from UI, taskText will be undefined
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task');
                return;
            }
        }

        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Clear input only when called from UI
        if (taskInput && taskInput.value) taskInput.value = '';
        renderTasks();
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

    // Initial load/render
    // loadTasks() already called at the top of this handler
});

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
            removeBtn.classList.add('remove-btn');
            removeBtn.addEventListener('click', () => removeTask(index));
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }
    // Function to add task (accepts optional taskText when loading from storage)
    function addTask(taskText) {
        // If called from UI, taskText will be undefined
        const calledFromUI = (typeof taskText === 'undefined');
        if (calledFromUI) {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task');
                return;
            }
        }

        // Persist
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');

        // When clicked, remove the li from the DOM and update storage
        removeBtn.onclick = function() {
            // Remove the li element from the taskList
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Also remove from in-memory array (first match) and update localStorage
            const idx = tasks.indexOf(taskText);
            if (idx > -1) {
                tasks.splice(idx, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };

        // Append and clear input if from UI
        li.appendChild(removeBtn);
        taskList.appendChild(li);
        if (calledFromUI) taskInput.value = '';
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

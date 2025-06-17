document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const tasksContainer = document.getElementById('tasks-container');

    // Загрузка сохраненных задач
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Функция для сохранения задач
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Функция для создания элемента задачи
    function createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 ${task.completed ? 'opacity-50' : ''}`;
        taskElement.innerHTML = `
            <input type="checkbox" class="task-checkbox mr-3 h-5 w-5" ${task.completed ? 'checked' : ''}>
            <span class="task-text flex-1 ${task.completed ? 'line-through text-gray-500' : ''}">${task.text}</span>
            <button class="delete-task p-1 text-gray-400 hover:text-red-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        `;

        // Обработчик для чекбокса
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            taskElement.classList.toggle('opacity-50');
            taskElement.querySelector('.task-text').classList.toggle('line-through');
            taskElement.querySelector('.task-text').classList.toggle('text-gray-500');
            saveTasks();
        });

        // Обработчик для кнопки удаления
        const deleteButton = taskElement.querySelector('.delete-task');
        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            taskElement.remove();
            saveTasks();
        });

        return taskElement;
    }

    // Функция для добавления новой задачи
    function addTask(text) {
        if (text.trim()) {
            const task = {
                text: text.trim(),
                completed: false,
                id: Date.now()
            };
            tasks.push(task);
            tasksContainer.appendChild(createTaskElement(task));
            saveTasks();
            newTaskInput.value = '';
        }
    }

    // Обработчик для кнопки добавления
    addTaskButton.addEventListener('click', () => {
        addTask(newTaskInput.value);
    });

    // Обработчик для Enter в поле ввода
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(newTaskInput.value);
        }
    });

    // Загрузка существующих задач
    tasks.forEach(task => {
        tasksContainer.appendChild(createTaskElement(task));
    });
}); 
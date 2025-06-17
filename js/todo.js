document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const counter = document.getElementById('todo-counter');
    const clearBtn = document.getElementById('clear-completed');
    const empty = document.getElementById('todo-empty');

    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    let filter = 'all';

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        list.innerHTML = '';
        let shown = 0;
        todos.forEach((todo, idx) => {
            if (
                (filter === 'active' && todo.completed) ||
                (filter === 'completed' && !todo.completed)
            ) return;
            shown++;
            const li = document.createElement('li');
            li.className = 'flash-task' + (todo.completed ? ' completed' : '');

            const row = document.createElement('div');
            row.className = 'task-row';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.title = 'Отметить выполненным';
            checkbox.checked = !!todo.completed;
            checkbox.onchange = () => {
                todo.completed = checkbox.checked;
                saveTodos();
                renderTodos();
            };

            const title = document.createElement('span');
            title.className = 'task-title';
            title.textContent = todo.text;
            title.title = 'Двойной клик — редактировать';
            title.ondblclick = () => startEdit(idx, title);

            const delBtn = document.createElement('button');
            delBtn.className = 'delete-btn';
            delBtn.textContent = '✕';
            delBtn.title = 'Удалить';
            delBtn.onclick = (e) => {
                e.stopPropagation();
                todos.splice(idx, 1);
                saveTodos();
                renderTodos();
            };

            row.appendChild(checkbox);
            row.appendChild(title);
            row.appendChild(delBtn);
            li.appendChild(row);
            list.appendChild(li);
        });
        empty.style.display = shown === 0 ? 'block' : 'none';
        updateCounter();
    }

    function updateCounter() {
        const total = todos.length;
        const completed = todos.filter(t => t.completed).length;
        counter.textContent = total === 0 ? '0 задач' : `${total} задач, выполнено: ${completed}`;
    }

    function startEdit(idx, titleEl) {
        const todo = todos[idx];
        const inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.value = todo.text;
        inputEdit.className = 'task-edit-input';
        inputEdit.onkeydown = (e) => {
            if (e.key === 'Enter') finishEdit();
            if (e.key === 'Escape') cancelEdit();
        };
        inputEdit.onblur = finishEdit;
        titleEl.replaceWith(inputEdit);
        inputEdit.focus();
        function finishEdit() {
            const val = inputEdit.value.trim();
            if (val) todo.text = val;
            saveTodos();
            renderTodos();
        }
        function cancelEdit() {
            renderTodos();
        }
    }

    form.onsubmit = (e) => {
        e.preventDefault();
        const value = input.value.trim();
        if (value) {
            todos.push({ text: value, completed: false });
            saveTodos();
            renderTodos();
            input.value = '';
        }
    };

    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter = btn.dataset.filter;
            renderTodos();
        };
    });

    clearBtn.onclick = () => {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        renderTodos();
    };

    renderTodos();
}); 
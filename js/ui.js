export const UI = {
    renderTasks(tasks, filter = 'all', onTaskUpdate) {
        const list = document.getElementById('task-list');
        list.innerHTML = '';

        const filtered = tasks.filter(t => {
            if (filter === 'active') return !t.completed;
            if (filter === 'completed') return t.completed;
            return true;
        });

        filtered.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle-task">
                <input type="text" class="task-input-edit" value="${task.text}" disabled>
                <button class="edit-btn" title="Edit Task">✏️</button>
                <button class="delete-btn" title="Delete Task">✕</button>
            `;

            const input = li.querySelector('.task-input-edit');
            const editBtn = li.querySelector('.edit-btn');

            editBtn.addEventListener('click', () => {
                if (input.disabled) {
                    // Switch to Edit Mode
                    input.disabled = false;
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length); // Cursor at end
                    editBtn.textContent = "💾"; 
                    editBtn.style.background = "#10b981"; // Success Green
                } else {
                    // Save Mode
                    input.disabled = true;
                    editBtn.textContent = "✏️";
                    editBtn.style.background = ""; // Back to CSS default
                    onTaskUpdate(task.id, input.value);
                }
            });

            // Allow Enter key to save
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') editBtn.click();
            });

            list.appendChild(li);
        });

        this.updateStats(tasks);
    },

    updateStats(tasks) {
        const total = tasks.length;
        const active = tasks.filter(t => !t.completed).length;
        const completed = total - active;

        document.getElementById('total-count').innerText = total;
        document.getElementById('active-count').innerText = active;
        document.getElementById('completed-count').innerText = completed;
    }
};
import { Storage } from './storage.js';
import { UI } from './ui.js';
import { generateId } from './utils.js';

let tasks = Storage.getTasks();
let currentFilter = 'all';

const handleTaskUpdate = (id, newText) => {
    if (!newText.trim()) {
        UI.renderTasks(tasks, currentFilter, handleTaskUpdate);
        return;
    }
    tasks = tasks.map(t => t.id === id ? { ...t, text: newText.trim() } : t);
    saveAndRender();
};

const init = () => {

    // ===== THEME (FIXED) =====
    document.body.classList.add('light-theme');

    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
    });

    // ===== INITIAL RENDER =====
    UI.renderTasks(tasks, currentFilter, handleTaskUpdate);

    // ===== ADD TASK =====
    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('task-input');
        if (!input.value.trim()) return;

        tasks.push({ id: generateId(), text: input.value.trim(), completed: false });
        input.value = '';
        saveAndRender();
    });

    // ===== DELETE & TOGGLE =====
    document.getElementById('task-list').addEventListener('click', (e) => {
        const item = e.target.closest('.task-item');
        if (!item) return;
        const id = item.dataset.id;

        if (e.target.classList.contains('delete-btn')) {
            tasks = tasks.filter(t => t.id !== id);
            saveAndRender();
        }

        if (e.target.classList.contains('toggle-task')) {
            tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
            saveAndRender();
        }
    });

    // ===== CLEAR COMPLETED =====
    document.getElementById('clear-completed').addEventListener('click', () => {
        tasks = tasks.filter(t => !t.completed);
        saveAndRender();
    });

    // ===== FILTERING =====
    document.querySelector('.filters').addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            UI.renderTasks(tasks, currentFilter, handleTaskUpdate);
        }
    });
};

const saveAndRender = () => {
    Storage.saveTasks(tasks);
    UI.renderTasks(tasks, currentFilter, handleTaskUpdate);
};

init();
export const Storage = {
    saveTasks(tasks) { localStorage.setItem('tasks', JSON.stringify(tasks)); },
    getTasks() { return JSON.parse(localStorage.getItem('tasks')) || []; },
    saveTheme(isDark) { localStorage.setItem('dark-mode', isDark); },
    getTheme() { return localStorage.getItem('dark-mode') === 'true'; }
};
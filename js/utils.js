export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const debounce = (func, delay = 500) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

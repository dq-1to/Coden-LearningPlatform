import { useState, useEffect } from 'react';

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => { setTasks(data); setLoading(false); });
    }, []);

    const addTask = async (title) => {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false, createdAt: new Date().toISOString() })
        });
        const created = await res.json();
        setTasks(prev => [...prev, created]);
    };

    const toggleTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
        await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !task.completed })
        });
    };

    const deleteTask = async (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    };

    return { tasks, loading, addTask, toggleTask, deleteTask };
}

export default useTasks;

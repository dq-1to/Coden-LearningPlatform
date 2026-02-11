import { useState, useEffect } from 'react';

function TaskApp() {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(setTasks);
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newTitle,
                completed: false,
                createdAt: new Date().toISOString()
            })
        });
        const created = await res.json();
        setTasks([...tasks, created]);
        setNewTitle('');
    };

    return (
        <div>
            <form onSubmit={addTask}>
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="新しいタスク"
                />
                <button type="submit">追加</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}

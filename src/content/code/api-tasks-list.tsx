import { useState, useEffect } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>読み込み中...</p>;

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                </li>
            ))}
        </ul>
    );
}

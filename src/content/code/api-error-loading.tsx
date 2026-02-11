import { useState, useEffect } from 'react';

function TaskApp() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/tasks');
            if (!res.ok) throw new Error('データの取得に失敗しました');
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    if (loading) return <div className="spinner">⏳ 読み込み中...</div>;
    if (error) return (
        <div className="error">
            <p>❌ {error}</p>
            <button onClick={fetchTasks}>再試行</button>
        </div>
    );
    if (tasks.length === 0) return <p>📝 まだタスクがありません</p>;

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>{task.title}</li>
            ))}
        </ul>
    );
}

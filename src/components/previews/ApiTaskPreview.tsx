import { useState } from 'react';

interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
}

// API連携タスク管理プレビュー
function ApiTaskPreview() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Reactの基礎を学ぶ', completed: true, createdAt: '2026-02-10T00:00:00Z' },
        { id: 2, title: 'useStateを理解する', completed: false, createdAt: '2026-02-10T01:00:00Z' },
        { id: 3, title: 'APIとの連携を練習する', completed: false, createdAt: '2026-02-10T02:00:00Z' }
    ]);
    const [newTitle, setNewTitle] = useState('');
    const [loading] = useState(false);
    const [error] = useState<string | null>(null);
    const [nextId, setNextId] = useState(4);

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        const created: Task = {
            id: nextId,
            title: newTitle,
            completed: false,
            createdAt: new Date().toISOString()
        };
        setTasks([...tasks, created]);
        setNextId(nextId + 1);
        setNewTitle('');
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div style={{ padding: '16px', fontFamily: 'sans-serif' }}>
            <h3 style={{ margin: '0 0 12px', color: '#4f46e5' }}>
                📋 タスク管理アプリ
            </h3>

            <div style={{
                background: '#f0f9ff',
                padding: '8px 12px',
                borderRadius: '8px',
                marginBottom: '12px',
                fontSize: '0.85rem',
                color: '#0369a1'
            }}>
                {completedCount}/{tasks.length} 完了
                <div style={{
                    background: '#e0e7ff',
                    borderRadius: '4px',
                    height: '6px',
                    marginTop: '4px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        background: '#4f46e5',
                        height: '100%',
                        width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`,
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="新しいタスク..."
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '8px 16px',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}
                >
                    追加
                </button>
            </form>

            {error && (
                <div style={{
                    background: '#fef2f2',
                    color: '#dc2626',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    fontSize: '0.85rem'
                }}>
                    ❌ {error}
                </div>
            )}

            {loading ? (
                <p style={{ textAlign: 'center', color: '#94a3b8' }}>⏳ 読み込み中...</p>
            ) : tasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#94a3b8' }}>📝 まだタスクがありません</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {tasks.map(task => (
                        <li key={task.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 12px',
                            marginBottom: '4px',
                            background: task.completed ? '#f0fdf4' : '#fff',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.2s ease'
                        }}>
                            <span
                                onClick={() => toggleTask(task.id)}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    userSelect: 'none'
                                }}
                            >
                                {task.completed ? '✅' : '⬜'}
                            </span>
                            <span style={{
                                flex: 1,
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? '#94a3b8' : '#1e293b',
                                fontSize: '0.9rem'
                            }}>
                                {task.title}
                            </span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    color: '#ef4444',
                                    padding: '4px 8px',
                                    borderRadius: '4px'
                                }}
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ApiTaskPreview;

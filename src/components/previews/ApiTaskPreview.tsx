import { useState } from 'react';
import styles from './Preview.module.css';

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
        <div className={styles.apiTaskContainer}>
            <h3 className={styles.apiTaskTitle}>
                📋 タスク管理アプリ
            </h3>

            <div className={styles.apiStatusBar}>
                {completedCount}/{tasks.length} 完了
                <div className={styles.apiProgressTrack}>
                    <div
                        className={styles.apiProgressFill}
                        style={{ width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%` }}
                    />
                </div>
            </div>

            <form onSubmit={addTask} className={styles.apiForm}>
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="新しいタスク..."
                    className={styles.apiInput}
                />
                <button type="submit" className={styles.apiAddBtn}>
                    追加
                </button>
            </form>

            {error && (
                <div className={styles.apiError}>
                    ❌ {error}
                </div>
            )}

            {loading ? (
                <p className={styles.apiEmptyText}>⏳ 読み込み中...</p>
            ) : tasks.length === 0 ? (
                <p className={styles.apiEmptyText}>📝 まだタスクがありません</p>
            ) : (
                <ul className={styles.apiTaskList}>
                    {tasks.map(task => (
                        <li key={task.id} className={task.completed ? styles.apiTaskItemCompleted : styles.apiTaskItem}>
                            <span
                                onClick={() => toggleTask(task.id)}
                                className={styles.apiTaskCheckbox}
                            >
                                {task.completed ? '✅' : '⬜'}
                            </span>
                            <span className={task.completed ? styles.apiTaskTextCompleted : styles.apiTaskText}>
                                {task.title}
                            </span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className={styles.apiDeleteBtn}
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

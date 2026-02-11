const toggleTask = async (task) => {
    // 楽観的更新: 先にUIを更新
    setTasks(tasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
    ));

    // APIに送信
    await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
    });
};

// JSX
<li onClick={() => toggleTask(task)}
    style={{
        textDecoration: task.completed ? 'line-through' : 'none',
        cursor: 'pointer'
    }}>
    {task.completed ? '✅' : '⬜'} {task.title}
</li>

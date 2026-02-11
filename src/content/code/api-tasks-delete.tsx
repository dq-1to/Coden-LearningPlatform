const deleteTask = async (id) => {
    if (!window.confirm('本当に削除しますか？')) return;

    await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });

    setTasks(tasks.filter(t => t.id !== id));
};

// JSX
<li key={task.id}>
    <span>{task.title}</span>
    <button onClick={() => deleteTask(task.id)}
        style={{ color: 'red', marginLeft: 8 }}>
        🗑️ 削除
    </button>
</li>

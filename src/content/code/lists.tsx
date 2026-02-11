function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: '買い物' },
        { id: 2, text: '掃除' }
    ]);

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
}

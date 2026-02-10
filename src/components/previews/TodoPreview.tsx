import { useState } from 'react';

// Step2: ToDoリスト - 配列state・map・propsを学ぶプレビュー

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

function TodoPreview() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState('');

    const addTodo = () => {
        if (inputText.trim() === '') return;
        const newTodo: Todo = {
            id: Date.now(),
            text: inputText,
            completed: false
        };
        setTodos([...todos, newTodo]);
        setInputText('');
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };

    return (
        <div className="preview-content">
            <div className="todo-input-area">
                <input
                    type="text"
                    className="todo-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="新しいToDoを入力"
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                />
                <button className="todo-add-btn" onClick={addTodo}>追加</button>
            </div>
            {todos.length === 0 ? (
                <p className="todo-empty">ToDoがありません</p>
            ) : (
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id} className="todo-item">
                            <span
                                className={`todo-text ${todo.completed ? 'completed' : ''}`}
                                onClick={() => toggleTodo(todo.id)}
                            >
                                {todo.text}
                            </span>
                            <button
                                className="todo-delete-btn"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                削除
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoPreview;

import { useState } from 'react';
import styles from './Preview.module.css';

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
        <div className={styles.previewContent}>
            <div className={styles.todoInputArea}>
                <input
                    type="text"
                    className={styles.todoInput}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="新しいToDoを入力"
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                />
                <button className={styles.todoAddBtn} onClick={addTodo}>追加</button>
            </div>
            {todos.length === 0 ? (
                <p className={styles.todoEmpty}>ToDoがありません</p>
            ) : (
                <ul className={styles.todoList}>
                    {todos.map((todo) => (
                        <li key={todo.id} className={styles.todoItem}>
                            <span
                                className={todo.completed ? styles.todoTextCompleted : styles.todoText}
                                onClick={() => toggleTodo(todo.id)}
                            >
                                {todo.text}
                            </span>
                            <button
                                className={styles.todoDeleteBtn}
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

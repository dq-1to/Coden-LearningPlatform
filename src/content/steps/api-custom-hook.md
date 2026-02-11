## カスタムフックへの抽出

CRUD操作のロジックが1つのコンポーネントに集中すると
読みにくくなります。カスタムフックに抽出しましょう。

## useTasks フック

```jsx
function useTasks() {
    const [tasks, setTasks] = useState([]);
    // 全CRUD操作をここに集約
    return { tasks, addTask, toggleTask, deleteTask };
}
```

## メリット

- ロジックの再利用が可能
- コンポーネントがスッキリする
- テストしやすくなる

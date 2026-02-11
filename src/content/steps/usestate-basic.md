## useState とは？

useStateは、コンポーネントに「状態」を持たせるためのフックです。
状態が変わると、Reactは自動的に画面を再描画します。

## 基本的な使い方

```jsx
const [count, setCount] = useState(0);
```

- `count`: 現在の状態の値
- `setCount`: 状態を更新する関数
- `useState(0)`: 初期値を0に設定

## なぜ必要？

通常の変数は、コンポーネントが再描画されると値がリセットされます。
useStateを使うことで、再描画後も値を保持できます。

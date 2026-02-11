## リストデータの取得

API(json-server)は配列データも返せます。
タスク一覧を取得して、mapで表示しましょう。

## json-serverのエンドポイント

`GET /api/tasks` → 全タスクの配列を返す

## 配列の表示パターン

```jsx
tasks.map(task => (
    <li key={task.id}>{task.title}</li>
))
```

- `map`で配列をJSXに変換
- `key`にはユニークなIDを指定
- 条件付きスタイルで完了/未完了を表現

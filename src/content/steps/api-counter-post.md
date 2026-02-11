## POSTリクエストとは？

GETがデータの取得なら、POSTはデータの送信・変更です。
ボタンクリック時にAPIを呼んでカウンターを更新しましょう。

## fetchでPOST

```jsx
fetch('/api/counter', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: newValue })
});
```

- `method`: HTTPメソッド（PUT = 更新）
- `headers`: リクエストヘッダー
- `body`: 送信するデータ（JSON文字列化）

## 非同期関数 async/await

async/awaitを使うとPromiseをより読みやすく書けます。

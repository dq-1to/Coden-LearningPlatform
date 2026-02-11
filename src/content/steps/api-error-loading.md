## 3つの状態を管理する

API通信には3つの状態があります：
- `loading`（読み込み中）
- `error`（エラー発生）
- `data`（データ取得成功）

## try-catchでエラー処理

```jsx
try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('エラー');
    const data = await res.json();
} catch (err) {
    setError(err.message);
}
```

## ユーザーにとって親切なUI

- ローディング中はスピナーを表示
- エラー時はメッセージ + 再試行ボタン
- 空データ時は「まだタスクがありません」を表示

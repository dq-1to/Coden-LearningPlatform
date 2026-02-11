## APIとは？

API（Application Programming Interface）は、フロントエンドとバックエンドが
データをやり取りするための仕組みです。

## fetch APIの基本

```jsx
fetch('/api/counter')
  .then(res => res.json())
  .then(data => console.log(data));
```

- `fetch`: HTTPリクエストを送る標準的な関数
- `.then()`: Promiseの結果を処理する
- `res.json()`: レスポンスをJSONとして解析

## useEffectとの組み合わせ

コンポーネントのマウント時にAPIを呼ぶには、
useEffectの中でfetchを実行します。

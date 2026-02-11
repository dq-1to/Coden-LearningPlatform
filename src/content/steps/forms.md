## 制御コンポーネント

Reactでフォームを扱う際は「制御コンポーネント」パターンを使います。
入力値をstateで管理し、変更をハンドラで反映します。

## 基本パターン

```jsx
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />
```

## バリデーション

- リアルタイム: onChange時にチェック
- 送信時: onSubmit時にまとめてチェック

## 複数入力の管理

オブジェクトで一括管理すると便利です。

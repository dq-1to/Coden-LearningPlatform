## なぜ最適化が必要？

Reactは状態が変わるたびに再レンダリングします。
不要な再計算・再レンダリングを防ぐことでパフォーマンスを改善できます。

## useMemo

重い計算結果をメモ化（キャッシュ）します。

```jsx
const result = useMemo(() => heavyCalc(data), [data]);
```

## useCallback

関数の参照をメモ化します。子コンポーネントへの関数渡しに有効。

```jsx
const handler = useCallback(() => {...}, [deps]);
```

## React.memo

propsが変わらなければ再レンダリングをスキップ。

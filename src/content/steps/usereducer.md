## useReducer とは？

useStateの代替で、複雑な状態ロジックに適しています。
状態の更新ロジックをreducer関数にまとめられます。

## 構成要素

- `state`: 現在の状態
- `dispatch`: アクションを送る関数
- `reducer`: `(state, action) => 新しいstate`
- `initialState`: 初期状態

## useStateとの使い分け

- 単純な値: useState
- 複雑なオブジェクト/配列: useReducer
- 更新ロジックが複雑: useReducer

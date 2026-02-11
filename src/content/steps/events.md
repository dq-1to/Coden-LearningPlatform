## イベント処理とは？

ユーザーがボタンをクリック、入力フィールドに文字を入力など、
ユーザーの操作に反応する仕組みをイベント処理と呼びます。

## 基本的なイベント

- `onClick`: クリック
- `onChange`: 値の変更
- `onSubmit`: フォーム送信
- `onKeyDown`: キー押下

## イベントハンドラの書き方

- インライン: `onClick={() => console.log('clicked')}`
- 関数定義: `onClick={handleClick}`

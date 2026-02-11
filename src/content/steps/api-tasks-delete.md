## DELETEリクエスト

DELETEは、リソースを削除するHTTPメソッドです。
json-serverでは `DELETE /tasks/:id` で特定のタスクを削除できます。

## 確認ダイアログ

`window.confirm()` を使って、ユーザーに削除の確認を求めます。
誤操作を防ぐ重要なUXパターンです。

## filterで配列から除外

削除後は、stateから該当のタスクをfilterで除外します。

```jsx
setTasks(tasks.filter(t => t.id !== id))
```

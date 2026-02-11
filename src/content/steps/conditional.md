## 条件付きレンダリングとは？

条件によって表示する内容を切り替える手法です。
ログイン状態によって表示を変えたり、データの有無で表示を変えられます。

## 方法1: if文

```jsx
if (isLoggedIn) {
    return <Dashboard />;
}
return <LoginForm />;
```

## 方法2: 三項演算子

```jsx
{isLoggedIn ? <Dashboard /> : <LoginForm />}
```

## 方法3: &&演算子

```jsx
{hasData && <DataDisplay />}
```

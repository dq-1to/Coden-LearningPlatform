// 学習コースとステップのデータ
import { Step, Course } from '../types';

// コース定義
export const courses: Course[] = [
    {
        id: 'fundamentals',
        title: '基礎編',
        description: 'Reactの基本を学ぶ',
        icon: '📗',
        color: '#10b981',
        level: 'beginner'
    },
    {
        id: 'intermediate',
        title: '応用編',
        description: '実践的なフック活用',
        icon: '📘',
        color: '#3b82f6',
        level: 'intermediate'
    },
    {
        id: 'advanced',
        title: '実践編',
        description: 'プロレベルの技術',
        icon: '📕',
        color: '#ef4444',
        level: 'advanced'
    },
    {
        id: 'api-practice',
        title: 'API連携編',
        description: 'バックエンドAPIとの連携',
        icon: '🌐',
        color: '#8b5cf6',
        level: 'intermediate'
    }
];

// 学習ステップ
export const steps: Step[] = [
    // ========== 基礎編 ==========
    {
        id: 'usestate-basic',
        courseId: 'fundamentals',
        title: 'useState基礎',
        description: '状態管理の基本を学ぶ',
        docSource: 'https://ja.react.dev/reference/react/useState',
        content: `【useState とは？】

useStateは、コンポーネントに「状態」を持たせるためのフックです。
状態が変わると、Reactは自動的に画面を再描画します。

【基本的な使い方】
const [count, setCount] = useState(0);

・count: 現在の状態の値
・setCount: 状態を更新する関数
・useState(0): 初期値を0に設定

【なぜ必要？】
通常の変数は、コンポーネントが再描画されると値がリセットされます。
useStateを使うことで、再描画後も値を保持できます。`,
        code: `import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>カウント: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                +1
            </button>
        </div>
    );
}`
    },
    {
        id: 'events',
        courseId: 'fundamentals',
        title: 'イベント処理',
        description: 'ユーザー操作への応答',
        docSource: 'https://ja.react.dev/learn/responding-to-events',
        content: `【イベント処理とは？】

ユーザーがボタンをクリック、入力フィールドに文字を入力など、
ユーザーの操作に反応する仕組みをイベント処理と呼びます。

【基本的なイベント】
・onClick: クリック
・onChange: 値の変更
・onSubmit: フォーム送信
・onKeyDown: キー押下

【イベントハンドラの書き方】
・インライン: onClick={() => console.log('clicked')}
・関数定義: onClick={handleClick}`,
        code: `function EventExample() {
    const [text, setText] = useState('');

    const handleClick = () => {
        alert('クリックされました！');
    };

    return (
        <div>
            <button onClick={handleClick}>クリック</button>
            <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
}`
    },
    {
        id: 'conditional',
        courseId: 'fundamentals',
        title: '条件付きレンダリング',
        description: '条件に応じた表示切替',
        docSource: 'https://ja.react.dev/learn/conditional-rendering',
        content: `【条件付きレンダリングとは？】

条件によって表示する内容を切り替える手法です。
ログイン状態によって表示を変えたり、データの有無で表示を変えられます。

【方法1: if文】
if (isLoggedIn) {
    return <Dashboard />;
}
return <LoginForm />;

【方法2: 三項演算子】
{isLoggedIn ? <Dashboard /> : <LoginForm />}

【方法3: &&演算子】
{hasData && <DataDisplay />}`,
        code: `function ConditionalExample({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <p>ようこそ！</p>
            ) : (
                <p>ログインしてください</p>
            )}
        </div>
    );
}`
    },
    {
        id: 'lists',
        courseId: 'fundamentals',
        title: 'リスト表示',
        description: '配列データの表示',
        docSource: 'https://ja.react.dev/learn/rendering-lists',
        content: `【リストレンダリング】

配列データを一覧表示するには、map()メソッドを使います。
各要素にはユニークなkey属性が必要です。

【基本的な書き方】
{items.map(item => (
    <li key={item.id}>{item.name}</li>
))}

【keyが必要な理由】
Reactが各要素を識別し、効率的に更新するために必要です。
インデックスではなく、ユニークなIDを使いましょう。`,
        code: `function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: '買い物' },
        { id: 2, text: '掃除' }
    ]);

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
}`
    },

    // ========== 応用編 ==========
    {
        id: 'useeffect',
        courseId: 'intermediate',
        title: 'useEffect',
        description: '副作用とライフサイクル',
        docSource: 'https://ja.react.dev/reference/react/useEffect',
        content: `【useEffect とは？】

コンポーネントを外部システムと同期させるためのフックです。
・APIからデータを取得
・タイマーの設定
・DOMの直接操作
などの「副作用」を扱います。

【基本的な使い方】
useEffect(() => {
    // 副作用の処理
    return () => {
        // クリーンアップ
    };
}, [依存配列]);

【依存配列のパターン】
・[]: マウント時のみ実行
・[value]: valueが変わるたび実行
・省略: 毎回実行（非推奨）`,
        code: `import { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return <p>経過時間: {seconds}秒</p>;
}`
    },
    {
        id: 'forms',
        courseId: 'intermediate',
        title: 'フォーム処理',
        description: '入力とバリデーション',
        docSource: 'https://ja.react.dev/reference/react-dom/components/input',
        content: `【制御コンポーネント】

Reactでフォームを扱う際は「制御コンポーネント」パターンを使います。
入力値をstateで管理し、変更をハンドラで反映します。

【基本パターン】
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />

【バリデーション】
・リアルタイム: onChange時にチェック
・送信時: onSubmit時にまとめてチェック

【複数入力の管理】
オブジェクトで一括管理すると便利です。`,
        code: `function LoginForm() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form>
            <input name="email" onChange={handleChange} />
            <input name="password" type="password" onChange={handleChange} />
        </form>
    );
}`
    },
    {
        id: 'usecontext',
        courseId: 'intermediate',
        title: 'useContext',
        description: 'グローバル状態管理',
        docSource: 'https://ja.react.dev/reference/react/useContext',
        content: `【useContext とは？】

propsのバケツリレーを避け、コンポーネントツリー全体で
データを共有するための仕組みです。

【3ステップ】
1. createContext()でコンテキスト作成
2. Provider で値を提供
3. useContext() で値を取得

【使用例】
・テーマ（ダーク/ライト）
・ログインユーザー情報
・言語設定`,
        code: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function ThemedButton() {
    const { theme, setTheme } = useContext(ThemeContext);
    return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        現在: {theme}
    </button>;
}`
    },
    {
        id: 'usereducer',
        courseId: 'intermediate',
        title: 'useReducer',
        description: '複雑な状態ロジック',
        docSource: 'https://ja.react.dev/reference/react/useReducer',
        content: `【useReducer とは？】

useStateの代替で、複雑な状態ロジックに適しています。
状態の更新ロジックをreducer関数にまとめられます。

【構成要素】
・state: 現在の状態
・dispatch: アクションを送る関数
・reducer: (state, action) => 新しいstate
・initialState: 初期状態

【useStateとの使い分け】
・単純な値: useState
・複雑なオブジェクト/配列: useReducer
・更新ロジックが複雑: useReducer`,
        code: `import { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
        case 'reset': return { count: 0 };
        default: return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    
    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    );
}`
    },

    // ========== 実践編 ==========
    {
        id: 'custom-hooks',
        courseId: 'advanced',
        title: 'カスタムHooks',
        description: '再利用可能なロジック',
        docSource: 'https://ja.react.dev/learn/reusing-logic-with-custom-hooks',
        content: `【カスタムフックとは？】

複数のコンポーネントで使い回したいロジックを
「use〇〇」という名前の関数に切り出したものです。

【命名規則】
必ず「use」で始める（useLocalStorage, useWindowSizeなど）

【メリット】
・ロジックの再利用
・コンポーネントのシンプル化
・テストしやすい

【よくあるパターン】
・useLocalStorage: ローカルストレージ連携
・useFetch: データ取得
・useDebounce: 入力の遅延処理`,
        code: `function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

// 使用例
function App() {
    const [name, setName] = useLocalStorage('name', '');
    return <input value={name} onChange={e => setName(e.target.value)} />;
}`
    },
    {
        id: 'api-fetch',
        courseId: 'advanced',
        title: 'API連携',
        description: 'データ取得とローディング',
        docSource: 'https://ja.react.dev/reference/react/useEffect#fetching-data-with-effects',
        content: `【API連携の基本】

useEffectとfetch/axiosを組み合わせて外部APIからデータを取得します。

【3つの状態を管理】
1. loading: 読み込み中
2. data: 取得したデータ
3. error: エラー情報

【ベストプラクティス】
・ローディング表示
・エラーハンドリング
・クリーンアップ（競合状態対策）

【SWRやTanStack Query】
本番環境ではこれらのライブラリを検討しましょう。`,
        code: `function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error.message}</p>;
    return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`
    },
    {
        id: 'performance',
        courseId: 'advanced',
        title: 'パフォーマンス最適化',
        description: 'useMemo/useCallback',
        docSource: 'https://ja.react.dev/reference/react/useMemo',
        content: `【なぜ最適化が必要？】

Reactは状態が変わるたびに再レンダリングします。
不要な再計算・再レンダリングを防ぐことでパフォーマンスを改善できます。

【useMemo】
重い計算結果をメモ化（キャッシュ）します。
const result = useMemo(() => heavyCalc(data), [data]);

【useCallback】
関数の参照をメモ化します。子コンポーネントへの関数渡しに有効。
const handler = useCallback(() => {...}, [deps]);

【React.memo】
propsが変わらなければ再レンダリングをスキップ。`,
        code: `import { useMemo, useCallback, memo } from 'react';

const ExpensiveList = memo(({ items, onSelect }) => {
    return items.map(item => (
        <div key={item.id} onClick={() => onSelect(item)}>
            {item.name}
        </div>
    ));
});

function App() {
    const [filter, setFilter] = useState('');
    
    const filteredItems = useMemo(
        () => items.filter(i => i.name.includes(filter)),
        [items, filter]
    );
    
    const handleSelect = useCallback((item) => {
        console.log(item);
    }, []);
    
    return <ExpensiveList items={filteredItems} onSelect={handleSelect} />;
}`
    },
    {
        id: 'testing',
        courseId: 'advanced',
        title: 'テスト入門',
        description: 'Vitest & React Testing Library',
        docSource: 'https://vitest.dev/',
        content: `【テストの重要性】

自動テストにより、リファクタリングや機能追加時に
既存機能が壊れていないか確認できます。

【Vitest】
高速なテストランナー。Viteプロジェクトと相性抜群。

【React Testing Library (RTL)】
ユーザー視点でコンポーネントをテスト。
「実装の詳細」ではなく「ユーザーが見る振る舞い」をテスト。

【基本的なテストパターン】
1. render: コンポーネントを描画
2. screen: 要素を取得
3. fireEvent/userEvent: 操作をシミュレート
4. expect: 結果を検証`,
        code: `import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Counter from './Counter';

describe('Counter', () => {
    it('初期値が0であること', () => {
        render(<Counter />);
        expect(screen.getByText('カウント: 0')).toBeInTheDocument();
    });

    it('+1ボタンでカウントが増えること', () => {
        render(<Counter />);
        fireEvent.click(screen.getByText('+1'));
        expect(screen.getByText('カウント: 1')).toBeInTheDocument();
    });
});`
    },

    // ========== API連携編 ==========
    {
        id: 'api-counter-get',
        courseId: 'api-practice',
        title: 'カウンターAPI(GET)',
        description: 'APIからデータを取得する',
        docSource: 'https://ja.react.dev/reference/react/useEffect',
        content: `【APIとは？】

API（Application Programming Interface）は、フロントエンドとバックエンドが
データをやり取りするための仕組みです。

【fetch APIの基本】
fetch('/api/counter')
  .then(res => res.json())
  .then(data => console.log(data));

・fetch: HTTPリクエストを送る標準的な関数
・.then(): Promiseの結果を処理する
・res.json(): レスポンスをJSONとして解析

【useEffectとの組み合わせ】
コンポーネントのマウント時にAPIを呼ぶには、
useEffectの中でfetchを実行します。`,
        code: `import { useState, useEffect } from 'react';

function ApiCounter() {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/counter')
            .then(res => res.json())
            .then(data => {
                setCount(data.value);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>読み込み中...</p>;

    return (
        <div>
            <h2>カウンター: {count}</h2>
        </div>
    );
}`
    },
    {
        id: 'api-counter-post',
        courseId: 'api-practice',
        title: 'カウンターAPI(POST)',
        description: 'APIにデータを送信する',
        docSource: 'https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch',
        content: `【POSTリクエストとは？】

GETがデータの取得なら、POSTはデータの送信・変更です。
ボタンクリック時にAPIを呼んでカウンターを更新しましょう。

【fetchでPOST】
fetch('/api/counter', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: newValue })
});

・method: HTTPメソッド（PUT = 更新）
・headers: リクエストヘッダー
・body: 送信するデータ（JSON文字列化）

【非同期関数 async/await】
async/awaitを使うとPromiseをより読みやすく書けます。`,
        code: `import { useState, useEffect } from 'react';

function ApiCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('/api/counter')
            .then(res => res.json())
            .then(data => setCount(data.value));
    }, []);

    const increment = async () => {
        const newValue = count + 1;
        await fetch('/api/counter', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1, value: newValue })
        });
        setCount(newValue);
    };

    return (
        <div>
            <h2>カウンター: {count}</h2>
            <button onClick={increment}>+1</button>
        </div>
    );
}`
    },
    {
        id: 'api-tasks-list',
        courseId: 'api-practice',
        title: 'タスク一覧(GET)',
        description: 'APIからリストデータを取得して表示',
        docSource: 'https://ja.react.dev/learn/rendering-lists',
        content: `【リストデータの取得】

API(json-server)は配列データも返せます。
タスク一覧を取得して、mapで表示しましょう。

【json-serverのエンドポイント】
GET /api/tasks → 全タスクの配列を返す

【配列の表示パターン】
tasks.map(task => (
    <li key={task.id}>{task.title}</li>
))

・mapで配列をJSXに変換
・keyにはユニークなIDを指定
・条件付きスタイルで完了/未完了を表現`,
        code: `import { useState, useEffect } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>読み込み中...</p>;

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                </li>
            ))}
        </ul>
    );
}`
    },
    {
        id: 'api-tasks-create',
        courseId: 'api-practice',
        title: 'タスク追加(POST)',
        description: 'フォームからAPIにデータを送信',
        docSource: 'https://ja.react.dev/reference/react-dom/components/form',
        content: `【フォームとAPIの連携】

フォームに入力した値をAPIにPOSTしてタスクを追加します。

【フォームの流れ】
1. useStateで入力値を管理
2. onSubmitでフォーム送信をハンドル
3. fetch(..., { method: 'POST' })でAPIに送信
4. レスポンスを受け取り、画面のリストを更新

【e.preventDefault()】
フォームのデフォルト動作（ページリロード）を防ぐために
必ず呼びます。`,
        code: `import { useState, useEffect } from 'react';

function TaskApp() {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(setTasks);
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newTitle,
                completed: false,
                createdAt: new Date().toISOString()
            })
        });
        const created = await res.json();
        setTasks([...tasks, created]);
        setNewTitle('');
    };

    return (
        <div>
            <form onSubmit={addTask}>
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="新しいタスク"
                />
                <button type="submit">追加</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}`
    },
    {
        id: 'api-tasks-update',
        courseId: 'api-practice',
        title: 'タスク更新(PATCH)',
        description: 'タスクの完了状態を切り替える',
        docSource: 'https://developer.mozilla.org/ja/docs/Web/HTTP/Methods/PATCH',
        content: `【PATCHリクエスト】

PATCHは、リソースの一部だけを更新するHTTPメソッドです。
タスクの完了/未完了を切り替えるのに使います。

【楽観的更新（Optimistic Update）】
APIの応答を待たずに先に画面を更新する手法です。
ユーザー体験が向上しますが、エラー時のロールバックが必要です。

【実装パターン】
1. クリックイベントでハンドラを呼ぶ
2. stateを先に更新（楽観的更新）
3. APIにPATCHリクエストを送信
4. エラー時はstateを戻す`,
        code: `const toggleTask = async (task) => {
    // 楽観的更新: 先にUIを更新
    setTasks(tasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
    ));

    // APIに送信
    await fetch(\`/api/tasks/\${task.id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
    });
};

// JSX
<li onClick={() => toggleTask(task)}
    style={{
        textDecoration: task.completed ? 'line-through' : 'none',
        cursor: 'pointer'
    }}>
    {task.completed ? '✅' : '⬜'} {task.title}
</li>`
    },
    {
        id: 'api-tasks-delete',
        courseId: 'api-practice',
        title: 'タスク削除(DELETE)',
        description: 'タスクをAPIから削除する',
        docSource: 'https://developer.mozilla.org/ja/docs/Web/HTTP/Methods/DELETE',
        content: `【DELETEリクエスト】

DELETEは、リソースを削除するHTTPメソッドです。
json-serverでは DELETE /tasks/:id で特定のタスクを削除できます。

【確認ダイアログ】
window.confirm() を使って、ユーザーに削除の確認を求めます。
誤操作を防ぐ重要なUXパターンです。

【filterで配列から除外】
削除後は、stateから該当のタスクをfilterで除外します。
setTasks(tasks.filter(t => t.id !== id))`,
        code: `const deleteTask = async (id) => {
    if (!window.confirm('本当に削除しますか？')) return;

    await fetch(\`/api/tasks/\${id}\`, {
        method: 'DELETE'
    });

    setTasks(tasks.filter(t => t.id !== id));
};

// JSX
<li key={task.id}>
    <span>{task.title}</span>
    <button onClick={() => deleteTask(task.id)}
        style={{ color: 'red', marginLeft: 8 }}>
        🗑️ 削除
    </button>
</li>`
    },
    {
        id: 'api-custom-hook',
        courseId: 'api-practice',
        title: 'useTasksフック',
        description: 'API操作をカスタムフックに抽出',
        docSource: 'https://ja.react.dev/learn/reusing-logic-with-custom-hooks',
        content: `【カスタムフックへの抽出】

CRUD操作のロジックが1つのコンポーネントに集中すると
読みにくくなります。カスタムフックに抽出しましょう。

【useTasks フック】
function useTasks() {
    const [tasks, setTasks] = useState([]);
    // 全CRUD操作をここに集約
    return { tasks, addTask, toggleTask, deleteTask };
}

【メリット】
・ロジックの再利用が可能
・コンポーネントがスッキリする
・テストしやすくなる`,
        code: `import { useState, useEffect } from 'react';

function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => { setTasks(data); setLoading(false); });
    }, []);

    const addTask = async (title) => {
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false, createdAt: new Date().toISOString() })
        });
        const created = await res.json();
        setTasks(prev => [...prev, created]);
    };

    const toggleTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
        await fetch(\`/api/tasks/\${id}\`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !task.completed })
        });
    };

    const deleteTask = async (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        await fetch(\`/api/tasks/\${id}\`, { method: 'DELETE' });
    };

    return { tasks, loading, addTask, toggleTask, deleteTask };
}

export default useTasks;`
    },
    {
        id: 'api-error-loading',
        courseId: 'api-practice',
        title: 'エラー/ローディングUI',
        description: 'APIの状態に応じたUI表示',
        docSource: 'https://ja.react.dev/learn/synchronizing-with-effects',
        content: `【3つの状態を管理する】

API通信には3つの状態があります:
・loading（読み込み中）
・error（エラー発生）
・data（データ取得成功）

【try-catchでエラー処理】
try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('エラー');
    const data = await res.json();
} catch (err) {
    setError(err.message);
}

【ユーザーにとって親切なUI】
・ローディング中はスピナーを表示
・エラー時はメッセージ + 再試行ボタン
・空データ時は「まだタスクがありません」を表示`,
        code: `import { useState, useEffect } from 'react';

function TaskApp() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/tasks');
            if (!res.ok) throw new Error('データの取得に失敗しました');
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    if (loading) return <div className="spinner">⏳ 読み込み中...</div>;
    if (error) return (
        <div className="error">
            <p>❌ {error}</p>
            <button onClick={fetchTasks}>再試行</button>
        </div>
    );
    if (tasks.length === 0) return <p>📝 まだタスクがありません</p>;

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>{task.title}</li>
            ))}
        </ul>
    );
}`
    }
];

// コースIDでステップを取得
export function getStepsByCourse(courseId: string): Step[] {
    return steps.filter(step => step.courseId === courseId);
}

// コースIDからコース情報を取得
export function getCourseById(courseId: string): Course | undefined {
    return courses.find(course => course.id === courseId);
}

// 自由記述チャレンジのデータ
import { Challenge } from '../types';

export const challenges: Record<string, Challenge> = {
    'usestate-basic': {
        id: 'usestate-basic',
        title: 'カウンターを自作しよう',
        description: 'useState を使って、+1、-1、リセット機能を持つカウンターコンポーネントを自分で書いてください。',
        initialCode: `import { useState } from 'react';

function Counter() {
    // ここにカウンターのstateを定義

    return (
        <div>
            {/* カウント表示とボタンを実装 */}
        </div>
    );
}

export default Counter;`,
        solutionCode: `import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>カウント: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(0)}>リセット</button>
        </div>
    );
}

export default Counter;`,
        hints: [
            'useStateの初期値は0にしましょう',
            'const [count, setCount] = useState(0) の形で分割代入します',
            'ボタンのonClickにsetCountを渡します'
        ],
        checkPoints: ['useState', 'setCount', 'onClick', 'count + 1', 'count - 1']
    },

    'events': {
        id: 'events',
        title: 'イベントハンドラを実装しよう',
        description: 'クリック・入力・フォーム送信のイベントハンドラを持つコンポーネントを作成してください。',
        initialCode: `import { useState } from 'react';

function EventDemo() {
    // 名前の入力値を管理するstate

    // 送信ハンドラ

    return (
        <div>
            {/* 名前入力フォームを実装 */}
        </div>
    );
}

export default EventDemo;`,
        solutionCode: `import { useState } from 'react';

function EventDemo() {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="名前を入力"
                />
                <button type="submit">送信</button>
            </form>
            {submitted && <p>こんにちは、{name}さん！</p>}
        </div>
    );
}

export default EventDemo;`,
        hints: [
            'e.preventDefault()でフォームのデフォルト動作を防ぎます',
            'onChangeでinputの値を取得します',
            'e.target.valueで入力値にアクセスできます'
        ],
        checkPoints: ['onChange', 'onSubmit', 'preventDefault', 'e.target.value']
    },

    'lists': {
        id: 'lists',
        title: 'Todoリストを自作しよう',
        description: 'タスクの追加・削除ができるTodoリストを自分で実装してください。',
        initialCode: `import { useState } from 'react';

function TodoList() {
    // タスク配列と入力値のstateを定義

    // タスク追加関数

    // タスク削除関数

    return (
        <div>
            {/* フォームとリストを実装 */}
        </div>
    );
}

export default TodoList;`,
        solutionCode: `import { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState<{id: number; text: string}[]>([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input }]);
        setInput('');
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={addTodo}>追加</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => deleteTodo(todo.id)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;`,
        hints: [
            '配列のstateは useState<Array>([]) で初期化します',
            '追加はスプレッド構文 [...todos, newItem] を使います',
            '削除は filter メソッドを使います'
        ],
        checkPoints: ['useState', 'setTodos', 'filter', 'map', 'key']
    },

    'useeffect': {
        id: 'useeffect',
        title: 'タイマーを実装しよう',
        description: 'useEffectを使った自動カウントアップタイマーを実装してください。スタート/ストップ機能付き。',
        initialCode: `import { useState, useEffect } from 'react';

function Timer() {
    // 秒数とrunning状態のstateを定義

    // useEffectでタイマーを制御

    return (
        <div>
            {/* タイマー表示とスタート/ストップボタン */}
        </div>
    );
}

export default Timer;`,
        solutionCode: `import { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!running) return;
        const id = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(id);
    }, [running]);

    return (
        <div>
            <p>{seconds}秒</p>
            <button onClick={() => setRunning(!running)}>
                {running ? 'ストップ' : 'スタート'}
            </button>
            <button onClick={() => { setRunning(false); setSeconds(0); }}>
                リセット
            </button>
        </div>
    );
}

export default Timer;`,
        hints: [
            'useEffectの中でsetIntervalを使います',
            'クリーンアップ関数でclearIntervalを呼びます',
            '依存配列に[running]を指定します'
        ],
        checkPoints: ['useEffect', 'setInterval', 'clearInterval', 'return ()']
    },

    'forms': {
        id: 'forms',
        title: '登録フォームを作ろう',
        description: '名前・メール・パスワードの入力フォームとバリデーションを実装してください。',
        initialCode: `import { useState } from 'react';

function RegisterForm() {
    // フォームの各フィールドのstateを定義

    // バリデーション関数

    // 送信ハンドラ

    return (
        <div>
            {/* フォームを実装 */}
        </div>
    );
}

export default RegisterForm;`,
        solutionCode: `import { useState } from 'react';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const validate = () => {
        const errs: string[] = [];
        if (!name.trim()) errs.push('名前は必須です');
        if (!email.includes('@')) errs.push('メールアドレスが無効です');
        if (password.length < 6) errs.push('パスワードは6文字以上');
        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (errs.length === 0) alert('登録成功！');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="名前" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="メール" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="パスワード" />
            {errors.map((err, i) => <p key={i} style={{color:'red'}}>{err}</p>)}
            <button type="submit">登録</button>
        </form>
    );
}

export default RegisterForm;`,
        hints: [
            '各フィールドにuseStateを使います',
            'バリデーション関数でエラー配列を返します',
            'onSubmitでe.preventDefault()を忘れずに'
        ],
        checkPoints: ['useState', 'onSubmit', 'preventDefault', 'validate', 'onChange']
    },

    'api-counter-get': {
        id: 'api-counter-get',
        title: 'APIからカウンターを取得しよう',
        description: 'fetchとuseEffectを使って、APIからカウンターの値を取得して表示するコンポーネントを書いてください。',
        initialCode: `import { useState, useEffect } from 'react';

function ApiCounter() {
    // カウンターの値とローディングstateを定義

    // useEffectでAPIからデータを取得

    return (
        <div>
            {/* ローディング中と値の表示 */}
        </div>
    );
}

export default ApiCounter;`,
        solutionCode: `import { useState, useEffect } from 'react';

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
    return <h2>カウンター: {count}</h2>;
}

export default ApiCounter;`,
        hints: [
            'useEffectの依存配列は空[]にします',
            'fetchの結果は.then(res => res.json())でJSONに変換します',
            'ローディング中はloading stateで制御します'
        ],
        checkPoints: ['useEffect', 'fetch', 'json()', 'setCount', 'setLoading']
    },

    'api-tasks-create': {
        id: 'api-tasks-create',
        title: 'APIでタスクを作成しよう',
        description: 'フォームからPOSTリクエストを送信して、新しいタスクをAPIに追加する機能を実装してください。',
        initialCode: `import { useState } from 'react';

function TaskCreator() {
    const [title, setTitle] = useState('');

    // タスク追加関数（APIにPOSTリクエスト）

    return (
        <div>
            {/* フォームを実装 */}
        </div>
    );
}

export default TaskCreator;`,
        solutionCode: `import { useState } from 'react';

function TaskCreator() {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState<{id: number; title: string}[]>([]);

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false })
        });
        const created = await res.json();
        setTasks([...tasks, created]);
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={addTask}>
                <input value={title} onChange={e => setTitle(e.target.value)} />
                <button type="submit">追加</button>
            </form>
            <ul>
                {tasks.map(t => <li key={t.id}>{t.title}</li>)}
            </ul>
        </div>
    );
}

export default TaskCreator;`,
        hints: [
            'fetch の method を "POST" にします',
            'headers に Content-Type: application/json を指定',
            'body に JSON.stringify でデータを渡します'
        ],
        checkPoints: ['async', 'await', 'fetch', 'POST', 'JSON.stringify']
    },

    'api-error-loading': {
        id: 'api-error-loading',
        title: 'エラー処理を実装しよう',
        description: 'try-catch-finallyを使ったエラー処理と、ローディング・エラーの3状態UIを実装してください。',
        initialCode: `import { useState } from 'react';

function SafeFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // fetchを安全に実行する関数

    return (
        <div>
            {/* ローディング/エラー/データの3状態を表示 */}
        </div>
    );
}

export default SafeFetcher;`,
        solutionCode: `import { useState } from 'react';

function SafeFetcher() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/tasks');
            if (!res.ok) throw new Error('取得に失敗');
            const json = await res.json();
            setData(json);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchData}>データ取得</button>
            {loading && <p>読み込み中...</p>}
            {error && <p style={{color:'red'}}>エラー: {error}</p>}
            {data.length > 0 && (
                <ul>
                    {data.map((item: any) => <li key={item.id}>{item.title}</li>)}
                </ul>
            )}
        </div>
    );
}

export default SafeFetcher;`,
        hints: [
            'try-catch-finallyの3ブロックを使います',
            'res.okでレスポンスの成否を確認します',
            'finallyでsetLoading(false)を必ず呼びます'
        ],
        checkPoints: ['try', 'catch', 'finally', 'res.ok', 'setError']
    }
};

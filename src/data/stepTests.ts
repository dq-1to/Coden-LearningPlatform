// ステップテストデータ
// 各ステップのプレビューと同じコードを穴埋め形式で出題

import { StepTest } from '../types';

export const stepTests: Record<string, StepTest> = {
    'usestate-basic': {
        title: "カウンターを作成しよう",
        description: "学んだことを活かして、カウンターアプリを完成させてください",
        template: `import { ____1____ } from 'react';

function Counter() {
    const [count, ____2____] = useState(____3____);

    return (
        <div>
            <p>カウント: {____4____}</p>
            <button onClick={() => ____5____(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(____6____)}>リセット</button>
        </div>
    );
}`,
        answers: ["useState", "setCount", "0", "count", "setCount", "0"],
        hints: [
            "状態管理のためのフック名",
            "countを更新する関数（set + 変数名）",
            "カウントの初期値（数字）",
            "現在のカウント値を表示",
            "クリックでcountを更新する関数",
            "リセット時の値（初期値と同じ）"
        ]
    },

    'lists': {
        title: "ToDoリストを作成しよう",
        description: "学んだことを活かして、ToDoリストの主要部分を完成させてください",
        template: `import { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState(____1____);
    const [inputText, setInputText] = useState('');

    const addTodo = () => {
        const newTodo = { id: Date.now(), text: inputText };
        setTodos([____2____, newTodo]);
        setInputText('');
    };

    const deleteTodo = (id) => {
        setTodos(todos.____3____(todo => todo.id !== id));
    };

    return (
        <div>
            <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button onClick={addTodo}>追加</button>
            <ul>
                {todos.____4____(todo => (
                    <li ____5____={todo.id}>
                        {todo.text}
                        <button onClick={() => deleteTodo(____6____)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}`,
        answers: ["[]", "...todos", "filter", "map", "key", "todo.id"],
        hints: [
            "空の配列を初期値に",
            "既存の配列を展開（スプレッド構文）",
            "条件に合う要素だけを残すメソッド",
            "配列の各要素をJSXに変換するメソッド",
            "リスト表示で必須のprop名",
            "削除対象を特定するID"
        ]
    },

    'useeffect': {
        title: "メモアプリを作成しよう",
        description: "学んだことを活かして、localStorageを使うメモアプリを完成させてください",
        template: `import { useState, ____1____ } from 'react';

function MemoApp() {
    const [memos, setMemos] = useState([]);

    // 初回読み込み
    useEffect(() => {
        const saved = localStorage.____2____('memos');
        if (saved) {
            setMemos(JSON.____3____(saved));
        }
    }, ____4____);

    // 保存処理
    useEffect(() => {
        localStorage.____5____('memos', JSON.stringify(memos));
    }, [____6____]);

    return <div>{/* UI */}</div>;
}`,
        answers: ["useEffect", "getItem", "parse", "[]", "setItem", "memos"],
        hints: [
            "副作用を扱うためのフック名",
            "localStorageから取得するメソッド",
            "JSON文字列をオブジェクトに変換",
            "初回のみ実行するための依存配列",
            "localStorageに保存するメソッド",
            "監視する変数（変化したら保存）"
        ]
    },

    'forms': {
        title: "フォームバリデーションを実装しよう",
        description: "学んだことを活かして、バリデーション付きフォームを完成させてください",
        template: `import { useState } from 'react';

function Form() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [____1____]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'メールは必須です';
        }
        setErrors(newErrors);
        return Object.____2____(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.____3____();
        if (____4____()) {
            console.log('送信成功');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" onChange={handleChange} />
            {errors.email ____5____ <span>{errors.email}</span>}
            <button ____6____="submit">送信</button>
        </form>
    );
}`,
        answers: ["name", "keys", "preventDefault", "validate", "&&", "type"],
        hints: [
            "動的にプロパティを指定する変数",
            "オブジェクトのキー配列を取得するメソッド",
            "フォームのデフォルト動作を防ぐ",
            "バリデーション関数を呼び出す",
            "条件付きレンダリングの演算子",
            "ボタンのタイプを指定するprop"
        ]
    },

    'api-fetch': {
        title: "データフェッチを実装しよう",
        description: "学んだことを活かして、APIからデータを取得する機能を完成させてください",
        template: `import { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(____1____);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = ____2____ () => {
            try {
                const response = ____3____ fetch('/api/data');
                const json = await response.____4____();
                setData(json);
            } ____5____ (err) {
                setError(err.message);
            } ____6____ {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>読み込み中...</div>;
    return <div>{/* データ表示 */}</div>;
}`,
        answers: ["true", "async", "await", "json", "catch", "finally"],
        hints: [
            "ローディングの初期状態（真偽値）",
            "非同期関数を示すキーワード",
            "Promiseを待機するキーワード",
            "レスポンスをJSONに変換するメソッド",
            "エラーをキャッチするブロック",
            "必ず実行されるブロック"
        ]
    },

    'usecontext': {
        title: "Context APIを使おう",
        description: "学んだことを活かして、Contextでテーマを共有する機能を完成させてください",
        template: `import { ____1____, useContext, useState } from 'react';

const ThemeContext = ____2____(null);

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.____3____ value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    const context = ____4____(ThemeContext);
    if (!context) {
        ____5____ new Error('useTheme must be used within ThemeProvider');
    }
    return ____6____;
}`,
        answers: ["createContext", "createContext", "Provider", "useContext", "throw", "context"],
        hints: [
            "Contextを作成する関数をインポート",
            "Contextを作成する関数",
            "値を提供するコンポーネント名",
            "Contextの値を取得するフック",
            "エラーを発生させるキーワード",
            "取得したcontextを返す"
        ]
    },

    'usereducer': {
        title: "useReducerを使おう",
        description: "学んだことを活かして、Reducerパターンでカウンターを完成させてください",
        template: `import { ____1____ } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.____2____) {
        case 'increment':
            return { count: state.count + 1 };
        case 'add':
            return { count: state.count + action.____3____ };
        default:
            return state;
    }
}

function Counter() {
    const [state, ____4____] = useReducer(reducer, initialState);

    return (
        <div>
            <p>カウント: {state.____5____}</p>
            <button onClick={() => dispatch({ ____6____: 'increment' })}>
                +1
            </button>
        </div>
    );
}`,
        answers: ["useReducer", "type", "payload", "dispatch", "count", "type"],
        hints: [
            "Reducerを使うためのフック",
            "アクションの種類を示すプロパティ",
            "アクションに含まれるデータ",
            "アクションを送信する関数",
            "ステートのカウント値",
            "アクションオブジェクトの種類を示すキー"
        ]
    },

    'custom-hooks': {
        title: "カスタムフックを作ろう",
        description: "学んだことを活かして、localStorageを使うカスタムフックを完成させてください",
        template: `import { useState, useEffect } from 'react';

function ____1____LocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.____2____(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.____3____(key, JSON.____4____(storedValue));
    }, [key, storedValue]);

    ____5____ [storedValue, setStoredValue];
}

// 使用例
function App() {
    const [name, setName] = ____6____('user-name', '');
    return <input value={name} onChange={(e) => setName(e.target.value)} />;
}`,
        answers: ["use", "getItem", "setItem", "stringify", "return", "useLocalStorage"],
        hints: [
            "カスタムフックのプレフィックス",
            "localStorageから取得するメソッド",
            "localStorageに保存するメソッド",
            "オブジェクトをJSON文字列に変換",
            "関数から値を返す",
            "作成したカスタムフックの名前"
        ]
    },

    'events': {
        title: "イベント処理を実装しよう",
        description: "学んだことを活かして、イベント処理を使ったインタラクティブなコンポーネントを完成させてください",
        template: `import { useState } from 'react';

function EventDemo() {
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);

    const ____1____ = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <button ____2____={handleClick}>
                クリック回数: {count}
            </button>
            <input
                value={text}
                ____3____={(e) => setText(e.____4____.value)}
                placeholder="入力してください"
            />
            <p>入力値: {text}</p>
            <button onClick={____5____ => setCount(0)}>
                リセット
            </button>
        </div>
    );
}`,
        answers: ["handleClick", "onClick", "onChange", "target", "()"],
        hints: [
            "イベントハンドラ関数の名前（handle + Click）",
            "クリックイベントを指定するprop",
            "値の変更を監視するイベント",
            "イベントが発生した要素を参照するプロパティ",
            "引数なしのアロー関数"
        ]
    },

    'conditional': {
        title: "条件付きレンダリングを実装しよう",
        description: "学んだことを活かして、条件により表示を切り替えるコンポーネントを完成させてください",
        template: `import { useState } from 'react';

function ConditionalDemo() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (loading) ____1____ <p>読み込み中...</p>;

    return (
        <div>
            {isLoggedIn ____2____ (
                <div>
                    <p>ようこそ！</p>
                    <button onClick={() => setIsLoggedIn(false)}>ログアウト</button>
                </div>
            ) : (
                <button onClick={() => setIsLoggedIn(true)}>ログイン</button>
            )}

            {error ____3____ <p className="error">{error}</p>}

            <div className={isLoggedIn ____4____ 'logged-in' : 'logged-out'}>
                ステータス表示
            </div>

            {!isLoggedIn ____5____ ____6____}
        </div>
    );
}`,
        answers: ["return", "?", "&&", "?", "&&", "null"],
        hints: [
            "早期リターンで別のJSXを返す",
            "三項演算子の条件後の記号",
            "errorがtruthyの場合のみ表示する演算子",
            "条件に応じてクラス名を切り替える三項演算子",
            "論理AND演算子",
            "何も表示しないことを示す値"
        ]
    },

    'performance': {
        title: "パフォーマンス最適化を実装しよう",
        description: "学んだことを活かして、useMemoとuseCallbackを使った最適化を完成させてください",
        template: `import { useState, ____1____, useCallback, ____2____ } from 'react';

const ExpensiveList = memo(({ items, onSelect }) => {
    return items.map(item => (
        <div key={item.id} onClick={() => onSelect(item)}>
            {item.name}
        </div>
    ));
});

function App() {
    const [filter, setFilter] = useState('');
    const [items] = useState([
        { id: 1, name: 'React' },
        { id: 2, name: 'Vue' },
        { id: 3, name: 'Angular' }
    ]);

    const filteredItems = ____3____(() =>
        items.filter(i => i.name.includes(filter)),
        [____4____, filter]
    );

    const handleSelect = ____5____((item) => {
        console.log('Selected:', item.name);
    }, ____6____);

    return (
        <div>
            <input value={filter} onChange={e => setFilter(e.target.value)} />
            <ExpensiveList items={filteredItems} onSelect={handleSelect} />
        </div>
    );
}`,
        answers: ["useMemo", "memo", "useMemo", "items", "useCallback", "[]"],
        hints: [
            "計算結果をメモ化するフック",
            "コンポーネントをメモ化するHOC",
            "フィルタ結果をメモ化するフック",
            "フィルタ対象の配列変数",
            "関数の参照をメモ化するフック",
            "依存なし（初回のみ作成）の依存配列"
        ]
    },

    'testing': {
        title: "テストを書いてみよう",
        description: "学んだことを活かして、カウンターコンポーネントのテストを完成させてください",
        template: `import { render, screen, fireEvent } from '@testing-library/react';
import { ____1____, it, expect } from 'vitest';
import Counter from './Counter';

describe('Counter', () => {
    ____2____('初期値が0であること', () => {
        ____3____(<Counter />);
        expect(screen.____4____('カウント: 0')).toBeInTheDocument();
    });

    it('+1ボタンでカウントが増えること', () => {
        render(<Counter />);
        const button = screen.getByText('+1');
        fireEvent.____5____(button);
        expect(screen.getByText('カウント: 1')).____6____();
    });
});`,
        answers: ["describe", "it", "render", "getByText", "click", "toBeInTheDocument"],
        hints: [
            "テストをグループ化する関数",
            "個別のテストケースを定義する関数",
            "コンポーネントをテスト用DOMに描画",
            "テキストで要素を検索するメソッド",
            "クリックイベントをシミュレート",
            "DOM内に存在することを検証"
        ]
    },

    'api-counter-get': {
        title: "APIからデータを取得しよう",
        description: "fetchとuseEffectを使ってカウンターの値をAPIから取得するコードを完成させてください",
        template: `import { useState, useEffect } from 'react';

function ApiCounter() {
    const [count, setCount] = ____1____(0);
    const [loading, setLoading] = useState(true);

    ____2____(() => {
        ____3____('/api/counter')
            .then(res => res.____4____)
            .then(data => {
                setCount(data.____5____);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>読み込み中...</p>;
    return <h2>カウンター: {count}</h2>;
}`,
        answers: ["useState", "useEffect", "fetch", "json()", "value"],
        hints: [
            "状態管理フック",
            "副作用を実行するフック",
            "HTTPリクエストを送る関数",
            "JSONとして解析するメソッド呼び出し",
            "counterオブジェクトのカウント値プロパティ"
        ]
    },

    'api-counter-post': {
        title: "APIにデータを送信しよう",
        description: "async/awaitとfetchを使ってカウンターの値をAPIに送信するコードを完成させてください",
        template: `const increment = ____1____ () => {
    const newValue = count + 1;
    ____2____ fetch('/api/counter', {
        method: '____3____',
        headers: { 'Content-Type': '____4____' },
        body: JSON.____5____(({ id: 1, value: newValue })
    });
    setCount(newValue);
};`,
        answers: ["async", "await", "PUT", "application/json", "stringify"],
        hints: [
            "非同期関数を宣言するキーワード",
            "Promiseの完了を待つキーワード",
            "リソース全体を更新するHTTPメソッド",
            "JSON形式のMIMEタイプ",
            "オブジェクトをJSON文字列に変換するメソッド"
        ]
    },

    'api-tasks-list': {
        title: "タスク一覧を表示しよう",
        description: "APIからタスクデータを取得して一覧表示するコードを完成させてください",
        template: `function TaskList() {
    const [tasks, setTasks] = useState(____1____);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/____2____')
            .then(res => res.json())
            .then(data => {
                ____3____(data);
                setLoading(false);
            });
    }, []);

    return (
        <ul>
            {tasks.____4____(task => (
                <li ____5____={task.id}>{task.title}</li>
            ))}
        </ul>
    );
}`,
        answers: ["[]", "tasks", "setTasks", "map", "key"],
        hints: [
            "空配列で初期化",
            "タスクデータのエンドポイント名",
            "タスク配列のstate更新関数",
            "配列をJSXに変換するメソッド",
            "リストの各要素に必要なプロパティ"
        ]
    },

    'api-tasks-create': {
        title: "タスクを追加しよう",
        description: "フォームからAPIにPOSTリクエストを送ってタスクを追加するコードを完成させてください",
        template: `const addTask = async (e) => {
    e.____1____();
    if (!newTitle.trim()) return;

    const res = await fetch('/api/tasks', {
        method: '____2____',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: newTitle,
            completed: ____3____
        })
    });
    const created = await res.____4____();
    setTasks([____5____tasks, created]);
    setNewTitle('');
};`,
        answers: ["preventDefault", "POST", "false", "json", "..."],
        hints: [
            "フォームのデフォルト送信を防ぐメソッド",
            "新規作成のHTTPメソッド",
            "新しいタスクの初期完了状態",
            "レスポンスをJSONとして解析",
            "既存配列を展開するスプレッド構文"
        ]
    },

    'api-tasks-update': {
        title: "タスクの完了状態を切り替えよう",
        description: "PATCHリクエストでタスクの完了/未完了を切り替えるコードを完成させてください",
        template: `const toggleTask = async (task) => {
    setTasks(tasks.____1____(t =>
        t.id === task.id
            ? { ____2____t, completed: ____3____task.completed }
            : t
    ));

    await fetch(\`/api/tasks/____4____{task.id}\`, {
        method: '____5____',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
    });
};`,
        answers: ["map", "...", "!", "$", "PATCH"],
        hints: [
            "配列の各要素を変換するメソッド",
            "オブジェクトを展開する構文",
            "boolean値を反転する演算子",
            "テンプレートリテラルの変数展開記号",
            "部分更新のHTTPメソッド"
        ]
    },

    'api-tasks-delete': {
        title: "タスクを削除しよう",
        description: "確認ダイアログ付きでタスクを削除するコードを完成させてください",
        template: `const deleteTask = async (id) => {
    if (!window.____1____('本当に削除しますか？')) return;

    await fetch(\`/api/tasks/____2____{id}\`, {
        method: '____3____'
    });

    setTasks(tasks.____4____(t => t.id ____5____ id));
};`,
        answers: ["confirm", "$", "DELETE", "filter", "!=="],
        hints: [
            "確認ダイアログを表示する関数",
            "テンプレートリテラルの変数展開記号",
            "リソースを削除するHTTPメソッド",
            "条件に合う要素だけ残すメソッド",
            "厳密不等価演算子"
        ]
    },

    'api-custom-hook': {
        title: "useTasksカスタムフックを作ろう",
        description: "CRUD操作をまとめたカスタムフックを完成させてください",
        template: `function ____1____() {
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
            body: JSON.stringify({ title, completed: false })
        });
        const created = await res.json();
        setTasks(____2____ => [...prev, created]);
    };

    const deleteTask = async (id) => {
        setTasks(tasks.____3____(t => t.id !== id));
        await fetch(\`/api/tasks/\${id}\`, { method: 'DELETE' });
    };

    ____4____ { tasks, loading, addTask, deleteTask };
}

____5____ default useTasks;`,
        answers: ["useTasks", "prev", "filter", "return", "export"],
        hints: [
            "useプレフィックスのカスタムフック名",
            "前回のstate値を受け取る引数名",
            "条件に合う要素だけを残すメソッド",
            "値を返すキーワード",
            "モジュールから公開するキーワード"
        ]
    },

    'api-error-loading': {
        title: "エラー処理とローディングUIを実装しよう",
        description: "try-catch-finallyを使ったエラー処理とローディング状態管理のコードを完成させてください",
        template: `const fetchTasks = async () => {
    setLoading(true);
    setError(____1____);
    ____2____ {
        const res = await fetch('/api/tasks');
        if (!res.____3____) throw new Error('取得に失敗');
        const data = await res.json();
        setTasks(data);
    } ____4____ (err) {
        setError(err.____5____);
    } finally {
        setLoading(false);
    }
};`,
        answers: ["null", "try", "ok", "catch", "message"],
        hints: [
            "エラーなしを示す値",
            "エラーが発生しうるコードを囲むブロック",
            "レスポンスが正常かどうかのプロパティ",
            "エラーを捕捉するブロック",
            "Errorオブジェクトのメッセージプロパティ"
        ]
    }
};


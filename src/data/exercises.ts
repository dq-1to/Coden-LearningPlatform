// 練習問題データ
// 各ステップの穴埋め形式練習問題を定義

import { Exercise } from '../types';

export const exercises: Record<string, Exercise[]> = {
    'usestate-basic': [
        {
            id: 1,
            title: "useStateのインポート",
            description: "Reactからフックをインポートする書き方を練習しましょう",
            template: "import { ______ } from 'react';",
            answer: "useState",
            hint: "状態を管理するためのフック名です"
        },
        {
            id: 2,
            title: "useStateの宣言",
            description: "useStateを使って状態変数を宣言する書き方を練習しましょう",
            template: "const [count, ______] = useState(0);",
            answer: "setCount",
            hint: "countを更新するための関数名です（set + 変数名）"
        },
        {
            id: 3,
            title: "値の表示",
            description: "JSX内で変数の値を表示する書き方を練習しましょう",
            template: "<p>カウント: {______}</p>",
            answer: "count",
            hint: "現在のカウント値を持つ変数名です"
        },
        {
            id: 4,
            title: "カウントアップ",
            description: "ボタンクリックでcountを+1する書き方を練習しましょう",
            template: "<button onClick={() => ______(count + 1)}>",
            answer: "setCount",
            hint: "状態を更新する関数を呼び出します"
        },
        {
            id: 5,
            title: "リセット処理",
            description: "countを0にリセットする書き方を練習しましょう",
            template: "<button onClick={() => setCount(______)}>リセット</button>",
            answer: "0",
            hint: "初期値に戻します"
        }
    ],

    'lists': [
        {
            id: 1,
            title: "配列stateの宣言",
            description: "空の配列を初期値としてstateを宣言しましょう",
            template: "const [todos, setTodos] = useState(______);",
            answer: "[]",
            hint: "空の配列を初期値にします"
        },
        {
            id: 2,
            title: "配列への追加",
            description: "スプレッド構文を使って配列に新しい要素を追加しましょう",
            template: "setTodos([...todos, ______]);",
            answer: "newTodo",
            hint: "追加する新しいToDoオブジェクトの変数名です"
        },
        {
            id: 3,
            title: "mapでリスト表示",
            description: "配列の各要素をリスト表示するメソッドを練習しましょう",
            template: "{todos.______(todo => <li key={todo.id}>{todo.text}</li>)}",
            answer: "map",
            hint: "配列の各要素を変換するメソッドです"
        },
        {
            id: 4,
            title: "keyの指定",
            description: "リスト表示でkeyに指定する一意の値を練習しましょう",
            template: "<li key={______}>{todo.text}</li>",
            answer: "todo.id",
            hint: "各要素を識別するための一意の値です"
        },
        {
            id: 5,
            title: "filterで削除",
            description: "filterを使って特定のIDのTodoを削除しましょう",
            template: "setTodos(todos.filter(todo => todo.id !== ______));",
            answer: "id",
            hint: "削除対象のIDと一致しないものだけを残します"
        },
        {
            id: 6,
            title: "完了状態の切り替え",
            description: "スプレッド構文でオブジェクトのプロパティを更新しましょう",
            template: "{ ...todo, completed: ______}",
            answer: "!todo.completed",
            hint: "現在の値を反転させます"
        }
    ],

    'useeffect': [
        {
            id: 1,
            title: "useEffectのインポート",
            description: "ReactからuseEffectをインポートしましょう",
            template: "import { useState, ______ } from 'react';",
            answer: "useEffect",
            hint: "副作用を扱うためのフック名です"
        },
        {
            id: 2,
            title: "初回のみ実行",
            description: "コンポーネントマウント時のみ実行するuseEffectを書きましょう",
            template: "useEffect(() => { /* 処理 */ }, ______);",
            answer: "[]",
            hint: "空の依存配列を渡すと初回のみ実行されます"
        },
        {
            id: 3,
            title: "依存配列の指定",
            description: "memosが変化した時に実行するuseEffectを書きましょう",
            template: "useEffect(() => { /* 処理 */ }, [______]);",
            answer: "memos",
            hint: "監視したい変数を依存配列に入れます"
        },
        {
            id: 4,
            title: "localStorageへの保存",
            description: "localStorageにデータを保存するメソッドを練習しましょう",
            template: "localStorage.______('memos', JSON.stringify(memos));",
            answer: "setItem",
            hint: "保存するためのメソッド名です"
        },
        {
            id: 5,
            title: "localStorageからの読み込み",
            description: "localStorageからデータを読み込むメソッドを練習しましょう",
            template: "const saved = localStorage.______('memos');",
            answer: "getItem",
            hint: "取得するためのメソッド名です"
        },
        {
            id: 6,
            title: "JSONのパース",
            description: "JSON文字列をオブジェクトに変換しましょう",
            template: "setMemos(JSON.______(saved));",
            answer: "parse",
            hint: "文字列をJavaScriptオブジェクトに変換するメソッドです"
        }
    ],

    'forms': [
        {
            id: 1,
            title: "オブジェクトstateの初期化",
            description: "フォームのステートをオブジェクトで初期化しましょう",
            template: "const [formData, setFormData] = useState({ email: '', password: '' });",
            answer: "useState",
            hint: "状態管理のためのフック名です"
        },
        {
            id: 2,
            title: "動的なプロパティ更新",
            description: "入力名に基づいてフォームデータを更新しましょう",
            template: "setFormData({ ...formData, [name]: ______ });",
            answer: "value",
            hint: "イベントから取得した入力値です"
        },
        {
            id: 3,
            title: "フォーム送信の制御",
            description: "フォームのデフォルト動作を防ぎましょう",
            template: "e.______();",
            answer: "preventDefault",
            hint: "ページリロードを防ぐメソッドです"
        },
        {
            id: 4,
            title: "条件付きレンダリング",
            description: "エラーがある場合のみエラーメッセージを表示しましょう",
            template: "{errors.email ______ <span>{errors.email}</span>}",
            answer: "&&",
            hint: "論理AND演算子で条件付きレンダリングします"
        },
        {
            id: 5,
            title: "バリデーション結果",
            description: "エラーがないかチェックする条件を書きましょう",
            template: "return Object.______(newErrors).length === 0;",
            answer: "keys",
            hint: "オブジェクトのキー配列を取得するメソッドです"
        }
    ],

    'api-fetch': [
        {
            id: 1,
            title: "ローディング状態の初期化",
            description: "ローディング状態をtrueで初期化しましょう",
            template: "const [loading, setLoading] = useState(______);",
            answer: "true",
            hint: "データ取得前はローディング中です"
        },
        {
            id: 2,
            title: "async関数の宣言",
            description: "非同期関数を宣言しましょう",
            template: "const fetchData = ______ () => { ... };",
            answer: "async",
            hint: "非同期処理を行う関数を示すキーワードです"
        },
        {
            id: 3,
            title: "fetchでデータ取得",
            description: "非同期でレスポンスを待機しましょう",
            template: "const response = ______ fetch(url);",
            answer: "await",
            hint: "Promiseの解決を待つキーワードです"
        },
        {
            id: 4,
            title: "JSONの変換",
            description: "レスポンスをJSONとしてパースしましょう",
            template: "const data = await response.______();",
            answer: "json",
            hint: "レスポンスボディをJSONに変換するメソッドです"
        },
        {
            id: 5,
            title: "エラーハンドリング",
            description: "エラーをキャッチしてステートに保存しましょう",
            template: "______ (err) { setError(err.message); }",
            answer: "catch",
            hint: "try-catchのエラーをキャッチする部分です"
        },
        {
            id: 6,
            title: "ローディング終了",
            description: "成功でも失敗でもローディングを終了させましょう",
            template: "______ { setLoading(false); }",
            answer: "finally",
            hint: "try-catchで必ず実行される部分です"
        }
    ],

    'usecontext': [
        {
            id: 1,
            title: "Contextの作成",
            description: "Contextを作成しましょう",
            template: "const ThemeContext = ______(null);",
            answer: "createContext",
            hint: "Contextを作成する関数です"
        },
        {
            id: 2,
            title: "Providerの使用",
            description: "Contextの値を子コンポーネントに渡しましょう",
            template: "<ThemeContext.______ value={theme}>",
            answer: "Provider",
            hint: "Contextの値を提供するコンポーネントです"
        },
        {
            id: 3,
            title: "useContextでの取得",
            description: "ContextからValue取得しましょう",
            template: "const theme = ______(ThemeContext);",
            answer: "useContext",
            hint: "Contextの値を取得するフックです"
        },
        {
            id: 4,
            title: "カスタムフックのエラーチェック",
            description: "Providerの外で使用された場合のエラーを投げましょう",
            template: "if (!context) { ______ new Error('...'); }",
            answer: "throw",
            hint: "エラーを発生させるキーワードです"
        }
    ],

    'usereducer': [
        {
            id: 1,
            title: "useReducerの使用",
            description: "useReducerでステート管理を初期化しましょう",
            template: "const [state, dispatch] = ______(reducer, initialState);",
            answer: "useReducer",
            hint: "複雑なステート管理のためのフックです"
        },
        {
            id: 2,
            title: "アクションタイプの判定",
            description: "アクションのタイプで分岐しましょう",
            template: "switch (action.______) { case 'increment': ... }",
            answer: "type",
            hint: "アクションの種類を示すプロパティです"
        },
        {
            id: 3,
            title: "新しいステートの返却",
            description: "カウントを増やした新しいステートを返しましょう",
            template: "return { count: state.count ______ 1 };",
            answer: "+",
            hint: "数値を増やす演算子です"
        },
        {
            id: 4,
            title: "アクションのディスパッチ",
            description: "インクリメントアクションを送信しましょう",
            template: "______({ type: 'increment' })",
            answer: "dispatch",
            hint: "アクションを送信する関数です"
        },
        {
            id: 5,
            title: "ペイロード付きアクション",
            description: "値を含むアクションを送信しましょう",
            template: "dispatch({ type: 'add', ______: 5 })",
            answer: "payload",
            hint: "アクションに含めるデータを示すプロパティ名です"
        }
    ],

    'custom-hooks': [
        {
            id: 1,
            title: "カスタムフックの命名",
            description: "カスタムフックは必ずuseで始めます",
            template: "function ______LocalStorage(key, initialValue) { ... }",
            answer: "use",
            hint: "カスタムフックのプレフィックスです"
        },
        {
            id: 2,
            title: "初期値の遅延評価",
            description: "初期値を関数で計算しましょう",
            template: "const [value, setValue] = useState(______ => { ... });",
            answer: "()",
            hint: "関数として初期値を渡すときの記法です"
        },
        {
            id: 3,
            title: "値の返却",
            description: "カスタムフックから値を返しましょう",
            template: "______ [storedValue, setStoredValue];",
            answer: "return",
            hint: "関数から値を返すキーワードです"
        },
        {
            id: 4,
            title: "トグル関数の実装",
            description: "boolean値を反転させる関数を実装しましょう",
            template: "const toggle = () => setValue(v => ______);",
            answer: "!v",
            hint: "論理NOTで値を反転させます"
        }
    ],

    'events': [
        {
            id: 1,
            title: "イベントハンドラの定義",
            description: "クリック時に実行される関数を定義しましょう",
            template: "const ______ = () => { alert('クリック！'); };",
            answer: "handleClick",
            hint: "イベントハンドラの命名規則は handle + イベント名です"
        },
        {
            id: 2,
            title: "onClickの指定",
            description: "ボタンにクリックイベントを指定しましょう",
            template: "<button ______={handleClick}>クリック</button>",
            answer: "onClick",
            hint: "クリックイベントを指定するprop名です"
        },
        {
            id: 3,
            title: "onChangeイベント",
            description: "入力値の変化を監視するイベントを指定しましょう",
            template: "<input ______={(e) => setText(e.target.value)} />",
            answer: "onChange",
            hint: "値が変更されたときに発火するイベントです"
        },
        {
            id: 4,
            title: "イベントオブジェクトからの値取得",
            description: "イベントオブジェクトから入力値を取得しましょう",
            template: "const value = e.______.value;",
            answer: "target",
            hint: "イベントが発生した要素を参照するプロパティです"
        },
        {
            id: 5,
            title: "インラインハンドラ",
            description: "アロー関数でインラインのイベントハンドラを書きましょう",
            template: "<button onClick={______ => console.log('clicked')}>",
            answer: "()",
            hint: "引数なしのアロー関数の書き方です"
        }
    ],

    'conditional': [
        {
            id: 1,
            title: "三項演算子による条件分岐",
            description: "条件によって表示を切り替えましょう",
            template: "{isLoggedIn ______ <p>ようこそ</p> : <p>ログインしてください</p>}",
            answer: "?",
            hint: "三項演算子の条件部分の後に来る記号です"
        },
        {
            id: 2,
            title: "&&演算子による条件付きレンダリング",
            description: "条件がtrueの場合のみ要素を表示しましょう",
            template: "{hasError ______ <p className=\"error\">{errorMsg}</p>}",
            answer: "&&",
            hint: "論理AND演算子で条件付き表示をします"
        },
        {
            id: 3,
            title: "早期リターン",
            description: "ローディング中は早期リターンしましょう",
            template: "if (loading) ______ <p>読み込み中...</p>;",
            answer: "return",
            hint: "コンポーネントから早期にJSXを返すキーワードです"
        },
        {
            id: 4,
            title: "nullの返却",
            description: "条件によって何も表示しない場合の戻り値を書きましょう",
            template: "if (!isVisible) return ______;",
            answer: "null",
            hint: "何もレンダリングしないことを示す値です"
        },
        {
            id: 5,
            title: "classNameの動的切替",
            description: "状態に応じてCSSクラスを切り替えましょう",
            template: "<div className={isActive ? 'active' : '______'}>",
            answer: "inactive",
            hint: "activeの反対のクラス名です"
        }
    ],

    'performance': [
        {
            id: 1,
            title: "useMemoのインポート",
            description: "パフォーマンス最適化フックをインポートしましょう",
            template: "import { useState, ______ } from 'react';",
            answer: "useMemo",
            hint: "計算結果をメモ化するフック名です"
        },
        {
            id: 2,
            title: "useMemoの使用",
            description: "重い計算をメモ化しましょう",
            template: "const result = ______(()=> heavyCalc(data), [data]);",
            answer: "useMemo",
            hint: "依存配列が変わらない限り、前回の計算結果を再利用します"
        },
        {
            id: 3,
            title: "useCallbackの使用",
            description: "関数の参照をメモ化しましょう",
            template: "const handleClick = ______(()=> { ... }, []);",
            answer: "useCallback",
            hint: "関数の参照を安定させるフックです"
        },
        {
            id: 4,
            title: "React.memoの使用",
            description: "コンポーネントをメモ化してpropsが同じなら再レンダリングをスキップしましょう",
            template: "const MyComponent = ______(({ name }) => { ... });",
            answer: "memo",
            hint: "propsが変わらなければ再レンダリングをスキップするHOCです"
        },
        {
            id: 5,
            title: "依存配列の指定",
            description: "useMemoの依存配列に監視する変数を入れましょう",
            template: "const filtered = useMemo(() => items.filter(fn), [______]);",
            answer: "items",
            hint: "この変数が変化したときに再計算されます"
        },
        {
            id: 6,
            title: "空の依存配列",
            description: "マウント時のみ関数を作成しましょう",
            template: "const init = useCallback(() => { setup(); }, ______);",
            answer: "[]",
            hint: "初回のみ関数を作成し、以降は同じ参照を使います"
        }
    ],

    'testing': [
        {
            id: 1,
            title: "renderの使用",
            description: "テスト対象のコンポーネントを描画しましょう",
            template: "______(<Counter />);",
            answer: "render",
            hint: "コンポーネントをテスト用DOMに描画する関数です"
        },
        {
            id: 2,
            title: "要素の取得",
            description: "テキストから要素を取得しましょう",
            template: "const element = screen.______('+1');",
            answer: "getByText",
            hint: "テキスト内容で要素を検索するメソッドです"
        },
        {
            id: 3,
            title: "クリックのシミュレート",
            description: "ボタンクリックをシミュレートしましょう",
            template: "fireEvent.______(button);",
            answer: "click",
            hint: "クリックイベントを発火させるメソッドです"
        },
        {
            id: 4,
            title: "アサーション",
            description: "要素がドキュメント内に存在することを確認しましょう",
            template: "expect(element).______();",
            answer: "toBeInTheDocument",
            hint: "DOM内に要素が存在するかを検証するマッチャーです"
        },
        {
            id: 5,
            title: "テストケースの記述",
            description: "テストケースを定義しましょう",
            template: "______('カウントが増えること', () => { ... });",
            answer: "it",
            hint: "個別のテストケースを定義する関数です"
        },
        {
            id: 6,
            title: "テストグループの記述",
            description: "テストをグループ化しましょう",
            template: "______('Counter', () => { ... });",
            answer: "describe",
            hint: "関連するテストをまとめるブロック関数です"
        }
    ],

    'api-counter-get': [
        {
            id: 1, title: "fetchの使用",
            description: "APIからデータを取得しましょう",
            template: "______(('/api/counter')",
            answer: "fetch", hint: "HTTPリクエストを送る標準APIです"
        },
        {
            id: 2, title: "レスポンスの解析",
            description: "レスポンスをJSONに変換しましょう",
            template: ".then(res => res.______())",
            answer: "json", hint: "JSONとして解析するメソッドです"
        },
        {
            id: 3, title: "useEffectでAPI呼び出し",
            description: "マウント時にAPIを呼びましょう",
            template: "______(() => { fetch('/api/counter')... }, []);",
            answer: "useEffect", hint: "副作用を実行するフックです"
        },
        {
            id: 4, title: "空の依存配列",
            description: "マウント時のみ実行する依存配列を書きましょう",
            template: "useEffect(() => { ... }, ______);",
            answer: "[]", hint: "初回マウント時のみ実行する指定です"
        },
        {
            id: 5, title: "ローディング状態",
            description: "ローディング中のフラグを更新しましょう",
            template: "setLoading(______);",
            answer: "false", hint: "データ取得完了後にローディングを解除します"
        }
    ],

    'api-counter-post': [
        {
            id: 1, title: "HTTPメソッドの指定",
            description: "データを更新するメソッドを指定しましょう",
            template: "await fetch('/api/counter', { method: '______' ... })",
            answer: "PUT", hint: "リソース全体を置き換える更新メソッドです"
        },
        {
            id: 2, title: "ヘッダーの指定",
            description: "JSON送信用のヘッダーを指定しましょう",
            template: "headers: { 'Content-Type': '______' }",
            answer: "application/json", hint: "JSONデータの形式を示すMIMEタイプです"
        },
        {
            id: 3, title: "ボディのJSON文字列化",
            description: "送信データをJSON文字列に変換しましょう",
            template: "body: JSON.______(data)",
            answer: "stringify", hint: "オブジェクトをJSON文字列に変換します"
        },
        {
            id: 4, title: "async関数の宣言",
            description: "非同期関数を宣言しましょう",
            template: "const increment = ______ () => { ... };",
            answer: "async", hint: "非同期関数を宣言するキーワードです"
        },
        {
            id: 5, title: "awaitの使用",
            description: "非同期処理の完了を待ちましょう",
            template: "______ fetch('/api/counter', { ... });",
            answer: "await", hint: "Promiseの解決を待つキーワードです"
        }
    ],

    'api-tasks-list': [
        {
            id: 1, title: "タスク一覧のエンドポイント",
            description: "タスク一覧を取得するURLを書きましょう",
            template: "fetch('/api/______')",
            answer: "tasks", hint: "タスクデータのエンドポイント名です"
        },
        {
            id: 2, title: "配列のマッピング",
            description: "配列をJSXに変換しましょう",
            template: "tasks.______(task => <li key={task.id}>{task.title}</li>)",
            answer: "map", hint: "配列の各要素を変換するメソッドです"
        },
        {
            id: 3, title: "keyの指定",
            description: "リストアイテムにユニークなkeyを指定しましょう",
            template: "<li ______={task.id}>{task.title}</li>",
            answer: "key", hint: "Reactがリストを効率的に更新するために必要です"
        },
        {
            id: 4, title: "条件付きスタイル",
            description: "完了タスクに取り消し線を付けましょう",
            template: "textDecoration: task.completed ? '______' : 'none'",
            answer: "line-through", hint: "CSSのテキスト装飾で取り消し線を引く値です"
        },
        {
            id: 5, title: "state初期値",
            description: "タスク配列のstateを初期化しましょう",
            template: "const [tasks, setTasks] = useState(______);",
            answer: "[]", hint: "空の配列で初期化します"
        }
    ],

    'api-tasks-create': [
        {
            id: 1, title: "POSTメソッド",
            description: "新規作成のHTTPメソッドを指定しましょう",
            template: "method: '______'",
            answer: "POST", hint: "新しいリソースを作成するメソッドです"
        },
        {
            id: 2, title: "フォーム送信の防止",
            description: "デフォルトのフォーム送信を防ぎましょう",
            template: "e.______();",
            answer: "preventDefault", hint: "ページリロードを防止するメソッドです"
        },
        {
            id: 3, title: "stateの更新",
            description: "新しいタスクを既存のリストに追加しましょう",
            template: "setTasks([______tasks, created]);",
            answer: "...", hint: "スプレッド構文で既存の配列を展開します"
        },
        {
            id: 4, title: "入力値のリセット",
            description: "送信後に入力欄をクリアしましょう",
            template: "setNewTitle('______');",
            answer: "", hint: "空文字列でリセットします"
        },
        {
            id: 5, title: "onSubmitイベント",
            description: "フォームに送信イベントを指定しましょう",
            template: "<form ______={addTask}>",
            answer: "onSubmit", hint: "フォーム送信時に呼ばれるイベントです"
        }
    ],

    'api-tasks-update': [
        {
            id: 1, title: "PATCHメソッド",
            description: "部分更新のHTTPメソッドを指定しましょう",
            template: "method: '______'",
            answer: "PATCH", hint: "リソースの一部を更新するメソッドです"
        },
        {
            id: 2, title: "動的URL",
            description: "タスクIDを含むURLを組み立てましょう",
            template: "fetch(`/api/tasks/______{task.id}`)",
            answer: "$", hint: "テンプレートリテラルの変数展開記号です"
        },
        {
            id: 3, title: "完了状態の反転",
            description: "boolean値を反転させましょう",
            template: "completed: ______task.completed",
            answer: "!", hint: "論理NOT演算子です"
        },
        {
            id: 4, title: "mapによるstate更新",
            description: "特定のタスクだけを更新しましょう",
            template: "setTasks(tasks.______(t => t.id === task.id ? {...t, completed: !t.completed} : t))",
            answer: "map", hint: "配列の各要素を変換するメソッドです"
        },
        {
            id: 5, title: "スプレッド構文でオブジェクト更新",
            description: "既存のプロパティを維持しつつ一部を更新しましょう",
            template: "{ ______t, completed: !t.completed }",
            answer: "...", hint: "オブジェクトを展開する構文です"
        }
    ],

    'api-tasks-delete': [
        {
            id: 1, title: "DELETEメソッド",
            description: "削除のHTTPメソッドを指定しましょう",
            template: "method: '______'",
            answer: "DELETE", hint: "リソースを削除するメソッドです"
        },
        {
            id: 2, title: "確認ダイアログ",
            description: "削除前に確認を求めましょう",
            template: "if (!window.______('本当に削除しますか？')) return;",
            answer: "confirm", hint: "OK/キャンセルの確認ダイアログを表示します"
        },
        {
            id: 3, title: "filterで除外",
            description: "削除したタスクを配列から除外しましょう",
            template: "setTasks(tasks.______(t => t.id !== id));",
            answer: "filter", hint: "条件に合う要素だけを残すメソッドです"
        },
        {
            id: 4, title: "不等価演算子",
            description: "IDが一致しない要素だけ残しましょう",
            template: "t.id ______ id",
            answer: "!==", hint: "厳密不等価演算子です"
        },
        {
            id: 5, title: "イベントハンドラの引数",
            description: "タスクIDをイベントハンドラに渡しましょう",
            template: "onClick={() => deleteTask(task.______)}",
            answer: "id", hint: "各タスクを一意に識別するプロパティです"
        }
    ],

    'api-custom-hook': [
        {
            id: 1, title: "カスタムフックの命名",
            description: "タスク操作のカスタムフック名を書きましょう",
            template: "function ______() { ... }",
            answer: "useTasks", hint: "useプレフィックス + 対象の名前です"
        },
        {
            id: 2, title: "戻り値",
            description: "カスタムフックから値と関数を返しましょう",
            template: "______ { tasks, loading, addTask, toggleTask, deleteTask };",
            answer: "return", hint: "関数から値を返すキーワードです"
        },
        {
            id: 3, title: "prevを使ったstate更新",
            description: "前の状態を使って安全にstateを更新しましょう",
            template: "setTasks(______ => [...prev, created]);",
            answer: "prev", hint: "前回のstate値を受け取る関数形式の更新です"
        },
        {
            id: 4, title: "findで検索",
            description: "IDでタスクを検索しましょう",
            template: "const task = tasks.______(t => t.id === id);",
            answer: "find", hint: "条件に合う最初の要素を返すメソッドです"
        },
        {
            id: 5, title: "フックのインポート",
            description: "作成したカスタムフックをインポートしましょう",
            template: "import ______ from './hooks/useTasks';",
            answer: "useTasks", hint: "defaut exportしたカスタムフック名です"
        }
    ],

    'api-error-loading': [
        {
            id: 1, title: "try-catchの使用",
            description: "エラーをキャッチしましょう",
            template: "______ { await fetch(url); } catch (err) { ... }",
            answer: "try", hint: "エラーが発生する可能性のあるコードを囲むブロックです"
        },
        {
            id: 2, title: "レスポンスチェック",
            description: "レスポンスが正常かチェックしましょう",
            template: "if (!res.______) throw new Error('エラー');",
            answer: "ok", hint: "HTTPステータスが200-299ならtrueのプロパティです"
        },
        {
            id: 3, title: "finallyブロック",
            description: "成功・失敗に関わらず実行するブロックを書きましょう",
            template: "} ______ { setLoading(false); }",
            answer: "finally", hint: "try-catchの後に必ず実行されるブロックです"
        },
        {
            id: 4, title: "エラーメッセージの保存",
            description: "エラーメッセージをstateに保存しましょう",
            template: "setError(err.______);",
            answer: "message", hint: "Errorオブジェクトのメッセージプロパティです"
        },
        {
            id: 5, title: "エラーのリセット",
            description: "再試行時にエラーをリセットしましょう",
            template: "setError(______);",
            answer: "null", hint: "エラーなしを示す値です"
        }
    ]
};

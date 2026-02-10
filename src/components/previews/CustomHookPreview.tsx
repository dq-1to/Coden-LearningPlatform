import { useState, useEffect } from 'react';

// Step8: カスタムHooks - 再利用可能なロジックを学ぶプレビュー

// カスタムフック: useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

// カスタムフック: useToggle
function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue(v => !v);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);

    return { value, toggle, setTrue, setFalse };
}

// カスタムフック: useCounter
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(initialValue);

    return { count, increment, decrement, reset };
}

function CustomHookPreview() {
    // useLocalStorage の使用
    const [name, setName] = useLocalStorage('custom-hook-demo-name', '');

    // useToggle の使用
    const darkMode = useToggle(false);

    // useCounter の使用
    const counter = useCounter(0);

    return (
        <div
            className="preview-content"
            style={{
                background: darkMode.value ? '#1f2937' : '#ffffff',
                color: darkMode.value ? '#f3f4f6' : '#111827',
                transition: 'all 0.3s ease'
            }}
        >
            <h4 className="custom-hook-title">🪝 カスタムフックのデモ</h4>

            {/* useLocalStorage */}
            <div className="custom-hook-section">
                <h5>useLocalStorage</h5>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="名前を入力（自動保存）"
                    style={{
                        background: darkMode.value ? '#374151' : '#f3f4f6',
                        color: darkMode.value ? '#f3f4f6' : '#111827',
                        border: '1px solid',
                        borderColor: darkMode.value ? '#4b5563' : '#d1d5db',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        width: '100%'
                    }}
                />
                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '8px' }}>
                    💾 入力した値はリロードしても保持されます
                </p>
            </div>

            {/* useToggle */}
            <div className="custom-hook-section" style={{ marginTop: '16px' }}>
                <h5>useToggle</h5>
                <button
                    onClick={darkMode.toggle}
                    style={{
                        background: darkMode.value ? '#6366f1' : '#4f46e5',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    {darkMode.value ? '🌙 ダークモード' : '☀️ ライトモード'}
                </button>
            </div>

            {/* useCounter */}
            <div className="custom-hook-section" style={{ marginTop: '16px' }}>
                <h5>useCounter</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={counter.decrement}>-</button>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {counter.count}
                    </span>
                    <button onClick={counter.increment}>+</button>
                    <button onClick={counter.reset} style={{ marginLeft: '10px' }}>
                        リセット
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomHookPreview;

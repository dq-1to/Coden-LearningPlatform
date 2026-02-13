import { useState, useEffect } from 'react';
import styles from './Preview.module.css';

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
        <div className={darkMode.value ? styles.previewContentDark : styles.previewContentLight}>
            <h4 className={styles.customHookTitle}>🪝 カスタムフックのデモ</h4>

            {/* useLocalStorage */}
            <div className={styles.customHookSection}>
                <h5>useLocalStorage</h5>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="名前を入力（自動保存）"
                    className={darkMode.value ? styles.hookInputDark : styles.hookInput}
                />
                <p className={styles.hookHint}>
                    💾 入力した値はリロードしても保持されます
                </p>
            </div>

            {/* useToggle */}
            <div className={styles.customHookSectionSpaced}>
                <h5>useToggle</h5>
                <button
                    onClick={darkMode.toggle}
                    className={darkMode.value ? styles.toggleBtnDark : styles.toggleBtn}
                >
                    {darkMode.value ? '🌙 ダークモード' : '☀️ ライトモード'}
                </button>
            </div>

            {/* useCounter */}
            <div className={styles.customHookSectionSpaced}>
                <h5>useCounter</h5>
                <div className={styles.counterRow}>
                    <button onClick={counter.decrement}>-</button>
                    <span className={styles.counterValue}>
                        {counter.count}
                    </span>
                    <button onClick={counter.increment}>+</button>
                    <button onClick={counter.reset} className={styles.counterResetBtn}>
                        リセット
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomHookPreview;

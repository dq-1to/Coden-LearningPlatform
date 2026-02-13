import { useState } from 'react';
import styles from './Preview.module.css';

// Step1: カウンター - useStateの基本を学ぶプレビュー
// 学習アプリ本体とは完全に独立したstate管理

function CounterPreview() {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.previewContent}>
            <p className={styles.counterDisplay}>カウント: {count}</p>
            <div className={styles.counterButtons}>
                <button onClick={() => setCount(count + 1)}>+1</button>
                <button onClick={() => setCount(count - 1)}>-1</button>
                <button onClick={() => setCount(0)}>リセット</button>
            </div>
        </div>
    );
}

export default CounterPreview;

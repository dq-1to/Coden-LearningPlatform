import { useState } from 'react';

// Step1: カウンター - useStateの基本を学ぶプレビュー
// 学習アプリ本体とは完全に独立したstate管理

function CounterPreview() {
    const [count, setCount] = useState(0);

    return (
        <div className="preview-content">
            <p className="counter-display">カウント: {count}</p>
            <div className="counter-buttons">
                <button onClick={() => setCount(count + 1)}>+1</button>
                <button onClick={() => setCount(count - 1)}>-1</button>
                <button onClick={() => setCount(0)}>リセット</button>
            </div>
        </div>
    );
}

export default CounterPreview;

import { useReducer } from 'react';

// Step7: useReducer - 複雑なstate遷移を学ぶプレビュー

interface State {
    count: number;
    history: string[];
}

type Action =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' }
    | { type: 'add'; payload: number };

const initialState: State = {
    count: 0,
    history: []
};

function counterReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment':
            return {
                count: state.count + 1,
                history: [...state.history, '+1']
            };
        case 'decrement':
            return {
                count: state.count - 1,
                history: [...state.history, '-1']
            };
        case 'reset':
            return {
                count: 0,
                history: [...state.history, 'reset']
            };
        case 'add':
            return {
                count: state.count + action.payload,
                history: [...state.history, `+${action.payload}`]
            };
        default:
            return state;
    }
}

function ReducerPreview() {
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <div className="preview-content">
            <div className="reducer-display">
                <h3 className="reducer-count">カウント: {state.count}</h3>

                <div className="reducer-buttons">
                    <button onClick={() => dispatch({ type: 'increment' })}>
                        +1
                    </button>
                    <button onClick={() => dispatch({ type: 'decrement' })}>
                        -1
                    </button>
                    <button onClick={() => dispatch({ type: 'add', payload: 5 })}>
                        +5
                    </button>
                    <button onClick={() => dispatch({ type: 'reset' })}>
                        リセット
                    </button>
                </div>

                <div className="reducer-history">
                    <h4>📜 操作履歴</h4>
                    {state.history.length === 0 ? (
                        <p className="history-empty">まだ操作がありません</p>
                    ) : (
                        <div className="history-list">
                            {state.history.slice(-10).map((item, index) => (
                                <span key={index} className="history-item">
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReducerPreview;

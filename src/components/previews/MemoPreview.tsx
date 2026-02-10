import { useState, useEffect } from 'react';

// Step3: メモ／ノート - 複数stateとlocalStorageを学ぶプレビュー

interface Memo {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const MEMO_PREVIEW_KEY = 'memo-preview-data';

function MemoPreview() {
    const [memos, setMemos] = useState<Memo[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 初回読み込み
    useEffect(() => {
        const saved = localStorage.getItem(MEMO_PREVIEW_KEY);
        if (saved) {
            setMemos(JSON.parse(saved));
        }
    }, []);

    // 保存
    useEffect(() => {
        localStorage.setItem(MEMO_PREVIEW_KEY, JSON.stringify(memos));
    }, [memos]);

    const addMemo = () => {
        if (title.trim() === '') return;
        const newMemo: Memo = {
            id: Date.now(),
            title,
            content,
            createdAt: new Date().toLocaleString()
        };
        setMemos([...memos, newMemo]);
        setTitle('');
        setContent('');
    };

    const deleteMemo = (id: number) => {
        setMemos(memos.filter(memo => memo.id !== id));
    };

    return (
        <div className="preview-content">
            <div className="memo-input-area">
                <input
                    type="text"
                    className="memo-title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="タイトル"
                />
                <textarea
                    className="memo-content-input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="メモの内容"
                    rows={3}
                />
                <button className="memo-add-btn" onClick={addMemo}>メモを追加</button>
            </div>
            {memos.length === 0 ? (
                <p className="memo-empty">メモがありません</p>
            ) : (
                <div className="memo-list">
                    {memos.map((memo) => (
                        <div key={memo.id} className="memo-card">
                            <div className="memo-header">
                                <h4 className="memo-title">{memo.title}</h4>
                                <button
                                    className="memo-delete-btn"
                                    onClick={() => deleteMemo(memo.id)}
                                >
                                    削除
                                </button>
                            </div>
                            <p className="memo-body">{memo.content}</p>
                            <span className="memo-date">{memo.createdAt}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MemoPreview;

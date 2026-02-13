import { useState, useEffect } from 'react';
import styles from './Preview.module.css';

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
        <div className={styles.previewContent}>
            <div className={styles.memoInputArea}>
                <input
                    type="text"
                    className={styles.memoTitleInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="タイトル"
                />
                <textarea
                    className={styles.memoContentInput}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="メモの内容"
                    rows={3}
                />
                <button className={styles.memoAddBtn} onClick={addMemo}>メモを追加</button>
            </div>
            {memos.length === 0 ? (
                <p className={styles.memoEmpty}>メモがありません</p>
            ) : (
                <div className={styles.memoList}>
                    {memos.map((memo) => (
                        <div key={memo.id} className={styles.memoCard}>
                            <div className={styles.memoHeader}>
                                <h4 className={styles.memoTitle}>{memo.title}</h4>
                                <button
                                    className={styles.memoDeleteBtn}
                                    onClick={() => deleteMemo(memo.id)}
                                >
                                    削除
                                </button>
                            </div>
                            <p className={styles.memoBody}>{memo.content}</p>
                            <span className={styles.memoDate}>{memo.createdAt}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MemoPreview;

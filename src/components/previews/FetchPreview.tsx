import { useState, useEffect } from 'react';

// Step5: APIフェッチ - useEffect + fetch、ローディング状態を学ぶプレビュー

interface User {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
}

function FetchPreview() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            // JSONPlaceholder APIを使用（デモ用）
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );

            if (!response.ok) {
                throw new Error('データの取得に失敗しました');
            }

            const data = await response.json();
            // 最初の5件だけ使用
            setUsers(data.slice(0, 5));
        } catch (err) {
            setError(err instanceof Error ? err.message : '不明なエラー');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="preview-content">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>読み込み中...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="preview-content">
                <div className="error-display">
                    <p>❌ エラー: {error}</p>
                    <button onClick={fetchUsers} className="retry-btn">再試行</button>
                </div>
            </div>
        );
    }

    return (
        <div className="preview-content">
            <div className="fetch-header">
                <h4>ユーザー一覧</h4>
                <button onClick={fetchUsers} className="refresh-btn">🔄 更新</button>
            </div>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <strong>{user.name}</strong>
                        <span className="user-email">{user.email}</span>
                        <span className="user-company">🏢 {user.company.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FetchPreview;

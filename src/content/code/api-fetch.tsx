function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error.message}</p>;
    return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

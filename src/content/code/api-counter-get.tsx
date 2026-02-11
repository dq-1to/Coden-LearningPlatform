import { useState, useEffect } from 'react';

function ApiCounter() {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/counter')
            .then(res => res.json())
            .then(data => {
                setCount(data.value);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>読み込み中...</p>;

    return (
        <div>
            <h2>カウンター: {count}</h2>
        </div>
    );
}

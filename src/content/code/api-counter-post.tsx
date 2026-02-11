import { useState, useEffect } from 'react';

function ApiCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('/api/counter')
            .then(res => res.json())
            .then(data => setCount(data.value));
    }, []);

    const increment = async () => {
        const newValue = count + 1;
        await fetch('/api/counter', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1, value: newValue })
        });
        setCount(newValue);
    };

    return (
        <div>
            <h2>カウンター: {count}</h2>
            <button onClick={increment}>+1</button>
        </div>
    );
}

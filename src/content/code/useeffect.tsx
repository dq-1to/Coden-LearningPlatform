import { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return <p>経過時間: {seconds}秒</p>;
}

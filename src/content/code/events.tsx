function EventExample() {
    const [text, setText] = useState('');

    const handleClick = () => {
        alert('クリックされました！');
    };

    return (
        <div>
            <button onClick={handleClick}>クリック</button>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
}

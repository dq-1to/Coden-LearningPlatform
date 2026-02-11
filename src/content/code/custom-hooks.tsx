function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

// 使用例
function App() {
    const [name, setName] = useLocalStorage('name', '');
    return <input value={name} onChange={e => setName(e.target.value)} />;
}

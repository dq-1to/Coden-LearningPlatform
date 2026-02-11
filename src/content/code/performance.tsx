import { useMemo, useCallback, memo } from 'react';

const ExpensiveList = memo(({ items, onSelect }) => {
    return items.map(item => (
        <div key={item.id} onClick={() => onSelect(item)}>
            {item.name}
        </div>
    ));
});

function App() {
    const [filter, setFilter] = useState('');

    const filteredItems = useMemo(
        () => items.filter(i => i.name.includes(filter)),
        [items, filter]
    );

    const handleSelect = useCallback((item) => {
        console.log(item);
    }, []);

    return <ExpensiveList items={filteredItems} onSelect={handleSelect} />;
}

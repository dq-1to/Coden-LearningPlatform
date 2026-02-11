function LoginForm() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form>
            <input name="email" onChange={handleChange} />
            <input name="password" type="password" onChange={handleChange} />
        </form>
    );
}

function ConditionalExample({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <p>ようこそ！</p>
            ) : (
                <p>ログインしてください</p>
            )}
        </div>
    );
}

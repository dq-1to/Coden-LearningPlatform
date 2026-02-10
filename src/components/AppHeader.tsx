import { useNavigate } from 'react-router-dom';
import { usePt } from '../context/PtContext';
import { useAuth } from '../hooks/useAuth';
import codenLogo from '../assets/icons/coden_logo.png';

interface AppHeaderProps {
    showProgress?: boolean;
    completedSteps?: number;
    totalSteps?: number;
}

function AppHeader({ showProgress = false, completedSteps = 0, totalSteps = 0 }: AppHeaderProps) {
    const navigate = useNavigate();
    const { pt } = usePt();
    const { user, signOut } = useAuth();

    const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'ユーザー';

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img src={codenLogo} alt="Coden" className="header-logo" />
                <h1>Coden</h1>
            </div>
            <div className="header-actions">
                <div className="pt-badge">
                    <span className="pt-amount">{pt.toLocaleString()} Pt</span>
                    <span className="pt-icon">⭐</span>
                </div>
                {showProgress && (
                    <span className="progress-info">
                        進捗: {completedSteps} / {totalSteps} 完了
                    </span>
                )}
                <button className="stats-btn" onClick={() => navigate('/stats')}>
                    📊 統計
                </button>
                {user && (
                    <div className="user-area">
                        <div className="user-profile-chip">
                            <div className="user-avatar">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span className="user-name">
                                {username}
                            </span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="logout-btn"
                        >
                            ログアウト
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default AppHeader;

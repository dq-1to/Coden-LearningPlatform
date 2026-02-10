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
                    <div className="user-area" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginLeft: '8px',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderRadius: '8px',
                            padding: '4px 10px',
                        }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                color: 'white',
                                fontWeight: 700,
                            }}>
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span style={{
                                color: '#e2e8f0',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                            }}>
                                {username}
                            </span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="logout-btn"
                            style={{
                                padding: '4px 10px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '6px',
                                color: '#fca5a5',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                transition: 'all 0.2s',
                            }}
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

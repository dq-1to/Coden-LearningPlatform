import { useNavigate } from 'react-router-dom';
import { usePt } from '../context/PtContext';
import { useAuth } from '../hooks/useAuth';
import codenLogo from '../assets/icons/coden_logo.png';
import styles from './AppHeader.module.css';

interface AppHeaderProps {
    showProgress?: boolean;
    completedSteps?: number;
    totalSteps?: number;
    onMenuToggle?: () => void;
}

function AppHeader({ showProgress = false, completedSteps = 0, totalSteps = 0, onMenuToggle }: AppHeaderProps) {
    const navigate = useNavigate();
    const { pt } = usePt();
    const { user, signOut } = useAuth();

    const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'ユーザー';

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <header className={styles.appHeader}>
            <div className={styles.headerLeft}>
                {onMenuToggle && (
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={onMenuToggle}
                        aria-label="メニューを開く"
                    >
                        ☰
                    </button>
                )}
                <div className={styles.headerBrand} onClick={() => navigate('/')}>
                    <img src={codenLogo} alt="Coden" className={styles.headerLogo} />
                    <h1 className={styles.headerTitle}>Coden</h1>
                </div>
            </div>
            <div className={styles.headerActions}>
                <div className={styles.ptBadge}>
                    <span className={styles.ptAmount}>{pt.toLocaleString()} Pt</span>
                    <span className={styles.ptIcon}>⭐</span>
                </div>
                {showProgress && (
                    <span className={styles.progressInfo}>
                        進捗: {completedSteps} / {totalSteps} 完了
                    </span>
                )}
                <button className={styles.statsBtn} onClick={() => navigate('/profile')}>
                    👤 プロフィール
                </button>
                {user && (
                    <div className={styles.userArea}>
                        <div className={styles.userProfileChip}>
                            <div className={styles.userAvatar}>
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <span className={styles.userName}>
                                {username}
                            </span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className={styles.logoutBtn}
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

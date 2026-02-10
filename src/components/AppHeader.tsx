import { useNavigate } from 'react-router-dom';
import { usePt } from '../context/PtContext';
import codenLogo from '../assets/icons/coden_logo.png';

interface AppHeaderProps {
    showProgress?: boolean;
    completedSteps?: number;
    totalSteps?: number;
}

function AppHeader({ showProgress = false, completedSteps = 0, totalSteps = 0 }: AppHeaderProps) {
    const navigate = useNavigate();
    const { pt } = usePt();

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
            </div>
        </header>
    );
}

export default AppHeader;

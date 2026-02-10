import { useStats } from '../../context/StatsContext';
import { useMascot } from '../../context/MascotContext';

// マスコット画像のインポート
import mascotGreen from '../../assets/icons/mascot.png';
import mascotRed from '../../assets/icons/mascot_red.png';
import mascotBlue from '../../assets/icons/mascot_blue.png';
import mascotYellow from '../../assets/icons/mascot_yellow.png';
import mascotPink from '../../assets/icons/mascot_pink.png';

// マスコットIDから画像を取得するマップ
const mascotImages: Record<string, string> = {
    green: mascotGreen,
    red: mascotRed,
    blue: mascotBlue,
    yellow: mascotYellow,
    pink: mascotPink,
};

interface WelcomeBannerProps {
    userName?: string;
    completedSteps: number;
    totalSteps: number;
}

function WelcomeBanner({ userName = 'ユーザー', completedSteps, totalSteps }: WelcomeBannerProps) {
    const { stats } = useStats();
    const { currentMascot, getMascotInfo } = useMascot();

    // 時間帯に応じた挨拶
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'おはようございます';
        if (hour < 18) return 'こんにちは';
        return 'こんばんは';
    };

    const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    const mascotInfo = getMascotInfo();
    const mascotImage = mascotImages[currentMascot] || mascotImages.green;

    return (
        <div className="welcome-banner">
            <div className="welcome-content">
                <h1 className="welcome-title">
                    {getGreeting()}、{userName}さん！👋
                </h1>
                <p className="welcome-subtitle">
                    今週の目標まであと <span className="progress-highlight">{100 - progressPercent}%</span> です。その調子で頑張りましょう！
                </p>
                <div className="welcome-badges">
                    {stats.streakDays > 0 && (
                        <div className="streak-badge">
                            <span className="badge-icon">🌱</span>
                            <span className="badge-text">連続 {stats.streakDays}日達成中</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="welcome-mascot">
                <div className="mascot-circle" title={mascotInfo.name}>
                    <img src={mascotImage} alt={mascotInfo.name} className="mascot-image" />
                </div>
            </div>
        </div>
    );
}

export default WelcomeBanner;

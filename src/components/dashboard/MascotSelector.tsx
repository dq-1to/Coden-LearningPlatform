import { useMascot, MASCOTS, MascotType } from '../../context/MascotContext';
import styles from '../../pages/Dashboard.module.css';

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

function MascotSelector() {
    const { currentMascot, setMascot } = useMascot();

    return (
        <div className={styles.mascotSelector}>
            <h3 className={styles.selectorTitle}>🎨 マスコットを選ぶ</h3>
            <p className={styles.selectorDescription}>お気に入りのマスコットを選んでね！</p>
            <div className={styles.mascotGrid}>
                {MASCOTS.map((mascot) => (
                    <button
                        key={mascot.id}
                        className={`${styles.mascotOption} ${currentMascot === mascot.id ? styles.selected : ''}`}
                        onClick={() => setMascot(mascot.id as MascotType)}
                    >
                        <div className={styles.mascotOptionImage}>
                            <img src={mascotImages[mascot.id]} alt={mascot.name} />
                        </div>
                        <div className={styles.mascotOptionInfo}>
                            <span className={styles.mascotName}>{mascot.name}</span>
                            <span className={styles.mascotDesc}>{mascot.description}</span>
                        </div>
                        {currentMascot === mascot.id && (
                            <span className={styles.selectedBadge}>✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MascotSelector;

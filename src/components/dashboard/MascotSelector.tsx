import { useMascot, MASCOTS, MascotType } from '../../context/MascotContext';

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
        <div className="mascot-selector">
            <h3 className="selector-title">🎨 マスコットを選ぶ</h3>
            <p className="selector-description">お気に入りのマスコットを選んでね！</p>
            <div className="mascot-grid">
                {MASCOTS.map((mascot) => (
                    <button
                        key={mascot.id}
                        className={`mascot-option ${currentMascot === mascot.id ? 'selected' : ''}`}
                        onClick={() => setMascot(mascot.id as MascotType)}
                    >
                        <div className="mascot-option-image">
                            <img src={mascotImages[mascot.id]} alt={mascot.name} />
                        </div>
                        <div className="mascot-option-info">
                            <span className="mascot-name">{mascot.name}</span>
                            <span className="mascot-desc">{mascot.description}</span>
                        </div>
                        {currentMascot === mascot.id && (
                            <span className="selected-badge">✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MascotSelector;

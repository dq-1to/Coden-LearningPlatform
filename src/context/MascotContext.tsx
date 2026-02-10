import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// マスコットの種類定義
export type MascotType = 'green' | 'red' | 'blue' | 'yellow' | 'pink';

export interface MascotInfo {
    id: MascotType;
    name: string;
    description: string;
    imagePath: string;
}

// マスコット一覧
export const MASCOTS: MascotInfo[] = [
    { id: 'green', name: 'みどりん', description: 'やさしい笑顔のデフォルトマスコット', imagePath: '/src/assets/icons/mascot.png' },
    { id: 'red', name: 'あかりん', description: '元気いっぱい！やる気満々', imagePath: '/src/assets/icons/mascot_red.png' },
    { id: 'blue', name: 'あおくん', description: 'クールで落ち着いた性格', imagePath: '/src/assets/icons/mascot_blue.png' },
    { id: 'yellow', name: 'きいろん', description: 'キラキラ好奇心旺盛！', imagePath: '/src/assets/icons/mascot_yellow.png' },
    { id: 'pink', name: 'ももちゃん', description: 'やさしくて癒し系', imagePath: '/src/assets/icons/mascot_pink.png' },
];

interface MascotContextType {
    currentMascot: MascotType;
    setMascot: (mascot: MascotType) => void;
    getMascotInfo: () => MascotInfo;
}

const MASCOT_STORAGE_KEY = 'selected-mascot';

const MascotContext = createContext<MascotContextType | undefined>(undefined);

interface MascotProviderProps {
    children: ReactNode;
}

export function MascotProvider({ children }: MascotProviderProps) {
    const [currentMascot, setCurrentMascot] = useState<MascotType>(() => {
        const saved = localStorage.getItem(MASCOT_STORAGE_KEY);
        return (saved as MascotType) || 'green';
    });

    useEffect(() => {
        localStorage.setItem(MASCOT_STORAGE_KEY, currentMascot);
    }, [currentMascot]);

    const setMascot = (mascot: MascotType) => {
        setCurrentMascot(mascot);
    };

    const getMascotInfo = (): MascotInfo => {
        return MASCOTS.find(m => m.id === currentMascot) || MASCOTS[0];
    };

    return (
        <MascotContext.Provider value={{ currentMascot, setMascot, getMascotInfo }}>
            {children}
        </MascotContext.Provider>
    );
}

export function useMascot() {
    const context = useContext(MascotContext);
    if (!context) {
        throw new Error('useMascot must be used within MascotProvider');
    }
    return context;
}

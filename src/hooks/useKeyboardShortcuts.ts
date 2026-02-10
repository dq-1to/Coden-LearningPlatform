import { useEffect, useCallback } from 'react';

interface UseKeyboardShortcutsOptions {
    onSubmit?: () => void;
    onNextStep?: () => void;
    onPrevStep?: () => void;
    onEscape?: () => void;
    enabled?: boolean;
}

export function useKeyboardShortcuts({
    onSubmit,
    onNextStep,
    onPrevStep,
    onEscape,
    enabled = true,
}: UseKeyboardShortcutsOptions) {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!enabled) return;

            // Ctrl + Enter で回答送信
            if (event.ctrlKey && event.key === 'Enter') {
                event.preventDefault();
                onSubmit?.();
                return;
            }

            // Escape でモード切り替え
            if (event.key === 'Escape') {
                event.preventDefault();
                onEscape?.();
                return;
            }

            // 矢印キーでステップ移動（入力欄にフォーカスがない場合のみ）
            const activeElement = document.activeElement;
            const isInputFocused =
                activeElement instanceof HTMLInputElement ||
                activeElement instanceof HTMLTextAreaElement;

            if (!isInputFocused) {
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    onNextStep?.();
                } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    onPrevStep?.();
                }
            }
        },
        [enabled, onSubmit, onNextStep, onPrevStep, onEscape]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}

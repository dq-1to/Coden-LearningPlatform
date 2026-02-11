import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Counter from './Counter';

describe('Counter', () => {
    it('初期値が0であること', () => {
        render(<Counter />);
        expect(screen.getByText('カウント: 0')).toBeInTheDocument();
    });

    it('+1ボタンでカウントが増えること', () => {
        render(<Counter />);
        fireEvent.click(screen.getByText('+1'));
        expect(screen.getByText('カウント: 1')).toBeInTheDocument();
    });
});

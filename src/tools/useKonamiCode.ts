import { useKeyboardSequence } from './useKeyboardSequence';

export const useKonamiCode = (cb: () => void) =>
    useKeyboardSequence(
        [
            'ArrowUp',
            'ArrowUp',
            'ArrowDown',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowLeft',
            'ArrowRight',
            'b',
            'a',
        ],
        cb
    );

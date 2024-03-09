import { useEffect, useRef } from 'react';
import { useWindowEvent } from './useWindowEvent';

export const useKeyboardSequence = (sequence: KeyboardEvent['key'][], onFulfilled: () => void) => {
    const progressIndexRef = useRef(0);

    useWindowEvent('keydown', (e) => {
        const testKey = sequence[progressIndexRef.current];
        if (e.key === testKey) {
            progressIndexRef.current++;
        } else {
            progressIndexRef.current = 0;
        }
        if (progressIndexRef.current >= sequence.length) {
            onFulfilled();
            progressIndexRef.current = 0;
        }
    });

    useEffect(() => {
        progressIndexRef.current = 0;
    }, [sequence]);
};

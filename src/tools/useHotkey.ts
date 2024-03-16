import { useStableCallback } from './useStableCallback';
import { useEffect } from 'react';

export const useHotkey = (key: string, cb: (e: KeyboardEvent) => void) => {
    const _cb = useStableCallback((e: KeyboardEvent) => {
        if (e.key === key) cb(e);
    });

    useEffect(() => {
        window.addEventListener('keydown', _cb);
        return () => window.removeEventListener('keydown', _cb);
    }, [_cb]);
};

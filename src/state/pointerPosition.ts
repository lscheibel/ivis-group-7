import { atom, useAtom } from 'react-atomic-state';

interface PointerPosition {
    screen: { x: number; y: number };
}

const pointerPositionAtom = atom<PointerPosition | null>(null);

window.addEventListener('pointermove', (e) => {
    pointerPositionAtom.set({
        screen: { x: e.clientX, y: e.clientY },
    });
});

window.addEventListener('pointerleave', () => {
    pointerPositionAtom.set(null);
});

export const usePointerPosition = () => useAtom(pointerPositionAtom);
export const getPointerPosition = pointerPositionAtom.get;

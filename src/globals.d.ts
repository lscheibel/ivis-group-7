import 'react';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}

declare global {
    type Nullish = null | undefined;
}

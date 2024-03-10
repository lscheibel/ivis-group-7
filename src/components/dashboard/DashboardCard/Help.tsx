import React from 'react';

export interface HelpTitleProps {
    children: React.ReactNode;
}

export const HelpTitle = ({ children }: HelpTitleProps) => {
    return (
        <h2 style={{ fontWeight: 'bold', fontSize: 'var(--font-size-large)', textTransform: 'none', lineHeight: 1 }}>
            {children}
        </h2>
    );
};

import React, { SVGAttributes } from 'react';

export interface GuideLineProps extends SVGAttributes<SVGLineElement> {}

const GuideLine = (props: GuideLineProps) => {
    return (
        <line
            {...props}
            strokeDasharray={'0.01, 16'}
            strokeLinecap={'square'}
            stroke={'var(--black)'}
            strokeWidth={2}
        />
    );
};

export default GuideLine;

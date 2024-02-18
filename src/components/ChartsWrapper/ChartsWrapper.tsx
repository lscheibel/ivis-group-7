import React, { useRef } from 'react';
import { useDomNodeDimensions } from '../../tools/useDomNodeDimensions';
import styles from './ChartsWrapper.module.scss';
import cn from 'classnames';
export interface ChartsWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    render: (dimensions: { width: number; height: number }) => React.ReactNode;
}

const ChartsWrapper = ({ render, ...props }: ChartsWrapperProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const dimensions = useDomNodeDimensions(ref);

    return (
        <div {...props} className={cn(styles.wrapper, props.className)} ref={ref}>
            {dimensions && render(dimensions)}
        </div>
    );
};

export default ChartsWrapper;

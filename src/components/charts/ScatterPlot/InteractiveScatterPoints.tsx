import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useStableCallback } from '../../../tools/useStableCallback';

export interface ScatterPlotAttributes {
    id: string | number;
    x: number;
    y: number;
    radius?: number;
    title?: React.ReactNode;
}

export interface InteractiveScatterPointsProps<T extends ScatterPlotAttributes> {
    data: T[];
    renderDatum: (attr: T) => React.ReactNode;

    interactionRadius?: number;
    onDatumClick?: (datum: T) => void;
    onDatumClickMiss?: () => void;
    onDatumPointerOver?: (datum: T) => void;
    onDatumPointerLeave?: () => void;
}

const InteractiveScatterPoints = <T extends ScatterPlotAttributes>({
    data,
    renderDatum,
    interactionRadius = 20,
    onDatumClick,
    onDatumClickMiss,
    onDatumPointerLeave,
    onDatumPointerOver,
}: InteractiveScatterPointsProps<T>) => {
    const ref = useRef<SVGGElement | null>(null);

    const delaunay = d3.Delaunay.from(data.map(({ x, y }) => [x, y]));

    const getClosestDatumFromPointerEvent = (e: MouseEvent) => {
        const svg = e.currentTarget as SVGSVGElement;

        const clientRect = svg.getBoundingClientRect();
        const offsetX = e.clientX - clientRect.left;
        const offsetY = e.clientY - clientRect.top;

        const index = delaunay.find(offsetX, offsetY);
        const datum = data[index];

        if (Math.hypot(datum.x - offsetX, datum.y - offsetY) > interactionRadius) {
            return null;
        } else {
            return datum;
        }
    };

    const moveHandler = useStableCallback((e: PointerEvent) => {
        const datum = getClosestDatumFromPointerEvent(e);

        if (datum) {
            onDatumPointerOver?.(datum);
        } else {
            onDatumPointerLeave?.();
        }
    });
    const leaveHandler = useStableCallback(() => onDatumPointerLeave?.());
    const clickHandler = useStableCallback((e: MouseEvent) => {
        const datum = getClosestDatumFromPointerEvent(e);
        if (datum) {
            onDatumClick?.(datum);
        } else {
            onDatumClickMiss?.();
        }
    });

    // In order to enable high precision data point selection we run our own logic, based on the closest point to the current pointer position.
    useEffect(() => {
        const svg = ref.current?.closest('svg');
        if (!svg) return;

        svg.addEventListener('click', clickHandler);
        svg.addEventListener('pointermove', moveHandler);
        svg.addEventListener('pointerleave', leaveHandler);
        return () => {
            svg.removeEventListener('click', clickHandler);
            svg.removeEventListener('pointermove', moveHandler);
            svg.removeEventListener('pointerleave', leaveHandler);
        };
    }, [clickHandler, moveHandler, leaveHandler]);

    return <g ref={ref}>{data.map(renderDatum)}</g>;
};

export default InteractiveScatterPoints;

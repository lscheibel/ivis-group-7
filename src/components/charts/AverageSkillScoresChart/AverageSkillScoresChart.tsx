import React from 'react';
import { SvgChartProps } from '../common';
import { data, IvisSurveyDataEntry } from '../../../data/ivis-survey/data';
import * as d3 from 'd3';
import { animated, useSpring } from '@react-spring/web';

export interface AverageSkillScoresChartProps extends SvgChartProps {
    skill: string;
}

const AverageSkillScoresChart = ({
    skill,
    width: outerWidth,
    height: outerHeight,
    ...props
}: AverageSkillScoresChartProps) => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 1.5, bottom: 10, left: 1.5 };
    const width = outerWidth - margin.left - margin.right;
    const height = outerHeight - margin.top - margin.bottom;

    const getSkillValue = (dataEntry: IvisSurveyDataEntry, skill: string) => {
        return (dataEntry as any)[skill];
    };

    // Bucket for all 11 skill values (0 - 10).
    const allSkillScores = new Map<number, number>();
    Array.from({ length: 10 + 1 }).forEach((_, i) => {
        allSkillScores.set(i, 0);
    });

    // Count the amount of times a skill was selected.
    data.forEach((d) => {
        const score = getSkillValue(d, skill);
        const key = Math.floor(score);
        allSkillScores.set(key, (allSkillScores.get(key) || 0) + 1);
    });

    const [maxCountSkill, maxCount] = [...allSkillScores.entries()].reduce((acc, cur) => (cur[1] > acc[1] ? cur : acc));

    // Map values to svg dimensions.
    const y = d3.scaleLinear().domain([-maxCount, maxCount]).range([0, height]);

    const x = d3.scaleLinear().domain([0, 10]).range([0, width]); // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

    const area = d3
        .area()
        .y0((d) => y(-d[1]))
        .y1((d) => y(d[1]))
        .x((d) => x(d[0]))
        .curve(d3.curveCatmullRom);

    const areaPath = area([...allSkillScores.entries()].sort((a, b) => a[0] - b[0]))!;

    const whiskerSize = 24;

    const [spring, api] = useSpring(() => ({ x: 0, y: 0, size: 0 }));

    const handleMouseEnter = () => {
        api.start({ size: 1 });
    };

    const handleMouseLeave = () => {
        api.start({ size: 0 });
    };

    return (
        <svg
            width={outerWidth}
            height={outerHeight}
            viewBox={`0, 0, ${outerWidth}, ${outerHeight}`}
            style={{ maxWidth: '100%', height: 'auto' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {/* Violin Chart */}
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <path d={areaPath} fill={'var(--red)'} />
            </g>

            {/* Vertically centered */}
            <g transform={`translate(${margin.left}, ${margin.top + height / 2})`}>
                {/* x-Axis */}
                <line x1={x.range()[0]} y1={0} x2={x.range()[1]} y2={0} stroke={'var(--black)'} strokeWidth={3} />

                {/* Whiskers */}
                <line
                    x1={x.range()[0]}
                    x2={x.range()[0]}
                    y1={-whiskerSize / 2}
                    y2={whiskerSize / 2}
                    stroke={'var(--black)'}
                    strokeWidth={3}
                />
                <text x={x.range()[0] - 1.5} y={24} fill={'var(--black)'} textAnchor={'start'}>
                    0
                </text>
                <line
                    x1={x.range()[1]}
                    x2={x.range()[1]}
                    y1={-whiskerSize / 2}
                    y2={whiskerSize / 2}
                    stroke={'var(--black)'}
                    strokeWidth={3}
                />
                <text x={x.range()[1] + 1.5} y={24} fill={'var(--black)'} textAnchor={'end'}>
                    10
                </text>

                {/* Max Count Tick */}
                <animated.line
                    x1={x(maxCountSkill)}
                    x2={x(maxCountSkill)}
                    y1={(-whiskerSize / 2 / 2) * spring.size}
                    y2={whiskerSize / 2 / 2}
                    stroke={'var(--black)'}
                    strokeWidth={3}
                />
                <text x={x(maxCountSkill)} y={24} fill={'var(--black)'} textAnchor={'middle'}>
                    {maxCountSkill}
                </text>
            </g>
        </svg>
    );
};

export default React.memo(AverageSkillScoresChart);

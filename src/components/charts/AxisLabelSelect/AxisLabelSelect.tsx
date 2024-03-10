import React from 'react';
import styles from './AxisLabelSelect.module.scss';
import HtmlForeignObject from '../../HtmlForeignObject/HtmlForeignObject';

export interface SelectOption {
    value: string;
    label: React.ReactNode;
}

export interface AxisLabelSelectProps {
    xAxis?: boolean;
    yAxis?: boolean;
    x: number;
    y: number;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
}
const AxisLabelSelect = ({ x, y, value, options, onChange }: AxisLabelSelectProps) => {
    return (
        <HtmlForeignObject x={x} y={y} anchorY={'bottom'} anchorX={'left'} data-ignore-miss>
            <div className={styles.selectWrapper}>
                <span>{options.find((o) => o.value === value)?.label}&nbsp;▾</span>
                <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </HtmlForeignObject>
    );
};

export default AxisLabelSelect;

import React, { useMemo } from 'react';
import styles from './Search.module.scss';
import Select, { MenuProps, OptionProps } from 'react-select';
import cn from 'classnames';
import { data } from '../../data/data';
import {
    setHoveredCountry,
    setSelectedCountry,
    useActiveCountry,
    useSelectedCountry,
} from '../../state/selectedCountry';
import sample from 'lodash/sample';

const DropdownIndicator = () => {
    return (
        <button className={styles.dropdownIndicator}>
            <svg viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="27.5" cy="26.5" r="17.5" stroke="currentColor" strokeWidth="8" />
                <path d="M38.4736 39.8945L50.5789 51.9998" stroke="currentColor" strokeWidth="8" />
            </svg>
        </button>
    );
};

const Option = (props: OptionProps<any>) => {
    const selectedCountry = useSelectedCountry();
    const isSelected = selectedCountry?.id == props.data.value;

    return (
        <div
            className={cn(styles.optionWrapper, { [styles.focused]: props.isFocused })}
            ref={props.innerRef}
            {...props.innerProps}
            onMouseEnter={() => setHoveredCountry(props.data.value)}
            onMouseLeave={() => setHoveredCountry(null)}
        >
            <span className={styles.value}>
                {props.label}
                {isSelected && <span className={styles.selectionIndicator}>*</span>}
            </span>
        </div>
    );
};

const Menu = (props: MenuProps<any>) => {
    return (
        <div className={styles.menu} ref={props.innerRef} {...props.innerProps}>
            {props.children}
        </div>
    );
};

const Search = () => {
    const activeCountry = useActiveCountry();

    const options = useMemo(() => {
        const countryOptions = data
            .map((e) => ({ value: e.id, label: e.countryName }))
            .sort((a, b) => a.label.localeCompare(b.label));
        return [{ value: null, label: 'Global' }, ...countryOptions];
    }, []);

    // Taken from google fonts :)
    const noOptionsEmojis = [
        '(;-;)',
        '(o^^)o',
        '\\(o_o)/',
        '(^-^*)',
        '(˚Δ˚)b',
        '(>_<)',
        '(≥o≤)',
        '(·.·)',
        '(·_·)',
        "(='X'=)",
        '(^_^)b',
        '\\(^Д^)/',
    ];

    return (
        <div className={styles.container}>
            <Select
                className={styles.select}
                classNames={{
                    container: () => styles.wrapper,
                    control: () => styles.control,
                    valueContainer: () => cn(styles.valueContainer),
                    singleValue: () => styles.value,
                    input: () => styles.input,
                    menuList: () => cn(styles.menuList),
                    option: () => cn(styles.option),
                    noOptionsMessage: () => styles.noOptionsMessage,
                }}
                noOptionsMessage={() => sample(noOptionsEmojis)}
                isClearable={false}
                components={{ DropdownIndicator, IndicatorSeparator: null, Option, Menu }}
                options={options}
                value={options.find((o) => o.value === (activeCountry?.id ?? null))}
                onChange={(e: any) => setSelectedCountry(e.value)}
                closeMenuOnSelect
            />
        </div>
    );
};

export default Search;

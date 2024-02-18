import React, { useRef, useState } from 'react';
import AverageSkillScoresChart from '../../charts/AverageSkillScoresChart/AverageSkillScoresChart';
import DashboardCard from '../DashboardCard/DashboardCard';
import { useDomNodeDimensions } from '../../../tools/useDomNodeDimensions';
import styles from './AverageSkillScoresCard.module.scss';
import { metadata } from '../../../data/ivis-survey/data';
import cn from 'classnames';

const AverageSkillScoresCard = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const dimensions = useDomNodeDimensions(ref);

    const [activeSkill, setActiveSkill] = useState('meanSkillScore');

    return (
        <DashboardCard className={styles.card}>
            <div className={styles.chartWrapper} ref={ref}>
                {dimensions && (
                    <AverageSkillScoresChart skill={activeSkill} width={dimensions.width} height={dimensions.height} />
                )}
            </div>
            <div className={styles.skillButtonWrapper}>
                {metadata.allSkills.map((skill) => {
                    return (
                        <button
                            key={skill}
                            className={cn(styles.skillButton, { [styles.active]: skill === activeSkill })}
                            onClick={() => setActiveSkill(skill)}
                        >
                            {(metadata.skillLabels as any)[skill]}
                        </button>
                    );
                })}
            </div>
        </DashboardCard>
    );
};

export default React.forwardRef(AverageSkillScoresCard);

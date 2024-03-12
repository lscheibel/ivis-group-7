import React from 'react';
import styles from './About.module.scss';

const About = () => {
    return (
        <div className={styles.container}>
            <h1>About us</h1>
            <em>This project is part of the Information Visualization course at KTH.</em>

            <h2>THE TEAM</h2>
            <ul className={styles.portraits}>
                <li>
                    <TeamAvatar name={'Beatrice Galvanetto'} imgSrc={'/beatrice.jpeg'} />
                </li>
                <li>
                    <TeamAvatar name={'David Giraldo'} imgSrc={'https://github.com/DavidGiraldoCode.png?size=320'} />
                </li>
                <li>
                    <TeamAvatar name={'Johannes Granlund'} imgSrc={'/johannes.jpeg'} />
                </li>
                <li>
                    <TeamAvatar name={'Lennard Scheibel'} imgSrc={'https://github.com/lscheibel.png?size=320'} />
                </li>
                <li>
                    <TeamAvatar name={'Sanaa Syed'} imgSrc={'/sanaa.jpeg'} />
                </li>
            </ul>
        </div>
    );
};

export default About;

export interface TeamAvatarProps {
    name: string;
    imgSrc: string;
}

const TeamAvatar = ({ name, imgSrc }: TeamAvatarProps) => {
    return (
        <figure className={styles.portraitFigure}>
            <img src={imgSrc} alt="" />
            <figcaption>{name}</figcaption>
        </figure>
    );
};

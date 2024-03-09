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
                    <TeamAvatar name={'Beatrice Galvanetto'} githubAlias={'bopsthepops'} />
                </li>
                <li>
                    <TeamAvatar name={'David Giraldo'} githubAlias={'DavidGiraldoCode'} />
                </li>
                <li>
                    <TeamAvatar name={'Johannes Granlund'} githubAlias={''} />
                </li>
                <li>
                    <TeamAvatar name={'Lennard Scheibel'} githubAlias={'lscheibel'} />
                </li>
                <li>
                    <TeamAvatar name={'Sanaa Syed'} githubAlias={''} />
                </li>
            </ul>
        </div>
    );
};

export default About;

export interface TeamAvatarProps {
    name: string;
    githubAlias: string;
}

const TeamAvatar = ({ name, githubAlias }: TeamAvatarProps) => {
    return (
        <figure className={styles.portraitFigure}>
            <img src={`https://github.com/${githubAlias}.png?size=320`} alt="" />
            <figcaption>{name}</figcaption>
        </figure>
    );
};

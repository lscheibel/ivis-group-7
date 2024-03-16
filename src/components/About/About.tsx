import React from 'react';
import styles from './About.module.scss';
import { useHotkey } from '../../tools/useHotkey';
import { useLocation } from 'wouter';
import IconGlobe from '../icons/IconGlobe';
import IconLinkedin from '../icons/IconLinkedin';

const About = () => {
    const [, setLocation] = useLocation();
    useHotkey('Escape', () => setLocation('/'));

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>About us</h1>
                <em>This project is part of the Information Visualization course at KTH.</em>
                <h2>THE TEAM</h2>
                <ul className={styles.portraits}>
                    <li>
                        <TeamAvatar
                            name={'Beatrice Galvanetto'}
                            work={'Data Processing'}
                            imgSrc={'/beatrice.jpeg'}
                            linkedin={'https://www.linkedin.com/in/beatricegalvanetto/'}
                        />
                    </li>
                    <li>
                        <TeamAvatar
                            name={'David Giraldo'}
                            work={'Development'}
                            imgSrc={'https://github.com/DavidGiraldoCode.png?size=320'}
                            website={'https://how-to-find-me.netlify.app/'}
                            linkedin={'https://www.linkedin.com/in/davidgiraldodesign/'}
                        />
                    </li>
                    <li>
                        <TeamAvatar
                            name={'Johannes Granlund'}
                            work={'Design'}
                            imgSrc={'/johannes.jpeg'}
                            linkedin={'https://www.linkedin.com/in/jgranlund/'}
                        />
                    </li>
                    <li>
                        <TeamAvatar
                            name={'Lennard Scheibel'}
                            work={'Development'}
                            imgSrc={'https://github.com/lscheibel.png?size=320'}
                            website={'https://lennardscheibel.de'}
                            linkedin={'https://www.linkedin.com/in/lennard-scheibel/'}
                        />
                    </li>
                    <li>
                        <TeamAvatar
                            name={'Sanaa Syed'}
                            work={'Design'}
                            imgSrc={'/sanaa.jpeg'}
                            linkedin={'https://www.linkedin.com/in/sanaa-syed-xr-productmanagement-design-ai-ml/'}
                        />
                    </li>
                </ul>
                <p>
                    The &quot;Too hungry to learn?&quot; project is dedicated to providing an interactive tool to
                    visualize the inequalities among high school students around the globe. By visualizing specific data
                    provided by the PISA project, this tool offers an interactive and thought-provoking way to observe
                    which factors affect students&apos; grades and how they do so.
                </p>
                <p>
                    Our mission is to raise awareness about the global decline in educational equality since the early
                    2000s and the role that food insecurity plays in this negative spiral. Despite efforts to bridge the
                    gap, inequalities in access to quality education and food security persist, limiting opportunities
                    for many individuals, particularly those from disadvantaged backgrounds.
                </p>

                <strong>Demo</strong>
                <video controls>
                    <source src="/demo.mp4" type="video/mp4" />
                </video>

                <strong>The PISA project</strong>
                <p>
                    The PISA (Programme for International Student Assessment) project is an international assessment
                    coordinated by the Organization for Economic Cooperation and Development (OECD). It aims to evaluate
                    educational systems worldwide by assessing 690.000 15-year-old students&apos; skills and knowledge
                    in reading, mathematics, and science, in 81 countries and economies worldwide.
                </p>
                <p>
                    The assessment is conducted every three years and provides valuable data and insights into the
                    effectiveness of different education systems, policies, and practices across participating countries
                    and economies. PISA results are widely used by policymakers, educators, and researchers to inform
                    educational reforms and improve student outcomes globally.
                </p>
                <strong>The challenge</strong>
                <p>
                    Even though the PISA report is open to the public and contains a lot of data points, it is not very
                    accessible or easy to find correlations between grades and the other data points. This limits the
                    reach of the PISA reports and limits the target group that can benefit from it.
                </p>
                <strong>The Goal</strong>
                <p>
                    The goal of the “Too hungry to learn?” project is to democratize this data and lower the barrier of
                    entry. Allowing for more people to be able to see which factors affect their student&apos;s grades.
                </p>
                <strong>Limitations</strong>
                <br />
                <p>
                    The data provided by PISA covers a vast array of data points. To narrow the scope, this project
                    specifically focuses on examining the correlation between students&apos; grades and their food
                    security. Secondary data points pertain to students&apos; perceived support and perceived safety.
                    The remaining data set from PISA is not addressed in this project
                </p>
                <strong>Future implementations: Design/Usability</strong>
                <p>
                    Due to the time constraint of this project, there are a few things that weren’t able to be
                    implemented. Below are some things we would like to implement in the future.
                </p>
                <ol className={styles.aboutLists}>
                    <li>
                        <p>
                            The user interface currently displayed is the remnant of our first iteration. We chose to
                            focus on functionality and usability when finishing this project and therefore the new
                            design had to be postponed. We believe that this design increases the usability of the
                            application, and creates a closer connection to the message and feel of an education-related
                            application.
                        </p>
                        <ContentImage imgSrc={'/final_design.png'} />
                    </li>
                    <li>
                        <p>
                            A small info box that showcases the PISA score for each country next to the cursor on hover.
                        </p>

                        <ContentImage imgSrc={'/final_design_hover_box_focus.png'} />
                        <ContentImage imgSrc={'/final_design_hover_box.png'} />
                    </li>
                </ol>
                <strong>Citations and references</strong>
                <ul className={styles.aboutLists}>
                    <li>
                        <p>
                            Gerald J., Dorothy R. Friedman. (2019). School of Nutrition Science and Policy at Tufts
                            University. "Download 2018 Final Estimates." Published online at globaldietarydatabase.org.
                            Retrieved from: ‘https://www.globaldietarydatabase.org/data-download’ [Online Resource]
                        </p>
                    </li>
                    <br />
                    <li>
                        <p>
                            Andreas Schleicher PISA 2022 Insights to interpretations
                            https://www.oecd.org/pisa/PISA%202022%20Insights%20and%20Interpretations.pdf
                        </p>
                    </li>
                    <br />
                    <li>
                        <p>
                            Schultz, L., Bundy, D. A. P., "School Health and Nutrition Monitoring: What Practitioners
                            and Policy Makers Can Learn from China," The Lancet Regional Health - Western Pacific, vol.
                            19, 2022, article number 100368, ISSN 2666-6065,
                            https://doi.org/10.1016/j.lanwpc.2021.100368.
                            (https://www.sciencedirect.com/science/article/pii/S2666606521002777)
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default About;

export interface TeamAvatarProps {
    name: string;
    work: string;
    imgSrc: string;
    website?: string;
    linkedin?: string;
}

const TeamAvatar = ({ name, imgSrc, work, website, linkedin }: TeamAvatarProps) => {
    return (
        <figure className={styles.portraitFigure}>
            <img src={imgSrc} alt="" />
            <figcaption className={styles.caption}>
                <span className={styles.name}>{name}</span>
                <br />
                <span className={styles.work}>{work}</span>
                <br />
                {website && (
                    <a href={website} target={'_blank'} rel="noreferrer" title={'Website'}>
                        <IconGlobe style={{ transform: 'scale(0.9)' }} />
                    </a>
                )}
                {linkedin && (
                    <a href={linkedin} target={'_blank'} rel="noreferrer" title={'LinkedIn'}>
                        <IconLinkedin />
                    </a>
                )}
            </figcaption>
        </figure>
    );
};

export interface ContentImageProps {
    imgSrc: string;
}

const ContentImage = ({ imgSrc }: ContentImageProps) => {
    return (
        <figure className={styles.contentImage}>
            <img src={imgSrc} alt="" />
        </figure>
    );
};

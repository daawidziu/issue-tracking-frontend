import {ProjectStats} from "../types";
import styles from '../styles/components/_Project.module.sass';

type Props = {
    project: ProjectStats
}

const ProjectItem = ({project}: Props) => {
    console.log(project)
    return (
        <li className={styles.project}>
            <h2>{project.name}</h2>
                <a className={styles.link} target='_blank' href={project.url}>Link</a>
            <div className={styles.statsContainer}>
                <div className={styles.statsInnerContainer}>
                    <span className={styles.stats+ ' ' + styles.statsOpen}>Open Issues:</span>
                    {project.open_issues}
                </div>
                <div className={styles.statsInnerContainer}>
                    <span className={styles.stats+ ' ' + styles.statsWip}>Work in progress Issues:</span>
                    {project.wip_issues}
                </div>
                <div className={styles.statsInnerContainer}>
                    <span className={styles.stats+ ' ' + styles.statsClosed}>Closed Issues:</span>
                    {project.closed_issues}
                </div>
            </div>
            <p>{project.description}</p>
        </li>
    );
}

export default ProjectItem;
import {ProjectStats} from "../types";
import ProjectItem from "./ProjectItem";
import styles from "../styles/components/_Project.module.sass";

type Props = {
    projects: ProjectStats[]
}

const ProjectList = ({projects}: Props) => {
    return (
    <ul className={styles.projectContainer}>
        {projects.map(project =>
            <ProjectItem key={project.id} project={project}/>
        )}
    </ul>);
}

export default ProjectList;
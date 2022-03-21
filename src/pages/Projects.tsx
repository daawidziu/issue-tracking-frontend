import Api from "../services/api";
import {useEffect, useState} from "react";
import Loading from "../images/Pulse-1.3s-200px.svg";
import {ProjectStats} from '../types';
import ProjectList from "../components/ProjectList";
import styles from '../styles/components/_Project.module.sass';

const Projects = () => {
    const [data, setData] = useState<ProjectStats[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await Api.get('projects/stats');
                setData(response.data);
                setError(null)
            } catch (e) {
                setError((e as Error).message);
                setData([]);
            } finally {
                setIsLoading(false)
            }
        }
        getData();
    }, []);
    return (
            isLoading ? <img src={Loading} alt='Loading Icon'/> : <ProjectList projects={data}/>
    );
}

export default Projects;
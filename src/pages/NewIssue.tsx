import {useEffect, useState} from "react";
import {Project} from "../types";
import Api from "../services/api";
import styles from '../styles/components/_Issue.module.sass';
import stylesBtn from '../styles/components/_button.module.sass';
import {useForm} from "react-hook-form";
import Loading from '../images/Pulse-1.3s-200px.svg';
import {Navigate} from "react-router-dom";

type Inputs = {
    name: string
    description: string
    project_id: number
}

const NewIssue = () => {
    const [data, setData] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [navigate, setNavigate] = useState<boolean>(false);

    const {register, handleSubmit} = useForm<Inputs>();
    const onSubmit = (data: any) => {Api.post('issues/', {
        ...data,
        'status': 'open'
    });
    setNavigate(!navigate)}

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await Api.get('projects/');
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
        isLoading ? <img src={Loading} alt='Loading Icon'/> :
            <form className={styles.itemTop + ' ' + styles.item} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.labelNewItem}>Issue name: </label>
                <input className={styles.formNewItem} type='text' {...register('name', {required: true})}/>
                <label className={styles.labelNewItem}>Associated project: : </label>
                <select className={styles.formNewItem} {...register('project_id', {
                    required: true,
                    valueAsNumber: true
                })}>
                    {data.map(project =>
                        <option key={project.id} value={project.id}>{project.name}</option>
                    )}
                </select>
                <label className={styles.labelNewItem}>Issue description: </label>
                <textarea {...register('description', {required: true})}/>
                <button type='submit' className={stylesBtn.btn + ' ' + stylesBtn.btnLarge + ' ' + stylesBtn.btnPrimary}>
                    Submit
                </button>
                {navigate && <Navigate to='/'/>}
            </form>
    );
}

export default NewIssue;
import React, {useEffect, useState} from "react";
import Api from "../services/api";
import styles from "../styles/components/_Issue.module.sass";
import stylesBtn from '../styles/components/_button.module.sass'
import Trash from '../images/icons8-trash-24.png';
import moment from "moment";
import {Navigate} from "react-router-dom";
import {Issue} from "../types";

type Props = {
    issue: Issue
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'open':
            return styles.statusOpen
        case 'wip':
            return styles.statusWip
        default:
            return styles.statusClosed
    }
}

const IssueDetails = ({issue}: Props) => {
    const [status, setStatus] = useState<string>(issue.status)
    const [description, setDescription] = useState<string>(issue.description)
    const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false)
    const [deleteNavigate, setDeleteNavigate] = useState<boolean>(false)


    const onChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => Api.put(`/issues/${issue.id}`, {
        name: issue.name,
        description: issue.description,
        project_id: issue.project_id,
        status: (event.target as HTMLInputElement).value
    }).then(response => setStatus(response.data.status))

    const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => Api.put(`/issues/${issue.id}`, {
        name: issue.name,
        description: event.target.value,
        project_id: issue.project_id,
        status: issue.status
    }).then(response => setDescription(response.data.description))

    const onClickDelete = () => {
        if (deleteConfirmed) {
            Api.delete(`issues/${issue.id}`);
            setDeleteNavigate(true)
        }
        setDeleteConfirmed(true)
    }

    if (deleteNavigate) return (<Navigate to='/' replace={true}/>);

    return (
        <div className={styles.item}>
            <span className={getStatusColor(status)}/>
            <h2>{issue.name}</h2>
            <span className={styles.date}>Created {moment(issue.created_at).fromNow()}</span>
            <span className={styles.date}>Updated {moment(issue.updated_at).fromNow()}</span>
            <form className={styles.form}>
                <div>
                    <label className={styles.formInput}><input type="radio" value="open" name='status'
                                                               defaultChecked={status === 'open'}
                                                               onChange={e => onChangeStatus(e)}/>
                        Open</label>
                </div>
                <div>
                    <label className={styles.formInput}><input type="radio" value="wip" name='status'
                                                               defaultChecked={status === 'wip'}
                                                               onChange={e => onChangeStatus(e)}/>
                        Work In Progress</label>
                </div>
                <div>
                    <label className={styles.formInput}><input type="radio" value="closed" name='status'
                                                               defaultChecked={status === 'closed'}
                                                               onChange={e => onChangeStatus(e)}/>
                        Closed</label>
                </div>
            </form>
            <textarea name='description' defaultValue={description} onChange={e => onChangeDescription(e)}/>
            <button className={stylesBtn.btn} onClick={onClickDelete}>
                <img src={Trash} alt='Trash icon'/> {deleteConfirmed ? 'Click again to confirm' : ' '}
            </button>
        </div>
    );
}

export default IssueDetails;
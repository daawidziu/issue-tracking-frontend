import styles from '../styles/components/_Issue.module.sass';
import moment from "moment";
import {Link} from "react-router-dom";
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

const IssueItem = ({ issue }: Props) => {
    return (
        <Link className={styles.itemContainer} to={`/${issue.id}`}>
        <li className={styles.item}>
            <span className={getStatusColor(issue.status)}/>
            <h2>{issue.name}</h2>
            <span className={styles.date}>{moment(issue.created_at).fromNow()}</span>
            <p>{issue.description}</p>
        </li>
        </Link>
    );
}

export default IssueItem;
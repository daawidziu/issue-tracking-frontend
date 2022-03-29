import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {Issue} from "../types";
import IssueDroppableList from "./IssueDroppableList";
import Api from "../services/api";
import React, {useState} from "react";
import styles from '../styles/components/_DragDrop.module.sass'
import {useAuth} from "../contexts/AuthContext";

type Props = {
    issues: Issue[]
    setIssues: Function
}

const IssueDragList = ({issues, setIssues}: Props) => {
    const [openIssues, setOpenIssues] = useState<Issue[]>(issues.filter(value => value.status === 'open'));
    const [wipIssues, setWipIssues] = useState<Issue[]>(issues.filter(value => value.status === 'wip'));
    const [closedIssues, setClosedIssues] = useState<Issue[]>(issues.filter(value => value.status === 'closed'));

    const auth = useAuth();

    const getIssues = (status: string): [Issue[], React.Dispatch<Issue[]>] => {
        switch (status) {
            case 'open':
                return [openIssues, setOpenIssues];
            case 'wip':
                return [wipIssues, setWipIssues];
            default:
                return [closedIssues, setClosedIssues]
        }
    }

    const onDragEnd = (result: DropResult) => {
        if (!auth.state.logged) {return;}
        if (!result.destination) {
            return;
        }

        const [sourceIssues, setSourceIssues] = getIssues(result.source.droppableId);
        const [destinationIssues, setDestinationIssues] = getIssues(result.destination.droppableId);
        let copySource = Array.from(sourceIssues);
        let copyDestination = Array.from(destinationIssues);

        if (result.source.droppableId === result.destination.droppableId) {
            copyDestination = copySource;
        }

        const [element] = copySource.splice(result.source.index, 1);

        if (result.source.droppableId !== result.destination.droppableId) {
            Api.put(`/issues/${element.id}`, {
                name: element.name,
                description: element.description,
                project_id: element.project_id,
                status: result.destination.droppableId
            })
            element.status = result.destination.droppableId;
        }

        copyDestination.splice(result.destination.index, 0, element);

        setSourceIssues(copySource);
        setDestinationIssues(copyDestination);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.column}><IssueDroppableList issues={openIssues} status={'open'}/></div>
            <div className={styles.column}><IssueDroppableList issues={wipIssues} status={'wip'}/></div>
            <div className={styles.column}><IssueDroppableList issues={closedIssues} status={'closed'}/></div>
        </DragDropContext>
    );
}

export default IssueDragList;
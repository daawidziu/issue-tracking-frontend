import {Issue} from "../types";
import {Draggable} from "react-beautiful-dnd";
import styles from '../styles/components/_DragDrop.module.sass';
import moment from "moment";

type Props = {
    issue: Issue
    index: number
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

const IssueDraggableItem = ({issue, index}: Props) => {
    return (
        <Draggable draggableId={issue.id.toString()} index={index}>
            {((provided, snapshot) =>
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={styles.item}>
                    <span className={getStatusColor(issue.status)}/>
                    <h2>{issue.name}</h2>
                    <span className={styles.date}>{moment(issue.created_at).fromNow()}</span>
                </div>
            )}
        </Draggable>
    );
}

export default IssueDraggableItem;
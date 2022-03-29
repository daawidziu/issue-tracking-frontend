import {Droppable} from "react-beautiful-dnd";
import {Issue} from "../types";
import IssueDraggableItem from "./IssueDraggableItem";
import styles from '../styles/components/_DragDrop.module.sass';

type Props = {
    issues: Issue[]
    status: string
}

const IssueDroppableList = ({issues, status}: Props) => {
    return (
        <Droppable droppableId={status}>
            {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h2 className={styles.status}>{status}</h2>
                    {issues.map((value, index) =>
                            <IssueDraggableItem issue={value} index={index} key={value.id}/>
                        )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>);
}

export default IssueDroppableList;
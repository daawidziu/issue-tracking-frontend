import {Comment} from "../types";
import styles from '../styles/components/_Comment.module.sass';
import moment from "moment";

type Props = {
    comment: Comment
}

const CommentItem = ({comment}: Props) => {
    return (
        <li className={styles.comment}>
            <div className={styles.commentTop}>
                <h4>Comment:</h4>
                <span className={styles.date}>{moment(comment.created_at).fromNow()}</span>
            </div>
            <p>
                {comment.text}
            </p>
        </li>
    );
}

export default CommentItem;
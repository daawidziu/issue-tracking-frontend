import Plus from '../images/icons8-plus-24.png';
import styles from '../styles/components/_Comment.module.sass'
import React, {useState} from "react";
import Api from "../services/api";

type Props = {
    issueId: number
    reRender: Function
}

const CommentAdd = ({issueId, reRender}: Props) => {
    const [text, setText] = useState<string>('');

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)

    const onClickText = () => {Api.post(`issues/${issueId}/comments`, {
        text: text,
        issue_id: issueId,
        author_id: 1
    });
    reRender();
    setText('');
    }

    return (
        <div className={styles.comment}>
            <div className={styles.commentTop}>
                <h3>Add Comment</h3>
                <button onClick={onClickText}><img src={Plus} alt='Plus icon'/></button>
            </div>
            <textarea placeholder='Type what you have on mind...' value={text} onChange={handleChangeText}/>
        </div>
    );
}

export default CommentAdd;
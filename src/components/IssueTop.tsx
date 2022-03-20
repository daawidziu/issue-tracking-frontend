import styles from '../styles/components/_TopContainer.module.sass';
import stylesBtn from '../styles/components/_button.module.sass';
import {Link} from "react-router-dom";


type Props = {
    count: number
}

const IssueTop = ({count}: Props) => {
    return (
        <div className={styles.topContainer}>
            <h2>There is {count} issues</h2>
            <Link to='/new'>
                <button className={stylesBtn.btn + ' ' + stylesBtn.btnPrimary + ' ' + stylesBtn.btnLarge}>
                    Create new Issue
                </button>
            </Link>
        </div>
    );
}

export default IssueTop;
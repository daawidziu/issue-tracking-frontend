import IssueItem from "./IssueItem";
import {Issue} from "../types";

type Props = {
    issues: Issue[]
}

const IssueList = ({issues}: Props) => {
    return (
        <ul>
            {issues.map(i =>
                <IssueItem
                    key={i.id}
                    issue={i}
                />
            )}
        </ul>
    );
}

export default IssueList;
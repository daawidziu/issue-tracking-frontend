import {Comment} from "../types";
import {useEffect, useState} from "react";
import Api from "../services/api";
import CommentItem from "./CommentItem";
import styles from '../styles/components/_Comment.module.sass';

type Props = {
    issueId: number
    reRenderValue: boolean
}

const CommentList = ({issueId, reRenderValue}: Props) => {
    const [data, setData] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await Api.get(`issues/${issueId}/comments`);
                setData(response.data);
                setError(null)
            } catch (e) {
                setError((e as Error).message);
                setData([]);
            } finally {
                console.log(data)
                setIsLoading(false)
            }
        }
        getData();
    }, [reRenderValue]);
    return (
        isLoading ?
            <span> {reRenderValue} </span>
            :
            <ul className={styles.commentList}>
                {data.map(comment =>
                    <CommentItem key={comment.id} comment={comment}/>
                )}
            </ul>
    );
}

export default CommentList;
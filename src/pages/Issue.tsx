import {useParams} from "react-router-dom";
import IssueDetails from "../components/IssueDetails";
import {useAuth} from "../contexts/AuthContext";
import IssueItem from "../components/IssueItem";
import {useEffect, useState} from "react";
import Api from "../services/api";
import Loading from '../images/Pulse-1.3s-200px.svg';
import stylesTop from '../styles/components/_TopContainer.module.sass';
import stylesComment from '../styles/components/_Comment.module.sass';
import {Issue as IssueType} from "../types";
import CommentAdd from "../components/CommentAdd";
import CommentList from "../components/CommentList";

const Issue = () => {
    const params = useParams();
    const auth = useAuth();

    const [data, setData] = useState<IssueType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [reRenderWorkaround, setReRenderWorkaround] = useState(false)
    const handleReRender = () => setReRenderWorkaround(!reRenderWorkaround)


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await Api.get(`issues/${params.issueId}`);
                setData(response.data);
                setError(null)
            } catch (e) {
                setError((e as Error).message);
                setData(null);
            } finally {
                setIsLoading(false)
            }
        }
        getData();
    }, []);

    if (data == null) return (<img src={Loading} alt='Loading Icon'/>);

    return (
        <>
            {auth.state.logged ?
                <>

                    <IssueDetails issue={data}/>
                </>
                :
                <>
                    <div className={stylesTop.topContainer}>
                        <span>Log in to edit issue & add comment</span>
                    </div>
                    <IssueItem issue={data}/>
                </>
            }
            <section className={stylesComment.commentContainer}>
                {auth.state.logged && <CommentAdd issueId={parseInt(params?.issueId as string)} reRender={handleReRender}/>}
                <CommentList issueId={parseInt(params?.issueId as string)} reRenderValue={reRenderWorkaround}/>
            </section>
        </>
    );
}

export default Issue;
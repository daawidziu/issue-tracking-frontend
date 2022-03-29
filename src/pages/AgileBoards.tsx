import {useState, useEffect} from "react";
import Api from "../services/api";
import Loading from '../images/Pulse-1.3s-200px.svg';
import {Issue} from "../types";
import {useAuth} from "../contexts/AuthContext";
import stylesTop from "../styles/components/_TopContainer.module.sass";
import stylesDD from '../styles/components/_DragDrop.module.sass';
import IssueDragList from "../components/IssueDragList";


const AgileBoards = () => {
    const [data, setData] = useState<Issue[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const auth = useAuth();

    useEffect(() => {
        Api.get('issues/')
            .then(r => setData(r.data))
            .catch(r => setIsLoading(true))
            .finally(() => setIsLoading(false));
    }, []);

    return (<>
            {!auth.state.logged &&
                <div className={stylesTop.topContainer}>
                    <span>Log in to change issue status</span>
                </div>}
            <section className={stylesDD.container}>
                {isLoading ?
                    <img src={Loading} alt={'Loading Animation'}/> :
                    <>
                        <IssueDragList issues={data} setIssues={setData}/>
                    </>
                }
            </section>
        </>
    );
}

export default AgileBoards;
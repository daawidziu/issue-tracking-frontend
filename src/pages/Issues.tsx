import {useState, useEffect} from "react";
import Api from "../services/api";
import Loading from '../images/Pulse-1.3s-200px.svg';
import IssueList from "../components/IssueList";
import IssueTop from "../components/IssueTop";
import {Issue} from "../types";

const Issues = () => {
    const [data, setData] = useState<Issue[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await Api.get('issues/');
                setData(response.data);
                setError(null)
            } catch (e) {
                setError((e as Error).message);
                setData([]);
            } finally {
                setIsLoading(false)
            }
        }
        getData();
    }, []);

    return (
        <div>
            <section>
                {isLoading ?
                    <img src={Loading} alt={'Loading Animation'}/> :
                    <>
                        <IssueTop count={data.length}/>
                        <IssueList issues={data}/>
                    </>
                }
            </section>

        </div>
    );
}

export default Issues;
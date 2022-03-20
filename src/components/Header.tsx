import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import {useState} from "react";
import styles from '../styles/components/_Header.module.sass';
import stylesBtn from '../styles/components/_button.module.sass';
import hamburgerIcon from '../images/icons8-menu-30.png';
import closeIcon from '../images/icons8-close-32.png';
import {useAuth} from "../contexts/AuthContext";

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const auth = useAuth()

    return (
        <header className={styles.headerBar}>
            <Link to="/" className={styles.logo}>Issue Tracker</Link>
            <NavBar expanded={expanded}/>
            <div className={styles.headerButtons}>
                {auth.state.logged ?
                    <button className={stylesBtn.btnLarge + ' ' + stylesBtn.btnSecondary + ' ' + stylesBtn.btn}
                            onClick={() => auth.dispatch({type: "logout"})}>
                        Logout
                    </button>
                    :
                    <>
                        <Link to="/register">
                            <button
                                className={stylesBtn.btnLarge + ' ' + stylesBtn.btnOff + ' ' + stylesBtn.btn}>Register
                            </button>
                        </Link>

                        <Link to="/login">
                            <button
                                className={stylesBtn.btnLarge + ' ' + stylesBtn.btnSecondary + ' ' + stylesBtn.btn}>Login
                            </button>
                        </Link>
                    </>
                }
                <button className={styles.hamburgerMenu} onClick={() => setExpanded(!expanded)} aria-controls='navList'>
                    <img src={expanded ? closeIcon : hamburgerIcon} alt='Menu icon'/>
                </button>
            </div>
        </header>
    );
}

export default Header;
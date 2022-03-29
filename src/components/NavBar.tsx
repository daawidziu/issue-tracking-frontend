import {NavLink} from 'react-router-dom';
import styles from '../styles/components/_NavBar.module.sass';

type Route = {
    name: string
    url: string
}

type Props = {
    expanded: boolean
    setExpanded: Function
}

const links: Route[] = [
    {
        name: 'Issues',
        url: '/',
    },
    {
        name: 'Projects',
        url: '/projects',
    },
    {
        name: 'Agile Boards',
        url: 'agile-boards',
    }
];

const NavBar = ({expanded, setExpanded}: Props) => {
    return (
        <nav>
            <ul className={styles.navList} data-expanded={`${expanded}`} aria-expanded={`${expanded}`}>
                {links.map(link =>
                    <ul key={link.name}>
                        <li key={link.url}>
                            <NavLink to={link.url} onClick={() => setExpanded(false)}
                                     className={({isActive}) => isActive ? styles.navItemSelected + ' ' + styles.navItem : styles.navItem}>
                                {link.name}
                            </NavLink>
                        </li>
                    </ul>)
                }
            </ul>

        </nav>
    );
}

export default NavBar;
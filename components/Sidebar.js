import Link from 'next/link';
import styles from '../css/Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <ul>
                <li>
                    <Link href='/'>
                        <a href='#'>Izvozi</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

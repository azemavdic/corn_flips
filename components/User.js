import Link from 'next/link';
import styles from '../css/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faTimesCircle,
    faTrash,
    faUserEdit,
} from '@fortawesome/free-solid-svg-icons';

const User = ({ user, index, deleteHandler, curUser }) => {
    return (
        <tr key={user._id}>
            <td>{index}</td>
            <td>
                <Link href={`/users/${user._id}`}>
                    <a className={styles.naziv}>{user.name}</a>
                </Link>
            </td>
            <td>
                <a className={styles.email} href={`mailto:${user.email}`}>
                    {user.email}
                </a>
            </td>
            <td style={{ textAlign: 'center' }}>
                {user.isProizvodnja ? (
                    <div className={styles.dousera}>
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            color='green'
                            size='2x'
                        />
                    </div>
                ) : (
                    <div className={styles.doizvoza}>
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            color='red'
                            size='2x'
                        />
                    </div>
                )}
            </td>
            <td style={{ textAlign: 'center' }}>
                {user.isKomercijala ? (
                    <div className={styles.dousera}>
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            color='green'
                            size='2x'
                        />
                    </div>
                ) : (
                    <div className={styles.doizvoza}>
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            color='red'
                            size='2x'
                        />
                    </div>
                )}
            </td>
            <td style={{ textAlign: 'center' }}>
                {user.isAdmin ? (
                    <div className={styles.dousera}>
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            color='green'
                            size='2x'
                        />
                    </div>
                ) : (
                    <div className={styles.doizvoza}>
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            color='red'
                            size='2x'
                        />
                    </div>
                )}
            </td>
            {curUser && curUser[0].isAdmin && (
                <td>
                    <div className={styles.flex}>
                        <Link href={`/users/edit/${user._id}`}>
                            <a>
                                <FontAwesomeIcon
                                    icon={faUserEdit}
                                    color='orange'
                                    style={{ cursor: 'pointer' }}
                                />
                            </a>
                        </Link>
                        <FontAwesomeIcon
                            icon={faTrash}
                            color='red'
                            style={{ cursor: 'pointer' }}
                            onClick={() => deleteHandler(user._id)}
                        />
                    </div>
                </td>
            )}
        </tr>
    );
};

export default User;

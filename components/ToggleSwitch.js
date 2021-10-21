import styles from '../css/ToggleSwitch.module.css';

const ToggleSwitch = ({ label, zavrsen, changeToggle }) => {
    return (
        <div className={styles.container}>
            {label}{' '}
            <div className={styles.toggleswitch}>
                <input
                    type='checkbox'
                    className={styles.checkbox}
                    name={label}
                    id={label}
                    checked={zavrsen}
                    onChange={changeToggle}
                />
                <label className={styles.label} htmlFor={label}>
                    <span className={styles.inner} />
                    <span className={styles.switch} />
                </label>
            </div>
        </div>
    );
};

export default ToggleSwitch;

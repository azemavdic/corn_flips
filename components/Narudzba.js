import styles from "../css/Form.module.css";

const Narudzba = ({ el, i, onInputChange, onRemove, onAdd, inputList }) => {
  return (
    <div className={styles.modal}>
      <input
        type='text'
        name='naziv'
        value={el.naziv}
        placeholder='naziv'
        onChange={(e) => onInputChange(e, i)}
      />
      <input
        className={styles.ml10}
        type='text'
        name='kolicina'
        value={el.kolicina}
        placeholder='količina u kutijama'
        onChange={(e) => onInputChange(e, i)}
      />
      <div className={styles.btnbox}>
        {inputList.length !== 1 && (
          <button className={styles.red} onClick={() => onRemove(i)}>
            Izbriši
          </button>
        )}
        {inputList.length - 1 === i && (
          <button className={styles.green} onClick={onAdd}>
            Novi
          </button>
        )}
      </div>
    </div>
  );
};

export default Narudzba;

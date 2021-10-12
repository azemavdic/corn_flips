import styles from "../css/Form.module.css";
import Select from "react-select";

const options = [
  { value: "flips25", label: "Gold flips 25g" },
  { value: "flips50", label: "Gold flips 50g" },
  { value: "flips140", label: "Gold flips 140g" },
  { value: "cips30", label: "Gold chips 30g" },
  { value: "cips85", label: "Gold chips 85g slani" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
  input: (provided, state) => ({
    ...provided,
    width: "150px",
  }),
};

const Narudzba = ({
  el,
  i,
  onInputChange,
  onRemove,
  onAdd,
  inputList,
  setSelect,
  // select,
}) => {
  return (
    <div className={styles.modal}>
      {/* <input
        type='text'
        name='naziv'
        value={el.naziv}
        placeholder='naziv'
        onChange={(e) => onInputChange(e, i)}
      /> */}
      <Select
        placeholder='Odaberi proizvod'
        onChange={setSelect}
        options={options}
        name='naziv'
        styles={customStyles}
        // className={styles.select}
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

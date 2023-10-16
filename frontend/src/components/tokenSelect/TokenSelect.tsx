import { useState } from 'react';
import { Modal } from '../UI/Modal/Modal';
import { IToken, IToketSelect } from '../../types/types';
import styles from './TokenSelect.module.scss';
import TextChipsOutline from '../UI/textChipsOutline/TextChipsOutline';

function TokenSelect(props: IToketSelect) {
  const {
    isOpen,
    limit = 1,
    data,
    name = '',
    onClose,
    selected = [],
    defaultSelected = [],
  } = props;

  const [selectedTokensArr, setSelectedTokensArr] = useState<Array<IToken>>([...selected]);

  const handleOnClose = () => {
    onClose(selectedTokensArr);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, item: IToken) => {
    if (limit > 1) {
      if (e.currentTarget.checked && selectedTokensArr.length < limit) {
        setSelectedTokensArr((prevState) => [...prevState, item]);
      } else {
        const index = selectedTokensArr.indexOf(item);
        if (index > -1) {
          const arr = [...selectedTokensArr];
          arr.splice(index, 1);
          setSelectedTokensArr([...arr]);
        }
      }
    } else {
      if (e.currentTarget.checked) {
        setSelectedTokensArr([item]);
      }
    }
  };

  const handleRemove = (address: string) => {
    let indexEl;
    const result = selectedTokensArr.find((item, index) => {
      if (item.address === address) {
        indexEl = index;
        return item;
      }
    });

    if (result && indexEl) {
      const arr = selectedTokensArr;
      arr.splice(indexEl, 1);
      setSelectedTokensArr([...arr]);
    }
  };

  const isSelected = (selectedArr: Array<IToken>, token: IToken) => {
    const index = selectedArr.indexOf(token);
    return index > -1 ? true : false;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <div className={styles.token_select}>
        <div className={styles.token_select__selected}>
          {defaultSelected.length > 0 &&
            defaultSelected.map((item, index) => (
              <TextChipsOutline
                key={index}
                id={item.address}
                value={item.name}
                icon={item.iconPath}
              />
            ))}
          {selectedTokensArr.length > 0 &&
            selectedTokensArr.map(
              (item, index) =>
                !isSelected(defaultSelected, item) && (
                  <TextChipsOutline
                    key={index}
                    id={item.address}
                    value={item.name}
                    icon={item.iconPath}
                    onClose={handleRemove}
                  />
                )
            )}
        </div>

        <div className={styles.token_select__items}>
          {Object.keys(data).map((item) =>
            defaultSelected.find((defaultItem) => data[item].name === defaultItem.name) ? (
              <div className={styles.token_select__default} key={data[item].name}>
                <div className={styles.token_select__item}>
                  <div className={styles.token_select__icon}>
                    <img src={data[item].iconPath} alt='' />
                  </div>
                  <div className={styles.token_select__info}>
                    <p className={styles.token_select__title}>{data[item].name}</p>
                    <p className={styles.token_select__name}>{data[item].name}</p>
                  </div>
                </div>
              </div>
            ) : (
              <label className={styles.token_select__label} key={data[item].name}>
                <input
                  className={styles.input}
                  onChange={(e) => handleOnChange(e, data[item])}
                  checked={isSelected(selectedTokensArr, data[item])}
                  type={limit > 1 ? 'checkbox' : 'radio'}
                  name={name}
                />
                <div className={styles.token_select__item}>
                  <div className={styles.token_select__icon}>
                    <img src={data[item].iconPath} alt='' />
                  </div>
                  <div className={styles.token_select__info}>
                    <p className={styles.token_select__title}>{data[item].name}</p>
                    <p className={styles.token_select__name}>{data[item].name}</p>
                  </div>
                </div>
              </label>
            )
          )}
        </div>
      </div>
    </Modal>
  );
}

export default TokenSelect;

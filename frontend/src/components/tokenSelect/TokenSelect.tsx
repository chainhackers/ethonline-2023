import { useState } from 'react';
import { Modal } from '../UI/Modal/Modal';
import { IToken, IToketSelect } from '../../types/types';
import styles from './TokenSelect.module.scss';

function TokenSelect(props: IToketSelect) {
  const { isOpen, limit = 1, data, name = '', onClose, selected = [] } = props;
  const [selectedTokensArr, setSelectedTokensArr] = useState<Array<IToken>>([...selected]);

  const handleOnClose = () => {
    onClose(selectedTokensArr);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, item: IToken) => {
    if (limit > 1) {
      if (e.currentTarget.checked) {
        setSelectedTokensArr((prevState) => [...prevState, item]);
      } else {
        if (selectedTokensArr) {
          const index = selectedTokensArr.indexOf(item);
          if (index > -1) {
            const arr = selectedTokensArr;

            arr.splice(index, 1);
            setSelectedTokensArr(arr);
          }
        }
      }
    } else {
      if (e.currentTarget.checked) {
        setSelectedTokensArr([item]);
      }
    }
  };

  const getDefaultValue = (deafultValesArr: Array<IToken>, tokenAddress: IToken) => {
    if (deafultValesArr) {
      const index = deafultValesArr.indexOf(tokenAddress);
      return index > -1 ? true : false;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleOnClose();
      }}
    >
      <div className={styles.token_select}>
        {Object.keys(data).map((item) => (
          <label className={styles.token_select__label} key={data[item].name}>
            <input
              className={styles.input}
              onChange={(e) => handleOnChange(e, data[item])}
              defaultChecked={getDefaultValue(selectedTokensArr, data[item])}
              type={limit > 1 ? 'checkbox' : 'radio'}
              name={name}
            />
            <div className={styles.token_select__item} key={data[item].name}>
              <div className={styles.token_select__icon}>
                <img src={data[item].iconPath} alt='' />
              </div>
              <div className={styles.token_select__info}>
                <p className={styles.token_select__title}>{data[item].name}</p>
                <p className={styles.token_select__name}>{data[item].name}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </Modal>
  );
}

export default TokenSelect;

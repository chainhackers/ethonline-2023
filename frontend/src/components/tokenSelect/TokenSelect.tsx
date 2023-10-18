import { useEffect, useState } from 'react';
import { Modal } from '../UI/Modal/Modal';
import { IToken, IToketSelect } from '../../types/types';
import styles from './TokenSelect.module.scss';
import TextChipsOutline from '../UI/textChipsOutline/TextChipsOutline';
import { getFindToken } from '../../utils/getFindToken';

function TokenSelect(props: IToketSelect) {
  const {
    isOpen,
    limit = 1,
    data,
    name = '',
    onClose,
    defaultSelected = [],
    selected = [],
  } = props;

  const [selectedTokens, setSelectedTokens] = useState<Set<IToken>>(new Set(selected));

  useEffect(() => {
    setSelectedTokens(new Set(selected));
  }, [selected]);

  const handleOnClose = () => {
    onClose([...selectedTokens]);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, item: IToken) => {
    if (limit > 1) {
      const unicValuesSet = new Set([...defaultSelected, ...selectedTokens]);
      if (e.currentTarget.checked && unicValuesSet.size < limit) {
        setSelectedTokens((prevState) => new Set([...prevState, item]));
        console.log(`Pool tokens added: `, item.name);
      } else {
        const newSet = new Set(selectedTokens);
        newSet.delete(item);
        setSelectedTokens(newSet);
      }
    } else {
      if (e.currentTarget.checked) {
        setSelectedTokens(new Set<IToken>().add(item));
        console.log(`Anchor token selected: `, item.name);
      }
    }
  };

  const handRemoveTextChips = (address: string) => {
    const result = getFindToken([...selectedTokens], address);
    if (result) {
      const newSet = new Set(selectedTokens);
      newSet.delete(result);
      setSelectedTokens(newSet);
    }
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
          {selectedTokens.size > 0 &&
            [...selectedTokens].map(
              (item, index) =>
                !defaultSelected.find((defaultItem) => defaultItem === item) && (
                  <TextChipsOutline
                    key={index}
                    id={item.address}
                    value={item.name}
                    icon={item.iconPath}
                    onClose={handRemoveTextChips}
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
                  checked={selectedTokens.has(data[item]) ? true : false}
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

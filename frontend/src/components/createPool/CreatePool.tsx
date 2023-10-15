import styles from './CreatePool.module.scss';
import ButtonPrimary from '../UI/buttonPrimary/ButtonPrimary';
import FormHeader from './formHeader/FormHeader';
import InputField from '../inputField/InputField';
import FormElTitle from '../formElTitle/FormElTitle';
import TokenSelect from '../tokenSelect/TokenSelect';
import { useState } from 'react';
import { TOKENS } from '../../constants/constants';
import InputButton from '../UI/inputButton/InputButton';
import { IToken } from '../../types/types';
import TextBtn from '../UI/textBtn/TextBtn';

function CreatePool() {
  const [anchorSelectState, setAnchorSelectState] = useState(false);
  const [anchorSelected, setAnchorSelected] = useState<Array<IToken>>([]);

  const [nativeSelectState, setNativeSelectState] = useState(false);
  const [nativeSelected, setNativeSelected] = useState<Array<IToken>>([]);

  const handleAnchorSelectData = (value: Array<IToken>) => {
    setAnchorSelectState(false);
    setAnchorSelected(value);
  };

  const handleNativeSelectData = (value: Array<IToken>) => {
    setNativeSelectState(false);
    setNativeSelected(value);
    console.log(value);
  };

  return (
    <div className={styles.create_pool}>
      <div className={styles.create_pool__box}>
        <div className={styles.create_pool__header}>
          <FormHeader linkText='Your assets' title='Create Pool' />
        </div>
        <form className={styles.create_pool__form}>
          <div className={styles.create_pool__form_el}>
            <FormElTitle>Anchor currency</FormElTitle>
            <InputButton
              value={anchorSelected[0]?.name}
              defaultText='Select a token'
              icon={anchorSelected[0]?.iconPath}
              onClick={() => {
                setAnchorSelectState(true);
              }}
            />
          </div>
          <div className={styles.create_pool__form_el}>
            <FormElTitle>Approved Tokens</FormElTitle>
            <TextBtn
              plus
              onClick={() => {
                setNativeSelectState(true);
              }}
              disabled={!anchorSelected[0] && true}
            >
              Add token
            </TextBtn>
          </div>
          <div className={styles.create_pool__form_el}>
            <FormElTitle>Operator fee</FormElTitle>
            <InputField type='number' min={0} max={100} handleInputOnChange={() => {}} />
          </div>
          <ButtonPrimary>Preview</ButtonPrimary>
        </form>
      </div>

      <TokenSelect
        isOpen={anchorSelectState}
        limit={1}
        name={'anchorToken'}
        data={TOKENS}
        onClose={handleAnchorSelectData}
        selected={anchorSelected}
      />

      <TokenSelect
        isOpen={nativeSelectState}
        limit={20}
        data={TOKENS}
        onClose={handleNativeSelectData}
        selected={nativeSelected}
      />
    </div>
  );
}

export default CreatePool;

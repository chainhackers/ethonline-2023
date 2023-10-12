import styles from './CreatePool.module.scss';
import ButtonPrimary from '../UI/buttonPrimary/ButtonPrimary';
import FormHeader from './formHeader/FormHeader';
import InputField from '../inputField/InputField';
import FormElTitle from '../formElTitle/FormElTitle';

function CreatePool() {
  return (
    <div className={styles.create_pool}>
      <div className={styles.create_pool__box}>
        <div className={styles.create_pool__header}>
          <FormHeader linkText='Your assets' title='Create Pool' />
        </div>
        <form className={styles.create_pool__form}>
          <div className={styles.create_pool__form_el}>
            <FormElTitle>Operator fee</FormElTitle>
            <InputField type='number' min={0} max={100} handleInputOnChange={() => {}} />
          </div>
          <ButtonPrimary>Preview</ButtonPrimary>
        </form>
      </div>
    </div>
  );
}

export default CreatePool;

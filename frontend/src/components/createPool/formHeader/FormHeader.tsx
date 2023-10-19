import ButtonSm from '../../UI/buttonSm/ButtonSm';
import styles from './FormHeader.module.scss';

interface IFormHeader {
  title: string;
  linkText: string;
  handleBtnClick: () => void;
}

function FormHeader(props: IFormHeader) {
  const { title, linkText, handleBtnClick } = props;

  return (
    <div className={styles.form_header}>
      <a className={styles.form_header__link} href='#'>
        <img className={styles.form_header__link_icon} src='assets/img/arrow_back.svg' alt='' />{' '}
        <span>{linkText}</span>
      </a>
      <h2 className={styles.form_header__title}>{title}</h2>
      <ButtonSm onClick={handleBtnClick}>Clear All</ButtonSm>
    </div>
  );
}

export default FormHeader;

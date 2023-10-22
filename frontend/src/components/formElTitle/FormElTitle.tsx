import styles from './FormElTitle.module.scss';

interface IFormElTitle {
  children: React.ReactNode;
}

function FormElTitle(props: IFormElTitle) {
  return <p className={styles.form_el_title}>{props.children}</p>;
}

export default FormElTitle;

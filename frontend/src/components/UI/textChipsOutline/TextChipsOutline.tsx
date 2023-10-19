import styles from './TextChipsOutline.module.scss';

interface ITextChipsOutline {
  id: string;
  icon?: string;
  value: string;
  onClose?: (id: string) => void;
}

function TextChipsOutline(props: ITextChipsOutline) {
  const { id, icon, value, onClose } = props;

  const handleOnclose = () => {
    if (onClose) onClose(id);
  };

  return (
    <div className={styles.text_chips}>
      <div className={styles.text_chips__inner}>
        {icon && (
          <div className={styles.text_chips__icon}>
            <img src={icon} alt='' />
          </div>
        )}
        <p className={styles.text_chips__text}>{value}</p>
        {onClose && (
          <button className={styles.close_btn} type='button' onClick={handleOnclose}></button>
        )}
      </div>
    </div>
  );
}

export default TextChipsOutline;

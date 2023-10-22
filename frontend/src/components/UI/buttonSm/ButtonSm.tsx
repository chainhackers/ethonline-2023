import styles from './ButtonSm.module.scss';
import { RefObject } from 'react';

interface IButtonSm extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnRef?: RefObject<HTMLButtonElement>;
  children: React.ReactNode;
}

function ButtonSm(props: IButtonSm) {
  const { btnRef, children, ...btnProps } = props;

  return (
    <button type='button' className={styles.button} ref={btnRef} {...btnProps}>
      <span className={styles.button__inner}>{children}</span>
    </button>
  );
}

export default ButtonSm;

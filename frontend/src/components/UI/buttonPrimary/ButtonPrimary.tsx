import cn from 'classnames';
import styles from './ButtonPrimary.module.scss';
import { RefObject } from 'react';

export interface IButtonPrimary extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnRef?: RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  stylesInherit?: boolean;
}

export default function ButtonPrimary(props: IButtonPrimary) {
  const { btnRef, children, stylesInherit = false, ...btnProps } = props;

  return (
    <button
      type='button'
      className={cn(styles.button, stylesInherit && styles.styles_inherit)}
      ref={btnRef}
      {...btnProps}
    >
      <span className={styles.button__inner}>{children}</span>
    </button>
  );
}

import styles from './TextBtn.module.scss';
import { RefObject } from 'react';

interface ITextBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnRef?: RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  plus?: boolean;
}

function TextBtn(props: ITextBtn) {
  const { btnRef, children, plus, ...btnProps } = props;

  return (
    <button type='button' className={styles.button} ref={btnRef} {...btnProps}>
      {plus && (
        <svg
          className={styles.button_icon}
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
        >
          <path d='M15 9.75H9.75V15H8.25V9.75H3V8.25H8.25V3H9.75V8.25H15V9.75Z' fill='#39E193' />
        </svg>
      )}
      <span className={styles.button__inner}>{children}</span>
    </button>
  );
}

export default TextBtn;

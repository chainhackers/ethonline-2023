import cn from 'classnames';
import React from 'react';
import styles from './InputButton.module.scss';

interface IInputButton extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  invalid?: boolean;
  defaultText?: string;
  icon?: string;
  value: string;
}

const InputButton = React.forwardRef<HTMLInputElement, IInputButton>((props, ref) => {
  const { error = '', invalid = false, defaultText, icon, value, onClick, ...inputProps } = props;

  return (
    <div className={cn(styles.input__wrapper, (error || invalid) && styles.invalid)}>
      <div
        className={cn(
          styles.input__box,
          (error || invalid) && styles.invalid,
          icon && styles.with_icon
        )}
        onClick={onClick}
      >
        <input
          ref={ref}
          className={cn(styles.input, value && styles.not_empty)}
          {...inputProps}
          type='button'
          defaultValue={value ? value : defaultText}
        />
        {icon && (
          <div className={styles.input__icon}>
            <img src={icon} alt='' />
          </div>
        )}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
});

export default InputButton;

/* eslint-disable react-refresh/only-export-components */
import cn from 'classnames';
import React, { memo, useState } from 'react';
import styles from './InputField.module.scss';

interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  invalid?: boolean;
  defaultValue?: number;
  min: number;
  max: number;
  symbol?: string;
  handleInputOnChange: (value: number) => void;
}

const InputField = React.forwardRef<HTMLInputElement, IInputFieldProps>((props, ref) => {
  const {
    error = '',
    invalid,
    disabled,
    defaultValue = 0,
    value = defaultValue,
    min,
    max,
    symbol = '',
    handleInputOnChange,
    ...inputProps
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) === min) {
      setInputValue('');
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.slice(0, max.toString().length);
    setInputValue(value);
    handleInputOnChange(Number(value));
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) >= max) {
      setInputValue(max);
    } else if (Number(e.currentTarget.value) <= min) {
      setInputValue(min);
    } else if (!e.currentTarget.value) {
      setInputValue(e.currentTarget.value);
    }
  };

  return (
    <div className={cn(styles.input__wrapper, (error || invalid) && styles.invalid)}>
      <label className={cn(styles.input__label, (error || invalid) && styles.invalid)}>
        <input
          className={styles.input}
          ref={ref}
          disabled={disabled}
          value={inputValue}
          {...inputProps}
          onChange={(e) => handleOnChange(e)}
          onFocus={(e) => handleOnFocus(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {symbol && <span className={styles.symbol}>{symbol}</span>}
      </label>
    </div>
  );
});

export default memo(InputField);

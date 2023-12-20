import React, {useState} from 'react';
import styles from './myinput.scss';
import classNames from "classnames";

interface IMyInput {
  name: string,
  value?: string | number,
  class?: string,
  type?: string,
  onChange?: (value: string | number) => void
}
export function MyInput(props: IMyInput) {
  const inputClass = classNames("input-reset", props.class)
  const [value, setValue] = useState(props.value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue)
    if (props.onChange) {
      props.onChange(newValue)
    }
  }

  return (
    <input name={props.name}
           value={value}
           className={inputClass}
           type={props.type}
           onChange={handleChange}
    />
  );
}

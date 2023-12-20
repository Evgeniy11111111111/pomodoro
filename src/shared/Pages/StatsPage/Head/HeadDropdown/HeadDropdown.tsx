import React, {useEffect} from 'react';
import styles from './headdropdown.scss';
import {useDropdownPosition} from "../../../../hooks/useDropdownPosition";
import {useCloseDropdown} from "../../../../hooks/useCloseDropdown";
import {changeSelectWeekly, IWeeklyPomodoros} from "../../../../../store/donePomodoroStore";
import ReactDOM from "react-dom";
import classNames from "classnames";
import {EColor, Text} from "../../../../Text";

interface IHeadDropdown {
  buttonRef: React.RefObject<HTMLButtonElement>
  onClose?: () => void
  items?: IWeeklyPomodoros[]
}
export function HeadDropdown({buttonRef, onClose, items}: IHeadDropdown) {
  const [dropdownPosition] = useDropdownPosition({buttonRef})
  const node = document.querySelector('#dropdown_root')
  const ref = useCloseDropdown({onClose})
  const listClasses = classNames("list-reset", styles.list)
  const btnClasses = classNames("btn-reset", styles.btn)

  if (!node) return null

  const handleItem = (item: IWeeklyPomodoros) => {
    changeSelectWeekly(item.weekNumber)
    onClose
  }
  return ReactDOM.createPortal((
    <div className={styles.dropdown}
        ref={ref}
        style={{
      top: dropdownPosition.top,
      left: dropdownPosition.left
    }}>
      {items && items.length > 0 && (
          <ul className={listClasses}>
            {items.map(item => (
                <li key={item.weekNumber + item.year} className={styles.item}>
                  <button onClick={() => {handleItem(item)}}
                          className={btnClasses}
                  >
                    <Text size={16} lheight={17} color={EColor.totalBlack}>
                      {item.value}
                    </Text>
                  </button>
                </li>
            ))}
          </ul>
      )}
    </div>
  ), node);
}

import React from 'react';
import styles from './actionmenulist.scss';
import {useDropdownPosition} from "../../../../../../../hooks/useDropdownPosition";
import {useCloseDropdown} from "../../../../../../../hooks/useCloseDropdown";
import ReactDOM from "react-dom";
import {EIcon} from "../../../../../../../Icon";
import {ActionBtn} from "../ActionBtn";
import {openModal} from "../../../../../../../../store/actionMenuListStore";
import {
    $listTaskStore,
    decreasePomodoroItem,
    increasePomodoroItem,
    isTrueEditingTask,
} from "../../../../../../../../store/listTaskStore";
import {closeDropdown} from "../../../../../../../../store/dropdownStore";
import {useStore} from "effector-react";

interface IActionMenuList {
  id: number,
  buttonRef: React.RefObject<HTMLButtonElement>,
  onClose?: () => void,
}

export function ActionMenuList({buttonRef, onClose, id}: IActionMenuList) {
  const [dropdownPosition] = useDropdownPosition({buttonRef})
  const node = document.querySelector('#dropdown_root')
  const ref = useCloseDropdown({onClose})
  const elements = useStore($listTaskStore)

  function disabledDecrease(): boolean {
      const element = elements.find(elem => elem.id === id);

      return element ? element.pomodoro_count < 2 : false;
  }

  if (!node) return null

  function openModalClick() {
      openModal(id)
  }
  function increaseItem(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation()
      increasePomodoroItem(id)
  }

  function decreaseItem(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation()
      decreasePomodoroItem(id)
  }

  function editItem(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation()
      isTrueEditingTask(id)
      closeDropdown(id)
  }

  return ReactDOM.createPortal((
    <div style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left - 68
          }}
         ref={ref}
         className={styles.listWrapper}
    >
        <ul className={'list-reset'}>
            <li className={styles.item} >
                <ActionBtn text={'Увеличить'}
                           onClick={increaseItem}
                           icon={EIcon.Increase}/>
            </li>
            <li className={styles.item} >
                <ActionBtn text={'Уменьшить'}
                           disabled={disabledDecrease()}
                           onClick={decreaseItem}
                           icon={EIcon.Decrease}/>
            </li>
            <li className={styles.item} >
                <ActionBtn text={'Редактировать'}
                           onClick={editItem}
                           icon={EIcon.Edit}/>
            </li>
            <li className={styles.item} >
                <ActionBtn onClick={openModalClick}
                           text={'Удалить'}
                           icon={EIcon.Delete}/>
            </li>
        </ul>

    </div>
  ), node);
}

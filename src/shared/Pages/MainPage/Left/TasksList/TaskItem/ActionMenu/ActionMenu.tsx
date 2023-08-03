import React, {useRef} from 'react';
import styles from './actionmenu.scss';
import {EIcon, Icon} from "../../../../../../Icon";
import classNames from "classnames";
import {ActionMenuList} from "./ActionMenuList";
import {useStore} from "effector-react";
import {$isDropdown, closeDropdown, openDropdown} from "../../../../../../../store/dropdownStore";
import {Modal} from "../../../../../../Modal";
import {Text} from "../../../../../../Text";
interface IActionMenu {
    id: number
}

export function ActionMenu({id}: IActionMenu) {
  const isDropdown = useStore($isDropdown)[id]

  const btnClasses = classNames('btn-reset', styles.btn)
  const buttonRef = useRef(null)

  function toggleDropdown() {
    isDropdown ? closeDropdown(id) :openDropdown(id)
  }

  return (
    <div className={styles.actionMenu} onClick={() => toggleDropdown()}>
      <button ref={buttonRef}
              className={btnClasses}
      >
        <Icon name={EIcon.ActionMenu} />
      </button>
        {isDropdown && (
            <ActionMenuList id={id} onClose={() => closeDropdown(id)} buttonRef={buttonRef}/>
        )}
    </div>
  );
}

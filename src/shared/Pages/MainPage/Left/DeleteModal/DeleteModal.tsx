import React from 'react';
import styles from './deletemodal.scss';
import {useCloseDropdown} from "../../../../hooks/useCloseDropdown";
import {$currentId, closeModal} from "../../../../../store/actionMenuListStore";
import classNames from "classnames";
import {EIcon, Icon} from "../../../../Icon";
import {EBold, EColor, Text} from "../../../../Text";
import {useStore} from "effector-react";
import {isFalseAnimatedTask, removeItemTask} from "../../../../../store/listTaskStore";

export function DeleteModal() {
  const currentId = useStore($currentId)
  function onClose() {
    closeModal()
  }

  function remove() {
      if (currentId) {
          isFalseAnimatedTask(currentId)
          setTimeout(() => {
            removeItemTask(currentId)
            closeModal()
          }, 300)
      }
  }

  const ref = useCloseDropdown({onClose})
  const closeClasses = classNames('btn-reset', styles.close)
  const removeClasses = classNames('btn-reset', styles.remove)
  const cancelClasses = classNames('btn-reset', styles.cancel)
  return (
    <div className={styles.content} ref={ref}>
      <button onClick={onClose} className={closeClasses}>
        <Icon name={EIcon.Close} />
      </button>
      <Text className={styles.text} As={"div"} size={24} lheight={17}>Удалить задачу?</Text>
      <button onClick={remove} className={removeClasses}>
          <Text lheight={17} color={EColor.white} bold={EBold.medium}>Удалить</Text>
      </button>
      <button onClick={onClose} className={cancelClasses}>
          <Text lheight={17} bold={EBold.light}>Отмена</Text>
      </button>
    </div>
  );
}

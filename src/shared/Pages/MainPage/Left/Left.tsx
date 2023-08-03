import React from 'react';
import styles from './left.scss';
import {Description} from "./Description";
import {FormAddTask} from "./FormAddTask";
import {TasksList} from "./TasksList";
import {useStore} from "effector-react";
import {$currentId, $isModalOpen} from "../../../../store/actionMenuListStore";
import {Modal} from "../../../Modal";
import {DeleteModal} from "./DeleteModal";

export function Left() {
  const activeModal = useStore($isModalOpen)
  const id = useStore($currentId)
  return (
    <div className={styles.left}>
      <Description/>
      <FormAddTask />
      <TasksList />
      {activeModal && (
          <Modal>
              <DeleteModal/>
          </Modal>
      )}
    </div>
  );
}

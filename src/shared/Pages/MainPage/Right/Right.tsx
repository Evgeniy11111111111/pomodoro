import React from 'react';
import styles from './right.scss';
import {HeadRight} from "./HeadRight";
import {BodyRight} from "./BodyRight";
import {useStore} from "effector-react";
import {$settingModal} from "../../../../store/actionMenuListStore";
import {Modal} from "../../../Modal";
import {SettingsModal} from "../SettingsModal";

export function Right() {
  const isActiveModal = useStore($settingModal)

  return (
    <div className={styles.right}>
      <HeadRight />
      <BodyRight />
      {isActiveModal && (
          <Modal>
              <SettingsModal />
          </Modal>
      )}
    </div>
  );
}

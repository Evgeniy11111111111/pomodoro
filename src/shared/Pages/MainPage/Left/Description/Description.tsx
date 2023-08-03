import React from 'react';
import styles from './description.scss';
import {EBold, Text} from "../../../../Text";
import classNames from "classnames";
import {generateId} from "../../../../../utils/react/generateRandomIndex";

const listDescription = [
    {text: 'Выберите категорию и напишите название текущей задачи'},
    {text: 'Запустите таймер («помидор»)'},
    {text: 'Работайте пока «помидор» не прозвонит'},
    {text: 'Сделайте короткий перерыв (3-5 минут)'},
    {text: 'Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).'}
].map(generateId)

export function Description() {
  const listClasses = classNames(
      'list-reset',
      styles.list
  )

  return (
    <div className={styles.description}>
      <Text className={styles.title} As={"h1"} size={24} lheight={33} bold={EBold.bold}>
        Ура! Теперь можно начать работать:
      </Text>
      <ul className={listClasses}>
          {listDescription.map((item, index) => (
              <li className={styles.item} key={item.id}>
                  <Text bold={EBold.regular} lheight={33}>
                      {item.text}
                  </Text>
              </li>
          ))}
      </ul>
    </div>
  );
}

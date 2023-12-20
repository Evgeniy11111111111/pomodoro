import {createEvent, createStore} from "effector";

// Изменение инпута для задачи

export const updateInput =createEvent<string>();
export const $input = createStore('')
    .on(updateInput, (state, newValue) => newValue)

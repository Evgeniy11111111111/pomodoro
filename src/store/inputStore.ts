import {createEvent, createStore} from "effector";

export const updateInput =createEvent<string>();
export const $input = createStore('')
    .on(updateInput, (state, newValue) => newValue)
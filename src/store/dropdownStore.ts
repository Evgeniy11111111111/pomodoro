import {createEvent, createStore} from "effector";

export const openDropdown = createEvent<number>();
export const closeDropdown = createEvent<number>()

// Store to manage the dropdown state
export const $isDropdown = createStore<Record<number, boolean>>({})
    .on(openDropdown, (state, id) => ({
        ...state,
        [id]: true,
    }))
    .on(closeDropdown, (state, id) => ({
        ...state,
        [id]: false,
    }))
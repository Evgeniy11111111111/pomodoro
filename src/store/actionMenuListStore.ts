import {createEvent, createStore} from "effector";
export const openModal = createEvent<number>()
export const closeModal = createEvent()

export const $modalData = createStore<{id: number | null; isOpen: boolean}>({
    id: null,
    isOpen: false,
})
    .on(openModal, (_, id) => ({ id, isOpen: true }))
    .on(closeModal, (state) => ({...state, isOpen: false}))

export const $currentId = $modalData.map((data) => data.id);
export const $isModalOpen = $modalData.map((data) => data.isOpen);
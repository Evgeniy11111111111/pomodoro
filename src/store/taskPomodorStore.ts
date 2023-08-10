import {$listTaskStore, IItemTask} from "./listTaskStore";
import {createEvent, createStore, sample} from "effector";

const setTrackedItem = createEvent<IItemTask | null>()

export const $trackedItem = createStore<IItemTask | null>(null)
    .on(setTrackedItem, (state, newValue) => newValue)

$listTaskStore.watch(array => {
    const item = array.find(elem => elem.priority === 0) || null
    setTrackedItem(item)
})
import {createEvent, createStore} from "effector";
import { persist } from 'effector-storage/local'
export interface IItemTask {
    id: number;
    name: string;
    pomodoro_count: number;
    priority: number;
    time: number;
}


export const addItemTask = createEvent<IItemTask>()
export const removeItemTask = createEvent<number | null>()
export const updateItemTask = createEvent<IItemTask>()
export const increasePomodoroItem = createEvent<number>()
export const decreasePomodoroItem = createEvent<number>()
export const calculateTotalTime = createEvent()

function limitedPomodoroCount(value: number): number {
    return Math.max(1, value)
}

export function calculateTotalReducer(tasks: IItemTask[]) {
    return tasks.reduce((totalTime, task) => totalTime + task.time, 0)
}

export const $listTaskStore = createStore<IItemTask[]>([])

persist({
    store: $listTaskStore,
    key: 'list'
})

$listTaskStore.on(addItemTask, (state, item) => [...state, item])
              .on(removeItemTask, (state, id) => state.filter(item => item.id !== id))
              .on(updateItemTask, (state, updateItem) => state.map(item => item.id === updateItem.id ? updateItem : item))
              .on(increasePomodoroItem, (state, id) => state.map(item => item.id === id ? {
                  ...item,
                  pomodoro_count: limitedPomodoroCount(item.pomodoro_count + 1),
                  time: 25 * limitedPomodoroCount(item.pomodoro_count + 1)
              } : item))
              .on(decreasePomodoroItem, (state, id) => state.map(item => item.id === id ? {
                  ...item,
                  pomodoro_count: limitedPomodoroCount(item.pomodoro_count - 1),
                  time: 25 * limitedPomodoroCount(item.pomodoro_count - 1)
              } : item))
              .on(calculateTotalTime, (state) => {
                  const totalTime = calculateTotalReducer(state)
                  return state.map(item => ({...item, totalTime}))
              })

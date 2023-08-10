import {createEvent, createStore} from "effector";
import { persist } from 'effector-storage/local'
export interface IItemTask {
    id: number;
    name: string;
    pomodoro_current: number;
    pomodoro_count: number;
    priority: number;
    time: number;
    isEditing: boolean
}

export const addItemTask = createEvent<IItemTask>()
export const removeItemTask = createEvent<number | null>()
export const updateItemNameTask = createEvent<{id: number, newName: string}>()
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
              .on(updateItemNameTask, (state, {id, newName}) => (
                  state.map((item) => (item.id === id ? {...item, name: newName} : item))
              ))
              .on(removeItemTask, (state, id) => {
                  const removedItem = state.find(item => item.id === id)
                  if (removedItem) {
                      const updatedState = state
                          .map(elem => elem.priority > removedItem.priority ? {
                              ...elem,
                              priority: elem.priority - 1
                          } : elem)
                          .filter(elem => elem !== removedItem);

                      return updatedState;
                  }
                  return state;
              })
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



export const isTrueEditingTask = createEvent<number>()
export const isFalseEditingTask = createEvent<number>()

export const $isEditingTask = createStore<Record<number, boolean>>({})
    .on(isTrueEditingTask, (state, id) => ({
        ...state,
        [id]: true
    }))
    .on(isFalseEditingTask, (state, id) => ({
        ...state,
        [id]: false
    }))

export interface IInputTask {
    [id: number]: string
}

export const updateInputTempTask = createEvent<{id: number, value: string}>()
export const $inputTempTask = createStore<IInputTask>({})
    .on(updateInputTempTask, (state, {id, value}) => ({
        ...state,
        [id]: value
    }))
    .on(isTrueEditingTask, (state, id) => {
        const tasks = $listTaskStore.getState()
        const task = tasks.find((task) => task.id === id);
        if (task) {
            return {
                ...state,
                [id]: task.name
            }
        }
        return state
    })
import {createEvent, createStore} from "effector";
import { persist } from 'effector-storage/local'
import {$timersTime} from "./timerTimeStore";
export interface IItemTask {
    id: number;
    name: string;
    pomodoro_current: number;
    pomodoro_count: number;
    priority: number;
    time: number;
    isEditing: boolean
}

//Список задач

export const addItemTask = createEvent<IItemTask>() // Добавление задачи
export const removeItemTask = createEvent<number | null>() // Удаление задачи
export const updateItemNameTask = createEvent<{id: number, newName: string}>() // Изменение назавания определеной задачи
export const increasePomodoroItem = createEvent<number>() // Увелечение количество помидоров
export const decreasePomodoroItem = createEvent<number>() // Уменьшение количество помидоров
export const calculateTotalTime = createEvent() // Общее время на все задачи
export const increasePomodoroCurrent = createEvent() // Увеличение текущего помидора
export const changeItemsTime = createEvent() // Изминение времени для каждой задачи

function limitedPomodoroCount(value: number): number {
    return Math.max(0, value)
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
        time: $timersTime.getState().workTime.time * limitedPomodoroCount(item.pomodoro_count + 1)
    } : item))
    .on(decreasePomodoroItem, (state, id) => state.map(item => item.id === id ? {
        ...item,
        pomodoro_count: limitedPomodoroCount(item.pomodoro_count - 1),
        time: $timersTime.getState().workTime.time * limitedPomodoroCount(item.pomodoro_count - 1)
    } : item))
    .on(calculateTotalTime, (state) => {
        const totalTime = calculateTotalReducer(state)
        return state.map(item => ({...item, totalTime}))
    })
    .on(increasePomodoroCurrent, (state) => state.map((task, index) =>
            index === 0
                ? { ...task, pomodoro_current: task.pomodoro_current + 1 }
                : task
        ))
    .on(changeItemsTime, (state) => {
        return state.map(item => ({...item, time: item.pomodoro_count * $timersTime.getState().workTime.time}))
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

export const isFalseAnimatedTask = createEvent<number>()
export const isTrueAnimatedTask = createEvent<number>()
export const $isAnimatedTask = createStore<Record<number, boolean>>({})
    .on(isTrueAnimatedTask, (state, id) => ({
        ...state,
        [id]: true
    }))
    .on(isFalseAnimatedTask, (state, id) => ({
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

export const initTodayTasks = createEvent()

interface ITodayTasks {
    date: string,
    items: IItemTask[]
}
export const $todayTasks = createStore<ITodayTasks>({date: new Date().toISOString().split('T')[0], items: $listTaskStore.getState()})
    .on(initTodayTasks, (state) => {
        const now = new Date().toISOString().split('T')[0]
        if (now !== state.date) {
            return {
                date: now,
                items: $listTaskStore.getState()
            }
        }
        return state
    })
    .on(addItemTask, (state, payload) => ({
            date: state.date,
            items: [...state.items, payload]
    }))
    .on(updateItemNameTask, (state, payload) => ({
        date: state.date,
        items: state.items.map((item) => item.id === payload.id ? {...item, name: payload.newName} : item)
    }))

persist({
    store: $todayTasks,
    key: "todayTasks"
})

import {createEvent, createStore} from "effector";
import {persist} from "effector-storage/local";
export interface ITimerTime {
    name: string,
    timeForSecond: number,
    time: number,
    value: number,
    timeForStatics?: number,
}

export interface ITimersTime {
    [key: string]: ITimerTime
}

export interface IInputsTimer {
    name: string,
    value: number
}
export const ONE_MINUTES = 60
const initialState: ITimersTime = {
    workTime: {name: 'WORK', timeForSecond: 25 * ONE_MINUTES, time: 25, value: 25, timeForStatics: 25},
    breakTime: {name: 'BREAK', timeForSecond: 25 * ONE_MINUTES, time: 5, value: 5, timeForStatics: 5},
    longBreakTime: {name: 'LONG_BREAK', timeForSecond: 25 * ONE_MINUTES, time: 15, value: 15, timeForStatics: 15},
    countWork: {name: 'COUNT', timeForSecond: 4, time:4, value: 4}
}

// Изменение таймера
export const changeTimeForStatics = createEvent<{name: string}>() // изминение времени для статистики
export const resetTimeForStatics = createEvent() // сброс времени для статистики
export const changeTimeInputs = createEvent() // Изминение времени таймеров
export const changeValueInputs = createEvent() // Изменение временного значение для времени таймеров
export const changeInputsTimersTime = createEvent<{name: string, value: number}>() // Изминение текущего значение инпута
export const $timersTime = createStore<ITimersTime>(initialState)
    .on(changeInputsTimersTime, (state, { name, value }) => {
        const newState = {...state}
        const objTimer = newState[name]
        objTimer.value = value

        return newState
    })
    .on(changeTimeInputs, (state, payload) => {
        const newState = {...state}
        for (let newStateKey in newState) {
            const objTimer = newState[newStateKey]
            objTimer.time = objTimer.value
            objTimer.timeForSecond = objTimer.time * ONE_MINUTES
            objTimer.timeForStatics = objTimer.value
        }
        return newState
    })
    .on(changeValueInputs, (state, payload) => {
        const newState = {...state}
        for (let newStateKey in newState) {
            const objTimer = newState[newStateKey]
            objTimer.value = objTimer.time
        }
        return newState
    })
    .on(changeTimeForStatics, (state, payload) => {
        const newState = {...state}
        if (newState[payload.name]) {
            const objTimer = newState[payload.name]
            objTimer.timeForStatics = objTimer.timeForStatics !== undefined ? objTimer.timeForStatics + 1 : undefined 
        }

        return newState
    })
    .on(resetTimeForStatics, (state, payload) => {
        const newState = {...state}
        for(let newStateKey in newState) {
            const objTimer = newState[newStateKey]
            objTimer.timeForStatics = objTimer.time 
        }
    })
    

persist({
    store: $timersTime,
    key: 'timersTime'
})
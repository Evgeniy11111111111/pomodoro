import {combine, createEffect, createEvent, createStore, forward} from "effector";
import {persist} from "effector-storage/local";
import {$timersTime, ITimerTime} from "./timerTimeStore";
import { $timer } from "./timerStore";
import {getLatestDate} from "../utils/otherFunction/latestDate";
import {generateRandomString} from "../utils/react/generateRandomIndex";
import {nowDate, timeDifference} from "../utils/otherFunction/timeDifference";
import {$trackedItem} from "./taskPomodorStore";

export interface  IDaysForWeek {
    dayOfWeek: string,
    // name: string,
    abbr: string,
    id: string,
    workTime: number
}
export interface IDailyPomodoros {
    year: number,
    weekNumber: number,
    date: string,
    dayOfWeek: string,
    completedPomodoro: number,
    completedWorkTime: number,
    completedBreakTime: number,
    pauseCount: number,
    pauseTime: number,
    tasksForDay: Array<string>,
}

export interface IWeeklyPomodoros {
    year: number,
    weekNumber: number,
    value: string,
    daysCompleted: IDailyPomodoros[]
}

export const daysArr: IDaysForWeek[] = [
    {
        dayOfWeek: "Понедельник",
        abbr: "Пн",
        id: generateRandomString(),
        workTime: 0
    },
    {
        dayOfWeek: "Вторник",
        abbr: "Вт",
        id: generateRandomString(),
        workTime: 0
    },
    {
        dayOfWeek: "Среда",
        abbr: "Ср",
        id: generateRandomString(),
        workTime: 0
    },
    {
        dayOfWeek: "Четверг",
        abbr: "Чт",
        id: generateRandomString(),
        workTime: 0
    },
    {
        dayOfWeek: "Пятница",
        abbr: "Пт",
        id: generateRandomString(),
        workTime: 0
    },
    {
        dayOfWeek: "Суббота",
        abbr: "Сб",
        id: generateRandomString(),
        workTime: 0
    },
    {
        dayOfWeek: "Воскресенье",
        abbr: "Вс",
        id: generateRandomString(),
        workTime: 0
    },
]
export const updateWeekly = createEvent()
export const addDonePomodoros = createEvent()
export const addNotFullWorkTime = createEvent()
export const addWorkTimeAfterStop = createEvent()
export const addBreakTime = createEvent()
export const addNotBreakTime = createEvent()
export const addLongBreakTime = createEvent()
export const addNotLongBreakTime = createEvent()
export const addNumberOfStops = createEvent()
export const changeSelectWeekly = createEvent<number>()
export const updateSelectDay = createEvent<number>()
export const changeSelectDay = createEvent<string>()
export const startTimerPause = createEvent()
export const resetTimerPause = createEvent()
export const addTimePause = createEvent()

export const $firstTimerPause = createStore<number>(0)
    .on(startTimerPause, () => nowDate())
    .reset(resetTimerPause)
export const $dailyPomodoros = createStore<IDailyPomodoros[]>([])
    .on(addDonePomodoros, (state) => {
        return addTime({
            current: $timersTime.getState().workTime,
            state: state
        })
    })
    .on(addNotFullWorkTime, (state) => {
        return addTime({
            current: $timersTime.getState().workTime,
            state: state,
            notFull: true
        })
    })
    .on(addWorkTimeAfterStop, (state) => {
        return addTime({
            current: $timersTime.getState().workTime,
            state: state,
            notFull: true,
            stopTimer: true
        })
    })
    .on(addBreakTime, (state) => {
        return addTime({
            current: $timersTime.getState().breakTime,
            state: state,
        })
    })
    .on(addNotBreakTime, (state) => {
        return addTime({
            current: $timersTime.getState().breakTime,
            state: state,
            notFull: true
        })
    })
    .on(addLongBreakTime, (state) => {
        return addTime({
            current: $timersTime.getState().longBreakTime,
            state: state,
        })
    })
    .on(addNotLongBreakTime, (state) => {
        return addTime({
            current: $timersTime.getState().longBreakTime,
            state: state,
            notFull: true
        })
    })
    .on(addNumberOfStops, (state) => {
            return addTime({
                state: state,
                pauseCount: true
            })
        })
    .on(addTimePause, (state) => {
        return addTime({
            state: state,
            pauseTime: true
        })
    })

export const $weeklyPomodoros = createStore<IWeeklyPomodoros[]>([])
    .on(updateWeekly, (state) => {
        const currentDate = new Date();
        const currentWeekNumber = getWeekNumber(currentDate);
        const currentYear = currentDate.getFullYear();

        const dailyArray = $dailyPomodoros.getState();
        const allWeeks: { [key: string]: IWeeklyPomodoros } = {};

        dailyArray.forEach((elem) => {
        const weekYearKey = `${elem.year}-${elem.weekNumber}`;
        if (!allWeeks[weekYearKey]) {
            allWeeks[weekYearKey] = {
            year: elem.year,
            weekNumber: elem.weekNumber,
            daysCompleted: [],
            value: getValueForWeek(elem.weekNumber, elem.year, currentWeekNumber, currentYear)
            };
        }
        allWeeks[weekYearKey].daysCompleted.push(elem);
        });

        return Object.values(allWeeks);
    })
export const $weeklyLatest = combine($weeklyPomodoros, (weeklyPomodoros) => {
    return getLatestDate(weeklyPomodoros)
})
const initializeSelectedWeekly = createEffect(() => {
    const weeklyLatest = $weeklyLatest.getState();
    return weeklyLatest && weeklyLatest.length > 0 ? weeklyLatest[0] : null;
});

export const $selectedWeekly = createStore<IWeeklyPomodoros |null>(null)
    .on(changeSelectWeekly, (state, payload) => {
        const weekly = $weeklyPomodoros.getState();
        const newSelectedWeekly = weekly.find(elem => elem.weekNumber === payload)
        return newSelectedWeekly;
    })
    .on(initializeSelectedWeekly.doneData, (_, payload) => payload);


const iniinitializeSelectedDay = createEffect(() => {
    const selected = $selectedWeekly.getState()
    const now = new Date()
    const numWeek = getWeekNumber(now)
    const year = now.getFullYear()
    if (selected && selected.weekNumber === numWeek && selected.year === year) {
        selected.daysCompleted.forEach(day => {
            if (day.date === now.toISOString().split('T')[0]) {
                return day
            } else {
                return selected.daysCompleted[selected.daysCompleted.length - 1]
            }
        })
    } else if (selected) {
        return selected.daysCompleted[selected.daysCompleted.length - 1]
    } else {
        return null
    }
})
export const $selectedDay = createStore<IDailyPomodoros | IDaysForWeek | null>(null)
    .on(changeSelectDay, (state, payload) => {
        const selectedWeekly = $selectedWeekly.getState()
        if (selectedWeekly) {
            const foundDay = selectedWeekly.daysCompleted.find(elem => elem.dayOfWeek === payload);
            if (foundDay) {
                return foundDay;
            }
        }

        // Эта строка будет выполнена, если не найдено совпадение в selectedWeekly или selectedWeekly не существует
        return daysArr.find(elem => elem.dayOfWeek === payload);
    })
    .on(updateSelectDay, (state, payload) => {
        const selectWeekly = $selectedWeekly.getState()
        if (selectWeekly) {
            return  selectWeekly.daysCompleted[selectWeekly.daysCompleted.length - 1]
        }
        return state
    })
    .on($dailyPomodoros, (state, payload) => {
        if (!state) return null
        const isDailyPomodoros = state && "date" in state
        if (isDailyPomodoros) {
            const selectDate = state.date
            const updateDate = payload.find(day => day.date === selectDate)
            return updateDate
        }
        return state
    })
    .on(iniinitializeSelectedDay.doneData, (_, payload) => payload)

forward({
    from: $weeklyLatest.updates,
    to: initializeSelectedWeekly,
});

forward({
    from: $weeklyLatest.updates,
    to: iniinitializeSelectedDay
})

$selectedWeekly.watch((state) => {
    if (state) {
        updateSelectDay(state.weekNumber)
    }
})
export function getWeekNumber(d: Date) {
    // Копия даты, чтобы не изменять оригинал
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Устанавливаем дату на воскресенье этой недели
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Первый день года
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Рассчитываем номер недели
    const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return weekNo;
}

function getValueForWeek(weekNumber: number, year: number, currentWeekNumber: number, currentYear: number): string {
    const weekDiff = currentWeekNumber - weekNumber + (currentYear - year) * 52;
    switch (weekDiff) {
      case 0:
        return "Эта неделя";
      case 1:
        return "Прошедшая неделя";
      default:
        return `${weekDiff} недели назад`;
    }
}

function getTime(finalTime: number, currentTime: number): number {
    return finalTime - currentTime
}

function nameDayOfWeek(date: number): string {
    const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    return daysOfWeek[(date === 0 ? 6 : date - 1 )]
}

function newDate(state: IDailyPomodoros[]) {
    const date = new Date()
    const dataString = date.toISOString().split('T')[0]
    const dayOfWeek = nameDayOfWeek(date.getDay())
    const weekNumber = getWeekNumber(date)
    const year = date.getFullYear()

    const dayIndex = state.findIndex(day => day.date === dataString)

    return {
        dataString,
        dayOfWeek,
        dayIndex,
        weekNumber,
        year
    }
}

interface IAddTime {
    current?: ITimerTime,
    state: IDailyPomodoros[],
    notFull?: boolean,
    pauseCount?: boolean,
    stopTimer?: boolean,
    pauseTime?: boolean,
}
function addTime(props: IAddTime) {
    const { dataString, dayIndex, year, weekNumber,dayOfWeek } = newDate(props.state)
    const currentTimer = props.current
    const timerTime = $timer.getState().time
    const trackedItem = $trackedItem.getState()
    const timerStore = currentTimer && currentTimer.timeForStatics !== undefined ? currentTimer.timeForStatics : 0
    const result = props.notFull ? getTime(timerStore, timerTime) : timerStore
    const resultPauseTime = props.pauseTime && $firstTimerPause.getState() > 0 ? timeDifference($firstTimerPause.getState(), nowDate()) : 0
    if (dayIndex !== -1) {
        return props.state.map((day, index) => {
            if (index === dayIndex) {
                return {
                    ...day,
                    completedPomodoro: props.current && props.current.name === "WORK" && !props.pauseCount && !props.stopTimer
                        ? day.completedPomodoro + 1
                        : day.completedPomodoro,
                    completedWorkTime: (props.current && props.current.name === "WORK" && !props.pauseCount && props.stopTimer) || (props.current && props.current.name === "WORK" && !props.pauseCount)
                        ? day.completedWorkTime + result
                        : day.completedWorkTime,
                    completedBreakTime: props.current && (props.current.name === "BREAK" || props.current.name === "LONG_BREAK") && !props.pauseCount
                        ? day.completedBreakTime + result
                        : day.completedBreakTime,
                    pauseCount: props.pauseCount ? day.pauseCount + 1 : day.pauseCount,
                    pauseTime: props.pauseTime ? day.pauseTime + resultPauseTime : day.pauseTime,
                    tasksForDay: trackedItem && trackedItem.name && foundName(trackedItem.name, day.tasksForDay) !== true ? [...day.tasksForDay, trackedItem.name] : day.tasksForDay
                }
            }
            return day
        })
    } else {
        return [...props.state, {
            year,
            weekNumber,
            date: dataString,
            dayOfWeek: dayOfWeek,
            completedPomodoro: props.current && props.current.name === "WORK" && !props.pauseCount && !props.stopTimer ? 1 : 0,
            completedWorkTime: (props.current && props.current.name === "WORK" && !props.pauseCount && props.stopTimer) || (props.current && props.current.name === "WORK" && !props.pauseCount)
                ? result : 0,
            completedBreakTime: props.current && (props.current.name === "BREAK" || props.current.name === "LONG_BREAK") && !props.pauseCount ? result : 0,
            pauseCount: props.pauseCount ? 1 : 0,
            pauseTime: props.pauseTime ? resultPauseTime : 0,
            tasksForDay: trackedItem && trackedItem.name ? [trackedItem.name] : []
        }]
    }
}

function foundName(trackedItem:string, list: string[]) {
    return list.includes(trackedItem)

}

persist({
    store: $weeklyLatest,
    key: "weeklyLatest"
})
persist({
    store: $dailyPomodoros,
    key: "dailyPomodoros"
})
persist({
    store: $weeklyPomodoros,
    key: "weeklyPomodoros"
})
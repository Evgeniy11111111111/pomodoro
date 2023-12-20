import {createEffect, createEvent, createStore, forward} from "effector";
import {$listTaskStore, decreasePomodoroItem, increasePomodoroCurrent, removeItemTask} from "./listTaskStore";
import {$timersTime, ITimerTime, ONE_MINUTES, resetTimeForStatics} from "./timerTimeStore";
import {
    $firstTimerPause,
    addBreakTime,
    addDonePomodoros,
    addLongBreakTime,
    addNotBreakTime,
    addNotFullWorkTime,
    addNotLongBreakTime,
    addNumberOfStops,
    addTimePause,
    addWorkTimeAfterStop,
    resetTimerPause,
    startTimerPause,
    updateWeekly
} from "./donePomodoroStore";
import {nowDate, timeDifference} from "../utils/otherFunction/timeDifference";
export const incrementTimer = createEvent();
export const startTimer = createEvent();
export const pauseTimer = createEvent();
export const finishTimer = createEvent();
export const stopTimer = createEvent();
export const resetTimer = createEvent();
export const doneTimer = createEvent();
export const skipTimer = createEvent();
export const switchTimer = createEvent<ITimerTime>();
export const switchTimerInTime = createEvent()
export const timerCounterChange = createEvent();
export const timerCounterReset = createEvent();
export const addTimerTick = createEvent()
export const deactivateTimer = createEvent()
export const resumeTimer = createEvent()
export const resumeTime = createEvent()

let intervalId: NodeJS.Timeout | undefined;

export const $timerCounterNumber = createStore<number>(0)
    .on(timerCounterChange, (state) => {
        if (state === $timersTime.getState().countWork.time) {
            return 0
        } else {
            return state + 1
        }
    })
    .reset(timerCounterReset)

export const $currentTimer = createStore<ITimerTime>($timersTime.getState().workTime)
    .on(switchTimer, (state, payload) => payload)

export const $timer = createStore<ITimerTime>($currentTimer.getState())
    .on(incrementTimer, (state) => {
        const {name, time, timeForSecond, value} = state
        if (timeForSecond >= 0) {
            return {name, timeForSecond: timeForSecond - 1, value, time: Math.floor(timeForSecond / ONE_MINUTES)}
        }
        return {name, timeForSecond: 0, value, time: 0}
    })
    .on(switchTimerInTime, () => {
        return $currentTimer.getState()
    })
    .on(addTimerTick, (state) => {
        const {name, time, value, timeForSecond} = state
        return {name, value, timeForSecond: timeForSecond + ONE_MINUTES, time: Math.floor(timeForSecond / ONE_MINUTES) + 1}
    })
    .reset(resetTimer)


export const $isActiveTimer = createStore(false)
    .on(startTimer, () => true)
    .on([pauseTimer, stopTimer, finishTimer, doneTimer, deactivateTimer], () => false )
    .on(resumeTime, () => true)

export const $isPauseTimer = createStore(false)
    .on(pauseTimer, () => true)
    .on([startTimer, stopTimer, finishTimer, doneTimer, resumeTimer, resumeTime], () => false)
export const updateTimer = createEffect(async () => {
    incrementTimer()
})


startTimer.watch(() => {
    intervalId = setInterval(() => {
        updateTimer()
    }, 1000)
})

resumeTime.watch(() => {
    if ($firstTimerPause.getState() > 0) {
        addTimePause()
        resetTimerPause()
    }
    intervalId = setInterval(() => {
        updateTimer()
    }, 1000)
})

pauseTimer.watch(() => {
    if (intervalId) {
        clearInterval(intervalId)
        if ($currentTimer.getState().name === $timersTime.getState().workTime.name) {
            addNumberOfStops()
        }
        startTimerPause()
    }
})

const decreasePomodoroAndCheck = createEffect(async (id: number) => {
    decreasePomodoroItem(id);
    const tasks = $listTaskStore.getState();
    const task = tasks.find((elem) => elem.id === id);
    if (task && task.pomodoro_count === 0) {
        removeItemTask(id);
    }
});

finishTimer.watch(() => {
    if (intervalId) {
        clearInterval(intervalId)
        resetTimer()
        if ($currentTimer.getState().name === $timersTime.getState().workTime.name) {
            increasePomodoroCurrent()
            addDonePomodoros()
            updateWeekly()
            const tasks = $listTaskStore.getState();
            tasks.forEach((elem, index) => {
                if (index === 0) {
                    decreasePomodoroAndCheck(elem.id);
                }
            })
        }
        if ($currentTimer.getState().name === $timersTime.getState().breakTime.name) {
            addBreakTime()
        }
        if ($currentTimer.getState().name === $timersTime.getState().longBreakTime.name) {
            addLongBreakTime()
        }
        switchTimerFunc()
        switchTimerInTime()
        timerCounterChange()
        resetTimeForStatics()
    }
})
stopTimer.watch(() => {
    if (intervalId) {
        clearInterval(intervalId)
        addWorkTimeAfterStop()
        resetTimer()
        resetTimeForStatics()
    }
})
doneTimer.watch(() => {
    if (intervalId) {
        clearInterval(intervalId)

        if ($currentTimer.getState().name === $timersTime.getState().workTime.name) {
            increasePomodoroCurrent()
            addNotFullWorkTime()
            const tasks = $listTaskStore.getState();
            tasks.forEach((elem, index) => {
                if (index === 0) {
                    elem.pomodoro_count = 0
                    elem.time = 0
                    removeItemTask(elem.id)
                }
            })
        }
        resetTimer();
        switchTimerFunc()
        switchTimerInTime()
        timerCounterChange()
        resetTimeForStatics()
    }
})
skipTimer.watch(() => {
    if (intervalId) {
        clearInterval(intervalId);
        if ($currentTimer.getState().name === $timersTime.getState().breakTime.name) {
            addNotBreakTime()
        }
        if ($currentTimer.getState().name === $timersTime.getState().longBreakTime.name) {
            addNotLongBreakTime()
        }
        deactivateTimer()
        resumeTimer()
        resetTimer();
        switchTimerFunc()
        switchTimerInTime()
        timerCounterChange()
        resetTimeForStatics()
    }
})
function switchTimerFunc () {
    if ($currentTimer.getState().name === $timersTime.getState().workTime.name) {
        if ($timerCounterNumber.getState() === $timersTime.getState().countWork.time) {
            switchTimer($timersTime.getState().longBreakTime)
        } else {
            switchTimer($timersTime.getState().breakTime)
        }
    } else {
        switchTimer($timersTime.getState().workTime)
    }
}


forward({
    from: startTimer,
    to: updateTimer
})


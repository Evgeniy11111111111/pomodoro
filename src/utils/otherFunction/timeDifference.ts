import {convertMinutes} from "./declension";

export function nowDate() {
    return Date.now()
}

export function timeDifference(time1: number, time2: number) {
    const resultTime = time2 - time1
    return  Math.round(resultTime / 1000)
}

export function  sectionToMinutes(seconds: number) {
    const minutesAll = convertSeconds(seconds)
    const secondsRemaining = minutesAll.remainingSecondsAfterMinutes
    const minutes = minutesAll.minutes
    const hours = minutesAll.hours

    let string;

    if (hours > 0 && minutes > 0) {
        string = `${hours}ч ${minutes}м`
    } else if (hours < 1 && minutes > 0) {
        string = `${minutes}м`
    } else if (hours > 0 && minutes < 1) {
        string = `${hours}ч`
    } else {
        string = `${secondsRemaining}c`
    }

    return string
}

export function convertSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600)
    const remainingSeconds = seconds % 3600
    const minutes = Math.floor(remainingSeconds / 60)
    const remainingSecondsAfterMinutes = remainingSeconds % 60

    return {
        hours,
        minutes,
        remainingSecondsAfterMinutes
    }
}
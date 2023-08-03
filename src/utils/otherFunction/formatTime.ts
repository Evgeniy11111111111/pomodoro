import {declension} from "./declension";

export function formatTime(minutes: number): string {
    let stringTime

    if (minutes < 60) {
        stringTime = `${minutes} мин`
    } else {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        if (remainingMinutes === 0) {
            stringTime = `${declension(hours)}`
        } else {
            stringTime = `${declension(hours)} ${remainingMinutes}мин`
        }
    }

    return stringTime
}
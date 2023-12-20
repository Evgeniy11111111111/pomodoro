import {IWeeklyPomodoros} from "../../store/donePomodoroStore";

export function getLatestDate(list: IWeeklyPomodoros[]) {
    if (list.length === 0) {
        return null
    }

    return [...list].sort((a, b) => {
        const dateA = new Date(a.year, 0, (a.weekNumber - 1) * 7);
        const dateB = new Date(b.year, 0, (b.weekNumber - 1) * 7);
        return dateB.getTime() - dateA.getTime() ;
    })
}
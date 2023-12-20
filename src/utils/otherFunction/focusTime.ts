export function focusTime(minutes: number, date: string) {
    const TOTAL_MINUTES_IN_DAY = 1440
    const currentDate = new Date();
    const inputDate = new Date(date)

    const isToday = currentDate.toDateString() === inputDate.toISOString()

    let totalMinutes;
    if (isToday) {
        totalMinutes = currentDate.getHours() * 60 + currentDate.getMinutes()
    } else {
        totalMinutes = TOTAL_MINUTES_IN_DAY
    }

    return Math.round((minutes / totalMinutes) * 100)
}
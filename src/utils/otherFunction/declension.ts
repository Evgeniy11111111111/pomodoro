export function declension(num: number): string {
    let declension

    if (num % 10 === 1 && num % 100 !== 11) {
        declension = `${num} час`;
    } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
        declension = `${num} часа`;
    } else {
        declension = `${num} часов`;
    }

    return declension;
}

export function declensionMinutes(num: number): string {
    let declension

    if (num % 10 === 1 && num % 100 !== 11) {
        declension = `${num} минута`;
    } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
        declension = `${num} минуты`;
    } else {
        declension = `${num} минут`;
    }

    return declension;
}

export function declensionPomodoro(num: number): string {
    let declension

    if (num % 10 === 1 && num % 100 !== 11) {
        declension = `${num} помидор`;
    } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
        declension = `${num} помидора`;
    } else {
        declension = `${num} помидоров`;
    }

    return declension;
}

export function convertMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return {
        hours, remainingMinutes
    }
}
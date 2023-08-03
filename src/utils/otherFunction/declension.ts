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
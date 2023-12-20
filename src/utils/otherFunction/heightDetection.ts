export function heightDetection(x: number): string {
    if (x >= 125) return "420px"
    return `${3.32 * x }px`
}
export function convertMinutesToHourString(time: number) {
    const hours = String(Math.floor(time / 60)).padStart(2, '0');
    const minutes = String(time % 60).padStart(2, '0');
    return `${ hours }:${ minutes }`;
}
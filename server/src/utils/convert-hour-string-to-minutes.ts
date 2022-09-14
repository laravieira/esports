export function convertHourStringToMinutes(string: String) {
    const [ hours, minutes ] = string.split(':').map(Number);
    return hours * 60 + minutes;
}
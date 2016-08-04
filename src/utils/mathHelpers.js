export function convertFromPerlin(newMin, newMax, oldValue) {
    const oldRange = 2;
    const newRange = newMax - newMin;
    return (((oldValue + 1) * newRange) / oldRange) + newMin;
}
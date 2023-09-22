export async function sleep(delay=3000) {
    return new Promise ((resolve) => {
        return setTimeout(resolve, delay);
    });
}

export function ArrToMap(arr) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item;
        return acc
    }, {})
}
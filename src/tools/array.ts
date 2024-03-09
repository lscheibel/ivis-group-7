export const groupAdjacent = <T>(arr: T[], fn: (item: T) => unknown) => {
    // https://stackoverflow.com/questions/26675688/best-way-to-group-adjacent-array-items-by-value
    let prevResult: unknown = Symbol();
    const acc = [];

    for (const val of arr) {
        const currResult = fn(val);

        if (acc.length === 0 || currResult !== prevResult) {
            acc.push([val]);
        } else {
            acc[acc.length - 1].push(val);
        }

        prevResult = currResult;
    }

    return acc;
};

export const dedupe = <T>(arr: T[]) => [...new Set(arr)];

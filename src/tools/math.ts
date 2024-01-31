export const incrementalRound = (n: number, increment: number, offset = 0) => {
    return Math.round((n - offset) / increment) * increment + offset;
};

export const incrementalRound = (n: number, increment: number, offset = 0) => {
    return Math.round((n - offset) / increment) * increment + offset;
};

export const clamp = (n: number, min: number, max: number) => {
    return n > max ? max : n < min ? min : n;
};

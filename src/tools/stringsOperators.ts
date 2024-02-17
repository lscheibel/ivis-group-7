export const fromCamelCaseToUserFormat = (text: string) => {
    let chars = text.split('');
    let offset = 0;
    chars.forEach((c, index) => {
        if (c.charCodeAt(0) <= 90) {
            c = String.fromCharCode(c.charCodeAt(0) + 32); // Map to lowecase in ASCII
            chars = [...chars.slice(0, index + offset), ' ', c, ...chars.slice(index + offset + 1)]; //Spread
            offset++; //Move the index by an offset
        }
    });
    const capitalLetter = chars[0].toUpperCase();
    chars[0] = capitalLetter;
    return chars.join('');
};

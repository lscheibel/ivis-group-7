export class StringParser {
    static parseAsNumber(raw: string) {
        if (raw === '') return null;
        return Number.parseFloat(raw.replace(',', '.'));
    }
}

export class StringParser {
    static parseAsNumber(raw: string) {
        if (raw === '') return null;
        const parsed = Number.parseFloat(raw.replace(',', '.'));
        if (Number.isNaN(parsed)) return null;
        return parsed;
    }
}

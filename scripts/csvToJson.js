import parseCsv from 'neat-csv';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve, basename } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const main = async () => {
    const fileNames = await fs.readdir(resolve(__dirname, '../src/data'), { recursive: true, withFileTypes: true });
    const csvFiles = await Promise.all(fileNames.filter((file) => file.isFile() && file.name.endsWith('.csv')));

    csvFiles.forEach(async (csvFile) => {
        const fileContents = await fs.readFile(resolve(csvFile.path, csvFile.name));
        const json = await parseCsv(fileContents);
        const filename = basename(csvFile.name, '.csv');

        await fs.writeFile(resolve(csvFile.path, `${filename}.json`), JSON.stringify(json, null, 2));
    });
};

main();

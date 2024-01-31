# Education Data Visualizations - Group 7

> Part of the DH2321 Information Visualization course at KTH university.

## Data

In `src/data` static data sources are stored. You can put you're cleaned .csv files there and run `npm run csv` to parse them into `.json` files fo the same name next to it.

---

## Development

Install dependencies with `npm install`.
Use `npm run dev` to start the dev server.

Before committing, please make sure that all files have been reformatted with prettier.

### Setup VSCode IDE

Copy `.vscode/settings.json.default` to `.vscode/settings.json`.

### Setup Intellij IDEs

Settings > Languages & Frameworks > JavaScript > Prettier

Run for files: `{**/*,*}.{js,ts,jsx,tsx,cjs,mjs,html,json,css,scss,md,yml,yaml}`
And if you want check the "On save".

### NPM Scripts

| Script             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `npm run dev`      | Start the development server                            |
| `npm run test`     | Run the tests (in watch mode)                           |
| `npm run build`    | Build the project                                       |
| `npm run coverage` | View the test coverage                                  |
| `npm run preview`  | Preview the build                                       |
| `npm run csv`      | Parse all .csv files to .json in the src/data directory |

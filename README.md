# Education Data Visualizations - Group 7

> Part of the DH2321 Information Visualization course at KTH university.

## Data

In `src/data` static data sources are stored. You can put you're cleaned .csv files there and run `npm run csv` to parse them into `.json` files fo the same name next to it.

---

## Development

### The veeeery first time setup (skip if you've worked with react before).

1. Open a terminal anywhere.
2. Depending on your platform download and install `nvm` (OSX, Linux) or `nvm-windows` as described on their GitHub.
3. Use `nvm install 18` to install node.
4. Use `nvm use 18` to use node version 18.
5. Open a terminal in this directory.
6. Use `npm i` to install all dependencies.
7. Use `npm run dev` to start a dev server.
8. You should now be able to go to http://localhost:2345 to see a preview of the app! 🎉

### Regular Setup

Install dependencies with `npm install`.
Use `npm run dev` to start the dev server.

Before committing, please make sure that all files have been reformatted with prettier.

### Setup VSCode IDE

Copy `.vscode/settings.json.default` to `.vscode/settings.json`.
Install Prettier and ESLint VSCode extensions.

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

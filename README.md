# annotorious-sas-storage
An Annotorious plugin to use Simple Annotation Server for annotation storage

## Requirements

- Node.JS v16.x
- NPM v8.x
- Annotorious
- Simple Annotation Server

This project uses [Volta](https://volta.sh/) to pin Node and NPM versions.

## Usage

This plugin can be installed with NPM:

```sh
npm install --save https://github.com/Princeton-CDH/annotorious-sas-storage.git
```

Then, to use alongside Annotorious and Simple Annotation Server:

```js
const client = Annotorious(annotoriousSettings);
const settings = {
    annotationEndpoint: simpleAnnotationServerUrl, // The endpoint for your SAS instance
    target: iiifImageUrl, // URL for a IIIF image that will be the annotation target
    manifest: iiifManifestUrl, /// URL for the containing IIIF manifest
};
const storagePlugin = AnnotationServerStorage(client, settings);
```

## Development

### Getting started

To start developing on this project, first install the dependencies with NPM:

```sh
npm install
```

Then you can start editing TypeScript code. When you have made changes, you can rebuild the package by running:

```sh
npm run build
```

This will place transpiled and minified JavaScript (via webpack) into the `/dist` directory.

To use your modified code in other projects locally, after running the build script, install with NPM in your other projects by pointing it to the project root directory:

```sh
npm install --save /path/to/annotorious-sas-storage/
```

### Organization

This project is written in TypeScript, and organized according to the following scheme:

- `/src` contains the source code of the repository
    - `/src/types` contains type definitions used in the TypeScript code
    - `/src/utils` contains utility functions and classes
    - `/src/index.ts` is the entrypoint for the TypeScript code
- `/tests` contains Jest unit tests, and should mirror the structure of `/src`
- `/dist` contains the build outputs and should not be directly modified
    - `/dist/index.js` is the entrypoint for the built JavaScipt code

### Code style and linting

This project uses ESLint to manage code style and enforce consistency.

If you are using VSCode, you will need to install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Then, your editor should pick up the settings from `.vscode/settings.json`, which specify that ESLint will auto-fix any style errors on saving a file.

You may also use the following scripts to check for and fix linter errors:

```sh
npm run lint
```

```sh
npm run lint:fix
```

### Testing

This project uses Jest for unit tests, stored in the `/tests` directory. Tests can be run with the following command:

```sh
npm test
```
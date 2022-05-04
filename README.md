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
    - `/src/index.ts` is the entrypoint for the TypeScript code
- `/dist` contains the build outputs and should not be directly modified
    - `/dist/index.js` is the entrypoint for the built JavaScipt code

> Note: `/dist` is used for development builds, while bundled releases will be published to NPM.

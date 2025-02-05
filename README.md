# es-interop

[![npm](https://img.shields.io/npm/v/es-interop.svg)](https://www.npmjs.com/package/es-interop)

Load modules dynamically from ESM, CJS, TS, JSON, etc.

## Usage

```shell
pnpm i es-interop
```

```ts
import { loadModule, resolveModule } from 'es-interop'

// Load or resolve
await loadModule('some-module', import.meta.url) // load `some-module` (prefer ESM while CJS is also working)
await resolveModule('some-module', import.meta.url) // resolve `some-module` (prefer ESM while CJS is also working)

// in Node CommonJS
// const { loadModule, resolveModule } = require('es-interop')
await loadModule('some-module', __filename) // load `some-module` (also prefer ESM)

// from file
await loadModule('/path/to/some-module.js', import.meta.url) // load `some-module.js`

// other formats
await loadModule('/path/to/some-module.json', import.meta.url) // load `some-module.json`
await loadModule('/path/to/some-module.ts', import.meta.url) // load `some-module.ts`
```

### Synchronous CJS

```ts
import { loadCJSModule, resolveCJSModule } from 'es-interop'

loadCJSModule('some-module', import.meta.url) // load `some-module` with Node resolution algorithm
resolveCJSModule('some-module', import.meta.url) // resolve `some-module` with Node resolution algorithm
```

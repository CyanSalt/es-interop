import { describe, expect, test } from 'vitest'
import { interopDefault, loadCJSModule, loadESModule, loadModule, loadTSModule } from '../src'

describe('loadESModule', () => {

  test('ESM module', async () => {
    const mod = await loadESModule('./modules/index.mjs', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'module',
      },
    })
  })

  test('ESM module from another directory', async () => {
    const mod = await loadESModule('./tests/modules/index.mjs', new URL('../package.json', import.meta.url).href)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'module',
      },
    })
  })

  test('ESM module from package entry', async () => {
    const mod = await loadESModule('@local/test-modules', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'module',
      },
    })
  })

  test('ESM module from package file', async () => {
    const mod = await loadESModule('@local/test-modules/index.mjs', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'module',
      },
    })
  })

  test('CommonJS module', async () => {
    const mod = await loadESModule('./modules/index.cjs', import.meta.url)
    expect(mod).toMatchObject({
      kind: 'commonjs',
      value: 42,
      default: {
        kind: 'commonjs',
        value: 42,
      },
    })
  })

  test('CommonJS module from package file', async () => {
    const mod = await loadESModule('@local/test-modules/index.cjs', import.meta.url)
    expect(mod).toMatchObject({
      default: {
        kind: 'commonjs',
        value: 42,
      },
    })
  })

  test('JSON module', async () => {
    const mod = await loadESModule('./modules/index.json', import.meta.url)
    expect(mod).toMatchObject({
      kind: 'json',
      value: 42,
      default: {
        kind: 'json',
        value: 42,
      },
    })
  })

  test('JSON module from package file', async () => {
    const mod = await loadESModule('@local/test-modules/index.json', import.meta.url)
    expect(mod).toMatchObject({
      kind: 'json',
      value: 42,
      default: {
        kind: 'json',
        value: 42,
      },
    })
  })

})

describe('loadCJSModule', () => {

  test('CommonJS module', () => {
    const mod = loadCJSModule('./modules/index.cjs', import.meta.url)
    expect(mod).toEqual({
      kind: 'commonjs',
      value: 42,
    })
  })

  test('CommonJS module from another directory', async () => {
    const mod = loadCJSModule('./tests/modules/index.cjs', new URL('../package.json', import.meta.url).href)
    expect(mod).toEqual({
      kind: 'commonjs',
      value: 42,
    })
  })

  test('CommonJS module from package entry', async () => {
    const mod = loadCJSModule('@local/test-modules', import.meta.url)
    expect(mod).toMatchObject({
      kind: 'commonjs',
      value: 42,
    })
  })

  test('CommonJS module from package file', async () => {
    const mod = loadCJSModule('@local/test-modules/index.cjs', import.meta.url)
    expect(mod).toEqual({
      kind: 'commonjs',
      value: 42,
    })
  })

  test('JSON module', async () => {
    const mod = loadCJSModule('./modules/index.json', import.meta.url)
    expect(mod).toEqual({
      kind: 'json',
      value: 42,
    })
  })

  test('JSON module from package file', async () => {
    const mod = loadCJSModule('@local/test-modules/index.json', import.meta.url)
    expect(mod).toEqual({
      kind: 'json',
      value: 42,
    })
  })

})

describe('loadTSModule', () => {

  test('TypeScript module', async () => {
    const mod = await loadTSModule('./modules/index.ts', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'typescript',
      },
    })
  })

  test('TypeScript module from another directory', async () => {
    const mod = await loadTSModule('./tests/modules/index.ts', new URL('../package.json', import.meta.url).href)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'typescript',
      },
    })
  })

  test('TypeScript module from package file', async () => {
    const mod = await loadTSModule('@local/test-modules/index.ts', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'typescript',
      },
    })
  })

})

describe('loadModule', () => {

  test('ESM module', async () => {
    const mod = await loadModule('./modules/index.mjs', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'module',
      },
    })
  })

  test('ESM module from another directory', async () => {
    const mod = await loadESModule('./tests/modules/index.mjs', new URL('../package.json', import.meta.url).href)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'module',
      },
    })
  })

  test('ESM module from package entry', async () => {
    const mod = await loadModule('@local/test-modules', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'module',
      },
    })
  })

  test('ESM module from package file', async () => {
    const mod = await loadModule('@local/test-modules/index.mjs', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'module',
      },
    })
  })

  test('CommonJS module', async () => {
    const mod = await loadModule('./modules/index.cjs', import.meta.url)
    expect(mod).toMatchObject({
      kind: 'commonjs',
      value: 42,
      default: {
        kind: 'commonjs',
        value: 42,
      },
    })
  })

  test('CommonJS module from package file', async () => {
    const mod = await loadModule('@local/test-modules/index.cjs', import.meta.url)
    expect(mod).toMatchObject({
      default: {
        kind: 'commonjs',
        value: 42,
      },
    })
  })

  test('JSON module', async () => {
    const mod = await loadModule('./modules/index.json', import.meta.url)
    expect(mod).toMatchObject({
      kind: 'json',
      value: 42,
      default: {
        kind: 'json',
        value: 42,
      },
    })
  })

  test('JSON module from package file', async () => {
    const mod = await loadModule('@local/test-modules/index.json', import.meta.url)
    expect(mod).toMatchObject({
      kind: 'json',
      value: 42,
      default: {
        kind: 'json',
        value: 42,
      },
    })
  })

  test('TypeScript module', async () => {
    const mod = await loadModule('./modules/index.ts', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'typescript',
      },
    })
  })

  test('TypeScript module from another directory', async () => {
    const mod = await loadModule('./tests/modules/index.ts', new URL('../package.json', import.meta.url).href)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'typescript',
      },
    })
  })

  test('TypeScript module from package file', async () => {
    const mod = await loadModule('@local/test-modules/index.ts', import.meta.url)
    expect(mod).toMatchObject({
      value: 42,
      default: {
        kind: 'typescript',
      },
    })
  })

})

describe('interopDefault', () => {

  test('ESM module', async () => {
    const mod = await loadModule('./modules/index.mjs', import.meta.url)
    expect(interopDefault(mod)).toEqual({
      kind: 'module',
    })
  })

  test('CommonJS module', async () => {
    const mod = await loadModule('./modules/index.cjs', import.meta.url)
    expect(interopDefault(mod)).toEqual({
      kind: 'commonjs',
      value: 42,
    })
  })

  test('JSON module', async () => {
    const mod = await loadModule('./modules/index.json', import.meta.url)
    expect(interopDefault(mod)).toEqual({
      kind: 'json',
      value: 42,
    })
  })

  test('TypeScript module', async () => {
    const mod = await loadModule('./modules/index.ts', import.meta.url)
    expect(interopDefault(mod)).toEqual({
      kind: 'typescript',
    })
  })

})

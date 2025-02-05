import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ResolverFactory } from 'oxc-resolver'
import { tsImport } from 'tsx/esm/api'

function getDefaultImporter() {
  return path.join(process.cwd(), 'package.json')
}

function getImporterContext(importer: string) {
  const filename = URL.canParse(importer) ? fileURLToPath(importer) : importer
  return path.dirname(filename)
}

export function resolveCJSModule(id: string, importer: string = getDefaultImporter()): string {
  const require = createRequire(importer)
  return require.resolve(id)
}

export function loadCJSModule<T = any>(id: string, importer: string = getDefaultImporter()): T {
  const require = createRequire(importer)
  return require(id)
}

export async function resolveModule(id: string, importer: string = getDefaultImporter()): Promise<string> {
  if (URL.canParse(id) || path.isAbsolute(id)) return id
  const factory = new ResolverFactory({
    extensions: ['.js', '.mjs', '.cjs', '.json'],
    conditionNames: ['node', 'import', 'require', 'default'],
  })
  const result = await factory.async(getImporterContext(importer), id)
  if (result.error) {
    throw new Error(result.error)
  }
  return result.path!
}

export async function loadESModule<T = any>(id: string, importer: string = getDefaultImporter()): Promise<T> {
  const absolutePath = await resolveModule(id, importer)
  return import(absolutePath)
}

export async function loadTSModule<T = any>(id: string, importer: string = getDefaultImporter()): Promise<T> {
  return tsImport(id, importer)
}

export function loadModule<T = any>(id: string, importer: string = getDefaultImporter()): Promise<T> {
  const ext = path.extname(id)
  // TypeScript entry is not supported by default
  if (['.ts', '.mts', '.cts'].includes(ext)) {
    return loadTSModule<T>(id, importer)
  }
  return loadESModule<T>(id, importer)
}

export function interopDefault<T = any>(mod: unknown): T {
  if (typeof mod !== 'object' || mod === null) return mod as T
  // e.g. `export default ...` --(tsc)-> `exports.default` --(dynamic import)-> `Module { default: { default: ... } }`
  return 'default' in mod ? interopDefault<T>(mod.default) : mod as T
}
